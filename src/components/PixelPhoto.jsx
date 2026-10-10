import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PixelPhoto - GSAP Powered On-Scroll Pixelated Image Reveal
 * Recreates the iconic Codrops / GSAP Pixel Image Loading Effect.
 * 
 * Features:
 * 1. HTML5 Canvas Dynamic De-Pixelation: Smoothly interpolates resolution from chunky
 *    8-bit pixel blocks (factor: 0.03) to crystal clear full definition (factor: 1.0).
 * 2. 64-Tile Randomized Pixel Grid Dissolve: Matrix square cells scatter with GSAP randomized stagger.
 * 3. Laser Scanline Sweep: A luminous technological hairline traverses the canvas as pixels resolve.
 * 4. Micro-interactive hover: Re-triggers subtle cybernetic pixel shimmer on mouse enter.
 */
export default function PixelPhoto({
  src = '/foto1.webp',
  alt = 'Raka Alpiansyah - Software Engineer',
  roleBadge = 'SOFTWARE & AI ENGINEER',
  name = 'Raka Alpiansyah',
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scanlineRef = useRef(null);
  const imgRef = useRef(null);
  const imgLoadedRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');

    // Create and load image
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'anonymous';

    // Pixel rendering engine
    const renderPixelated = (factor) => {
      if (!imgLoadedRef.current || !canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      if (factor >= 0.98) {
        ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        return;
      }

      // Downsample to chunky mosaic dimensions
      const sw = Math.max(4, Math.floor(w * factor));
      const sh = Math.max(4, Math.floor(h * factor));

      offCanvas.width = sw;
      offCanvas.height = sh;
      offCtx.imageSmoothingEnabled = true;
      offCtx.clearRect(0, 0, sw, sh);
      offCtx.drawImage(img, 0, 0, sw, sh);

      // Upscale without smoothing -> Crisp Square Pixels
      ctx.imageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(offCanvas, 0, 0, sw, sh, 0, 0, w, h);
    };

    img.onload = () => {
      imgRef.current = img;
      imgLoadedRef.current = true;

      // Match canvas coordinate resolution
      const size = Math.min(540, containerRef.current?.clientWidth || 480);
      canvas.width = size;
      canvas.height = size;

      // Start initial frame as chunky 8-bit pixels
      renderPixelated(0.04);

      // GSAP ScrollTrigger Sequence
      const ctxAnim = gsap.context(() => {
        const pixelParams = { factor: 0.04 };

        // 1. Resolution Interpolation
        gsap.to(pixelParams, {
          factor: 1.0,
          duration: 1.4,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            once: true,
          },
          onUpdate: () => {
            renderPixelated(pixelParams.factor);
          },
          onComplete: () => {
            renderPixelated(1.0);
            setIsRevealed(true);
          },
        });

        // 2. Randomized Staggered Pixel Tiles Dissolve
        const tiles = containerRef.current?.querySelectorAll('.pixel-cell');
        if (tiles && tiles.length > 0) {
          gsap.fromTo(
            tiles,
            { opacity: 1, scale: 1 },
            {
              opacity: 0,
              scale: 0.3,
              duration: 0.8,
              stagger: {
                grid: [8, 8],
                from: 'random',
                amount: 0.9,
              },
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 82%',
                once: true,
              },
            }
          );
        }

        // 3. Laser Scanline Sweep
        if (scanlineRef.current) {
          gsap.fromTo(
            scanlineRef.current,
            { top: '-6%', opacity: 0 },
            {
              top: '106%',
              opacity: 1,
              duration: 1.35,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 82%',
                once: true,
              },
              onComplete: () => {
                if (scanlineRef.current) scanlineRef.current.style.opacity = '0';
              },
            }
          );
        }
      }, containerRef);

      return () => ctxAnim.revert();
    };

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!canvas || !imgLoadedRef.current) return;
      const size = Math.min(540, containerRef.current?.clientWidth || 480);
      canvas.width = size;
      canvas.height = size;
      renderPixelated(isRevealed ? 1.0 : 0.04);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Micro-interactive hover pixel shimmer
  const handleMouseEnter = () => {
    if (!isRevealed || !canvasRef.current || !imgLoadedRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');

    const renderStep = (factor) => {
      const w = canvas.width;
      const h = canvas.height;
      if (factor >= 0.98) {
        ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(imgRef.current, 0, 0, w, h);
        return;
      }
      const sw = Math.max(4, Math.floor(w * factor));
      const sh = Math.max(4, Math.floor(h * factor));
      offCanvas.width = sw;
      offCanvas.height = sh;
      offCtx.clearRect(0, 0, sw, sh);
      offCtx.drawImage(imgRef.current, 0, 0, sw, sh);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(offCanvas, 0, 0, sw, sh, 0, 0, w, h);
    };

    const shimmer = { factor: 1.0 };
    gsap.timeline()
      .to(shimmer, {
        factor: 0.12,
        duration: 0.2,
        ease: 'power1.out',
        onUpdate: () => renderStep(shimmer.factor),
      })
      .to(shimmer, {
        factor: 1.0,
        duration: 0.45,
        ease: 'power2.inOut',
        onUpdate: () => renderStep(shimmer.factor),
      });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className="relative select-none w-full overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group cursor-pointer"
      style={{ aspectRatio: '1 / 1' }}
    >
      {/* HTML5 Canvas executing real-time GSAP pixelation */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />

      {/* 64-Tile Randomized Matrix Pixel Grid Overlay */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none z-10 rounded-2xl overflow-hidden">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="pixel-cell bg-zinc-950/90 border border-white/[0.03]"
          />
        ))}
      </div>

      {/* Cybernetic Laser Scanline */}
      <div
        ref={scanlineRef}
        className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_14px_rgba(255,255,255,0.9)] z-20"
      />

      {/* Subtle Blueprint Micro-Grid Watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Bottom Gradient Fade for Nameplate */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0) 50%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      {/* Nameplate & Role Badge */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 pointer-events-none z-30">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-sky-400 font-medium mb-1 drop-shadow-sm">
          {roleBadge}
        </p>
        <p className="font-heading font-extrabold text-white text-base sm:text-lg leading-tight tracking-tight drop-shadow-md">
          {name}
        </p>
      </div>

      {/* Top Specular Hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-30" />
    </div>
  );
}
