import React, { useEffect, useRef } from 'react';

export default function CustomCursor({ activeTheme = 'light' }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const badgeRef = useRef(null);
  const themeRef = useRef(activeTheme);
  themeRef.current = activeTheme;

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let mouseX = -120;
    let mouseY = -120;
    let ringX = -120;
    let ringY = -120;
    let visible = false;
    let hovered = false;
    let labelText = '';
    let animId = null;

    const syncAppearance = () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      const badge = badgeRef.current;
      if (!dot || !ring || !badge) return;

      const theme = themeRef.current;
      const accentColor =
        theme === 'accent' ? '#FFFFFF' : theme === 'dark' ? '#FF5B4D' : '#C92A1D';
      const ringBorder =
        theme === 'accent'
          ? 'rgba(255, 255, 255, 0.85)'
          : theme === 'dark'
          ? 'rgba(248, 249, 252, 0.55)'
          : 'rgba(11, 14, 26, 0.45)';

      dot.style.opacity = visible ? '1' : '0';
      dot.style.backgroundColor = accentColor;

      const size = hovered ? '38px' : '26px';
      ring.style.opacity = visible ? '1' : '0';
      ring.style.width = size;
      ring.style.height = size;
      ring.style.borderColor = hovered ? accentColor : ringBorder;

      if (visible && labelText) {
        badge.textContent = labelText;
        badge.style.opacity = '1';
        badge.style.backgroundColor = accentColor;
        badge.style.color = theme === 'accent' ? '#C92A1D' : theme === 'dark' ? '#080A12' : '#FFFFFF';
      } else {
        badge.style.opacity = '0';
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${ringX + 18}px, ${ringY + 18}px, 0)`;
      }

      if (Math.hypot(mouseX - ringX, mouseY - ringY) > 0.25) {
        animId = requestAnimationFrame(tick);
      } else {
        animId = null;
      }
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      visible = true;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target;
      if (target && target.closest) {
        const cursorTagged = target.closest('[data-cursor]');
        const interactiveEl = target.closest('a, button, [role="button"], input, textarea');
        labelText = cursorTagged ? cursorTagged.getAttribute('data-cursor') || '' : '';
        hovered = !!interactiveEl || !!cursorTagged;
      }

      syncAppearance();

      if (!animId) {
        animId = requestAnimationFrame(tick);
      }
    };

    const onMouseLeave = () => {
      visible = false;
      syncAppearance();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor w-2 h-2 rounded-full opacity-0 transition-opacity duration-150"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="custom-cursor w-7 h-7 rounded-full border opacity-0 transition-[width,height,border-color,opacity] duration-200 ease-out"
        aria-hidden="true"
      />
      <span
        ref={badgeRef}
        className="custom-cursor px-2 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-[0.08em] uppercase opacity-0 transition-opacity duration-150 shadow-sm"
        aria-hidden="true"
      />
    </>
  );
}
