import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Capabilities({ onNavigate }) {
  const sectionRef = useRef(null);
  const leftArcRef = useRef(null);
  const rightArcRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      [leftArcRef.current, rightArcRef.current].forEach((arc) => {
        if (!arc) return;
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(arc, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        });
      });

      const nodes = gsap.utils.toArray('.cap-orbital-node', section);
      nodes.forEach((node, idx) => {
        gsap.fromTo(
          node,
          { opacity: 0.45, y: 18 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: `${20 + idx * 10}% 75%`,
              end: `${36 + idx * 10}% 65%`,
              scrub: 0.5,
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  const leftItems = t.capabilities.items.slice(0, 3);
  const rightItems = t.capabilities.items.slice(3, 6);

  const handleCta = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('#contact');
    } else {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      data-canvas-theme="accent"
      className="relative w-full bg-[#C92A1D] text-white kx-grid-accent py-20 md:py-28 lg:py-32 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto relative">
        {/* Top Metadata */}
        <div
          data-thread-anchor="capabilities-apex"
          className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-white mb-10 md:mb-14"
        >
          <span className="text-[#FFD8D2] font-semibold">(04)</span>
          <span>{t.capabilities.indexLabel}</span>
        </div>

        {/* Desktop Orbital Twin-Arc Composition */}
        <div className="hidden md:grid grid-cols-12 gap-6 items-center relative min-h-[560px]">
          {/* Twin Opposing SVG Elliptical Arcs */}
          <svg
            viewBox="0 0 1200 600"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={leftArcRef}
              d="M 600 22 C 330 35, 320 290, 320 300 C 320 310, 330 565, 600 578"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            <path
              ref={rightArcRef}
              d="M 600 22 C 870 35, 880 290, 880 300 C 880 310, 870 565, 600 578"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
            <circle cx="600" cy="22" r="5" fill="#FFFFFF" />
            <circle cx="600" cy="578" r="5" fill="#FFFFFF" />
          </svg>

          {/* Left 3 Orbital Nodes */}
          <div className="col-span-4 space-y-14 pr-6 relative z-10 text-right">
            {leftItems.map((item) => (
              <div key={item.num} className="cap-orbital-node relative pr-8">
                <span
                  aria-hidden="true"
                  className="hidden lg:flex absolute right-0 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-4 border-[#C92A1D] ring-2 ring-white"
                />
                <span className="font-mono text-xs font-semibold tracking-[0.1em] text-white/90 block mb-1">
                  {item.num}
                </span>
                <h3 className="kx-display text-3xl lg:text-4xl text-white leading-none mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white leading-relaxed max-w-[34ch] ml-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Center Focal Display Statement + CTA */}
          <div className="col-span-4 text-center px-2 relative z-10 space-y-5">
            <h2 className="kx-display text-[clamp(3.2rem,5.4vw,5.25rem)] leading-[0.86] text-white">
              <span className="block">{t.capabilities.headingLine1}</span>
              <span className="block text-[#FFD8D2]">{t.capabilities.headingLine2}</span>
            </h2>
            <p className="text-sm sm:text-base text-white leading-relaxed max-w-[34ch] mx-auto">
              {t.capabilities.subtext}
            </p>
            <div>
              <a
                href="#contact"
                onClick={handleCta}
                className="min-h-[44px] px-7 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#C92A1D] active:scale-[0.98] transition-colors inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em]"
              >
                <span>{t.capabilities.cta}</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right 3 Orbital Nodes */}
          <div className="col-span-4 space-y-14 pl-6 relative z-10 text-left">
            {rightItems.map((item) => (
              <div key={item.num} className="cap-orbital-node relative pl-8">
                <span
                  aria-hidden="true"
                  className="hidden lg:flex absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-4 border-[#C92A1D] ring-2 ring-white"
                />
                <span className="font-mono text-xs font-semibold tracking-[0.1em] text-white/90 block mb-1">
                  {item.num}
                </span>
                <h3 className="kx-display text-3xl lg:text-4xl text-white leading-none mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white leading-relaxed max-w-[34ch]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Numbered Stack */}
        <div className="md:hidden space-y-8">
          <div className="text-center space-y-4">
            <h2 className="kx-display text-[clamp(2.8rem,12vw,4rem)] leading-[0.86] text-white">
              <span className="block">{t.capabilities.headingLine1}</span>
              <span className="block text-[#FFD8D2]">{t.capabilities.headingLine2}</span>
            </h2>
            <p className="text-sm text-white leading-relaxed max-w-[42ch] mx-auto">
              {t.capabilities.subtext}
            </p>
          </div>

          <ol className="space-y-4">
            {t.capabilities.items.map((item) => (
              <li key={item.num} className="border-t border-white/25 pt-4 flex items-start gap-4">
                <span className="font-mono text-xs font-bold text-[#FFD8D2] pt-1 shrink-0">
                  {item.num}
                </span>
                <div>
                  <h3 className="kx-display text-2xl text-white leading-none mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="text-center pt-2">
            <a
              href="#contact"
              onClick={handleCta}
              className="min-h-[44px] px-7 py-3 rounded-full border border-white text-white hover:bg-white hover:text-[#C92A1D] inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em]"
            >
              <span>{t.capabilities.cta}</span>
              <ArrowUpRight weight="bold" className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
