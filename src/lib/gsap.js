/**
 * Central GSAP setup. Import gsap and plugins from here only, so they are
 * registered exactly once and every file shares the same custom eases.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText, CustomEase, Flip);

// Shared easing vocabulary.
// silk: symmetric in-out for anything the user triggers (nav scroll, menu, lightbox).
// expoSoft: fast start, long settle; the default for reveals.
// snapBack: slight overshoot for elements returning to rest (magnetic, drag release).
CustomEase.create('silk', '0.65, 0, 0.35, 1');
CustomEase.create('expoSoft', '0.16, 1, 0.3, 1');
CustomEase.create('snapBack', '0.34, 1.56, 0.64, 1');

gsap.defaults({ ease: 'expoSoft', duration: 1 });

ScrollTrigger.config({ ignoreMobileResize: true });

// Breakpoint conditions for gsap.matchMedia(), shared by every section.
export const MQ = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
};

export { gsap, ScrollTrigger, ScrollToPlugin, SplitText, CustomEase, Flip, useGSAP };
