import { useState, useEffect, useCallback, useRef } from "react";
import {
  Direction,
  Position,
  MissionLayout,
  MISSION_LAYOUTS,
  DIRECTION_INFO,
} from "./types";
import { SpaceAudio, SoundAction, triggerConfetti } from "./sound";

export interface FeedbackState {
  type: "idle" | "running" | "success" | "crash" | "incomplete";
  message: string;
}

export function useSpaceGame() {
  const [layoutId, setLayoutId] = useState<number>(1);
  const currentLayout: MissionLayout =
    MISSION_LAYOUTS.find((l) => l.id === layoutId) || MISSION_LAYOUTS[0];

  const [astronautPos, setAstronautPos] = useState<Position>(
    currentLayout.startPos
  );
  const [commandQueue, setCommandQueue] = useState<Direction[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const audioRef = useRef<SpaceAudio | null>(null);
  const [stepDelay, setStepDelay] = useState<number>(500);
  const [showWinModal, setShowWinModal] = useState<boolean>(false);
  const [collectedStars, setCollectedStars] = useState<string[]>([]);
  const [visitedCells, setVisitedCells] = useState<string[]>([
    `${currentLayout.startPos.r}-${currentLayout.startPos.c}`,
  ]);
  const [feedback, setFeedback] = useState<FeedbackState>({
    type: "idle",
    message: `${currentLayout.name}: ${currentLayout.description}`,
  });

  useEffect(() => {
    const audio = new SpaceAudio();
    audioRef.current = audio;
    const activate = () => audio.activate();
    const visibility = () => audio.visibilityChanged();
    window.addEventListener("pointerdown", activate);
    window.addEventListener("keydown", activate);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("keydown", activate);
      document.removeEventListener("visibilitychange", visibility);
      audio.dispose();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    audioRef.current?.configure(soundEnabled, musicEnabled);
  }, [soundEnabled, musicEnabled]);

  const triggerSound = useCallback((action: SoundAction) => {
    audioRef.current?.play(action);
  }, []);

  // Ganti layout / slide
  const handleSetLayoutId = useCallback(
    (newId: number) => {
      const target = MISSION_LAYOUTS.find((l) => l.id === newId);
      if (!target) return;
      setIsPlaying(false);
      setActiveStepIndex(null);
      setLayoutId(newId);
      setAstronautPos(target.startPos);
      setCommandQueue([]);
      setCollectedStars([]);
      setVisitedCells([`${target.startPos.r}-${target.startPos.c}`]);
      setShowWinModal(false);
      setFeedback({
        type: "idle",
        message: `${target.name}: ${target.description}`,
      });
      triggerSound("clear");
    },
    [triggerSound]
  );

  const nextLayout = useCallback(() => {
    const nextId = layoutId + 1;
    if (nextId <= MISSION_LAYOUTS.length) {
      handleSetLayoutId(nextId);
    } else {
      handleSetLayoutId(1);
    }
  }, [layoutId, handleSetLayoutId]);

  const prevLayout = useCallback(() => {
    const prevId = layoutId - 1;
    if (prevId >= 1) {
      handleSetLayoutId(prevId);
    }
  }, [layoutId, handleSetLayoutId]);

  // Tambah perintah
  const addCommand = useCallback(
    (dir: Direction) => {
      if (isPlaying) return;
      triggerSound("click");
      setCommandQueue((prev) => [...prev, dir]);
      setFeedback({
        type: "idle",
        message: `Perintah ${DIRECTION_INFO[dir].label} ditambahkan ke antrean kode.`,
      });
    },
    [isPlaying, triggerSound]
  );

  // Hapus langkah terakhir
  const removeLastCommand = useCallback(() => {
    if (isPlaying || commandQueue.length === 0) return;
    triggerSound("clear");
    setCommandQueue((prev) => prev.slice(0, -1));
    setFeedback({
      type: "idle",
      message: "Perintah terakhir telah dihapus.",
    });
  }, [isPlaying, commandQueue.length, triggerSound]);

  // Reset permainan
  const resetGame = useCallback(() => {
    setIsPlaying(false);
    setActiveStepIndex(null);
    setAstronautPos(currentLayout.startPos);
    setCommandQueue([]);
    setCollectedStars([]);
    setVisitedCells([`${currentLayout.startPos.r}-${currentLayout.startPos.c}`]);
    setShowWinModal(false);
    triggerSound("clear");
    setFeedback({
      type: "idle",
      message: "Posisi dan antrean kode telah diatur ulang ke awal.",
    });
  }, [currentLayout, triggerSound]);

  // Jalankan kode
  const runCode = useCallback(() => {
    if (isPlaying) return;
    if (commandQueue.length === 0) {
      setFeedback({
        type: "idle",
        message: "Antrean kode masih kosong! Klik tombol panah untuk menyusun perintah.",
      });
      triggerSound("click");
      return;
    }
    setIsPlaying(true);
    setActiveStepIndex(0);
    setAstronautPos(currentLayout.startPos);
    setCollectedStars([]);
    setVisitedCells([`${currentLayout.startPos.r}-${currentLayout.startPos.c}`]);
    setShowWinModal(false);
    setFeedback({
      type: "running",
      message: "Roket dinyalakan! Astronot bergerak langkah demi langkah...",
    });
  }, [isPlaying, commandQueue.length, currentLayout, triggerSound]);

  // Eksekusi langkah demi langkah dengan jeda
  useEffect(() => {
    if (!isPlaying || activeStepIndex === null) return;

    const timer = setTimeout(() => {
      const currentDir = commandQueue[activeStepIndex];
      let nextR = astronautPos.r;
      let nextC = astronautPos.c;

      if (currentDir === "UP") nextR -= 1;
      if (currentDir === "DOWN") nextR += 1;
      if (currentDir === "LEFT") nextC -= 1;
      if (currentDir === "RIGHT") nextC += 1;

      // 1. Cek keluar batas
      const outOfBounds =
        nextR < 0 ||
        nextR >= currentLayout.gridSize ||
        nextC < 0 ||
        nextC >= currentLayout.gridSize;

      if (outOfBounds) {
        setIsPlaying(false);
        setActiveStepIndex(null);
        setAstronautPos(currentLayout.startPos);
        setVisitedCells([`${currentLayout.startPos.r}-${currentLayout.startPos.c}`]);
        triggerSound("crash");
        setFeedback({
          type: "crash",
          message: "Yaaah menabrak pinggir grid! Yuk perbaiki kodenya!",
        });
        return;
      }

      // 2. Cek tabrakan meteor
      const hitMeteor = currentLayout.meteors.some(
        (m) => m.r === nextR && m.c === nextC
      );
      if (hitMeteor) {
        setIsPlaying(false);
        setActiveStepIndex(null);
        setAstronautPos(currentLayout.startPos);
        setVisitedCells([`${currentLayout.startPos.r}-${currentLayout.startPos.c}`]);
        triggerSound("crash");
        setFeedback({
          type: "crash",
          message: "Yaaah menabrak meteor! Yuk perbaiki kodenya!",
        });
        return;
      }

      // Langkah sukses
      const nextPos = { r: nextR, c: nextC };
      setAstronautPos(nextPos);
      setVisitedCells((prev) => [...prev, `${nextR}-${nextC}`]);

      triggerSound("step");

      // Ambil bintang jika ada
      const starKey = `${nextR}-${nextC}`;
      const hitStar = currentLayout.stars.some(
        (s) => s.r === nextR && s.c === nextC
      );
      if (hitStar && !collectedStars.includes(starKey)) {
        setCollectedStars((prev) => [...prev, starKey]);
        triggerSound("star");
      }

      // 3. Kemenangan mencapai roket
      if (
        nextR === currentLayout.rocketPos.r &&
        nextC === currentLayout.rocketPos.c
      ) {
        setIsPlaying(false);
        setActiveStepIndex(null);
        triggerSound("win");
        triggerConfetti();
        setShowWinModal(true);
        setFeedback({
          type: "success",
          message: "MISI BERHASIL! 🌟 Astronot berhasil sampai di roket!",
        });
        return;
      }

      if (activeStepIndex + 1 >= commandQueue.length) {
        setIsPlaying(false);
        setActiveStepIndex(null);
        setFeedback({
          type: "incomplete",
          message: "Perintah selesai, tapi astronot belum sampai di roket. Yuk tambah perintah lagi!",
        });
        return;
      }

      setActiveStepIndex((prev) => (prev !== null ? prev + 1 : null));
    }, stepDelay);

    return () => clearTimeout(timer);
  }, [
    isPlaying,
    activeStepIndex,
    commandQueue,
    astronautPos,
    stepDelay,
    currentLayout,
    collectedStars,
    triggerSound,
  ]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPlaying) return;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        addCommand("UP");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        addCommand("DOWN");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        addCommand("LEFT");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        addCommand("RIGHT");
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        runCode();
      } else if (e.key === "Backspace") {
        e.preventDefault();
        removeLastCommand();
      } else if (e.key.toLowerCase() === "r") {
        e.preventDefault();
        resetGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, addCommand, runCode, removeLastCommand, resetGame]);

  return {
    currentLayout,
    totalLayouts: MISSION_LAYOUTS.length,
    hasNextLayout: layoutId < MISSION_LAYOUTS.length,
    hasPrevLayout: layoutId > 1,
    astronautPos,
    commandQueue,
    activeStepIndex,
    isPlaying,
    soundEnabled,
    musicEnabled,
    stepDelay,
    showWinModal,
    collectedStars,
    visitedCells,
    feedback,
    setLayoutId: handleSetLayoutId,
    nextLayout,
    prevLayout,
    addCommand,
    removeLastCommand,
    resetGame,
    runCode,
    toggleSound: () => {
      audioRef.current?.configure(!soundEnabled, musicEnabled);
      audioRef.current?.activate();
      setSoundEnabled(!soundEnabled);
    },
    toggleMusic: () => {
      audioRef.current?.configure(soundEnabled, !musicEnabled);
      audioRef.current?.activate();
      setMusicEnabled(!musicEnabled);
    },
    setStepDelay,
    setShowWinModal,
  };
}
