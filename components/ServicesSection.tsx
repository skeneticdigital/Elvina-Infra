'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'parametric-design',
    title: 'Parametric Engineering',
    description:
      'Algorithmic load-bearing optimization, aerodynamic diagrid superstructures, and column-free luxury living spaces with bespoke geometric precision.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'monolithic-foundation',
    title: 'Substructure & Foundation',
    description:
      'Deep subterranean diaphragm slurry walls, high-strength monolithic raft slabs, and seismic-rated bedrock anchoring systems.',
    image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'smart-facade',
    title: 'Unitized Glass Façade',
    description:
      'Argon-injected triple-glazed low-E curtain wall panels with integrated aerodynamic fins, acoustic attenuation, and solar reflection.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'bim-digital-twin',
    title: 'BIM 4D Digital Twin',
    description:
      'Laser-scanned 4D digital twin synchronization, automated supply chain robotics, and millimeter-precision structural execution.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'sustainable-construction',
    title: 'LEED Platinum Green',
    description:
      'Low-carbon slag-infused concrete, rooftop photovoltaic generation, and cantilevered biophilic sky gardens cascaded across tower levels.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'turnkey-handover',
    title: 'Turnkey Luxury Handover',
    description:
      'Comprehensive commissioning of building management systems, acoustic sign-off, curated interior stone finishes, and white-glove handover.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>(servicesData[0].id);

  return (
    <section
      id="services-section"
      className="relative min-h-screen py-24 md:py-32 bg-[#071220] text-white overflow-hidden border-t border-[#1B4D89]/30 flex flex-col justify-center"
    >
      {/* Background Brand Grid & Ambient Glow */}
      <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#1B4D89]/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-md">
            OUR SERVICES
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-300 font-light max-w-xl mx-auto">
            Hover or click across our architectural engineering disciplines.
          </p>
        </div>

        {/* Interactive Expanding Cards Gallery */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 h-[500px] sm:h-[540px] w-full items-stretch [perspective:1500px]">
          {servicesData.map((service) => {
            const isActive = activeId === service.id;

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveId(service.id)}
                onMouseEnter={() => setActiveId(service.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border ${
                  isActive
                    ? 'flex-[5] border-[#3B82F6] shadow-[0_0_35px_rgba(59,130,246,0.3)] ring-1 ring-[#60A5FA]/40'
                    : 'flex-[1] border-white/10 hover:border-[#3B82F6]/40'
                } bg-[#0E223D] flex flex-col justify-end`}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-105"
                  style={{ backgroundImage: `url(${service.image})` }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-[#071220] via-[#0E223D]/60 to-transparent'
                      : 'bg-[#071220]/70 hover:bg-[#071220]/50'
                  }`}
                />

                {/* Collapsed Vertical Label */}
                {!isActive && (
                  <div className="absolute inset-0 hidden lg:flex flex-col items-center justify-center py-6 px-2 z-10 pointer-events-none">
                    <span className="[writing-mode:vertical-lr] rotate-180 font-bold uppercase tracking-widest text-xs text-white/90 whitespace-nowrap">
                      {service.title}
                    </span>
                  </div>
                )}

                {/* Expanded Content View (Clean Title with 360° Rotation and Description Only) */}
                {isActive && (
                  <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full overflow-hidden">
                    {/* Big Heading: 360° Full Rotation */}
                    <div className="overflow-visible mb-3">
                      <motion.h3
                        key={`title-${service.id}`}
                        initial={{
                          opacity: 0,
                          x: 120,
                          rotate: 360,
                          scale: 0.7,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          rotate: 0,
                          scale: 1,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ transformOrigin: 'center center' }}
                        className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white drop-shadow-lg inline-block"
                      >
                        {service.title}
                      </motion.h3>
                    </div>

                    {/* Description */}
                    <motion.p
                      key={`desc-${service.id}`}
                      initial={{
                        opacity: 0,
                        x: 40,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed max-w-xl line-clamp-3 sm:line-clamp-none"
                    >
                      {service.description}
                    </motion.p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
