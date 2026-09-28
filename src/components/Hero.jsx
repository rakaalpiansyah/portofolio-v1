import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Terminal, Shield, Smartphone, Server, Bot } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef(null);
  const descBoxRef = useRef(null);
  const [activeStack, setActiveStack] = useState('web_ai');

  const stackPills = [
    { id: 'web_ai', label: 'Web Dev & AI', icon: Bot, desc: 'Pengembangan web modern berbasis React & Three.js serta integrasi solusi AI cerdas, LLM pipelines, dan automasi pemrosesan data.' },
    { id: 'backend', label: 'Backend & API', icon: Server, desc: 'Laravel, PHP, RESTful APIs, Brevo SMTP, Payment Gateway, KiriminAja API, dan WhatsApp API.' },
    { id: 'mobile', label: 'Mobile Engineering', icon: Smartphone, desc: 'Flutter & Dart, Android Studio, Aplikasi "Rehat" terpublikasi di Google Play Store.' },
    { id: 'infra', label: 'Network & Cloud', icon: Shield, desc: 'Sertifikasi Cloud Technical Series, Cisco CCNA, administrasi Linux, Docker, dan arsitektur database Oracle.' },
  ];

  useEffect(() => {
    if (descBoxRef.current) {
      gsap.fromTo(
        descBoxRef.current,
        { opacity: 0.2, y: 6 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      );
    }
  }, [activeStack]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headlineRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
      })
      .from(subtextRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
      }, '-=0.4')
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from(cardsRef.current?.children || [], {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
      }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle single ambient light */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[380px] bg-sky-500/[0.04] rounded-full blur-[170px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="max-w-3xl">
          <h1
            ref={headlineRef}
            className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] mb-6"
          >
            Raka Alpiansyah.{' '}
            <span className="bg-gradient-to-r from-sky-400 to-zinc-400 bg-clip-text text-transparent">
              Software &amp; AI Engineer.
            </span>
          </h1>

          <p
            ref={subtextRef}
            className="text-zinc-300 text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
          >
            Software Engineer &amp; AI Engineer berlatar belakang Teknik Informatika. Berfokus pada rekayasa backend tangguh, 
            pengembangan aplikasi web modern, mobile Flutter, dan arsitektur data cerdas dengan prinsip clean code.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-start gap-3 mb-14"
          >
            <a
              href="#projects"
              className="px-7 py-3 rounded-xl text-sm font-medium text-zinc-950 bg-white hover:bg-zinc-200 active:scale-95 transition-all duration-100 shadow-sm"
            >
              Lihat Proyek Unggulan
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-xl text-sm font-medium text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-white active:scale-95 transition-all duration-100"
            >
              Hubungi Saya
            </a>
          </div>
        </div>

        {/* Interactive Architecture & Tech Inspector Bar (IT Engineering Feel) */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4"
        >
          {/* Main interactive architecture card */}
          <div className="lg:col-span-8 card-surface p-6 sm:p-7 rounded-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span className="font-mono text-xs text-zinc-400">Interactive Tech Constellation</span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400">Teknik Informatika</span>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {stackPills.map((pill) => {
                const Icon = pill.icon;
                const isActive = activeStack === pill.id;
                return (
                  <button
                    key={pill.id}
                    onClick={() => setActiveStack(pill.id)}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium active:scale-95 transition-all duration-100 ${
                      isActive
                        ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                        : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active stack description */}
            <div
              ref={descBoxRef}
              className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed min-h-[56px] flex items-center"
            >
              {stackPills.find((p) => p.id === activeStack)?.desc}
            </div>
          </div>

          {/* Quick Real Credentials Card */}
          <div className="lg:col-span-4 card-surface p-6 sm:p-7 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-3">
                <Bot className="w-4 h-4" />
                <span>Verified Milestones</span>
              </div>
              <h3 className="font-heading font-semibold text-white text-base mb-2">
                Pencapaian &amp; Kualifikasi
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                Pengalaman produksi nyata dalam web dev, arsitektur AI, sertifikasi Cisco &amp; Oracle, serta aplikasi mobile aktif di Google Play Store.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-zinc-800/80 font-mono text-[11px] text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Google Play Store</span>
                <span className="text-white">Live App (Rehat)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Juara 1 Harapan MIPA</span>
                <span className="text-white">SDGs 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sertifikasi Resmi</span>
                <span className="text-white">Cloud, Cisco, Oracle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
