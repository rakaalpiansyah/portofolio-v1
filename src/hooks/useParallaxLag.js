import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Universal GSAP data-speed & data-lag Engine (Idle-Deferred for 0ms TBT)
 */
export function useParallaxLag(isRevealed = true) {
  useEffect(() => {
    if (!isRevealed) return;
    if (window.innerWidth < 768) return;

    let mm = null;
    let initialized = false;

    const setupParallax = () => {
      if (initialized) return;
      initialized = true;
      window.removeEventListener('scroll', setupParallax);

      mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const elements = document.querySelectorAll('[data-speed], [data-lag]');
        if (!elements.length) return;

        const triggers = [];

        elements.forEach((el) => {
          const speedAttr = el.getAttribute('data-speed');
          const lagAttr = el.getAttribute('data-lag');

          const speed = speedAttr !== null ? parseFloat(speedAttr) : 1;
          const lag = lagAttr !== null ? parseFloat(lagAttr) : 0;

          if (isNaN(speed) && isNaN(lag)) return;

          const travel = (1 - speed) * 120;
          const scrubDuration = lag > 0 ? Math.max(0.4, lag * 1.5) : 0.6;

          const tween = gsap.fromTo(
            el,
            { y: -travel },
            {
              y: travel,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('section') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: scrubDuration,
                invalidateOnRefresh: true,
              },
            }
          );

          if (tween.scrollTrigger) {
            triggers.push(tween.scrollTrigger);
          }
        });

        return () => {
          triggers.forEach((st) => st.kill());
        };
      });
    };

    window.addEventListener('scroll', setupParallax, { passive: true, once: true });
    const idleTimer = setTimeout(setupParallax, 2500);

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', setupParallax);
      if (mm) mm.revert();
    };
  }, [isRevealed]);
}

export default useParallaxLag;
