import { gsap, SplitText } from './gsap';

/**
 * Masked character reveal for headings. Returns the SplitText instance.
 * autoSplit re-splits on resize/font load; returning the tween from onSplit
 * lets SplitText clean it up and keep its progress.
 */
export function revealChars(el, opts = {}) {
  if (!el) return null;
  const { trigger = el, start = 'top 85%', stagger = 0.022, duration = 1.15, delay = 0, scroll = true } = opts;
  return SplitText.create(el, {
    type: 'lines,words,chars',
    mask: 'lines',
    linesClass: 'split-line',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.chars, {
        yPercent: 115,
        duration,
        delay,
        stagger,
        ease: 'expoSoft',
        scrollTrigger: scroll ? { trigger, start, once: true } : undefined,
      });
    },
  });
}

/** Line-by-line rise for paragraphs. */
export function revealLines(el, opts = {}) {
  if (!el) return null;
  const { trigger = el, start = 'top 88%', stagger = 0.08, duration = 1, delay = 0, scroll = true } = opts;
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'split-line',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 100,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: 'expoSoft',
        scrollTrigger: scroll ? { trigger, start, once: true } : undefined,
      });
    },
  });
}

/** Plain fade-rise for non-text blocks (used sparingly). */
export function revealBlock(targets, opts = {}) {
  const { trigger, start = 'top 88%', y = 40, stagger = 0.08, delay = 0 } = opts;
  return gsap.from(targets, {
    y,
    opacity: 0,
    duration: 1.1,
    delay,
    stagger,
    ease: 'expoSoft',
    scrollTrigger: { trigger: trigger || targets, start, once: true },
  });
}
