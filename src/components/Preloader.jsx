import React, { useEffect, useRef, useState } from 'react';
import { gsap, CustomEase } from '../lib/gsap';

/**
 * Preloader: Cinematic curtain reveal with 0-100% percentage counter.
 * Fires curtain slide and unlocks Lenis smooth scroll on completion.
 */
export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const curtainTopRef = useRef(null);
  const curtainBottomRef = useRef(null);
  const contentRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (onComplete) onComplete();
      return;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      },
    });

    // 1. Counter tween (0 -> 100)
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        setPercent(Math.floor(counter.val));
      },
    });

    // 2. Hairline progress width
    tl.to(
      progressLineRef.current,
      {
        scaleX: 1,
        duration: 1.8,
        ease: 'power2.inOut',
      },
      0
    );

    // 3. Fade out content
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'expoSoft',
      },
      '+=0.1'
    );

    // 4. Split Curtain Reveal (Top slides up, Bottom slides down)
    tl.to(
      curtainTopRef.current,
      {
        yPercent: -100,
        duration: 1.1,
        ease: CustomEase.get('silk'),
      },
      '-=0.2'
    );

    tl.to(
      curtainBottomRef.current,
      {
        yPercent: 100,
        duration: 1.1,
        ease: CustomEase.get('silk'),
      },
      '<'
    );

    // 5. Hide entire wrapper
    tl.set(containerRef.current, {
      display: 'none',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-transparent pointer-events-auto"
    >
      {/* Top Curtain Half */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-ink border-b border-line"
      />

      {/* Bottom Curtain Half */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-ink border-t border-line"
      />

      {/* Center Counter Content */}
      <div
        ref={contentRef}
        className="relative z-10 my-auto flex flex-col items-center justify-center w-full px-6 select-none"
      >
        <div className="flex items-baseline gap-4 mb-3">
          <span className="font-display text-7xl sm:text-9xl font-semibold tracking-tighter text-bone tabular-nums">
            {percent}
          </span>
          <span className="font-display text-2xl sm:text-4xl text-signal font-normal">
            %
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-bone-3 font-mono">
          <span>Raka Alpiansyah</span>
          <span className="w-1.5 h-1.5 rounded-full bg-signal inline-block animate-pulse" />
          <span>Portfolio 2026</span>
        </div>

        {/* Hairline Progress Indicator */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 mt-8 overflow-hidden rounded-full">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-signal origin-left scale-x-0"
          />
        </div>
      </div>
    </div>
  );
}
