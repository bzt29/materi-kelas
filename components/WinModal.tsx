"use client";

import React from "react";
import { Star, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { MissionLayout } from "./types";

interface WinModalProps {
  layout: MissionLayout;
  stepsCount: number;
  collectedStarsCount: number;
  hasNextLayout: boolean;
  onNextLayout: () => void;
  onReplay: () => void;
  onClose: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  layout,
  stepsCount,
  collectedStarsCount,
  hasNextLayout,
  onNextLayout,
  onReplay,
}) => {
  const isFinalSlide = !hasNextLayout;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 border-4 border-emerald-400 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-5xl">
          {isFinalSlide ? "🏆" : "🌟"}
        </div>

        <div>
          <h3 className="text-3xl font-black text-white tracking-wide">
            {isFinalSlide
              ? "SELAMAT! MISI SELESAI! 🏆"
              : "MISI BERHASIL! 🚀"}
          </h3>
          <p className="text-emerald-300 font-semibold text-sm mt-1">
            {layout.name} ({layout.difficulty})
          </p>
        </div>

        <p className="text-slate-300 font-medium text-base">
          Astronot mendarat dengan selamat di roket antariksa dalam{" "}
          <strong className="text-emerald-400 font-bold">{stepsCount} langkah</strong>!
        </p>

        {layout.stars.length > 0 && (
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-amber-400 font-bold text-sm">
            <Star className="w-5 h-5 fill-amber-400" />
            <span>
              Bintang Terkumpul: {collectedStarsCount} dari {layout.stars.length}
            </span>
          </div>
        )}

        {isFinalSlide && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-200 text-sm font-semibold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            <span>
              Luar biasa! Kamu dan seisi kelas berhasil menuntaskan seluruh 5 slide tantangan coding antariksa!
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button
            type="button"
            onClick={onReplay}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base transition-all active:scale-95 border border-slate-700 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isFinalSlide ? "Ulangi Slide Ini" : "Mainkan Lagi"}</span>
          </button>

          {hasNextLayout ? (
            <button
              type="button"
              onClick={onNextLayout}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <span>NEXT SLIDE {layout.id + 1}</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNextLayout()}
              className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              <span>Kembali ke Slide 1</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
