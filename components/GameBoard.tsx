"use client";

import React from "react";
import { MissionLayout, MISSION_LAYOUTS, Position } from "./types";

interface GameBoardProps {
  layout: MissionLayout;
  stepDelay: number;
  astronautPos: Position;
  visitedCells: string[];
  collectedStars: string[];
}

export const GameBoard: React.FC<GameBoardProps> = ({
  layout,
  stepDelay,
  astronautPos,
  visitedCells,
  collectedStars,
}) => {
  const isRocket = (r: number, c: number) =>
    r === layout.rocketPos.r && c === layout.rocketPos.c;

  const isMeteor = (r: number, c: number) =>
    layout.meteors.some((m) => m.r === r && m.c === c);

  const isStar = (r: number, c: number) =>
    layout.stars.some((s) => s.r === r && s.c === c);

  return (
    <section className="lg:col-span-7 bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center justify-center">
      <div className="w-full grid gap-2 mb-3 text-slate-300">
        <h2 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2 text-sky-400">
          <span>🪐</span> Papan Misi ({layout.gridSize}x{layout.gridSize})
        </h2>
        {/* Reserve room for every mission so longer targets cannot shift the board. */}
        <div className="grid text-xs sm:text-sm font-semibold text-slate-400">
          {MISSION_LAYOUTS.map((mission) => (
            <div
              key={mission.id}
              aria-hidden={mission.id !== layout.id}
              className={`col-start-1 row-start-1 flex flex-wrap items-center gap-3 ${mission.id !== layout.id ? "invisible" : ""}`}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block shrink-0"></span>
                Start: ({mission.startPos.r + 1},{mission.startPos.c + 1})
              </span>
              <span className="flex items-center gap-1.5 bg-rose-950/60 border border-rose-500/40 px-2 py-0.5 rounded-lg text-rose-300">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block shrink-0"></span>
                <span>Target Roket: <strong className="text-rose-200">{mission.targetDescription}</strong> ({mission.rocketPos.r + 1},{mission.rocketPos.c + 1})</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Utama Permainan */}
      <div
        className={`space-board relative w-full min-h-0 max-w-[560px] aspect-square grid gap-2 sm:gap-2.5 p-3 rounded-2xl bg-slate-950 border-2 border-indigo-900/60 shadow-inner`}
        style={{
          gridTemplateColumns: `repeat(${layout.gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${layout.gridSize}, minmax(0, 1fr))`,
        }}
        role="grid"
        aria-label={`Papan Misi ${layout.gridSize}x${layout.gridSize}`}
      >
        {Array.from({ length: layout.gridSize }).map((_, r) =>
          Array.from({ length: layout.gridSize }).map((_, c) => {
            const isAstronautHere =
              astronautPos.r === r && astronautPos.c === c;
            const isRocketHere = isRocket(r, c);
            const isMeteorHere = isMeteor(r, c);
            const isStarHere = isStar(r, c);
            const isStarCollected = collectedStars.includes(`${r}-${c}`);
            const wasVisited = visitedCells.includes(`${r}-${c}`);

            return (
              <div
                key={`cell-${r}-${c}`}
                role="gridcell"
                aria-label={`Kotak baris ${r + 1} kolom ${c + 1}${isAstronautHere ? ", Astronot" : ""}`}
                className={`relative rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                  isAstronautHere
                    ? "bg-indigo-950/90 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105 z-10"
                    : isRocketHere
                    ? "bg-rose-950/70 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.45)] ring-2 ring-rose-500/30"
                    : isMeteorHere
                    ? "bg-amber-950/70 border-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.25)]"
                    : wasVisited
                    ? "bg-slate-900/90 border-indigo-700/60"
                    : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                {/* Jejak langkah */}
                {wasVisited && !isAstronautHere && !isRocketHere && (
                  <span className="absolute text-[10px] sm:text-xs text-indigo-400/60">
                    👣
                  </span>
                )}

                {/* Nomor Baris & Kolom */}
                <span className="absolute top-1 left-1 text-[9px] sm:text-[10px] text-slate-400 font-mono select-none">
                  {r + 1},{c + 1}
                </span>

                {/* Aktor & Objek */}
                {isRocketHere && !isAstronautHere && (
                  <div className="flex flex-col items-center justify-center relative">
                    <span className="text-3xl sm:text-4xl lg:text-5xl drop-shadow-md">
                      🚀
                    </span>
                    <span className="absolute -bottom-1.5 px-1 py-0.2 rounded bg-rose-600/90 text-[8px] font-black text-white uppercase tracking-wider">
                      GOAL
                    </span>
                  </div>
                )}

                {isMeteorHere && (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl drop-shadow-md">
                      ☄️
                    </span>
                  </div>
                )}

                {isStarHere && !isAstronautHere && (
                  <div
                    className={`flex flex-col items-center justify-center transition-opacity ${
                      isStarCollected ? "opacity-20 scale-75" : "animate-pulse"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl drop-shadow-md">
                      ⭐
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
        <div className="absolute inset-3 pointer-events-none" aria-hidden="true">
          <div
            className={`space-astronaut ${visitedCells.length > 1 ? "space-travelling" : ""}`}
            style={{
              width: `calc((100% - ${layout.gridSize - 1} * var(--cell-gap)) / ${layout.gridSize})`,
              height: `calc((100% - ${layout.gridSize - 1} * var(--cell-gap)) / ${layout.gridSize})`,
              left: `calc(${astronautPos.c} * (100% + var(--cell-gap)) / ${layout.gridSize})`,
              top: `calc(${astronautPos.r} * (100% + var(--cell-gap)) / ${layout.gridSize})`,
              transitionDuration: `${Math.min(stepDelay * 0.7, 360)}ms`,
            }}
          >
            <span
              key={`${visitedCells.length}-${astronautPos.r}-${astronautPos.c}`}
              className={`${visitedCells.length > 1 ? "space-walk" : "space-float"} text-3xl sm:text-4xl lg:text-5xl drop-shadow-md`}
              style={{ animationDuration: visitedCells.length > 1 ? `${Math.min(stepDelay * 0.7, 360)}ms` : undefined }}
            >
              👨‍🚀
            </span>
          </div>
        </div>
      </div>

      {/* Legenda */}
      <div className="w-full mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-300 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="text-xl">👨‍🚀</span> Astronot
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-xl">🚀</span> Roket Tujuan
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-xl">☄️</span> Meteor
        </span>
        {layout.stars.length > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="text-xl">⭐</span> Bintang Energi
          </span>
        )}
      </div>
    </section>
  );
};
