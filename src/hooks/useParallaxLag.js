import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Universal GSAP data-speed & data-lag Engine
 * Recreates GSAP ScrollSmoother's iconic data attribute effects with native GSAP ScrollTrigger + Lenis.
 * 
 * - data-speed="<number>":
 *     speed < 1.0 (e.g. 0.7): moves slower than scroll (deep background parallax)
 *     speed > 1.0 (e.g. 1.25): moves faster than scroll (floating foreground layer)
 * 
 * - data-lag="<number>":
 *     inertial trailing / spring delay (e.g. 0.4s to 0.8s) for buttery smooth elasticity
 * 
 * - Responsive: automatically active on desktop/tablets (min-width: 768px), disabled on mobile touch screens
 *   to maintain optimal touch performance and zero layout shifting.
 */
export function useParallaxLag(isRevealed = true) {
  useEffect(() => {
    if (!isRevealed) return;

    // Small delay to ensure all DOM layout heights and images have settled
    const initTimer = setTimeout(() => {
      const mm = gsap.matchMedia();

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

          // Parallax travel distance in pixels (based on speed variance)
          // speed 0.7 -> travel = (1 - 0.7) * 160 = +48px (moves slower, stays in frame longer)
          // speed 1.3 -> travel = (1 - 1.3) * 160 = -48px (moves faster, floats forward)
          const travel = (1 - speed) * 140;

          // Lag scrub duration in seconds:
          // If lag is set (e.g. 0.5), scrub takes lag seconds to smoothly catch up
          // If lag is 0, scrub is 0.7 for fluid optical response
          const scrubDuration = lag > 0 ? Math.max(0.4, lag * 1.6) : 0.7;

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

      return () => mm.revert();
    }, 150);

    return () => clearTimeout(initTimer);
  }, [isRevealed]);
}

export default useParallaxLag;
