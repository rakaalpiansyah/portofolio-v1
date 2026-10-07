import React, { useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '../lib/gsap';
import { revealChars, revealLines } from '../lib/reveal';
import { useLanguage } from '../context/LanguageContext';

/**
 * About:
 * - Pinned text-scrub reveal on desktop: statement words illuminate as the user scrolls.
 * - Image parallax scrub (yPercent: -15 -> 15).
 * - Verified engineering milestones & certifications cards with subtle borders.
 */
export default function About() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const photoWrapperRef = useRef(null);
  const photoImgRef = useRef(null);
  const scrubStatementRef = useRef(null);
  const milestonesRef = useRef(null);

  useGSAP(() => {
    // 1. Heading masked character reveal
    revealChars(headingRef.current, {
      trigger: headingRef.current,
      start: 'top 85%',
    });

    // 2. Image Parallax Scrub (yPercent scrub on inner image)
    if (photoImgRef.current && photoWrapperRef.current) {
      gsap.fromTo(
        photoImgRef.current,
        { yPercent: -12, scale: 1.15 },
        {
          yPercent: 12,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: photoWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // 3. Pinned text illumination scrub
    const words = scrubStatementRef.current?.querySelectorAll('.scrub-word');
    if (words && words.length > 0) {
      gsap.fromTo(
        words,
        { opacity: 0.2, color: '#8a8a85' },
        {
          opacity: 1,
          color: '#f5f5f0',
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: scrubStatementRef.current,
            start: 'top 75%',
            end: 'bottom 45%',
            scrub: 0.8,
          },
        }
      );
    }

    // 4. Milestones Staggered Enter
    gsap.from(milestonesRef.current?.children || [], {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'expoSoft',
      scrollTrigger: {
        trigger: milestonesRef.current,
        start: 'top 82%',
      },
    });
  }, { scope: containerRef, dependencies: [t] });

  // Tokenize the statement for the pinned scroll illumination
  const statementText = t.about.p1 || '';
  const statementWords = statementText.split(' ');

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-28 sm:py-36 wrap border-t border-line overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-16 sm:mb-24">
        <span className="text-xs font-mono text-bone-3 tracking-widest uppercase block mb-3">
          01 / Architectural Foundation
        </span>
        <h2 ref={headingRef} className="h-section text-bone uppercase">
          {t.about.heading || 'About Me.'}
        </h2>
      </div>

      {/* Main Grid: Portrait with Parallax + Pinned Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
        {/* Left Column: Authentic Portrait with Parallax */}
        <div className="lg:col-span-5">
          <div
            ref={photoWrapperRef}
            className="relative overflow-hidden aspect-[4/5] bg-ink-800 border border-line"
          >
            <img
              ref={photoImgRef}
              src="/foto1.webp"
              alt="Raka Alpiansyah - Software & AI Engineer"
              loading="lazy"
              className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-[filter] duration-700"
            />
            {/* Subtle caption bar */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-ink via-ink/80 to-transparent flex justify-between items-end text-xs font-mono">
              <span className="text-bone">Raka Alpiansyah</span>
              <span className="text-signal">Bandung, ID</span>
            </div>
          </div>
        </div>

        {/* Right Column: Progressive Pinned Text Scrub + System Deep Dive */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div ref={scrubStatementRef} className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium leading-snug tracking-tight mb-10">
            {statementWords.map((word, i) => (
              <span key={i} className="scrub-word inline-block mr-2 transition-colors">
                {word}
              </span>
            ))}
          </div>

          <div className="space-y-6 text-bone-2 text-base sm:text-lg leading-relaxed border-t border-line pt-8">
            <p>{t.about.p2}</p>
          </div>
        </div>
      </div>

      {/* Verified Milestones & Industry Certifications */}
      <div className="border-t border-line pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono text-bone-3 tracking-widest uppercase block mb-1">
              Verified Credentials
            </span>
            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-bone">
              Pencapaian &amp; Sertifikasi Resmi
            </h3>
          </div>
          <span className="text-xs font-mono text-signal mt-2 sm:mt-0">
            Cisco · Oracle · Cloud Technical Series
          </span>
        </div>

        <div
          ref={milestonesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.about.milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 bg-ink-900 border border-line hover:border-signal/50 transition-colors group flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-bone-3 block mb-4">
                  0{idx + 1}
                </span>
                <h4 className="font-display font-semibold text-lg text-bone group-hover:text-signal transition-colors mb-2">
                  {m.title}
                </h4>
                <p className="text-xs font-mono text-signal/90 mb-4">{m.org}</p>
                <p className="text-xs text-bone-2 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
