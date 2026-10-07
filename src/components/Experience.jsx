import React, { useState, useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '../lib/gsap';
import { revealChars } from '../lib/reveal';
import { useLanguage } from '../context/LanguageContext';

/**
 * Experience: Career Track & Education (Award-Level Vertical Timeline)
 * - Center timeline line drawn with scaleY scrub on scroll.
 * - Alternating left/right item reveals with SplitText on title.
 * - Active center dot glows lime (#c6ff3d) when centered in viewport.
 * - Category filter: All / Industry / Education.
 */
export default function Experience() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all'); // 'all' | 'work' | 'edu'
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const timelineRef = useRef(null);

  const items = t.experience?.items || [];

  const filteredItems = items.filter((item) => {
    if (filter === 'work') return item.id === 'sonasoft' || item.id === 'royale' || item.id === 'pos-indonesia';
    if (filter === 'edu') return item.id === 'informatika';
    return true;
  });

  useGSAP(() => {
    // 1. Heading reveal
    revealChars(headingRef.current, {
      trigger: headingRef.current,
      start: 'top 85%',
    });

    // 2. Timeline Center Line Drawing (scaleY: 0 -> 1 scrub)
    if (lineRef.current && timelineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );
    }

    // 3. Alternating left/right reveals & active node glow
    const nodes = timelineRef.current?.querySelectorAll('.tl-item');
    if (nodes) {
      nodes.forEach((node, i) => {
        const isLeft = i % 2 === 0;

        // Slide in from left or right
        gsap.from(node.querySelector('.tl-content'), {
          x: isLeft ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: 'expoSoft',
          scrollTrigger: {
            trigger: node,
            start: 'top 82%',
          },
        });

        // Toggle active glow when node passes viewport center
        ScrollTrigger.create({
          trigger: node,
          start: 'top 55%',
          end: 'bottom 45%',
          toggleClass: { targets: node, className: 'is-active' },
        });
      });
    }
  }, { scope: containerRef, dependencies: [filter, t] });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-28 sm:py-36 wrap border-t border-line overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-16 sm:mb-20">
        <span className="text-xs font-mono text-bone-3 tracking-widest uppercase block mb-3">
          03 / Verified Trajectory
        </span>
        <h2 ref={headingRef} className="h-section text-bone uppercase">
          {t.experience.heading || 'Career Track.'}
        </h2>
        <p className="text-bone-2 text-sm sm:text-base max-w-xl mt-4">
          {t.experience.subtitle}
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-8">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
              filter === 'all'
                ? 'bg-signal text-ink font-bold'
                : 'border border-line text-bone-2 hover:text-bone'
            }`}
          >
            {t.experience.allTab || 'Semua Rekam Jejak'}
          </button>
          <button
            type="button"
            onClick={() => setFilter('work')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
              filter === 'work'
                ? 'bg-signal text-ink font-bold'
                : 'border border-line text-bone-2 hover:text-bone'
            }`}
          >
            {t.experience.workTab || 'Pengalaman Industri'}
          </button>
          <button
            type="button"
            onClick={() => setFilter('edu')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-colors ${
              filter === 'edu'
                ? 'bg-signal text-ink font-bold'
                : 'border border-line text-bone-2 hover:text-bone'
            }`}
          >
            {t.experience.eduTab || 'Pendidikan & Prestasi'}
          </button>
        </div>
      </div>

      {/* Vertical Timeline Structure */}
      <div ref={timelineRef} className="relative max-w-5xl mx-auto py-10">
        {/* Center Vertical Axis Hairline */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-line">
          <div
            ref={lineRef}
            className="w-full h-full bg-signal origin-top scale-y-0"
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 sm:space-y-24">
          {filteredItems.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={item.id}
                className={`tl-item relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node Dot (Positioned on the timeline axis) */}
                <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10">
                  <div className="tl-dot w-3.5 h-3.5 rounded-full bg-ink border-2 border-bone/40" />
                </div>

                {/* Content Block (Alternates left and right on md+) */}
                <div
                  className={`tl-content pl-12 md:pl-0 w-full md:w-[calc(50%-2.5rem)] ${
                    isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'
                  }`}
                >
                  <div className="p-7 bg-ink-900 border border-line hover:border-signal/40 transition-colors">
                    {/* Period & Tag */}
                    <div
                      className={`flex flex-wrap items-center gap-2 mb-3 ${
                        isLeft ? 'md:justify-end' : 'md:justify-start'
                      }`}
                    >
                      <span className="text-xs font-mono text-signal">
                        {item.period}
                      </span>
                      <span className="text-xs font-mono text-bone-3 px-2 py-0.5 border border-line bg-ink">
                        {item.tag}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="font-display font-semibold text-2xl text-bone mb-1">
                      {item.role}
                    </h3>
                    <p className="font-mono text-xs text-bone-2 mb-5">
                      {item.company} · {item.location}
                    </p>

                    {/* Highlights bullet list */}
                    <ul
                      className={`space-y-2 text-xs sm:text-sm text-bone-2 leading-relaxed ${
                        isLeft ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      {item.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="relative">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
