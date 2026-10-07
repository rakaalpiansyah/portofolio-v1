import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

/**
 * CustomCursor: Smooth follower circle with magnetic scale and "View" gallery mode.
 * Automatically disabled on touch screens / coarse pointers.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isGalleryView, setIsGalleryView] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices with fine pointers
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add('has-cursor');

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Fast quickTo setters for 60fps buttery tracking without React state lag
    const setCursorX = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const setCursorY = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });

    const handleMouseMove = (e) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
      setDotX(e.clientX);
      setDotY(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const galleryItem = target.closest('[data-cursor="view"]') || target.closest('.g-tile');
      const interactive = target.closest('a, button, [role="button"], input, textarea, .btn');

      if (galleryItem) {
        setIsGalleryView(true);
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (interactive) {
        setIsGalleryView(false);
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsGalleryView(false);
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {/* Central Tiny Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-signal -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Outer Follower Ring / View Disk */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
          isGalleryView
            ? 'w-20 h-20 bg-signal text-ink shadow-[0_0_30px_rgba(198,255,61,0.5)] scale-100'
            : isHovered
            ? 'w-14 h-14 border border-signal bg-signal/15 backdrop-blur-[2px] scale-100'
            : 'w-8 h-8 border border-bone/35 scale-100'
        }`}
      >
        {isGalleryView && (
          <span
            ref={labelRef}
            className="font-display font-semibold text-xs tracking-wider text-ink select-none uppercase"
          >
            {cursorText || 'VIEW'}
          </span>
        )}
      </div>
    </div>
  );
}
