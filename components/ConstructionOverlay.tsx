'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface ConstructionOverlayProps {
  progress: MotionValue<number>;
}

interface OverlaySegmentProps {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  headlineTop: string;
  headlineBottom: string;
  headlineThird?: string;
  subBadge: string;
  metricLabel: string;
  metricValue: string;
  align?: 'left' | 'right' | 'center';
}

function OverlaySegment({
  progress,
  range,
  headlineTop,
  headlineBottom,
  headlineThird,
  subBadge,
  metricLabel,
  metricValue,
  align = 'left',
}: OverlaySegmentProps) {
  const [fadeInStart, peakStart, peakEnd, fadeOutEnd] = range;

  // Transform opacity
  const opacity = useTransform(
    progress,
    [fadeInStart, peakStart, peakEnd, fadeOutEnd],
    [0, 1, 1, 0]
  );

  // Transform Y translation (smooth subtle upward glide)
  const y = useTransform(
    progress,
    [fadeInStart, peakStart, peakEnd, fadeOutEnd],
    [40, 0, 0, -40]
  );

  // Transform scale for cinematic depth
  const scale = useTransform(
    progress,
    [fadeInStart, peakStart, peakEnd, fadeOutEnd],
    [0.96, 1, 1, 1.03]
  );

  const alignmentClasses = {
    left: 'items-start text-left ml-6 sm:ml-12 md:ml-20 lg:ml-28',
    right: 'items-end text-right mr-6 sm:mr-12 md:mr-20 lg:mr-28 ml-auto',
    center: 'items-center text-center mx-auto',
  }[align];

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`absolute inset-x-0 top-0 bottom-0 flex flex-col justify-center pointer-events-none p-4 max-w-7xl mx-auto z-20`}
    >
      <div className={`flex flex-col ${alignmentClasses} max-w-3xl`}>
        {/* Phase Badge & Architectural Telemetry */}
        <div className="flex items-center space-x-3 mb-3 sm:mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded border border-construction-orange/40 bg-construction-orange/10 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold tracking-widest text-construction-orange uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-construction-orange mr-2 animate-ping" />
            {subBadge}
          </span>
          <div className="h-[1px] w-8 sm:w-16 bg-white/20" />
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase">
            {metricLabel}: <strong className="text-white">{metricValue}</strong>
          </span>
        </div>

        {/* Large Cinematic Typography */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[0.9] text-white">
          <span className="block drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {headlineTop}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            {headlineBottom}
          </span>
          {headlineThird && (
            <span className="block text-construction-orange text-glow-orange mt-1">
              {headlineThird}
            </span>
          )}
        </h2>

        {/* Framing line */}
        <div className="mt-4 sm:mt-6 w-24 sm:w-36 h-[2px] bg-gradient-to-r from-construction-orange to-transparent" />
      </div>
    </motion.div>
  );
}

export default function ConstructionOverlay({ progress }: ConstructionOverlayProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Subtle Vignette for Overlay readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* Section 1: 0.00 – 0.12 */}
      <OverlaySegment
        progress={progress}
        range={[0.00, 0.02, 0.10, 0.14]}
        subBadge="PHASE 01 // SUBSTRUCTURE"
        metricLabel="ELEVATION"
        metricValue="-18.00M"
        headlineTop="IT STARTS"
        headlineBottom="WITH A FOUNDATION"
        align="left"
      />

      {/* Section 2: 0.15 – 0.30 */}
      <OverlaySegment
        progress={progress}
        range={[0.15, 0.18, 0.28, 0.31]}
        subBadge="PHASE 02 // SUPERSTRUCTURE"
        metricLabel="CORE STRENGTH"
        metricValue="C80 HIGH-PERFORMANCE"
        headlineTop="BUILDING"
        headlineBottom="THE STRUCTURE"
        align="right"
      />

      {/* Section 3: 0.32 – 0.55 */}
      <OverlaySegment
        progress={progress}
        range={[0.32, 0.36, 0.52, 0.56]}
        subBadge="PHASE 03 // VERTICAL PROGRESSION"
        metricLabel="CYCLE SPEED"
        metricValue="3.5 DAYS / FLOOR"
        headlineTop="ONE FLOOR"
        headlineBottom="AT A TIME"
        align="left"
      />

      {/* Section 4: 0.58 – 0.78 */}
      <OverlaySegment
        progress={progress}
        range={[0.58, 0.62, 0.74, 0.78]}
        subBadge="PHASE 04 // ALTITUDE ELEVATION"
        metricLabel="CRANE REACH"
        metricValue="+165.00M"
        headlineTop="RISING"
        headlineBottom="TOWARD THE SKY"
        align="right"
      />

      {/* Section 5: 0.80 – 0.94 */}
      <OverlaySegment
        progress={progress}
        range={[0.80, 0.83, 0.92, 0.95]}
        subBadge="PHASE 05 // FACADE ENVELOPE"
        metricLabel="THERMAL PERFORMANCE"
        metricValue="LOW-E TRIPLE GLAZED"
        headlineTop="EVERY DETAIL"
        headlineBottom="TAKES SHAPE"
        align="left"
      />

      {/* Section 6: 0.95 – 1.00 */}
      <OverlaySegment
        progress={progress}
        range={[0.95, 0.97, 0.999, 1.0]}
        subBadge="PHASE 06 // ARCHITECTURAL REVEAL"
        metricLabel="STATUS"
        metricValue="100% COMPLETED"
        headlineTop="BUILT."
        headlineBottom="COMPLETED."
        headlineThird="READY."
        align="center"
      />
    </div>
  );
}
