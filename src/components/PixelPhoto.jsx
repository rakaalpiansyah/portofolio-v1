import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * PixelPhoto - GSAP Powered On-Scroll Pixelated Image Reveal (Viewport-Lazy)
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
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let hasStartedLoad = false;
    let ctxAnim = null;

    const ctx = canvas.getContext('2d');
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');

    const renderPixelated = (factor) => {
      if (!imgLoadedRef.current || !canvas || !ctx || !imgRef.current) return;
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
      offCtx.imageSmoothingEnabled = true;
      offCtx.clearRect(0, 0, sw, sh);
      offCtx.drawImage(imgRef.current, 0, 0, sw, sh);

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(offCanvas, 0, 0, sw, sh, 0, 0, w, h);
    };

    const startImageLoad = () => {
      if (hasStartedLoad) return;
      hasStartedLoad = true;

      const img = new Image();
      img.src = src;
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        imgRef.current = img;
        imgLoadedRef.current = true;

        const size = Math.min(540, containerRef.current?.clientWidth || 480);
        canvas.width = size;
        canvas.height = size;

        renderPixelated(0.04);

        ctxAnim = gsap.context(() => {
          const pixelParams = { factor: 0.04 };

          gsap.to(pixelParams, {
            factor: 1.0,
            duration: 1.3,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
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

          const tiles = containerRef.current?.querySelectorAll('.pixel-cell');
          if (tiles && tiles.length > 0) {
            gsap.fromTo(
              tiles,
              { opacity: 1, scale: 1 },
              {
                opacity: 0,
                scale: 0.3,
                duration: 0.75,
                stagger: {
                  grid: [8, 8],
                  from: 'random',
                  amount: 0.85,
                },
                ease: 'power3.inOut',
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: 'top 85%',
                  once: true,
                },
              }
            );
          }

          if (scanlineRef.current) {
            gsap.fromTo(
              scanlineRef.current,
              { top: '-6%', opacity: 0 },
              {
                top: '106%',
                opacity: 1,
                duration: 1.25,
                ease: 'power2.inOut',
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: 'top 85%',
                  once: true,
                },
                onComplete: () => {
                  if (scanlineRef.current) scanlineRef.current.style.opacity = '0';
                },
              }
            );
          }
        }, containerRef);
      };
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startImageLoad();
          observer.disconnect();
        }
      },
      { rootMargin: '350px' }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!canvas || !imgLoadedRef.current) return;
      const size = Math.min(540, containerRef.current?.clientWidth || 480);
      canvas.width = size;
      canvas.height = size;
      renderPixelated(1.0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (ctxAnim) ctxAnim.revert();
    };
  }, [src]);

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
    gsap
      .timeline()
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
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className="w-full h-full block object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />

      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none z-10 rounded-2xl overflow-hidden">
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="pixel-cell bg-zinc-950/90 border border-white/[0.03]"
          />
        ))}
      </div>

      <div
        ref={scanlineRef}
        className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_14px_rgba(255,255,255,0.9)] z-20"
      />

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

      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0) 50%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 pointer-events-none z-30">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-sky-400 font-medium mb-1 drop-shadow-sm">
          {roleBadge}
        </p>
        <p className="font-heading font-extrabold text-white text-base sm:text-lg leading-tight tracking-tight drop-shadow-md">
          {name}
        </p>
      </div>

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-30" />
    </div>
  );
}
