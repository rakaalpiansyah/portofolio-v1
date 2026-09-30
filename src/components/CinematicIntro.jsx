import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CinematicIntro
 * 
 * 2-Second Cinematic Screen Entrance Animation (Awwwards / Studio Freight Standard)
 * 
 * Features:
 * - 000 -> 100% High-fashion tabular counter in Instrument Serif italic over ~1.6s
 * - Rotating creative disciplines: "BACKEND ARCHITECTURE" -> "APPLIED AI" -> "EXCELLENCE"
 * - 1px hairline progress track with luminous glow
 * - Dual shutter / curtain wipe reveal at 2.0s with power4.inOut easing
 * - Skip on click or press
 */
export default function CinematicIntro({ onComplete }) {
  const containerRef = useRef(null);
  const curtainRef = useRef(null);
  const counterRef = useRef(null);
  const progressLineRef = useRef(null);
  const wordRef = useRef(null);

  const [counter, setCounter] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const words = [
    'BACKEND ARCHITECTURE',
    'APPLIED ARTIFICIAL INTELLIGENCE',
    'SOFTWARE ENGINEERING',
  ];

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const startTime = performance.now();
    const duration = 1600; // Counter takes 1.6s
    let animFrame;
    let hasCompleted = false;

    const triggerCurtainReveal = () => {
      if (hasCompleted) return;
      hasCompleted = true;

      const tl = gsap.timeline({
        onComplete: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        },
      });

      // Scale down inner elements, then wipe curtain upwards
      tl.to([counterRef.current, wordRef.current, progressLineRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.35,
        ease: 'power2.in',
      })
        .to(
          curtainRef.current,
          {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 0.75,
            ease: 'power4.inOut',
          },
          '-=0.1'
        );
    };

    // requestAnimationFrame counter 000 -> 100
    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(eased * 100);
      setCounter(currentVal);

      // Cycle words based on progress
      if (progress < 0.35) {
        setActiveWordIndex(0);
      } else if (progress < 0.72) {
        setActiveWordIndex(1);
      } else {
        setActiveWordIndex(2);
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(updateCounter);
      } else {
        setCounter(100);
        triggerCurtainReveal();
      }
    };

    animFrame = requestAnimationFrame(updateCounter);

    // Safety fallback timer so it never gets stuck
    const fallbackTimer = setTimeout(() => {
      triggerCurtainReveal();
    }, 2500);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Instant skip on click
  const handleSkip = () => {
    gsap.to(curtainRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.out',
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });
  };

  return (
    <div
      ref={curtainRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between p-6 sm:p-10 select-none cursor-pointer overflow-hidden"
      title="Click anywhere to skip entrance"
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 uppercase tracking-[0.25em]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300">RAKA ALPIANSYAH</span>
          <span className="hidden sm:inline text-zinc-600">// COLLECTION &apos;26</span>
        </div>
        <div className="text-[11px] text-zinc-400">
          BANDUNG, ID <span className="text-zinc-600">&bull;</span> INITIALIZING
        </div>
      </div>

      {/* Center Monumental Counter & Rotating Discipline */}
      <div className="flex flex-col items-center justify-center my-auto">
        {/* Rotating Creative Word */}
        <div
          ref={wordRef}
          className="text-xs sm:text-sm font-mono text-zinc-400 tracking-[0.3em] uppercase mb-4 text-center px-4"
        >
          {words[activeWordIndex]}
        </div>

        {/* Tabular 000-100 Counter in Instrument Serif italic */}
        <div
          ref={counterRef}
          className="font-display italic text-8xl sm:text-9xl md:text-[11rem] leading-none text-white tracking-tight tabular-nums select-none flex items-baseline"
        >
          <span>{String(counter).padStart(3, '0')}</span>
          <span className="font-sans text-3xl sm:text-4xl text-sky-400 font-light ml-2">
            %
          </span>
        </div>

        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mt-4">
          CLICK ANYWHERE TO SKIP
        </span>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full">
        <div className="w-full h-px bg-zinc-900 overflow-hidden relative">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-sky-400 via-white to-sky-300 transition-all duration-75 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>
    </div>
  );
}
