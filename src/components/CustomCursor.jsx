import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only active on devices with precise pointer (mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const checkHover = (e) => {
      const target = e.target;
      if (!target) return;
      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, .interactive');
      setIsHovered(!!interactiveEl);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', checkHover, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lag loop for outer ring
    const renderLoop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', checkHover);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* Precision inner cyan dot */}
      <div
        ref={dotRef}
        className={`custom-cursor w-2 h-2 bg-cyan-400 pointer-events-none transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovered ? 'scale-0' : 'scale-100'}`}
        aria-hidden="true"
      />
      {/* Lagging outer glowing ring */}
      <div
        ref={ringRef}
        className={`custom-cursor pointer-events-none transition-all duration-200 ease-out border ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? 'w-12 h-12 border-cyan-400 bg-cyan-400/20 backdrop-blur-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)]'
            : 'w-8 h-8 border-cyan-400/50 bg-transparent'
        }`}
        aria-hidden="true"
      />
    </>
  );
}
