import React, { useRef } from 'react';
import { useGSAP, gsap, CustomEase } from '../lib/gsap';
import { revealChars, revealLines } from '../lib/reveal';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

/**
 * Hero:
 * - Monumental typography in Clash Display with masked SplitText character reveals.
 * - Magnetic CTA buttons with subtle physical pull on pointer hover.
 * - Production credentials strip (Google Play Store, Juara 1 MIPA SDGs, Cisco/Oracle).
 */
export default function Hero({ isRevealed = true }) {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtextRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const credentialsRef = useRef(null);
  const magneticBtnRef = useRef(null);

  // 1. Entry Animations with SplitText
  useGSAP(() => {
    if (!isRevealed) return;

    // Heading chars reveal
    revealChars(title1Ref.current, { scroll: false, delay: 0.1, stagger: 0.02, duration: 1.1 });
    revealChars(title2Ref.current, { scroll: false, delay: 0.25, stagger: 0.02, duration: 1.1 });

    // Subtext line-by-line masked rise
    revealLines(subtextRef.current, { scroll: false, delay: 0.55, stagger: 0.06 });

    // CTAs & Credential badges rise
    gsap.from(ctaGroupRef.current?.children || [], {
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.9,
      delay: 0.75,
      ease: 'expoSoft',
    });

    gsap.from(credentialsRef.current?.children || [], {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      delay: 0.9,
      ease: 'expoSoft',
    });

    // 2. Magnetic Button Micro-interaction
    const btn = magneticBtnRef.current;
    if (btn) {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: CustomEase.get('snapBack'),
        });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, { scope: containerRef, dependencies: [isRevealed, t] });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -60, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-between pt-[calc(var(--nav-h)+2.5rem)] pb-12 wrap overflow-hidden"
    >
      {/* Top Meta Line: Location, Status, Engineering Specialty */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-bone-3 tracking-wider uppercase border-b border-line pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal shadow-[0_0_8px_rgba(198,255,61,0.8)]" />
          <span className="text-bone">Available for Engineering Projects</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Bandung, ID</span>
          <span className="hidden sm:inline">Teknik Informatika</span>
        </div>
      </div>

      {/* Main Monumental Stage */}
      <div className="my-auto py-8 max-w-5xl">
        {/* Giant Monolithic Display Headline */}
        <div className="overflow-hidden">
          <h1 className="h-section text-bone uppercase tracking-tightest leading-[0.88]">
            <span ref={title1Ref} className="block">
              {t.hero.headlinePrefix || 'Raka Alpiansyah.'}
            </span>
            <span
              ref={title2Ref}
              className="block text-bone-2 hover:text-signal transition-colors duration-500"
            >
              {t.hero.headlineHighlight || 'Software & AI.'}
            </span>
          </h1>
        </div>

        {/* Narrative Subtext (Max 20 words per craft standard) */}
        <div className="mt-8 max-w-2xl">
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-bone-2 leading-relaxed"
          >
            {t.hero.subtext}
          </p>
        </div>

        {/* Primary Action Row with Magnetic Button */}
        <div ref={ctaGroupRef} className="mt-10 flex flex-wrap items-center gap-5">
          <div ref={magneticBtnRef} className="inline-block">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="btn btn-solid"
            >
              <span>{t.hero.viewProjects || 'Lihat Proyek Unggulan'}</span>
              <ArrowUpRight className="w-4 h-4 text-ink" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="btn btn-ghost"
          >
            <span>{t.hero.contactMe || 'Hubungi Saya'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Production Credentials Strip (Real Evidence Over Claims) */}
      <div
        ref={credentialsRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-line"
      >
        <div className="flex flex-col">
          <span className="text-xs font-mono text-bone-3 tracking-wider uppercase mb-1">
            {t.hero.m1Label || 'Google Play Store'}
          </span>
          <span className="font-display font-semibold text-lg text-bone">
            {t.hero.m1Val || 'Live App (Rehat)'}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-mono text-bone-3 tracking-wider uppercase mb-1">
            {t.hero.m2Label || 'Juara 1 MIPA'}
          </span>
          <span className="font-display font-semibold text-lg text-signal">
            {t.hero.m2Val || 'SDGs Nasional 2024'}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-mono text-bone-3 tracking-wider uppercase mb-1">
            {t.hero.m3Label || 'Sertifikasi Resmi'}
          </span>
          <span className="font-display font-semibold text-lg text-bone">
            {t.hero.m3Val || 'Cloud, Cisco, Oracle'}
          </span>
        </div>
      </div>
    </section>
  );
}
