import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight, Play } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';
import useScrambleText from '../hooks/useScrambleText';

gsap.registerPlugin(ScrollTrigger);

const HERO_REEL_PLATES = [
  './projects/meeting-ai.png',
  './projects/agritrace-chain.png',
  './projects/plantvillage-ai.png',
  './projects/greenv-platform.png',
  './projects/royale-essence.png',
];

function AnimatedWords({ text, className = '' }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.18em] last:mr-0">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:-rotate-3"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ onNavigate }) {
  const heroRef = useRef(null);
  const { t } = useLanguage();
  const [plateIdx, setPlateIdx] = useState(0);
  const [frameTick, setFrameTick] = useState(0);

  const { displayText: scrambledRole, ref: roleRef } = useScrambleText(t.hero.roleScramble, {
    triggerOnView: false,
    duration: 720,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const plateTimer = setInterval(() => {
      setPlateIdx((prev) => (prev + 1) % HERO_REEL_PLATES.length);
    }, 2400);

    const frameTimer = setInterval(() => {
      setFrameTick((prev) => (prev + 1) % 2400);
    }, 100);

    return () => {
      clearInterval(plateTimer);
      clearInterval(frameTimer);
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-stagger-in',
        { y: 18 },
        { y: 0, duration: 0.75, stagger: 0.06, ease: 'power3.out', clearProps: 'transform' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const formatTimecode = (tick) => {
    const mins = String(Math.floor(tick / 600)).padStart(2, '0');
    const secs = String(Math.floor((tick % 600) / 10)).padStart(2, '0');
    const frames = String((tick % 10) * 2 + 12).padStart(2, '0');
    return `00:${mins}:${secs}:${frames}`;
  };

  const handleNav = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target);
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      data-canvas-theme="light"
      className="relative min-h-[100dvh] w-full bg-white text-[#0B0E1A] pt-20 md:pt-24 pb-8 md:pb-10 px-4 sm:px-8 flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-[1440px] w-full mx-auto flex-1 flex flex-col justify-between gap-6">
        {/* Top Metadata Strip */}
        <div className="hero-stagger-in flex flex-wrap items-center justify-between gap-3 pt-2 border-b border-[#0B0E1A]/12 pb-3">
          <div className="flex items-center gap-2.5">
            <span
              ref={roleRef}
              className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#0B0E1A]"
            >
              {scrambledRole}
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.1em] text-[#4A5068]">
            <span className="w-2 h-2 rounded-full bg-[#059669]" aria-hidden="true" />
            <span>{t.hero.locationTag}</span>
          </div>
        </div>

        {/* Center Monumental 3-Line Display Headline with Inline Media Pill */}
        <div className="my-auto py-2 sm:py-4">
          <h1
            className="kx-display text-[clamp(3.1rem,9.2vw,8rem)] leading-[0.86] tracking-[-0.02em] text-[#0B0E1A] select-none"
            aria-label={`${t.hero.headlineLine1Left} ${t.hero.headlineLine1Right} ${t.hero.headlineLine2} ${t.hero.headlineLine3}`}
          >
            <span className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2 mb-1 sm:mb-2">
              <AnimatedWords text={t.hero.headlineLine1Left} />

              {/* Inline Interactive Kinetic Media Pill */}
              <a
                href="#projects"
                onClick={(e) => handleNav(e, '#projects')}
                data-thread-anchor="hero-pill"
                data-thread-loop="circle"
                data-cursor="WORK"
                className="group relative inline-flex items-center justify-center w-[clamp(140px,18vw,250px)] h-[clamp(48px,6.4vw,86px)] rounded-full overflow-hidden bg-[#080A12] border border-[#0B0E1A]/20 align-middle transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                aria-label={t.hero.pillAction}
              >
                <img
                  src={HERO_REEL_PLATES[plateIdx]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-[#080A12]/45 group-hover:bg-[#C92A1D]/60 transition-colors duration-300" />
                <span className="relative z-10 inline-flex items-center gap-2 px-3 py-1">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#0B0E1A] flex items-center justify-center shrink-0">
                    <Play weight="fill" className="w-3.5 h-3.5 ml-0.5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-[0.1em] text-white uppercase whitespace-nowrap">
                    {t.hero.pillAction}
                  </span>
                </span>
              </a>

              <AnimatedWords text={t.hero.headlineLine1Right} />
            </span>

            <span className="block mb-1 sm:mb-2">
              <AnimatedWords text={t.hero.headlineLine2} />
            </span>

            <span className="block text-[#C92A1D]">
              <AnimatedWords text={t.hero.headlineLine3} />
            </span>
          </h1>
        </div>

        {/* Bottom Value Prop + Dual CTAs + Active Preview Strip */}
        <div className="hero-stagger-in grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-4 border-t border-[#0B0E1A]/12">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm sm:text-base text-[#4A5068] max-w-[54ch] leading-relaxed">
              {t.hero.subtext}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => handleNav(e, '#projects')}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-[#0B0E1A] text-white hover:bg-[#C92A1D] active:scale-[0.98] transition-colors inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] whitespace-nowrap"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight weight="bold" className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                onClick={(e) => handleNav(e, '#contact')}
                className="min-h-[44px] px-6 py-2.5 rounded-full border border-[#0B0E1A]/25 text-[#0B0E1A] hover:border-[#C92A1D] hover:text-[#C92A1D] active:scale-[0.98] transition-colors inline-flex items-center justify-center text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] whitespace-nowrap"
              >
                <span>{t.hero.secondaryCta}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-4">
            {/* Compact Active Release Strip */}
            <a
              href="#projects"
              onClick={(e) => handleNav(e, '#projects')}
              className="group flex items-center gap-3.5 p-2.5 pr-4 rounded-xl bg-[#F5F4F0] border border-[#0B0E1A]/10 hover:border-[#C92A1D] transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-[#080A12] p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src="./projects/rehat.webp"
                  alt="Rehat Mobile App"
                  width="40"
                  height="40"
                  className="w-full h-full object-contain rounded-md group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#C92A1D] font-semibold">
                  <span>{t.hero.activeCardBadge}</span>
                  <span className="tabular-nums text-[#4A5068]">{formatTimecode(frameTick)}</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#0B0E1A] truncate">
                  {t.hero.activeCardTitle}
                </p>
              </div>
            </a>

            <a
              href="#about"
              onClick={(e) => handleNav(e, '#about')}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-[#4A5068] hover:text-[#C92A1D] transition-colors py-2 min-h-[44px]"
            >
              <span>{t.hero.scrollHint}</span>
              <ArrowDown weight="bold" className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
