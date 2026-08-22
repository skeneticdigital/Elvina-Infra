'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ConstructionStage } from '@/data/construction';

interface ProgressIndicatorProps {
  stages: ConstructionStage[];
  currentProgress: number;
  currentStageIndex: number;
  visible: boolean;
}

export default function ProgressIndicator({
  stages,
  currentProgress,
  currentStageIndex,
  visible,
}: ProgressIndicatorProps) {
  if (!visible) return null;

  const currentStage = stages[currentStageIndex] || stages[0];
  const formattedIndex = String(currentStageIndex + 1).padStart(2, '0');
  const totalFormatted = String(stages.length).padStart(2, '0');

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 flex items-center space-x-4 pointer-events-none select-none">
      {/* Stage Details Callout (Desktop only) */}
      <motion.div
        key={currentStage.id}
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 15 }}
        transition={{ duration: 0.3 }}
        className="hidden xl:flex flex-col items-end text-right pr-2"
      >
        <span className="text-[10px] font-mono tracking-widest text-construction-orange uppercase font-bold">
          {currentStage.badge}
        </span>
        <span className="text-sm font-semibold tracking-wider text-white uppercase mt-0.5">
          {currentStage.title}
        </span>
        <span className="text-[11px] font-mono text-neutral-400 mt-1 max-w-[180px] leading-tight">
          {currentStage.milestone}
        </span>
      </motion.div>

      {/* Vertical Track & Markers */}
      <div className="relative flex flex-col items-center py-2 px-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
        {/* Top Counter */}
        <div className="text-[10px] font-mono text-white mb-2 font-bold tracking-tighter">
          <span className="text-construction-orange">{formattedIndex}</span>
          <span className="text-neutral-500">/{totalFormatted}</span>
        </div>

        {/* Vertical Line Bar */}
        <div className="relative w-[2px] h-36 md:h-48 bg-neutral-800 rounded-full overflow-hidden my-1">
          {/* Active progress fill */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-construction-orange to-architectural-gold w-full origin-top"
            style={{ height: `${Math.min(100, Math.max(0, currentProgress * 100))}%` }}
          />
        </div>

        {/* Stage Dots Indicator */}
        <div className="absolute inset-y-10 left-0 right-0 flex flex-col justify-between items-center pointer-events-none py-1">
          {stages.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={stage.id}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-2 h-2 bg-construction-orange shadow-[0_0_8px_#FF5E14] ring-2 ring-construction-orange/40'
                    : isCompleted
                    ? 'bg-white/80'
                    : 'bg-neutral-700'
                }`}
              />
            );
          })}
        </div>

        {/* Percentage Bottom */}
        <div className="text-[9px] font-mono text-neutral-400 mt-2">
          {Math.round(currentProgress * 100)}%
        </div>
      </div>
    </div>
  );
}
