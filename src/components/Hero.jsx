import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const { t, language } = useLanguage();

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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-eyebrow',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      )
        .fromTo(
          '.hero-name',
          { opacity: 0, y: 45, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
          '-=0.5'
        )
        .fromTo(
          '.hero-role',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-status',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.7 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          '-=0.4'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const isId = language === 'id';

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden pt-28 pb-16"
    >

      {/* Centered Hero Content (Framed by the swirling 3D singularity) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center gap-2 mb-6 sm:mb-8">
          <span className="w-8 h-px bg-zinc-700/80" />
          <span className="text-xs text-zinc-400 uppercase tracking-[0.3em] font-mono">
            COLLECTION &apos;26 &bull; INFORMATICS &apos;23 &bull; BANDUNG, ID
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
        <p className="hero-subtext text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed mb-6 font-light">
          {isId
            ? 'Mahasiswa aktif S1 Teknik Informatika (Angkatan 2023) & software engineer. Berfokus pada rekayasa backend tangguh ber-throughput tinggi, modern web apps, dan pipeline AI cerdas dengan prinsip clean code.'
            : 'Undergraduate Informatics Engineering student (\'23) & software engineer. Crafting high-throughput backend services, modern web apps, and intelligent AI pipelines with clean code principles.'}
        </p>

        {/* Engineering Status Pill */}
        <div className="hero-status inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-300 mb-10 backdrop-blur-md shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {isId
              ? 'S1 Teknik Informatika (\'23) • Bandung, ID • Available for Projects'
              : 'Undergraduate Informatics (\'23) • Bandung, ID • Available for Projects'}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta inline-flex flex-wrap items-center justify-center gap-4">
          {/* Primary "Explore Projects" button */}
          <a
            href="#projects"
            className="group relative rounded-full p-[2px] transition-transform duration-200 hover:scale-105"
          >
            <span className="absolute -inset-[1px] rounded-full accent-gradient opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 rounded-full text-xs sm:text-sm font-medium px-7 py-3.5 bg-zinc-950 text-white group-hover:bg-zinc-900 transition-colors duration-200">
              <span>{isId ? 'Lihat Proyek Unggulan' : 'Explore Projects'}</span>
              <ArrowUpRight className="w-4 h-4 text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </a>

          {/* Secondary "Reach Out" button */}
          <a
            href="#contact"
            className="group relative rounded-full text-xs sm:text-sm font-medium px-7 py-3.5 bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-200 hover:scale-105 backdrop-blur-md"
          >
            <span>{isId ? 'Hubungi Saya' : 'Initiate Contact'}</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
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
