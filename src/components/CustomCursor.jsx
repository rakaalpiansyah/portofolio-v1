import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState([]);

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

      const target = e.target;
      if (target) {
        const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, .interactive');
        setIsHovered(!!interactiveEl);
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = (e) => {
      setIsClicking(true);
      const newRipple = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 500);
    };

    const onMouseUp = () => {
      setIsClicking(false);
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
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
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
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
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
        className={`custom-cursor w-2 h-2 rounded-full bg-sky-400 pointer-events-none transition-transform duration-100 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isClicking ? 'scale-75 bg-white' : 'scale-100'}`}
        aria-hidden="true"
      />
      {/* Outer ring: Normal size, transparent background, and zero blur on hover */}
      <div
        ref={ringRef}
        className={`custom-cursor pointer-events-none rounded-full transition-all duration-150 ease-out border ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isClicking
            ? 'w-6 h-6 border-sky-300/80 bg-transparent scale-90'
            : isHovered
              ? 'w-8 h-8 border-sky-400/80 bg-transparent'
              : 'w-8 h-8 border-sky-400/40 bg-transparent'
        }`}
        aria-hidden="true"
      />
      {/* Click ripple pulses */}
      {ripples.map((rip) => (
        <span
          key={rip.id}
          className="fixed pointer-events-none z-[9998] rounded-full border border-sky-400/60 animate-ping"
          style={{
            left: rip.x - 12,
            top: rip.y - 12,
            width: 24,
            height: 24,
            animationDuration: '450ms',
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
