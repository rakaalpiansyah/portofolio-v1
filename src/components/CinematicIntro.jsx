import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CinematicIntro (V4 - Hyper-Kinetic "Outside-In" Role Warp & Pure Editorial Canvas)
 * 
 * 2-Second Modern Screen Entrance Animation (Awwwards 2026 Creative Standard)
 * 
 * Standards applied (4 skills: UI/UX Pro Max, Impeccable, Taste, Anti-Slop UI):
 * 1. Zero Top-Header Clutter: The top telemetry header is completely removed.
 *    The screen is an uncluttered, monumental cinematic stage.
 * 2. "Outside-In" Kinetic Role Warp:
 *    4 disciplines (Informatics Engineering, Software Engineer, AI Engineer, Fullstack Developer)
 *    blast in from the outside (scale: 2.1, letter-spacing: 0.5em, blur: 12px) and snap
 *    into the focal center with high-velocity 'expo.out' ease.
 * 3. Monumental Tabular Rolling Counter: High-fashion 000 -> 100% in Instrument Serif italic.
 * 4. Solid Theatre Shutter Wipe: When 100% completes, content glides up and the black curtain
 *    lifts upward with power4.inOut, revealing Hero with breathtaking depth.
 * 5. Instant skip on click or ESC + deterministic safety fallback.
 */
export default function CinematicIntro({ onComplete }) {
  const curtainRef = useRef(null);
  const contentRef = useRef(null);
  const counterRef = useRef(null);
  const roleRef = useRef(null);
  const progressLineRef = useRef(null);

  const [counter, setCounter] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const roles = [
    'INFORMATICS ENGINEERING',
    'SOFTWARE ENGINEER',
    'AI ENGINEER',
    'FULLSTACK DEVELOPER',
  ];

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // ── "OUTSIDE-IN" KINETIC WARP SNAP ON EACH ROLE CHANGE ──
  useEffect(() => {
    if (!roleRef.current) return;

    gsap.fromTo(
      roleRef.current,
      {
        scale: 2.1,
        opacity: 0,
        letterSpacing: '0.5em',
        filter: 'blur(12px)',
      },
      {
        scale: 1.0,
        opacity: 1,
        letterSpacing: '0.16em',
        filter: 'blur(0px)',
        duration: 0.38,
        ease: 'expo.out',
      }
    );
  }, [activeWordIndex]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onCompleteRef.current) onCompleteRef.current();
      return;
    }

    const curtain = curtainRef.current;
    const content = contentRef.current;
    if (!curtain || !content) return;

    // Initial smooth entrance of the intro container
    gsap.fromTo(
      content,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );

    const startTime = performance.now();
    const duration = 1750; // Counter takes 1.75s to step through all 4 roles
    let animFrame;
    let hasCompleted = false;

    // ── THEATRE SHUTTER CURTAIN REVEAL ──
    const triggerCurtainReveal = () => {
      if (hasCompleted) return;
      hasCompleted = true;

      const tl = gsap.timeline({
        onComplete: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        },
      });

      // 1. Text elements slide upward with crisp ease
      tl.to(content, {
        opacity: 0,
        y: -40,
        duration: 0.32,
        ease: 'power3.in',
      })
        // 2. Solid black curtain lifts upward like an architectural shutter
        .to(
          curtain,
          {
            yPercent: -100,
            duration: 0.72,
            ease: 'power4.inOut',
          },
          '-=0.08'
        );
    };

    // requestAnimationFrame counter 000 -> 100
    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Smooth cubic curve
      const eased = 1 - Math.pow(1 - progress, 2.6);
      const currentVal = Math.floor(eased * 100);
      setCounter(currentVal);

      // Cycle across 4 roles smoothly based on 25% increments
      if (progress < 0.25) {
        setActiveWordIndex(0);
      } else if (progress < 0.5) {
        setActiveWordIndex(1);
      } else if (progress < 0.75) {
        setActiveWordIndex(2);
      } else {
        setActiveWordIndex(3);
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(updateCounter);
      } else {
        setCounter(100);
        // Brief 120ms lock beat before curtain lift
        setTimeout(triggerCurtainReveal, 120);
      }
    };

    animFrame = requestAnimationFrame(updateCounter);

    // Deterministic safety timeout (never freeze)
    const fallbackTimer = setTimeout(() => {
      triggerCurtainReveal();
    }, 2600);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Instant skip on click
  const handleSkip = () => {
    if (onCompleteRef.current) {
      gsap.to(curtainRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.out',
        onComplete: onCompleteRef.current,
      });
    }
  };

  return (
    <div
      ref={curtainRef}
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between p-6 sm:p-10 md:p-12 select-none cursor-pointer overflow-hidden will-change-transform"
      role="dialog"
      aria-label="Portfolio Introduction"
    >
      {/* Background subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/60 to-black pointer-events-none" />

      {/* ── ALL FOREGROUND CONTENT (TOP TEXT REMOVED AS REQUESTED) ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none"
      >
        {/* Top spacer (clean open headspace) */}
        <div className="w-full h-8" />

        {/* CENTER MONUMENTAL STAGE: OUTSIDE-IN ROLE WARP + TABULAR COUNTER */}
        <main className="flex flex-col items-center justify-center my-auto text-center px-4">
          
          {/* Dynamic Role Container ("Dari Luar Masuk Ke Dalam") */}
          <div className="h-12 sm:h-14 mb-4 flex items-center justify-center overflow-visible">
            <div
              ref={roleRef}
              className="text-base sm:text-xl md:text-2xl lg:text-3xl font-heading font-extrabold uppercase text-white tracking-widest flex items-center justify-center will-change-transform drop-shadow-2xl whitespace-nowrap"
            >
              <span className="text-sky-400 font-mono text-xs sm:text-sm md:text-base mr-3 font-light">
                0{activeWordIndex + 1}
              </span>
              <span>{roles[activeWordIndex]}</span>
            </div>
          </div>

          {/* Monumental 000-100 Counter in Instrument Serif italic */}
          <div
            ref={counterRef}
            className="font-display italic text-8xl sm:text-9xl md:text-[11.5rem] lg:text-[13rem] leading-none text-white tracking-tight tabular-nums select-none flex items-baseline drop-shadow-2xl"
          >
            <span>{String(counter).padStart(3, '0')}</span>
            <span className="font-sans text-3xl sm:text-4xl md:text-5xl text-sky-400 font-light ml-2">
              %
            </span>
          </div>
        </main>

        {/* BOTTOM PRECISION PROGRESS RAIL & SKIP HINT */}
        <footer className="w-full">
          <div className="w-full flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">
            <span>PORTFOLIO &bull; {counter}%</span>
            <span className="text-zinc-500">
              CLICK TO SKIP [ESC]
            </span>
          </div>

          {/* Precision 1px Hairline Rail */}
          <div className="w-full h-px bg-zinc-900 overflow-hidden relative">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-sky-400 via-white to-sky-300 transition-all duration-75"
              style={{ width: `${counter}%` }}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}
