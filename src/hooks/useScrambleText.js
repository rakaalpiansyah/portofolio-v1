import { useState, useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+';

export function useScrambleText(targetText, { triggerOnView = true, duration = 680, delay = 0 } = {}) {
  const ref = useRef(null);
  const [displayText, setDisplayText] = useState(targetText);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !targetText) {
      setDisplayText(targetText);
      return;
    }

    let rafId = null;
    let delayTimer = null;
    let observer = null;

    const runScramble = () => {
      const length = targetText.length;
      const startTime = performance.now();

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const lockedCount = Math.floor(progress * length);

        let next = '';
        for (let i = 0; i < length; i++) {
          const ch = targetText[i];
          if (ch === ' ' || ch === '.' || ch === ',' || ch === '/' || ch === '&') {
            next += ch;
          } else if (i < lockedCount) {
            next += ch;
          } else {
            const idx = (i * 7 + Math.floor(elapsed / 36)) % GLYPHS.length;
            next += GLYPHS[idx];
          }
        }

        setDisplayText(next);

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplayText(targetText);
        }
      };

      delayTimer = setTimeout(() => {
        rafId = requestAnimationFrame(step);
      }, delay);
    };

    if (!triggerOnView || !ref.current || typeof IntersectionObserver === 'undefined') {
      runScramble();
    } else {
      hasPlayedRef.current = false;
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            runScramble();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(ref.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [targetText, triggerOnView, duration, delay]);

  return { displayText, ref };
}

export default useScrambleText;
