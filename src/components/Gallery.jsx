import React, { useState, useEffect, useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger, CustomEase } from '../lib/gsap';
import { revealChars } from '../lib/reveal';
import { galleryItems, galleryCategories } from '../data/gallery';
import { useLanguage } from '../context/LanguageContext';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

/**
 * Gallery (New Section directly below Career Track & Education):
 * - Asymmetric masonry / bento grid with varied aspect ratios.
 * - ScrollTrigger.batch() entrance with clip-path reveal (inset(100% 0 0 0) -> inset(0)) + scale 1.3 -> 1.
 * - Multi-speed parallax per column/tile on scroll.
 * - Grayscale to full color on hover + custom cursor shows 'VIEW'.
 * - Fullscreen Lightbox with Flip-style smooth transition, Next/Prev, ESC, swipe, & Lenis scroll lock.
 * - Animated category filtering (All / Projects / Events / Photography).
 */
export default function Gallery() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = closed, number = open
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const lightboxRef = useRef(null);
  const touchStartX = useRef(0);

  const filteredItems = galleryItems.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  // 1. Heading Reveal & Batch Entrance with Clip-Path
  useGSAP(() => {
    revealChars(headingRef.current, {
      trigger: headingRef.current,
      start: 'top 85%',
    });

    const tiles = gridRef.current?.querySelectorAll('.g-tile');
    if (!tiles || tiles.length === 0) return;

    // Reset clipPath for entrance batch
    gsap.set(tiles, {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0,
    });

    // Staggered clip-path reveal on scroll enter
    ScrollTrigger.batch(tiles, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'expoSoft',
          overwrite: true,
        });

        // Scale down inner images from 1.3 to 1.0
        batch.forEach((tile) => {
          const img = tile.querySelector('.g-img');
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.3 },
              { scale: 1.0, duration: 1.4, ease: 'expoSoft', overwrite: true }
            );
          }
        });
      },
    });

    // Parallax on images on scroll
    tiles.forEach((tile, idx) => {
      const img = tile.querySelector('.g-img');
      if (img) {
        const speed = (idx % 3) * 6 + 6; // varied speed (6%, 12%, 18%)
        gsap.fromTo(
          img,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: tile,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    });
  }, { scope: containerRef, dependencies: [activeCategory] });

  // 2. Lightbox Keyboard & Body Scroll Lock (Pause Lenis)
  useEffect(() => {
    if (lightboxIndex !== null) {
      // Pause Lenis smooth scroll & lock body
      if (window.__lenis) window.__lenis.stop();
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      if (window.__lenis) window.__lenis.start();
      document.body.style.overflow = '';
    }
  }, [lightboxIndex, filteredItems.length]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setTimeout(() => {
      if (lightboxRef.current) {
        gsap.fromTo(
          lightboxRef.current.querySelector('.lightbox-content'),
          { scale: 0.88, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'expoSoft' }
        );
      }
    }, 10);
  };

  const closeLightbox = () => {
    if (lightboxRef.current) {
      gsap.to(lightboxRef.current.querySelector('.lightbox-content'), {
        scale: 0.92,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => setLightboxIndex(null),
      });
    } else {
      setLightboxIndex(null);
    }
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-28 sm:py-36 wrap border-t border-line overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
        <div>
          <span className="text-xs font-mono text-bone-3 tracking-widest uppercase block mb-3">
            04 / Moments &amp; Works
          </span>
          <h2 ref={headingRef} className="h-section text-bone uppercase">
            Gallery.
          </h2>
          <p className="text-bone-2 text-sm sm:text-base max-w-lg mt-4">
            Dokumentasi rekayasa perangkat lunak, kompetisi, sertifikasi, dan potret editorial dalam tata letak asimetris.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-signal text-ink font-bold shadow-[0_0_16px_rgba(198,255,61,0.3)]'
                    : 'border border-line text-bone-2 hover:text-bone hover:border-bone/40'
                }`}
              >
                {cat.label[lang] || cat.label.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Asymmetric Masonry / Bento Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 auto-rows-[280px] sm:auto-rows-[340px]"
      >
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            data-cursor="view"
            onClick={() => openLightbox(idx)}
            className={`g-tile group relative overflow-hidden bg-ink-900 border border-line cursor-pointer select-none ${item.span}`}
          >
            {/* Inner Zoom Container */}
            <div className="g-zoom relative w-full h-full overflow-hidden">
              <img
                src={item.src}
                alt={item.alt || item.title}
                loading="lazy"
                className="g-img w-full h-full object-cover"
              />
            </div>

            {/* Dark Scrim & Hover Details Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-signal uppercase">{item.category}</span>
                <span className="text-bone-3">{item.year}</span>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg sm:text-xl text-bone group-hover:text-signal transition-colors leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-bone-2 font-mono line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>

            {/* Expand Indicator icon (top-right) */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ink/70 border border-line flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-3.5 h-3.5 text-signal" />
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && activeItem && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[110] bg-ink/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10 select-none"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX.current - touchEndX > 50) nextLightbox();
            if (touchEndX - touchStartX.current > 50) prevLightbox();
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-ink-800 border border-line text-bone hover:text-signal hover:border-signal flex items-center justify-center transition-colors focus-visible:outline-none"
            aria-label="Close Lightbox (ESC)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Navigation */}
          <button
            type="button"
            onClick={prevLightbox}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-ink-800/80 border border-line text-bone hover:text-signal hover:border-signal flex items-center justify-center transition-colors focus-visible:outline-none"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Navigation */}
          <button
            type="button"
            onClick={nextLightbox}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-ink-800/80 border border-line text-bone hover:text-signal hover:border-signal flex items-center justify-center transition-colors focus-visible:outline-none"
            aria-label="Next item"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Lightbox Card Content */}
          <div className="lightbox-content relative max-w-5xl w-full max-h-[85vh] flex flex-col lg:flex-row items-center bg-ink-900 border border-line overflow-hidden shadow-2xl">
            {/* Image Stage */}
            <div className="w-full lg:w-2/3 h-64 sm:h-96 lg:h-[580px] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Sidebar Meta & Captions */}
            <div className="w-full lg:w-1/3 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-line bg-ink-900">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4 pb-3 border-b border-line">
                  <span className="text-signal uppercase">{activeItem.category}</span>
                  <span className="text-bone-3">{activeItem.year}</span>
                </div>

                <h3 className="font-display font-semibold text-2xl text-bone mb-3 leading-snug">
                  {activeItem.title}
                </h3>

                <p className="text-sm text-bone-2 leading-relaxed mb-6">
                  {activeItem.caption}
                </p>
              </div>

              <div className="pt-6 border-t border-line flex items-center justify-between text-xs font-mono text-bone-3">
                <span>
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <span className="text-[11px] hidden sm:inline">
                  ESC to close · ← → navigate
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
