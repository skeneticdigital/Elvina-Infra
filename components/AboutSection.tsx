'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection({ variant = 'home' }: { variant?: 'home' | 'about' }) {
  const isAbout = variant === 'about';

  return (
    <section className="relative w-full bg-white text-black py-24 md:py-32 overflow-hidden flex justify-center">
      {/* Light aesthetic diagonal background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundSize: '400px 400px',
          backgroundImage: `linear-gradient(135deg, #f8f9fa 25%, #ffffff 25%, #ffffff 50%, #f8f9fa 50%, #f8f9fa 75%, #ffffff 75%, #ffffff 100%)`
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-24">
        
        {/* Left Side: Photo + Info */}
        <motion.div 
          initial={{ opacity: 0, x: isAbout ? 0 : -50, y: isAbout ? -50 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className={`flex flex-col items-center md:items-start flex-shrink-0 z-10 ${isAbout ? '-mt-12 md:-mt-32' : 'p-2'}`}
        >
          <div className={`relative mb-6 shadow-2xl overflow-hidden border border-gray-200 ${
            isAbout 
              ? 'w-[85vw] sm:w-[320px] md:w-[350px] lg:w-[380px] h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-b-2xl md:rounded-t-none rounded-t-2xl' 
              : 'w-64 h-64 md:w-80 md:h-80 rounded-full'
          }`}>
            {/* Portrait image for the Managing Director */}
            <img
              src={isAbout ? "https://cdn.corenexis.com/f/vQAL4t4XYea.jpeg" : "https://cdn.corenexis.com/f/LYfjSr6U7aD.jpeg"}
              alt="Gunaseelan"
              className="object-cover object-top w-full h-full transition-all duration-700 hover:scale-105"
            />
          </div>
          <h3 className={`font-serif font-bold text-gray-900 mt-2 ${isAbout ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>Gunaseelan</h3>
          <p className={`font-semibold tracking-widest text-[#B58529] uppercase mt-2 ${isAbout ? 'text-base md:text-lg' : 'text-sm md:text-base'}`}>
            Managing Director & Chief Architect
          </p>
        </motion.div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center max-w-2xl md:pt-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight">
            Building visions into <span className="text-[#B58529] italic font-serif">reality.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
            "For over a decade, we have been committed to redefining luxury living and commercial spaces. Our focus remains on combining innovative architectural designs with impeccable construction quality to create landmarks that stand the test of time."
          </p>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#B58529]"></div>
            <span className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
              A Legacy of Excellence
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
