import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, BookOpen, CheckCircle, Server, MapPin, GraduationCap, Briefcase, Cloud } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef  = useRef(null);
  const photoWrapRef = useRef(null);
  const photoRef    = useRef(null);
  const bracketsRef = useRef([]);
  const leftColRef  = useRef(null);
  const rightColRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column: fade + slide up as one unit
      gsap.from(leftColRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
      });

      // Photo clip-path wipe reveal
      gsap.set(photoRef.current, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.to(photoRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        delay: 0.15,
      });

      // Corner brackets draw in
      gsap.set(bracketsRef.current, { opacity: 0, scale: 0.82 });
      gsap.to(bracketsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        delay: 0.55,
      });

      // Right column children stagger
      gsap.from(rightColRef.current?.children || [], {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 80%',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addBracket = (el) => {
    if (el && !bracketsRef.current.includes(el)) bracketsRef.current.push(el);
  };

  const milestoneIcons = [Award, Cloud, BookOpen, Server, CheckCircle];

  const quickStats = [
    {
      icon: MapPin,
      label: t.about.statLocation,
      value: t.about.statLocationVal,
    },
    {
      icon: GraduationCap,
      label: t.about.statEducation,
      value: t.about.statEducationVal,
    },
    {
      icon: Briefcase,
      label: t.about.statFocus,
      value: t.about.statFocusVal,
      sub: t.about.statFocusSub,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">

        {/* Main grid: 5 col photo | 7 col content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* LEFT COLUMN */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Photo frame */}
            <div ref={photoWrapRef} className="relative select-none">
              {/* Corner brackets */}
              <span ref={addBracket} className="absolute -top-3 -left-3 z-20 w-7 h-7 border-t-2 border-l-2 border-sky-400/70 pointer-events-none" />
              <span ref={addBracket} className="absolute -top-3 -right-3 z-20 w-7 h-7 border-t-2 border-r-2 border-sky-400/70 pointer-events-none" />
              <span ref={addBracket} className="absolute -bottom-3 -left-3 z-20 w-7 h-7 border-b-2 border-l-2 border-sky-400/70 pointer-events-none" />
              <span ref={addBracket} className="absolute -bottom-3 -right-3 z-20 w-7 h-7 border-b-2 border-r-2 border-sky-400/70 pointer-events-none" />

              {/* Photo */}
              <div
                ref={photoRef}
                className="relative overflow-hidden rounded-2xl w-full"
              >
                <img
                  src="/foto1.jpeg"
                  alt="Raka Alpiansyah - Software Engineer"
                  className="w-full h-auto block object-cover"
                  draggable="false"
                />

                {/* Bottom gradient fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(10,10,10,0) 50%, rgba(10,10,10,0.78) 100%)',
                  }}
                />

                {/* Name badge */}
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-10 pointer-events-none">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-sky-300/80 mb-1">
                    {t.about.nameBadgeRole}
                  </p>
                  <p className="font-heading font-bold text-white text-base leading-tight">
                    Raka Alpiansyah
                  </p>
                </div>

                {/* Border overlay */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
              </div>
            </div>

            {/* Status pill */}
            <div className="flex items-center gap-2 px-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] text-zinc-400">{t.about.available}</span>
            </div>

            {/* Quick-stat cards */}
            <div className="flex flex-col gap-2.5">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="card-surface rounded-xl px-4 py-3 flex items-center gap-3">
                    <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">{stat.label}</p>
                      <p className="font-heading text-xs font-semibold text-white leading-snug">{stat.value}</p>
                      {stat.sub && (
                        <p className="font-mono text-[10px] text-zinc-500 mt-0.5">{stat.sub}</p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Stack tags */}
              <div className="card-surface rounded-xl px-4 py-3">
                <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider mb-2">{t.about.stackTitle}</p>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'Laravel', 'Flutter', 'Python / AI', 'MySQL', 'Docker', 'Linux'].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 flex flex-col justify-between pt-1"
          >
            {/* Heading + narrative */}
            <div className="mb-8">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-6">
                {t.about.heading}
              </h2>

              <p className="text-zinc-200 text-base sm:text-lg leading-relaxed mb-4">
                {t.about.p1}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                {t.about.p2}
              </p>
            </div>

            {/* Milestones grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-800/80">
              {t.about.milestones.map((item, idx) => {
                const Icon = milestoneIcons[idx] || Award;
                return (
                  <div
                    key={idx}
                    className={`card-surface p-5 rounded-2xl flex flex-col justify-between ${
                      item.featured ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                        <span className="font-mono text-[11px] text-zinc-400">{item.org}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-white text-sm mb-1.5 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
