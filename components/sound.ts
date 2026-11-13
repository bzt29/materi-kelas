export type SoundAction = "click" | "step" | "win" | "crash" | "star" | "clear";

// Original, repeating pentatonic melody: soft bells, a bass pulse and gentle chords.
const MELODY = [72, 76, 79, 76, 81, 79, 76, 0, 74, 76, 79, 83, 81, 79, 76, 0,
  72, 76, 79, 84, 83, 79, 81, 0, 79, 76, 74, 76, 72, 0, 67, 0];
const BEAT = 60 / 104 / 2;

export class SpaceAudio {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private musicNodes = new Set<OscillatorNode>();
  private enabled = true;
  private musicEnabled = true;
  private nextBeat = 0;
  private beat = 0;
  private foot = 0;
  private disposed = false;

  configure(enabled: boolean, musicEnabled: boolean) {
    this.enabled = enabled;
    this.musicEnabled = musicEnabled;
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(enabled ? 0.65 : 0, this.ctx.currentTime, 0.015);
    }
    if (!enabled || !musicEnabled) this.stopMusic();
    else if (this.ctx?.state === "running") this.startMusic();
  }

  // Called from a user gesture so browsers can unlock audio playback.
  activate() {
    if (this.disposed || !this.enabled || document.hidden) return;
    try {
      if (!this.ctx) {
        const Context = window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!Context) return;
        this.ctx = new Context();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.65;
        this.master.connect(this.ctx.destination);
        this.musicBus = this.ctx.createGain();
        this.musicBus.gain.value = 0.45;
        this.musicBus.connect(this.master);
      }
      if (this.ctx.state === "running") this.startMusic();
      else void this.ctx.resume().then(() => {
        if (!this.disposed && !document.hidden) this.startMusic();
      }).catch(() => {});
    } catch {
      // The game remains usable if audio is unavailable.
    }
  }

  private note(midi: number, when: number, duration: number, volume: number,
    type: OscillatorType = "sine", music = false, endMidi?: number) {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const envelope = this.ctx.createGain();
    const hz = (pitch: number) => 440 * 2 ** ((pitch - 69) / 12);
    osc.type = type;
    osc.frequency.setValueAtTime(hz(midi), when);
    if (endMidi !== undefined) osc.frequency.exponentialRampToValueAtTime(hz(endMidi), when + duration);
    envelope.gain.setValueAtTime(0, when);
    envelope.gain.linearRampToValueAtTime(volume, when + 0.008);
    envelope.gain.exponentialRampToValueAtTime(0.001, when + duration);
    osc.connect(envelope);
    envelope.connect(music ? this.musicBus! : this.master);
    if (music) this.musicNodes.add(osc);
    osc.onended = () => {
      osc.disconnect();
      envelope.disconnect();
      this.musicNodes.delete(osc);
    };
    osc.start(when);
    osc.stop(when + duration + 0.02);
  }

  private startMusic() {
    if (this.timer || !this.ctx || !this.enabled || !this.musicEnabled || this.disposed) return;
    this.nextBeat = this.ctx.currentTime + 0.04;
    this.beat = 0;
    const schedule = () => {
      if (!this.ctx || this.ctx.state !== "running") return;
      if (this.nextBeat < this.ctx.currentTime) this.nextBeat = this.ctx.currentTime + 0.04;
      while (this.nextBeat < this.ctx.currentTime + 0.18) {
        const pitch = MELODY[this.beat % MELODY.length];
        if (pitch) {
          this.note(pitch, this.nextBeat, 0.42, 0.12, "sine", true);
          this.note(pitch + 12, this.nextBeat, 0.22, 0.025, "sine", true);
        }
        if (this.beat % 4 === 0) {
          const root = [48, 53, 57, 55][Math.floor(this.beat / 8) % 4];
          this.note(root, this.nextBeat, 0.5, 0.10, "triangle", true);
          for (const interval of [12, 19]) this.note(root + interval, this.nextBeat, 0.75, 0.035, "sine", true);
        }
        this.nextBeat += BEAT;
        this.beat++;
      }
    };
    schedule();
    this.timer = setInterval(schedule, 100);
  }

  private stopMusic() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    for (const node of this.musicNodes) node.stop();
    this.musicNodes.clear();
  }

  play(action: SoundAction) {
    this.activate();
    if (!this.enabled || !this.ctx || document.hidden) return;
    const now = this.ctx.currentTime;
    if (action === "step") {
      // A prominent boot tap with a clear sole click, alternating feet.
      const pitch = this.foot++ % 2 ? 49 : 46;
      this.note(pitch, now, 0.13, 0.64, "sine", false, pitch - 16);
      this.note(79, now, 0.035, 0.16, "triangle", false, 55);
    } else if (action === "star") {
      [84, 88, 91].forEach((pitch, i) => this.note(pitch, now + i * 0.08, 0.24, 0.16));
    } else if (action === "win") {
      [72, 76, 79, 84, 79, 84].forEach((pitch, i) => this.note(pitch, now + i * 0.13, 0.36, 0.19, "triangle"));
    } else if (action === "crash") {
      this.note(55, now, 0.22, 0.18, "triangle", false, 43);
      this.note(48, now + 0.17, 0.25, 0.14);
    } else {
      this.note(action === "click" ? 76 : 67, now, 0.09, 0.13);
    }
  }

  visibilityChanged() {
    if (document.hidden) {
      this.stopMusic();
      void this.ctx?.suspend().catch(() => {});
    } else if (this.ctx) this.activate();
  }

  dispose() {
    this.disposed = true;
    this.stopMusic();
    void this.ctx?.close().catch(() => {});
  }
}

export function triggerConfetti() {
  if (typeof window === "undefined") return;
  import("canvas-confetti")
    .then((module) => {
      const confetti = module.default;
      confetti({
        particleCount: 130,
        spread: 95,
        origin: { y: 0.55 },
        colors: ["#38bdf8", "#4ade80", "#facc15", "#f43f5e", "#a855f7"],
      });
    })
    .catch(() => {});
}
