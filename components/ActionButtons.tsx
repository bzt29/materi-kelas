"use client";

import React from "react";
import { Play, RotateCcw, AlertTriangle } from "lucide-react";

interface ActionButtonsProps {
  isPlaying: boolean;
  queueLength: number;
  onRun: () => void;
  onReset: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isPlaying,
  queueLength,
  onRun,
  onReset,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* JALANKAN (HIJAU BESAR) */}
        <button
          type="button"
          onClick={onRun}
          disabled={isPlaying || queueLength === 0}
          className="h-20 sm:h-24 rounded-3xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 active:scale-95 border-b-6 border-emerald-700 text-slate-950 font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Play className="w-8 h-8 fill-slate-950 stroke-[3]" />
          <span>{isPlaying ? "BERJALAN..." : "JALANKAN 🚀"}</span>
        </button>

        {/* RESET / ULANG (MERAH BESAR) */}
        <button
          type="button"
          onClick={onReset}
          disabled={isPlaying}
          className="h-20 sm:h-24 rounded-3xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 active:scale-95 border-b-6 border-rose-800 text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(225,29,72,0.35)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-8 h-8 stroke-[3]" />
          <span>RESET / ULANG 🔄</span>
        </button>
      </div>

      {/* Petunjuk Kelas Untuk Guru */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs sm:text-sm text-slate-400 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-200">Tips untuk Guru:</span> Ajak siswa bergantian menyusun kode pada antrean, lalu minta seisi kelas menghitung mundur sebelum menekan tombol hijau <strong className="text-emerald-400">JALANKAN</strong>.
        </div>
      </div>
    </div>
  );
};
