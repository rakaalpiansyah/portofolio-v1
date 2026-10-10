import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Server, MapPin, GraduationCap, Briefcase, Cloud, Database } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PixelPhoto from './PixelPhoto';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef  = useRef(null);
  const contentWrapRef = useRef(null);
  const photoWrapRef = useRef(null);
  const headingRef  = useRef(null);
  const leftColRef  = useRef(null);
  const rightColRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master choreographed entrance timeline for all parts inside About
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      enterTl
        .fromTo(
          '.about-eyebrow',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.65 }
        )
        .fromTo(
          '.about-heading',
          { opacity: 0, y: 40, scale: 0.96, filter: 'blur(10px)' },
          { opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)', duration: 0.95, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(
          '.about-photo',
          { opacity: 0, y: 50, scale: 0.93, filter: 'blur(12px)' },
          { opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)', duration: 1.05, ease: 'power4.out' },
          '-=0.75'
        )
        .fromTo(
          '.about-status',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.65'
        )
        .fromTo(
          ['.about-p1', '.about-p2'],
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          '-=0.55'
        )
        .fromTo(
          '.about-stat-item',
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.65, stagger: 0.08 },
          '-=0.6'
        )
        .fromTo(
          '.about-milestone-item',
          { opacity: 0, y: 28, scale: 0.96, filter: 'blur(6px)' },
          { opacity: 1, y: 0, scale: 1.0, filter: 'blur(0px)', duration: 0.75, stagger: 0.09 },
          '-=0.55'
        );

      // Smooth scroll out animation when scrolled past (Hero-style bidirectional scrub)
      if (contentWrapRef.current) {
        gsap.to(contentWrapRef.current, {
          y: -40,
          opacity: 0,
          scale: 0.95,
          filter: 'blur(6px)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'bottom 45%',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const milestoneIcons = [Award, Cloud, Server, Database];

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
      className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-6"
    >
      <div ref={contentWrapRef} className="about-content-wrap section-exit-wrap max-w-6xl mx-auto">

        {/* Main grid: 5 col photo | 7 col content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* LEFT COLUMN */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Photo frame with Pixelated GSAP Entrance */}
            <div
              ref={photoWrapRef}
              data-speed="0.92"
              className="about-photo relative select-none w-full"
            >
              <PixelPhoto
                src="/foto1.webp"
                alt="Raka Alpiansyah - Software Engineer"
                roleBadge={t.about.nameBadgeRole}
                name="Raka Alpiansyah"
              />
            </div>

            {/* Status pill */}
            <div className="about-status flex items-center gap-2 px-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px] text-zinc-400">{t.about.available}</span>
            </div>

            {/* Quick-stat cards */}
            <div
              data-speed="1.08"
              data-lag="0.35"
              className="flex flex-col gap-2.5"
            >
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="about-stat-item card-surface rounded-xl px-4 py-3 flex items-center gap-3">
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
              <div className="about-stat-item card-surface rounded-xl px-4 py-3">
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
            <div ref={headingRef} className="mb-6">
              <div className="about-eyebrow flex items-center gap-2.5 mb-3">
                <span className="w-6 h-px bg-zinc-700" />
                <span className="text-[11px] text-zinc-400 uppercase tracking-[0.25em] font-mono">
                  PROFILE &amp; FOUNDATION
                </span>
              </div>
              <h2 className="about-heading font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-5">
                {t.about.heading}
              </h2>

              <p className="about-p1 text-zinc-200 text-sm sm:text-base leading-relaxed mb-3.5">
                {t.about.p1}
              </p>
              <p className="about-p2 text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {t.about.p2}
              </p>
            </div>

            {/* Milestones grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5 border-t border-zinc-800/80">
              {t.about.milestones.map((item, idx) => {
                const Icon = milestoneIcons[idx] || Award;
                return (
                  <div
                    key={idx}
                    className="about-milestone-item card-surface p-4 sm:p-4.5 rounded-xl flex flex-col justify-between h-full group hover:border-zinc-700/80 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                        <span className="font-mono text-[11px] text-zinc-400 truncate">{item.org}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-white text-xs sm:text-sm mb-1.5 leading-snug">
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
