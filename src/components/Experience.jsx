import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const contentWrapRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const spineLineRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const staticExperiences = [
    {
      id: 'sonasoft',
      type: 'work',
      category: 'work',
      isLatest: true,
      skills: ['Laravel 11', 'REST API', 'PHP', 'Backend Architecture', 'Content Resources', 'MySQL'],
    },
    {
      id: 'royale',
      type: 'work',
      category: 'work',
      isLatest: false,
      skills: ['Laravel', 'PHP', 'MySQL', 'Payment Gateway', 'KiriminAja API', 'Watzap API', 'Brevo SMTP'],
    },
    {
      id: 'informatika',
      type: 'education',
      category: 'education',
      isLatest: false,
      skills: ['Software Engineering', 'AI Engineering', 'Flutter/Dart', 'Web Development', 'Algorithms'],
    },
    {
      id: 'pos-indonesia',
      type: 'work',
      category: 'work',
      isLatest: false,
      skills: ['LAN Maintenance', 'Hardware & Software Troubleshooting', 'Data Logistics Operations'],
    },
  ];

  const experiences = staticExperiences.map((item, idx) => {
    const data = t.experience.items[idx] || {};
    return {
      ...item,
      period: data.period || '',
      role: data.role || '',
      company: data.company || '',
      location: data.location || '',
      tag: data.tag || '',
      highlights: data.highlights || [],
    };
  });

  const categories = [
    {
      id: 'all',
      label: t.experience.allTab || 'Semua Rekam Jejak',
      shortLabel: t.experience.allShort || 'Semua',
      count: experiences.length,
    },
    {
      id: 'work',
      label: t.experience.workTab || 'Pengalaman Industri & Magang',
      shortLabel: t.experience.workShort || 'Industri',
      count: experiences.filter((e) => e.category === 'work').length,
    },
    {
      id: 'education',
      label: t.experience.eduTab || 'Pendidikan & Prestasi',
      shortLabel: t.experience.eduShort || 'Pendidikan',
      count: experiences.filter((e) => e.category === 'education').length,
    },
  ];

  const filteredExperiences =
    activeCategory === 'all'
      ? experiences
      : experiences.filter((exp) => exp.category === activeCategory);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const enterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        defaults: { ease: 'power3.out' },
      });

      enterTl
        .fromTo(
          headerRef.current,
          { opacity: 0, y: 28, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.7, ease: 'power4.out' }
        )
        .fromTo(
          '.experience-tab-btn',
          { opacity: 0, y: 12, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.4, stagger: 0.06 },
          '-=0.4'
        )
        .fromTo(
          '.experience-card-item',
          { opacity: 0, x: -24, scale: 0.98 },
          { opacity: 1, x: 0, scale: 1.0, duration: 0.7, stagger: 0.12, ease: 'power4.out' },
          '-=0.25'
        )
        .fromTo(
          '.experience-station-node',
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, stagger: 0.12, ease: 'back.out(2.0)' },
          '-=0.65'
        );

      if (spineLineRef.current && timelineRef.current) {
        gsap.fromTo(
          spineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.5,
            },
          }
        );
      }

      if (contentWrapRef.current) {
        gsap.to(contentWrapRef.current, {
          y: -36,
          opacity: 0,
          scale: 0.97,
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

  const handleCategoryChange = (catId) => {
    if (catId === activeCategory) return;
    const cards = timelineRef.current;
    if (cards) {
      gsap.to(cards.children, {
        opacity: 0,
        y: -10,
        duration: 0.18,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          setActiveCategory(catId);
          gsap.fromTo(
            cards.children,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.06,
              ease: 'power2.out',
            }
          );
        },
      });
    } else {
      setActiveCategory(catId);
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <div ref={contentWrapRef} className="experience-content-wrap section-exit-wrap w-full">
        <div ref={headerRef} className="mb-10 sm:mb-14">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
            {t.experience.heading}
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
            {t.experience.subtitle}
          </p>

          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl glass-pill max-w-full overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`experience-tab-btn relative px-3 sm:px-4 py-2 sm:py-1.5 rounded-xl text-xs font-mono transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/50'
                  }`}
                  aria-label={`Filter ${cat.label}`}
                  aria-pressed={isActive}
                >
                  <span className="sm:hidden">{cat.shortLabel}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                      isActive
                        ? 'bg-zinc-900 text-zinc-100 font-bold'
                        : 'bg-zinc-900/60 text-zinc-300'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative pl-7 sm:pl-10">
          <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-px bg-white/10" />

          <div
            ref={spineLineRef}
            className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-px bg-white origin-top pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.35)]"
          />

          <div ref={timelineRef} className="space-y-8 sm:space-y-10">
            {filteredExperiences.map((exp) => (
              <div key={exp.id} className="experience-card-item relative group">
                <div
                  className={`experience-station-node absolute -left-[24px] sm:-left-[29px] top-5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                    exp.isLatest
                      ? 'bg-white ring-4 ring-white/20 shadow-[0_0_12px_rgba(255,255,255,0.5)]'
                      : 'bg-zinc-950 border-2 border-zinc-700 group-hover:border-white group-hover:scale-110'
                  }`}
                >
                  {exp.isLatest && (
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                  )}
                  {!exp.isLatest && (
                    <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover:bg-white transition-colors" />
                  )}
                </div>

                <div className="card-surface p-5 sm:p-8 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-xs text-zinc-200">
                        {exp.period}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                        {exp.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight mb-2 group-hover:text-sky-300 transition-colors">
                    {exp.role}
                  </h3>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 mb-5">
                    {exp.type === 'work' ? (
                      <Briefcase className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    )}
                    <span className="font-semibold text-white">{exp.company}</span>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {exp.highlights.map((item, hIdx) => (
                      <li
                        key={hIdx}
                        className="text-zinc-200 text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-1.5 flex-shrink-0 group-hover:bg-white transition-colors" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/80">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-900/80 text-zinc-200 border border-zinc-800/80 hover:border-zinc-600 hover:text-white transition-colors select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
