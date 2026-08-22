'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TOTAL_FRAMES } from '@/data/construction';

export default function ConstructionSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Exact floating frame index with smooth cinematic lerp
  const currentFrameFloatRef = useRef<number>(0);
  const targetFrameFloatRef = useRef<number>(0);
  const lastRenderedIndexRef = useRef<number>(-1);
  const animationFrameRef = useRef<number | null>(null);

  // Touch tracking refs
  const touchStartYRef = useRef<number>(0);

  // Draw specific frame index to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded image fallback
      let fallbackImg: HTMLImageElement | null = null;
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = imagesRef.current[frameIndex - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) {
          fallbackImg = prev;
          break;
        }
        const next = imagesRef.current[frameIndex + offset];
        if (next && next.complete && next.naturalWidth > 0) {
          fallbackImg = next;
          break;
        }
      }
      if (!fallbackImg) return;
      return renderImage(canvas, ctx, fallbackImg);
    }

    renderImage(canvas, ctx, img);
    lastRenderedIndexRef.current = frameIndex;
  }, []);

  const renderImage = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement
  ) => {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    if (imgWidth === 0 || imgHeight === 0) return;

    // Full screen Cover calculation (edge to edge full viewport)
    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const drawWidth = imgWidth * ratio;
    const drawHeight = imgHeight * ratio;
    const drawX = (canvasWidth - drawWidth) / 2;
    const drawY = (canvasHeight - drawHeight) / 2;

    ctx.fillStyle = '#071220';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, drawX, drawY, drawWidth, drawHeight);
  };

  // Adjust canvas resolution to screen size & DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }

    const currentIdx = Math.round(currentFrameFloatRef.current);
    drawFrame(currentIdx);
  }, [drawFrame]);

  // Preload images and animate 0% -> 100% smoothly over exactly 2 seconds
  useEffect(() => {
    let mounted = true;
    const total = TOTAL_FRAMES;
    const loadedImages: HTMLImageElement[] = [];

    // Preload all 50 frames into memory
    for (let i = 0; i < total; i++) {
      const img = new Image();
      const frameNum = i + 1;
      img.src = `/images/building/${frameNum}.jpg`;
      img.onload = () => {
        if (i === 0) {
          resizeCanvas();
          drawFrame(0);
        }
      };
      loadedImages[i] = img;
    }
    imagesRef.current = loadedImages;

    // Guaranteed 2-Second Smooth Counter from 0% to 100%
    const startTime = Date.now();
    const duration = 2000; // 2.0 seconds

    const interval = setInterval(() => {
      if (!mounted) return;
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgressPercent(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgressPercent(100);
        setTimeout(() => {
          if (!mounted) return;
          setIsReady(true);
          resizeCanvas();
          drawFrame(0);
        }, 150);
      }
    }, 25);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [drawFrame, resizeCanvas]);

  // Handle Window Resize
  useEffect(() => {
    resizeCanvas();
    const handleResize = () => {
      resizeCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resizeCanvas]);

  // Smooth, Controlled Animation Loop (Gentle lerp for cinematic weight)
  useEffect(() => {
    let running = true;

    const animateLoop = () => {
      if (!running) return;

      const diff = targetFrameFloatRef.current - currentFrameFloatRef.current;
      if (Math.abs(diff) > 0.001) {
        // Controlled lerp rate (0.20) for smoother, heavier, slower progression
        currentFrameFloatRef.current += diff * 0.20;
        const targetIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameFloatRef.current)));

        if (targetIndex !== lastRenderedIndexRef.current) {
          drawFrame(targetIndex);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(animateLoop);

    return () => {
      running = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawFrame]);

  // Calibrated Slower Virtual Scroll Controller
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const isAtTop = window.scrollY <= 10;

      if (isAtTop) {
        // Reduced step per wheel movement so construction unfolds steadily
        const step = Math.min(1.2, Math.max(0.35, Math.abs(e.deltaY) * 0.005));

        if (e.deltaY > 0 && targetFrameFloatRef.current < TOTAL_FRAMES - 1) {
          e.preventDefault();
          targetFrameFloatRef.current = Math.min(
            TOTAL_FRAMES - 1,
            targetFrameFloatRef.current + step
          );
        } else if (e.deltaY < 0 && targetFrameFloatRef.current > 0) {
          e.preventDefault();
          targetFrameFloatRef.current = Math.max(
            0,
            targetFrameFloatRef.current - step
          );
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const isAtTop = window.scrollY <= 10;
      if (!isAtTop) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;

      // Smoothed touch step
      const step = Math.min(1.0, Math.max(0.2, Math.abs(deltaY) * 0.015));

      if (deltaY > 0 && targetFrameFloatRef.current < TOTAL_FRAMES - 1) {
        e.preventDefault();
        targetFrameFloatRef.current = Math.min(
          TOTAL_FRAMES - 1,
          targetFrameFloatRef.current + step
        );
      } else if (deltaY < 0 && targetFrameFloatRef.current > 0) {
        e.preventDefault();
        targetFrameFloatRef.current = Math.max(
          0,
          targetFrameFloatRef.current - step
        );
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isAtTop = window.scrollY <= 10;
      if (isAtTop) {
        if ((e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') && targetFrameFloatRef.current < TOTAL_FRAMES - 1) {
          e.preventDefault();
          targetFrameFloatRef.current = Math.min(TOTAL_FRAMES - 1, targetFrameFloatRef.current + 0.4);
        } else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && targetFrameFloatRef.current > 0) {
          e.preventDefault();
          targetFrameFloatRef.current = Math.max(0, targetFrameFloatRef.current - 0.4);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="hero-sequence" className="relative w-full h-screen overflow-hidden bg-[#071220] select-none">
      {/* 100% Fullscreen Canvas In-Place */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block cursor-ns-resize"
      />

      {/* Clean White "Loading experience..." Screen */}
      {!isReady && (
        <div
          className={`fixed inset-0 bg-white z-[999] flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 ease-out ${
            isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
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

          {/* Progress Bar */}
          <div className="w-52 sm:w-64 h-1.5 bg-neutral-100 rounded-full overflow-hidden shadow-inner mb-2.5">
            <div
              className="h-full bg-[#1B4D89] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Percentage */}
          <span className="text-[11px] font-mono text-neutral-400 font-medium">
            {progressPercent}%
          </span>
        </div>
      )}
    </div>
  );
}
