import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Measure an element's resting document coordinates inside wrapperEl,
 * staying accurate even when a section ancestor is currently pinned by GSAP ScrollTrigger.
 */
function getPinSafeCoords(el, wrapperEl) {
  const wrapperRect = wrapperEl.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const section = el.closest('section, footer');
  const pinSpacer = section ? section.closest('.pin-spacer') : null;

  let topInWrapper = elRect.top - wrapperRect.top;

  if (section && pinSpacer) {
    const sectionStyle = window.getComputedStyle(section);
    if (sectionStyle.position === 'fixed') {
      const spacerRect = pinSpacer.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const offsetInsideSection = elRect.top - sectionRect.top;
      topInWrapper = spacerRect.top - wrapperRect.top + offsetInsideSection;
    }
  }

  return {
    x: elRect.left - wrapperRect.left + elRect.width / 2,
    y: topInWrapper + elRect.height / 2,
    width: elRect.width,
    height: elRect.height,
  };
}

function getPinSafeSectionBounds(sectionEl, wrapperEl) {
  const wrapperRect = wrapperEl.getBoundingClientRect();
  const pinSpacer = sectionEl.closest('.pin-spacer');
  const host = pinSpacer || sectionEl;
  const hostRect = host.getBoundingClientRect();

  return {
    top: Math.max(0, hostRect.top - wrapperRect.top),
    height: Math.max(0, hostRect.height),
    theme: sectionEl.getAttribute('data-canvas-theme') || 'light',
  };
}

function buildThreadPath(points) {
  if (!points.length) return '';
  if (points.length === 1) {
    return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  }

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;

  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const next = points[i + 1];

    if (curr.loop === 'circle') {
      const rx = Math.min(Math.max(curr.width * 0.56, 46), 115);
      const ry = Math.min(Math.max(curr.height * 0.62, 34), 95);
      d += ` c ${(rx * 0.85).toFixed(1)} ${(-ry * 0.35).toFixed(1)}, ${(rx * 1.05).toFixed(1)} ${(ry * 0.72).toFixed(1)}, 0 ${(ry * 0.88).toFixed(1)}`;
      d += ` c ${(-rx * 0.95).toFixed(1)} ${(ry * 0.14).toFixed(1)}, ${(-rx * 0.82).toFixed(1)} ${(-ry * 0.95).toFixed(1)}, ${(rx * 0.18).toFixed(1)} ${(-ry * 0.55).toFixed(1)}`;
    }

    if (next) {
      const dy = next.y - curr.y;
      const dx = next.x - curr.x;
      const sway = Math.abs(dx) < 40 ? (i % 2 === 0 ? 70 : -70) : 0;
      const c1x = curr.x + dx * 0.18 + sway;
      const c1y = curr.y + dy * 0.38;
      const c2x = next.x - dx * 0.18 - sway * 0.5;
      const c2y = next.y - dy * 0.38;

      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${next.x.toFixed(1)} ${next.y.toFixed(1)}`;
    }
  }

  return d;
}

export default function KineticThread({ wrapperRef, activeTheme, lang }) {
  const [geometry, setGeometry] = useState({
    width: 1440,
    height: 4000,
    pathData: '',
    lightBands: [],
    darkBands: [],
  });
  const [mobileProgress, setMobileProgress] = useState(0);

  const vermilionPathRef = useRef(null);
  const whitePathRef = useRef(null);
  const tipVermilionRef = useRef(null);
  const tipWhiteRef = useRef(null);
  const tipRingVermilionRef = useRef(null);
  const tipRingWhiteRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef?.current;
    if (!wrapper) return;

    let rafMeasure = null;
    let resizeTimer = null;

    const computeGeometry = () => {
      if (!wrapperRef.current || window.innerWidth < 768) return;

      const wrap = wrapperRef.current;
      const width = wrap.clientWidth;
      const height = wrap.scrollHeight;

      const anchorNodes = Array.from(wrap.querySelectorAll('[data-thread-anchor]'));
      const points = anchorNodes
        .filter((el) => el.offsetParent !== null)
        .map((el) => {
          const coords = getPinSafeCoords(el, wrap);
          return {
            ...coords,
            id: el.getAttribute('data-thread-anchor') || '',
            loop: el.getAttribute('data-thread-loop') || 'none',
          };
        })
        .sort((a, b) => a.y - b.y);

      const pathData = buildThreadPath(points);

      const themeNodes = Array.from(wrap.querySelectorAll('[data-canvas-theme]'));
      const lightBands = [];
      const darkBands = [];

      themeNodes.forEach((node) => {
        const bounds = getPinSafeSectionBounds(node, wrap);
        if (bounds.theme === 'dark' || bounds.theme === 'accent') {
          darkBands.push(bounds);
        } else {
          lightBands.push(bounds);
        }
      });

      setGeometry({ width, height, pathData, lightBands, darkBands });
    };

    const scheduleCompute = () => {
      if (rafMeasure) cancelAnimationFrame(rafMeasure);
      rafMeasure = requestAnimationFrame(computeGeometry);
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scheduleCompute, 150);
    };

    scheduleCompute();

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(debouncedResize);
      resizeObserver.observe(wrapper);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduleCompute);
    }

    ScrollTrigger.addEventListener('refresh', scheduleCompute);
    window.addEventListener('resize', debouncedResize);

    return () => {
      if (rafMeasure) cancelAnimationFrame(rafMeasure);
      clearTimeout(resizeTimer);
      if (resizeObserver) resizeObserver.disconnect();
      ScrollTrigger.removeEventListener('refresh', scheduleCompute);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [wrapperRef, lang]);

  useEffect(() => {
    const wrapper = wrapperRef?.current;
    if (!wrapper) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight || 1;
        setMobileProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    const pRed = vermilionPathRef.current;
    const pWhite = whitePathRef.current;
    if (!pRed || !pWhite || !geometry.pathData) return;

    const totalLen = pRed.getTotalLength();
    if (!totalLen) return;

    const updateTips = (len) => {
      const pt = pRed.getPointAtLength(Math.max(0, Math.min(totalLen, len)));
      [tipVermilionRef.current, tipWhiteRef.current, tipRingVermilionRef.current, tipRingWhiteRef.current].forEach(
        (circle) => {
          if (circle) {
            circle.setAttribute('cx', pt.x.toFixed(1));
            circle.setAttribute('cy', pt.y.toFixed(1));
          }
        }
      );
    };

    if (prefersReducedMotion) {
      pRed.style.strokeDasharray = 'none';
      pRed.style.strokeDashoffset = '0';
      pWhite.style.strokeDasharray = 'none';
      pWhite.style.strokeDashoffset = '0';
      updateTips(totalLen);
      return;
    }

    pRed.style.strokeDasharray = `${totalLen}`;
    pWhite.style.strokeDasharray = `${totalLen}`;

    const initialRatio = 0.04;
    const setDrawn = (progress) => {
      const clamped = Math.min(1, Math.max(initialRatio, progress));
      const offset = totalLen * (1 - clamped);
      pRed.style.strokeDashoffset = `${offset}`;
      pWhite.style.strokeDashoffset = `${offset}`;
      updateTips(totalLen * clamped);
    };

    setDrawn(initialRatio);

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.45,
      onUpdate: (self) => {
        setDrawn(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, [geometry.pathData, wrapperRef]);

  const isLightMobile = activeTheme === 'light' || activeTheme === 'mist';

  return (
    <>
      {/* Desktop Continuous Dual-Clipped SVG Thread */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-20 overflow-hidden"
        aria-hidden="true"
      >
        {geometry.pathData && (
          <svg
            width={geometry.width}
            height={geometry.height}
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            fill="none"
            className="block w-full h-full"
          >
            <defs>
              <clipPath id="kx-thread-clip-light">
                {geometry.lightBands.map((b, idx) => (
                  <rect key={idx} x="0" y={b.top} width={geometry.width} height={b.height + 2} />
                ))}
              </clipPath>
              <clipPath id="kx-thread-clip-dark">
                {geometry.darkBands.map((b, idx) => (
                  <rect key={idx} x="0" y={b.top} width={geometry.width} height={b.height + 2} />
                ))}
              </clipPath>
            </defs>

            {/* Vermilion stroke over light and mist canvases */}
            <g clipPath="url(#kx-thread-clip-light)">
              <path
                ref={vermilionPathRef}
                d={geometry.pathData}
                stroke="#C92A1D"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.88"
              />
              <circle
                ref={tipRingVermilionRef}
                r="9"
                stroke="#C92A1D"
                strokeWidth="1.25"
                opacity="0.35"
              />
              <circle ref={tipVermilionRef} r="3.5" fill="#C92A1D" />
            </g>

            {/* White stroke over dark and vermilion canvases */}
            <g clipPath="url(#kx-thread-clip-dark)">
              <path
                ref={whitePathRef}
                d={geometry.pathData}
                stroke="#FFFFFF"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
              <circle
                ref={tipRingWhiteRef}
                r="9"
                stroke="#FFFFFF"
                strokeWidth="1.25"
                opacity="0.35"
              />
              <circle ref={tipWhiteRef} r="3.5" fill="#FFFFFF" />
            </g>
          </svg>
        )}
      </div>

      {/* Mobile Vertical Edge Scroll Hairline */}
      <div
        className="md:hidden fixed right-1 top-20 bottom-6 w-[2px] pointer-events-none z-30 rounded-full overflow-hidden"
        style={{
          backgroundColor: isLightMobile ? 'rgba(11, 14, 26, 0.1)' : 'rgba(255, 255, 255, 0.16)',
        }}
        aria-hidden="true"
      >
        <div
          className="w-full origin-top transition-colors duration-200 rounded-full"
          style={{
            height: '100%',
            transform: `scaleY(${Math.max(0.06, mobileProgress)})`,
            backgroundColor: isLightMobile ? '#C92A1D' : '#FFFFFF',
          }}
        />
      </div>
    </>
  );
}
