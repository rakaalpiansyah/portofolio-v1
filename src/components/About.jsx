import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  EnvelopeSimple,
  CopySimple,
  Check,
} from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const scribble1Ref = useRef(null);
  const scribble2Ref = useRef(null);
  const portraitWrapRef = useRef(null);
  const portraitImgRef = useRef(null);
  const idCardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const email = 'rakaalpiansyah@gmail.com';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-line-inner',
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: 'power4.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      [scribble1Ref.current, scribble2Ref.current].forEach((path, idx) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.25,
          delay: idx * 0.18,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.fromTo(
        '.about-cred-item',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-cred-grid',
            start: 'top 84%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.about-bio-p',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-bio-grid',
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (portraitWrapRef.current && portraitImgRef.current) {
        const applyPortraitClip = (p) => {
          if (!portraitWrapRef.current) return;
          const topInset = (100 * (1 - p)).toFixed(2);
          portraitWrapRef.current.style.clipPath = `inset(${topInset}% 0% 0% 0%)`;
        };
        const clipProxy = { p: 0 };
        applyPortraitClip(0);

        const portraitTl = gsap.timeline({
          scrollTrigger: {
            trigger: portraitWrapRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });

        portraitTl
          .to(
            clipProxy,
            {
              p: 1,
              duration: 1.1,
              ease: 'power4.inOut',
              onUpdate: () => applyPortraitClip(clipProxy.p),
            },
            0
          )
          .fromTo(
            portraitImgRef.current,
            { scale: 1.14 },
            { scale: 1.0, duration: 1.25, ease: 'power3.out', clearProps: 'transform' },
            0
          );
      }
    }, sectionRef);

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      if (!idCardRef.current) return;
      gsap.fromTo(
        idCardRef.current,
        { y: 26 },
        {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        }
      );
    });

    return () => {
      if (portraitWrapRef.current) portraitWrapRef.current.style.clipPath = '';
      ctx.revert();
      mm.revert();
    };
  }, []);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const socials = [
    { name: 'GitHub', href: 'https://github.com/rakaalpiansyah', Icon: GithubLogo },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rakaalpiansyah', Icon: LinkedinLogo },
    { name: 'Instagram', href: 'https://www.instagram.com/vcols_/', Icon: InstagramLogo },
    { name: 'Email', href: `mailto:${email}`, Icon: EnvelopeSimple },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      data-canvas-theme="light"
      className="relative w-full bg-white text-[#0B0E1A] py-20 md:py-28 px-4 sm:px-8 border-t border-[#0B0E1A]/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left 8 Columns: Statement, Scribble Underline, Credentials, Bio */}
        <div className="lg:col-span-8 space-y-10">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#4A5068] mb-5">
              <span className="text-[#C92A1D] font-semibold">(02)</span>
              <span>{t.about.indexLabel}</span>
            </div>

            <h2 className="kx-display text-[clamp(2.8rem,6.4vw,5.5rem)] leading-[0.86] text-[#0B0E1A]">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="about-line-inner block">{t.about.headingLine1}</span>
              </span>
              <span className="block overflow-hidden pb-[0.04em] text-[#C92A1D]">
                <span className="about-line-inner block">{t.about.headingLine2}</span>
              </span>
            </h2>

            {/* Hand-drawn SVG Double Scribble Underline */}
            <svg
              viewBox="0 0 540 34"
              fill="none"
              className="w-full max-w-[520px] h-7 mt-2 overflow-visible"
              aria-hidden="true"
            >
              <path
                ref={scribble1Ref}
                d="M 4 14 Q 140 4, 290 12 T 532 8"
                stroke="#C92A1D"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                ref={scribble2Ref}
                d="M 22 25 Q 170 16, 330 22 T 470 19"
                stroke="#0B0E1A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <p className="font-mono text-xs sm:text-sm text-[#4A5068] uppercase tracking-[0.06em] mt-4">
              {t.about.lead}
            </p>
          </div>

          {/* 4 Verified Credential Columns */}
          <div className="about-cred-grid grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {t.about.credentials.map((cred, idx) => (
              <div
                key={cred.label}
                data-thread-anchor={idx === 2 ? 'about-credentials' : undefined}
                data-thread-loop={idx === 2 ? 'circle' : undefined}
                className="about-cred-item border-t border-[#0B0E1A]/15 pt-4"
              >
                <div className="kx-display text-[clamp(2.6rem,4.5vw,4.5rem)] leading-[0.85] text-[#C92A1D] mb-2">
                  {cred.value}
                </div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0B0E1A]">
                  {cred.label}
                </div>
                <div className="text-xs text-[#4A5068] mt-1 leading-snug">{cred.sub}</div>
              </div>
            ))}
          </div>

          {/* Two-Column Human Bio */}
          <div className="about-bio-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pt-2">
            <p className="about-bio-p text-sm sm:text-base text-[#0B0E1A] leading-relaxed max-w-[60ch]">
              {t.about.p1}
            </p>
            <p className="about-bio-p text-sm sm:text-base text-[#4A5068] leading-relaxed max-w-[60ch]">
              {t.about.p2}
            </p>
          </div>
        </div>

        {/* Right 4 Columns: Editorial Profile ID Card */}
        <div ref={idCardRef} className="lg:col-span-4 will-change-transform">
          <div className="rounded-2xl bg-[#F5F4F0] border border-[#0B0E1A]/12 p-5 sm:p-6 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="kx-display text-3xl sm:text-4xl text-[#0B0E1A] leading-none">
                  RAKA <span className="text-[#C92A1D]">ALPIANSYAH</span>
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#4A5068] mt-1.5">
                  {t.about.cardRole}
                </p>
              </div>
            </div>

            {/* Social Square Buttons (44x44px tap targets) */}
            <div className="flex items-center gap-2">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'me noopener noreferrer' : 'me'}
                  aria-label={name}
                  title={name}
                  className="w-11 h-11 rounded-xl border border-[#0B0E1A]/15 bg-white text-[#0B0E1A] hover:border-[#C92A1D] hover:bg-[#C92A1D] hover:text-white transition-colors flex items-center justify-center"
                >
                  <Icon weight="bold" className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            {/* Factual Metadata */}
            <ul className="space-y-1.5 text-xs text-[#4A5068] font-medium">
              {t.about.cardFacts.map((fact) => (
                <li key={fact} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C92A1D] shrink-0" aria-hidden="true" />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            {/* Viewfinder Portrait Frame (without PORTRAIT / 01 badge) */}
            <div
              ref={portraitWrapRef}
              className="relative rounded-xl overflow-hidden bg-[#080A12] aspect-[4/5] group"
            >
              <img
                ref={portraitImgRef}
                src="./foto1.webp"
                alt="Raka Alpiansyah, Software & AI Engineer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
              />
              {/* Subtle Vermilion Editorial Duotone Wash that lifts on hover */}
              <div className="absolute inset-0 bg-[#C92A1D] mix-blend-screen opacity-20 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />

              {/* Viewfinder L-Brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/80 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/80 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/80 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/80 pointer-events-none" />

              <span
                className="absolute right-2.5 bottom-6 font-mono text-[10px] tracking-[0.14em] uppercase text-white/90 bg-[#080A12]/70 px-2 py-1 rounded origin-bottom-right"
                style={{ writingMode: 'vertical-rl' }}
              >
                {t.about.stamp}
              </span>
            </div>

            {/* One-Click Email Copy Bar */}
            <button
              type="button"
              onClick={handleCopyEmail}
              data-cursor="COPY"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border border-[#0B0E1A]/15 hover:border-[#C92A1D] text-left flex items-center justify-between gap-2 transition-colors group"
            >
              <span className="font-mono text-[11px] sm:text-xs text-[#0B0E1A] truncate">
                {email}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase text-[#C92A1D] shrink-0">
                {copied ? (
                  <>
                    <Check weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.contact.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <CopySimple weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.contact.copyBtn}</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
