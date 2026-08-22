'use client';

import React, { useState } from 'react';

export default function ConstructionSequence() {
  const [isReady, setIsReady] = useState<boolean>(false);

  React.useEffect(() => {
    // Fallback to ensure the preloader disappears even if video events fail
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="hero-sequence" className="relative w-full h-screen overflow-hidden bg-[#071220] select-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setIsReady(true)}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Overlay Content */}
      <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none">
      </div>

      {/* Clean White "Loading experience..." Screen */}
      {!isReady && (
        <div
          className="fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ease-out"
        >
          {/* Logo */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-2xl shadow-neutral-200/50 mb-6">
            <img
              src="/images/logo.jpg"
              alt="Elvina Infra Logo"
              className="object-cover w-full h-full"
            />
          </div>

          {/* "Loading experience..." Text */}
          <h2 className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-neutral-800 uppercase mb-3 font-sans">
            Loading experience...
          </h2>

          <div className="w-52 sm:w-64 h-1.5 bg-neutral-100 rounded-full overflow-hidden shadow-inner mb-2.5">
            <div className="h-full bg-[#1B4D89] rounded-full animate-pulse w-full" />
          </div>
        </div>
      )}
    </div>
  );
}
