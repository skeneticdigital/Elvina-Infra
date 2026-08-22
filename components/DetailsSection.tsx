'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { constructionData } from '@/data/construction';
import { Building2, Shield, Zap, Award, Compass, Layers, CheckCircle2 } from 'lucide-react';

function Counter({
  numeric,
  suffix = '',
  duration = 2000,
}: {
  numeric: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * numeric));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(numeric);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, numeric, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function DetailsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="details-section"
      ref={containerRef}
      className="relative py-28 md:py-36 bg-neutral-950 text-white overflow-hidden border-t border-white/10"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-construction-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-architectural-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-construction-orange/30 bg-construction-orange/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-construction-orange" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-construction-orange uppercase">
              PROJECT SPECIFICATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-tight text-white">
            MODERN RESIDENTIAL TOWER
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            {constructionData.description}
          </p>
        </div>

        {/* Animated Numerical Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {constructionData.stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-6 sm:p-8 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl hover:border-construction-orange/40 transition-colors group"
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-construction-orange opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 group-hover:text-construction-orange transition-colors">
                <Counter numeric={stat.numeric} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-300 font-mono mb-2">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-400 leading-relaxed font-light">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architectural Engineering Highlights */}
        <div className="mt-16">
          <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-8 flex items-center space-x-3">
            <span>ENGINEERING & STRUCTURAL SYSTEMS</span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {constructionData.architecturalHighlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.15 }}
                className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-construction-orange/10 border border-construction-orange/20 flex items-center justify-center text-construction-orange mb-4">
                  {idx === 0 && <Layers className="w-5 h-5" />}
                  {idx === 1 && <Zap className="w-5 h-5" />}
                  {idx === 2 && <Building2 className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">{item.description}</p>
                <div className="inline-block px-2.5 py-1 rounded bg-neutral-900 border border-white/10 text-[11px] font-mono text-construction-orange">
                  {item.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Bar */}
        <div className="mt-16 p-6 rounded-2xl border border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-wider">
                LEED Platinum Certified & ISO 14001 Compliant
              </div>
              <div className="text-xs text-neutral-400">
                100% renewable operational energy, ultra-low embodied concrete emissions.
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-xs font-mono text-neutral-400">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-construction-orange" />
              <span>BIM 4D Digital Twin</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-construction-orange" />
              <span>Zero Incident Record</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
