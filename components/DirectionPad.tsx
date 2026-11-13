"use client";

import React from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { Direction } from "./types";

interface DirectionPadProps {
  disabled: boolean;
  onAddCommand: (dir: Direction) => void;
}

export const DirectionPad: React.FC<DirectionPadProps> = ({
  disabled,
  onAddCommand,
}) => {
  return (
    <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl">
      <h2 className="text-lg sm:text-xl font-extrabold text-white mb-4 text-center">
        🎮 Tombol Arah Perintah
      </h2>

      {/* D-Pad Tombol Arah Ramah Anak */}
      <div className="max-w-[340px] mx-auto flex flex-col items-center gap-3">
        {/* ATAS */}
        <button
          type="button"
          onClick={() => onAddCommand("UP")}
          disabled={disabled}
          className="w-36 sm:w-44 h-16 sm:h-20 rounded-2xl bg-sky-600 hover:bg-sky-500 active:scale-95 active:bg-sky-700 border-b-4 border-sky-800 text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-2 shadow-lg transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowUp className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
          <span>ATAS</span>
        </button>

        {/* KIRI & KANAN */}
        <div className="flex items-center gap-3 sm:gap-4 w-full justify-center">
          <button
            type="button"
            onClick={() => onAddCommand("LEFT")}
            disabled={disabled}
            className="flex-1 h-16 sm:h-20 rounded-2xl bg-amber-600 hover:bg-amber-500 active:scale-95 active:bg-amber-700 border-b-4 border-amber-800 text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-2 shadow-lg transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
            <span>KIRI</span>
          </button>

          <button
            type="button"
            onClick={() => onAddCommand("RIGHT")}
            disabled={disabled}
            className="flex-1 h-16 sm:h-20 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 active:bg-indigo-700 border-b-4 border-indigo-800 text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-2 shadow-lg transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>KANAN</span>
            <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
          </button>
        </div>

        {/* BAWAH */}
        <button
          type="button"
          onClick={() => onAddCommand("DOWN")}
          disabled={disabled}
          className="w-36 sm:w-44 h-16 sm:h-20 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 active:bg-blue-700 border-b-4 border-blue-800 text-white font-black text-xl sm:text-2xl flex items-center justify-center gap-2 shadow-lg transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowDown className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
          <span>BAWAH</span>
        </button>
      </div>
    </div>
  );
};
