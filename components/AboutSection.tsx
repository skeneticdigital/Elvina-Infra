import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
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
        
        {/* Left Side: Square Photo + Info */}
        <div className="flex flex-col items-center md:items-start flex-shrink-0">
          <div className="w-64 h-64 md:w-80 md:h-80 relative mb-6 shadow-2xl overflow-hidden rounded-md border border-gray-100">
            {/* Placeholder image for a professional architect/director */}
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop"
              alt="Chief Architect"
              className="object-cover w-full h-full transition-all duration-500"
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">David Elvira</h3>
          <p className="text-sm md:text-base font-semibold tracking-widest text-[#B58529] uppercase mt-2">
            Managing Director & Chief Architect
          </p>
        </div>

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
