import React, { useEffect, useRef } from 'react';

/**
 * Living Architectural Ambient Background (Linear & Raycast Standard)
 * 
 * - Living Aurora: 3 slowly morphing, breathing ambient chromatic blooms (GPU composited)
 * - Interactive Blueprint Matrix: Crisp orthogonal grid of micro-points that gracefully
 *   respond and illuminate as the user's cursor moves nearby
 * - Atmospheric Light Motes: 30 delicate floating particles of ambient light drifting smoothly
 * - Micro-noise film grain to eliminate gradient banding and provide rich velvety texture
 * - Absolute typographic protection: Zero interference with headline readability
 */
export default function BackgroundAmbient() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth lerp
    const mouse = {
      x: width / 2,
      y: height / 3,
      targetX: width / 2,
      targetY: height / 3,
      active: false,
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    // ─── 1. Architectural Dot Matrix Grid Setup ────────────────────────
    const GRID_SPACING = window.innerWidth < 768 ? 36 : 30;
    let gridDots = [];

    const initGrid = () => {
      gridDots = [];
      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          gridDots.push({
            x: c * GRID_SPACING,
            y: r * GRID_SPACING,
            baseAlpha: (r % 2 === 0 && c % 2 === 0) ? 0.06 : 0.025,
            currentAlpha: 0.03,
            radius: (r % 4 === 0 && c % 4 === 0) ? 1.25 : 0.85,
          });
        }
      }
    };

    initGrid();

    // ─── 2. Atmospheric Living Light Motes (Subtle Dust Particles) ──────
    const MOTE_COUNT = window.innerWidth < 768 ? 16 : 32;
    const motes = Array.from({ length: MOTE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.8 + Math.random() * 1.6,
      speedY: 0.15 + Math.random() * 0.35,
      speedX: (Math.random() - 0.5) * 0.2,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.3,
    }));

    // Mouse event handlers
    const onPointerMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    // ─── 3. Render Animation Loop ──────────────────────────────────────
    let time = 0;
    const render = () => {
      time += 0.016;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Render Architectural Grid Dots with proximity illumination
      const PROXIMITY_RADIUS = 160;
      const PROXIMITY_SQ = PROXIMITY_RADIUS * PROXIMITY_RADIUS;

      for (let i = 0; i < gridDots.length; i++) {
        const dot = gridDots[i];
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        let targetAlpha = dot.baseAlpha;
        let isLit = false;

        if (mouse.active && distSq < PROXIMITY_SQ) {
          const proximityFactor = 1 - Math.sqrt(distSq) / PROXIMITY_RADIUS;
          targetAlpha = dot.baseAlpha + proximityFactor * 0.38;
          isLit = true;
        }

        dot.currentAlpha += (targetAlpha - dot.currentAlpha) * 0.12;

        if (dot.currentAlpha > 0.01) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, isLit ? dot.radius * 1.3 : dot.radius, 0, Math.PI * 2);
          ctx.fillStyle = isLit
            ? `rgba(56, 189, 248, ${dot.currentAlpha})`
            : `rgba(255, 255, 255, ${dot.currentAlpha})`;
          ctx.fill();
        }
      }

      // Render Ambient Living Light Motes
      for (let j = 0; j < motes.length; j++) {
        const m = motes[j];
        m.y -= m.speedY;
        m.x += Math.sin(time + m.phase) * 0.3 + m.speedX;

        // Wrap around boundaries
        if (m.y < -10) m.y = height + 10;
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        // Gentle breathing pulse
        const pulseAlpha = m.alpha * (0.7 + 0.3 * Math.sin(time * 1.5 + m.phase));

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(125, 211, 252, ${pulseAlpha})`;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0a0a]"
      aria-hidden="true"
    >
      {/* ─── 1. Living Aurora Chromatic Blooms (Slow Organic Breathing) ─── */}
      {/* Primary cyan/sky living aurora */}
      <div
        className="absolute top-[-8vw] left-[15%] w-[65vw] max-w-[850px] h-[55vh] rounded-full opacity-65 animate-aurora-drift"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.12) 0%, rgba(56, 189, 248, 0.05) 40%, rgba(10, 10, 10, 0) 75%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
      />

      {/* Secondary deep indigo/purple living aurora (breathing counter-drift) */}
      <div
        className="absolute top-[30vh] right-[10%] w-[50vw] max-w-[700px] h-[50vh] rounded-full opacity-50 animate-aurora-pulse"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.09) 0%, rgba(79, 70, 229, 0.03) 45%, rgba(10, 10, 10, 0) 75%)',
          filter: 'blur(140px)',
          willChange: 'transform',
        }}
      />

      {/* Tertiary subtle emerald accent for tech life */}
      <div
        className="absolute top-[75vh] left-[25%] w-[45vw] max-w-[600px] h-[40vh] rounded-full opacity-35 animate-aurora-drift"
        style={{
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, rgba(6, 182, 212, 0.02) 45%, rgba(10, 10, 10, 0) 75%)',
          filter: 'blur(130px)',
          willChange: 'transform',
          animationDirection: 'reverse',
          animationDuration: '28s',
        }}
      />

      {/* ─── 2. Interactive Canvas: Blueprint Matrix + Atmospheric Motes ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ─── 3. Architectural Layout Framing Guides (max-w-6xl) ─────────── */}
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 relative flex justify-between pointer-events-none">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.035] to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-white/[0.035] to-transparent" />
      </div>

      {/* ─── 4. Micro-Texture Film Grain (Eliminates banding) ──────────── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.024] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="ambient-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambient-grain)" />
      </svg>
    </div>
  );
}
