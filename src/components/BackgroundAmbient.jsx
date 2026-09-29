import React, { useEffect, useRef } from 'react';

/**
 * Editorial Ambient Background (Linear / Vercel standard)
 * 
 * - Zero WebGL overhead, pristine 60-120fps performance
 * - Velvety dark canvas (#0a0a0a) with subtle ambient light gradients
 * - Smooth pointer-following ambient spotlight with physics easing
 * - Micro-fine monochromatic film grain texture to eliminate banding
 * - Editorial architectural guide lines aligned to max-w-6xl
 */
export default function BackgroundAmbient() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    // Only track spotlight on desktop devices with hover support
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 3;
    let currentX = targetX;
    let currentY = targetY;
    let animationFrameId;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateSpotlight = () => {
      // Smooth lerp (linear interpolation) for organic inertia
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateSpotlight);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* 1. Smooth Interactive Pointer Spotlight (Desktop Only) */}
      <div
        ref={spotlightRef}
        className="hidden md:block absolute -top-[350px] -left-[350px] w-[700px] h-[700px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle at center, rgba(56, 189, 248, 0.045) 0%, rgba(99, 102, 241, 0.018) 40%, rgba(10, 10, 10, 0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* 2. Static Architectural Ambient Light Blooms */}
      {/* Top primary glow (Hero atmosphere) */}
      <div
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] max-w-[90vw] h-[500px] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at top, rgba(56, 189, 248, 0.06) 0%, rgba(99, 102, 241, 0.025) 45%, rgba(10, 10, 10, 0) 75%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Mid-page subtle cool depth bloom */}
      <div
        className="absolute top-[42%] right-[5%] w-[600px] h-[600px] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(14, 165, 233, 0.025) 0%, rgba(99, 102, 241, 0.01) 50%, rgba(10, 10, 10, 0) 75%)',
          filter: 'blur(140px)',
        }}
      />

      {/* 3. Subtle Editorial Architectural Vertical Framing Guides */}
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 relative flex justify-between pointer-events-none">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.025] to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.025] to-transparent" />
      </div>

      {/* 4. Fine Monochromatic Texture (SVG Micro-Noise) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.022] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="ambient-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambient-noise)" />
      </svg>
    </div>
  );
}
