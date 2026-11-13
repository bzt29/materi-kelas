"use client";

import React from "react";
import { useSpaceGame } from "@/components/useSpaceGame";
import { Header } from "@/components/Header";
import { FeedbackBanner } from "@/components/FeedbackBanner";
import { GameBoard } from "@/components/GameBoard";
import { CommandQueue } from "@/components/CommandQueue";
import { DirectionPad } from "@/components/DirectionPad";
import { ActionButtons } from "@/components/ActionButtons";
import { WinModal } from "@/components/WinModal";

export default function SpaceCodingPage() {
  const game = useSpaceGame();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col p-4 md:p-6 lg:p-8 select-none font-sans">
      {/* 1. Header & Navigasi (termasuk tombol NEXT pada layout 1) */}
      <Header
        layout={game.currentLayout}
        totalLayouts={game.totalLayouts}
        soundEnabled={game.soundEnabled}
        musicEnabled={game.musicEnabled}
        stepDelay={game.stepDelay}
        isPlaying={game.isPlaying}
        onSelectLayout={game.setLayoutId}
        onNextLayout={game.nextLayout}
        onPrevLayout={game.prevLayout}
        onToggleSound={game.toggleSound}
        onToggleMusic={game.toggleMusic}
        onSetStepDelay={game.setStepDelay}
      />

      {/* 2. Banner Feedback Status Permainan */}
      <FeedbackBanner
        feedback={game.feedback}
        collectedStars={game.collectedStars.length}
        totalStars={game.currentLayout.stars.length}
      />

      {/* 3. Area Permainan Utama: Grid & Kontrol */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <GameBoard
          key={game.currentLayout.id}
          layout={game.currentLayout}
          stepDelay={game.stepDelay}
          astronautPos={game.astronautPos}
          visitedCells={game.visitedCells}
          collectedStars={game.collectedStars}
        />

        <section className="lg:col-span-5 flex flex-col gap-5">
          <CommandQueue
            queue={game.commandQueue}
            activeStepIndex={game.activeStepIndex}
            isPlaying={game.isPlaying}
            onRemoveLast={game.removeLastCommand}
          />

          <DirectionPad
            disabled={game.isPlaying}
            onAddCommand={game.addCommand}
          />

          <ActionButtons
            isPlaying={game.isPlaying}
            queueLength={game.commandQueue.length}
            onRun={game.runCode}
            onReset={game.resetGame}
          />
        </section>
      </div>

      {/* 4. Modal Perayaan Kemenangan */}
      {game.showWinModal && (
        <WinModal
          layout={game.currentLayout}
          stepsCount={game.commandQueue.length}
          collectedStarsCount={game.collectedStars.length}
          hasNextLayout={game.hasNextLayout}
          onNextLayout={game.nextLayout}
          onReplay={game.resetGame}
          onClose={() => game.setShowWinModal(false)}
        />
      )}
    </main>
  );
}
