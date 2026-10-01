import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isRevealed = true }) {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const { t, lang, language } = useLanguage();

  const roles = [
    'Software Engineer',
    'AI Practitioner',
    'Backend Crafter',
    'Fullstack Builder',
  ];

  // Role cycler every 2.4s
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2400);
    return () => clearInterval(roleInterval);
  }, [roles.length]);

  // GSAP Entrance Timeline for text elements
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      if (isRevealed) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          '.hero-eyebrow',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, delay: 0.1 }
        )
          .fromTo(
            '.hero-name',
            { opacity: 0, y: 55, scale: 0.95, filter: 'blur(16px)' },
            { opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)', duration: 1.3, ease: 'power4.out' },
            '-=0.45'
          )
          .fromTo(
            '.hero-role',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.85 },
            '-=0.6'
          )
          .fromTo(
            '.hero-subtext',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.85 },
            '-=0.5'
          )
          .fromTo(
            '.hero-cta a',
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
            '-=0.45'
          )
          .fromTo(
            '.hero-scroll-indicator',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.3'
          );
      } else {
        gsap.set(
          ['.hero-eyebrow', '.hero-name', '.hero-role', '.hero-subtext', '.hero-cta a', '.hero-scroll-indicator'],
          { opacity: 0 }
        );
      }

      // Smooth scroll out animation for hero content (Bidirectional scrub)
      gsap.to('.hero-content-wrap', {
        y: -120,
        opacity: 0,
        scale: 0.93,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.7,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isRevealed]);

  const isId = (lang || language) === 'id';

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden pt-28 pb-16"
    >
      {/* Centered Hero Content */}
      <div className="hero-content-wrap relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-2 mb-6 sm:mb-8">
          <span className="w-8 h-px bg-zinc-700/80" />
          <span className="text-xs text-zinc-400 uppercase tracking-[0.3em] font-mono">
            INFORMATICS ENGINEERING
          </span>
          <span className="w-8 h-px bg-zinc-700/80" />
        </div>

        {/* Massive Editorial Name */}
        <h1 className="hero-name text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.88] tracking-tight text-white mb-6 select-none">
          Raka Alpiansyah
        </h1>

        {/* Dynamic Role Cycler */}
        <p className="hero-role text-lg sm:text-xl md:text-2xl text-zinc-200 font-light mb-4 flex items-center justify-center gap-2 flex-wrap">
          <span>{isId ? 'Seorang' : 'A'}</span>
          <span
            key={roleIndex}
            className="font-display italic text-sky-400 text-2xl sm:text-3xl md:text-4xl animate-role-fade-in inline-block font-semibold"
          >
            {roles[roleIndex]}
          </span>
          <span>{isId ? 'berdomisili di Bandung, Indonesia.' : 'lives in Bandung, Indonesia.'}</span>
        </p>

        {/* Description */}
        <p className="hero-subtext text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed mb-8 sm:mb-10 font-light">
          {isId
            ? 'Informatics Engineering & software engineer. Berfokus pada rekayasa backend tangguh ber-throughput tinggi, modern web apps, dan pipeline AI cerdas dengan prinsip clean code.'
            : 'Informatics Engineering & software engineer. Crafting high-throughput backend services, modern web apps, and intelligent AI pipelines with clean code principles.'}
        </p>

        {/* CTA Buttons - Guaranteed Side-by-Side (Berdampingan) on All Devices */}
        <div className="hero-cta inline-flex flex-nowrap items-center justify-center gap-2.5 sm:gap-4 w-full max-w-md mx-auto">
          {/* Primary "Explore Projects" button */}
          <a
            href="#projects"
            className="group relative rounded-full p-[2px] transition-transform duration-200 hover:scale-105 active:scale-95 shrink-0"
          >
            <span className="absolute -inset-[1px] rounded-full accent-gradient opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-1.5 sm:gap-2 rounded-full text-xs sm:text-sm font-medium px-4 sm:px-7 py-2.5 sm:py-3.5 bg-zinc-950 text-white group-hover:bg-zinc-900 transition-colors duration-200 whitespace-nowrap">
              <span>{isId ? 'Lihat Proyek Unggulan' : 'Explore Projects'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </span>
          </a>

          {/* Secondary "Reach Out" button */}
          <a
            href="#contact"
            className="group relative rounded-full text-xs sm:text-sm font-medium px-4 sm:px-7 py-2.5 sm:py-3.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-md whitespace-nowrap shrink-0 flex items-center justify-center"
          >
            <span>{isId ? 'Hubungi Saya' : 'Initiate Contact'}</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <span className="text-[10px] text-zinc-500 uppercase tracking-[0.25em] font-mono">
          SCROLL
        </span>
        <div className="w-px h-10 bg-zinc-800 overflow-hidden relative">
          <div className="w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
