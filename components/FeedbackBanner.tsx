"use client";

import React from "react";
import { Star, Trophy } from "lucide-react";
import { FeedbackState } from "./useSpaceGame";
import { MISSION_LAYOUTS } from "./types";

interface FeedbackBannerProps {
  feedback: FeedbackState;
  collectedStars: number;
  totalStars: number;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  feedback,
  collectedStars,
  totalStars,
}) => {
  return (
    <section className="my-4" aria-live="polite">
      <div
        className={`w-full p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 shadow-xl ${
          feedback.type === "success"
            ? "bg-emerald-950/80 border-emerald-400 text-emerald-100 ring-4 ring-emerald-500/20"
            : feedback.type === "crash"
            ? "bg-rose-950/80 border-rose-400 text-rose-100 ring-4 ring-rose-500/20 animate-pulse"
            : feedback.type === "running"
            ? "bg-amber-950/80 border-amber-400 text-amber-100 ring-4 ring-amber-500/20"
            : feedback.type === "incomplete"
            ? "bg-sky-950/80 border-sky-400 text-sky-100"
            : "bg-slate-900/90 border-slate-700 text-slate-200"
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="text-3xl sm:text-4xl flex-shrink-0">
            {feedback.type === "success" && "🌟"}
            {feedback.type === "crash" && "💥"}
            {feedback.type === "running" && "🚀"}
            {feedback.type === "incomplete" && "🤔"}
            {feedback.type === "idle" && "🧭"}
          </div>
          <div>
            <div className="grid text-lg sm:text-2xl font-bold tracking-wide">
              {MISSION_LAYOUTS.map((mission) => (
                <p key={mission.id} aria-hidden="true" className="invisible col-start-1 row-start-1">
                  {mission.name}: {mission.description}
                </p>
              ))}
              <p className="col-start-1 row-start-1">{feedback.message}</p>
            </div>
            {feedback.type === "success" && (
              <p className="text-sm sm:text-base text-emerald-300 font-medium mt-0.5">
                Hebat sekali! Kamu berhasil menyusun algoritma dengan tepat!
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {totalStars > 0 && (
            <div className="flex w-20 justify-center whitespace-nowrap items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs sm:text-sm font-bold text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>
                {collectedStars} / {totalStars}
              </span>
            </div>
          )}

          {feedback.type === "success" && (
            <div className="hidden md:flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-400/50 text-emerald-300 font-bold">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>NILAI 100</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
