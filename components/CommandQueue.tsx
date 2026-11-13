"use client";

import React, { useRef, useEffect } from "react";
import { Sparkles, Delete } from "lucide-react";
import { Direction, DIRECTION_INFO } from "./types";

interface CommandQueueProps {
  queue: Direction[];
  activeStepIndex: number | null;
  isPlaying: boolean;
  onRemoveLast: () => void;
}

export const CommandQueue: React.FC<CommandQueueProps> = ({
  queue,
  activeStepIndex,
  isPlaying,
  onRemoveLast,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll saat antrean bertambah
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [queue.length]);

  return (
    <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Antrean Perintah Kode
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-sky-400">
          {queue.length} Langkah
        </span>
      </div>

      {/* Kotak Deretan Perintah */}
      <div
        ref={containerRef}
        className="w-full min-h-[96px] max-h-40 overflow-x-auto overflow-y-hidden p-3 rounded-2xl bg-slate-950 border-2 border-slate-800 flex items-center gap-2.5 scroll-smooth"
      >
        {queue.length === 0 ? (
          <div className="w-full flex items-center justify-center text-slate-400 text-sm font-medium gap-2 py-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Tekan tombol panah di bawah untuk menyusun kode!</span>
          </div>
        ) : (
          queue.map((dir, index) => {
            const isCurrentRunning = isPlaying && activeStepIndex === index;
            const info = DIRECTION_INFO[dir];

            return (
              <div
                key={`cmd-${index}`}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 font-bold transition-all shadow-md ${
                  isCurrentRunning
                    ? "bg-yellow-400 text-slate-950 border-yellow-300 scale-110 shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-pulse"
                    : "bg-slate-900 text-slate-100 border-slate-700"
                }`}
              >
                <span className="text-xs px-1.5 py-0.5 rounded bg-black/30 font-mono text-slate-300">
                  #{index + 1}
                </span>
                <span className="text-xl">{info.icon}</span>
                <span className="text-sm font-extrabold">{info.label}</span>
              </div>
            );
          })
        )}
      </div>

      {/* Tombol Hapus 1 Langkah (Undo) */}
      <div className="flex justify-end mt-2.5">
        <button
          type="button"
          onClick={onRemoveLast}
          disabled={isPlaying || queue.length === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <Delete className="w-4 h-4 text-rose-400" />
          <span>Hapus 1 Langkah</span>
        </button>
      </div>
    </div>
  );
};
