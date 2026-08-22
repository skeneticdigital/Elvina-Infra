'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shovel, HardHat, Layers, Box, Paintbrush, CheckCircle, ArrowRight } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    title: 'Foundation & Earthwork',
    category: 'GEOTECHNICAL & SUBSTRUCTURE',
    description:
      'Excavation to bedrock depth, continuous slurry wall reinforcement, and pouring 24,000 m³ of high-performance reinforced concrete.',
    icon: Shovel,
    duration: 'Months 01 — 06',
  },
  {
    step: '02',
    title: 'Core & Structural Frame',
    category: 'VERTICAL LOAD BEARING',
    description:
      'Erection of high-strength monolithic shear wall core with automatic self-climbing hydraulic formwork and perimeter mega-columns.',
    icon: HardHat,
    duration: 'Months 07 — 16',
  },
  {
    step: '03',
    title: 'Floors & Superstructure',
    category: 'POST-TENSIONED SLAB CASTING',
    description:
      'Synchronized 3.5-day floor cycles using laser-guided concrete screeds and acoustic-damping post-tensioned spans.',
    icon: Layers,
    duration: 'Months 17 — 26',
  },
  {
    step: '04',
    title: 'Exterior & Façade Envelope',
    category: 'UNITIZED TRIPLE GLAZING',
    description:
      'Precision installation of custom low-E glass panels, architectural titanium-zinc louvers, and weather-sealed thermal barriers.',
    icon: Box,
    duration: 'Months 24 — 30',
  },
  {
    step: '05',
    title: 'Interior Systems & Finishing',
    category: 'MEP & LUXURY RESIDENTIAL',
    description:
      'Integration of high-efficiency HVAC, smart building BMS automation, curated Italian stone, and acoustic timber finishes.',
    icon: Paintbrush,
    duration: 'Months 28 — 34',
  },
  {
    step: '06',
    title: 'Commissioning & Completion',
    category: 'CERTIFICATION & HANDOVER',
    description:
      'Comprehensive seismic and wind damper testing, environmental LEED Platinum sign-off, and final white-glove handover.',
    icon: CheckCircle,
    duration: 'Months 35 — 36',
  },
];

export default function ProcessSection() {
  return (
    <section
      id="process-section"
      className="relative py-28 md:py-36 bg-black text-white overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-construction-orange" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase">
                CONSTRUCTION METHODOLOGY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
              THE 6-STAGE DISCIPLINE
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-400 font-light leading-relaxed">
            Every millimeter is calculated through advanced 4D digital twin modelling, ensuring zero margin of structural error.
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-8 rounded-xl border border-white/10 bg-neutral-950/80 hover:bg-neutral-900/80 hover:border-construction-orange/50 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Step Index Number Top Right */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-white group-hover:text-construction-orange group-hover:border-construction-orange/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-mono font-black text-neutral-700 group-hover:text-construction-orange/60 transition-colors">
                    {step.step}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-mono tracking-widest text-construction-orange uppercase font-bold mb-1">
                    {step.category}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  <span>{step.duration}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-construction-orange opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
