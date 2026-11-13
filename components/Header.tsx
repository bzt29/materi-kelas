"use client";

import React, { useState } from "react";
import {
  Music2,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Gauge,
  Layers,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { MissionLayout, MISSION_LAYOUTS } from "./types";

interface HeaderProps {
  layout: MissionLayout;
  totalLayouts: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  stepDelay: number;
  isPlaying: boolean;
  onSelectLayout: (id: number) => void;
  onNextLayout: () => void;
  onPrevLayout: () => void;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onSetStepDelay: (delay: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  layout,
  totalLayouts,
  soundEnabled,
  musicEnabled,
  stepDelay,
  isPlaying,
  onSelectLayout,
  onNextLayout,
  onPrevLayout,
  onToggleSound,
  onToggleMusic,
  onSetStepDelay,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-400 flex items-center justify-center text-2xl shadow-inner">
          🌌
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              MISI LUAR ANGKASA <span className="text-amber-400">🚀</span>
            </h1>
            <div className="hidden sm:grid shrink-0 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-xs font-bold text-indigo-300">
              {MISSION_LAYOUTS.map((mission) => (
                <span key={mission.id} aria-hidden={mission.id !== layout.id} className={`col-start-1 row-start-1 ${mission.id !== layout.id ? "invisible" : ""}`}>
                  {mission.badge}
                </span>
              ))}
            </div>
          </div>
          {/* Hidden alternatives reserve responsive space without clipping mission text. */}
          <div className="grid text-slate-400 text-sm sm:text-base font-medium">
            {MISSION_LAYOUTS.map((mission) => (
              <p
                key={mission.id}
                aria-hidden={mission.id !== layout.id}
                className={`col-start-1 row-start-1 ${mission.id !== layout.id ? "invisible" : ""}`}
              >
                <strong className="text-sky-300">{mission.name}</strong>: {mission.description}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 tabular-nums">
        {/* Tombol Navigasi Prev (Slide sebelumnya) */}
        <button
          type="button"
          onClick={onPrevLayout}
          disabled={isPlaying || layout.id === 1}
          className="flex shrink-0 items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition-all active:scale-95 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Slide {Math.max(1, layout.id - 1)}</span>
        </button>

        {/* Tombol Navigasi Next (Slide berikutnya) */}
        <button
          type="button"
          onClick={onNextLayout}
          disabled={isPlaying || layout.id === totalLayouts}
          className="flex shrink-0 items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all active:scale-95 disabled:opacity-50"
        >
          <span>NEXT SLIDE {Math.min(totalLayouts, layout.id + 1)}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>

        {/* Pilihan 5 Slide Cepat */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 p-1 rounded-xl text-xs sm:text-sm font-bold">
          <span className="px-2 text-slate-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            Slide:
          </span>
          {Array.from({ length: totalLayouts }).map((_, i) => {
            const id = i + 1;
            const isActive = layout.id === id;
            return (
              <button
                key={`slide-tab-${id}`}
                type="button"
                onClick={() => onSelectLayout(id)}
                disabled={isPlaying}
                title={`Buka Slide ${id}`}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-sky-500 text-slate-950 font-black shadow-md scale-105"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                {id}
              </button>
            );
          })}
        </div>

        {/* Kecepatan Eksekusi */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 p-1 rounded-xl text-xs sm:text-sm font-bold">
          <span className="px-2 text-slate-400 flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            Jeda:
          </span>
          <button
            type="button"
            onClick={() => onSetStepDelay(1000)}
            className={`px-2 py-1 rounded-lg ${
              stepDelay === 1000
                ? "bg-amber-500 text-slate-950 font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            1s
          </button>
          <button
            type="button"
            onClick={() => onSetStepDelay(500)}
            className={`px-2 py-1 rounded-lg ${
              stepDelay === 500
                ? "bg-amber-500 text-slate-950 font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            0.5s
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={musicEnabled ? "Matikan musik latar" : "Nyalakan musik latar"}
          aria-pressed={musicEnabled}
          title="Melodi petualangan lembut. Musik mulai setelah kamu menyentuh tombol permainan."
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-semibold active:scale-95"
        >
          <Music2 className={`w-4 h-4 ${musicEnabled && soundEnabled ? "text-amber-300" : "text-slate-500"}`} />
          <span>Musik {musicEnabled ? "ON" : "OFF"}</span>
        </button>

        {/* Suara ON/OFF */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? "Matikan semua suara" : "Nyalakan semua suara"}
          aria-pressed={soundEnabled}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-semibold active:scale-95"
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Suara ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-rose-400" />
              <span>Suara OFF</span>
            </>
          )}
        </button>

        {/* Fullscreen */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label="Mode Layar Penuh"
          title="Layar Penuh Proyektor"
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all text-xs sm:text-sm font-semibold active:scale-95"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-cyan-400" />
          ) : (
            <Maximize2 className="w-4 h-4 text-cyan-400" />
          )}
        </button>
      </div>
    </header>
  );
};
