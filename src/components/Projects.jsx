import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  GithubLogo,
  X,
} from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const STATIC_PROJECT_META = [
  {
    id: 'rehat',
    image: './projects/rehat.webp',
    isIconFrame: true,
    techStack: ['Flutter', 'Dart', 'Android Studio', 'SQLite', 'Play Console'],
    githubUrl: 'https://github.com/rakaalpiansyah/rehat-app',
    liveUrl: 'https://play.google.com',
  },
  {
    id: 'meeting-ai',
    image: './projects/meeting-ai.png',
    isIconFrame: false,
    techStack: ['Python 3.11', 'FastAPI', 'Whisper AI', 'PyTorch', 'Railway', 'Docker'],
    githubUrl: 'https://github.com/rakaalpiansyah/Meeting-AI-Backend',
    liveUrl: 'https://meeting-ai-backend-production-b61e.up.railway.app/docs',
  },
  {
    id: 'agritrace',
    image: './projects/agritrace-chain.png',
    isIconFrame: false,
    techStack: ['Hyperledger Fabric', 'Go / Node Chaincode', 'Docker', 'Hyperledger Caliper'],
    githubUrl: 'https://github.com/rakaalpiansyah/agritraceChain',
    liveUrl: '',
  },
  {
    id: 'plantvillage',
    image: './projects/plantvillage-ai.png',
    isIconFrame: false,
    techStack: ['Python', 'TensorFlow', 'Keras', 'TensorFlow Lite', 'OpenCV', 'NumPy'],
    githubUrl: 'https://github.com/rakaalpiansyah/plantvillage-disease-detection',
    liveUrl: '',
  },
  {
    id: 'greenv',
    image: './projects/greenv-platform.png',
    isIconFrame: false,
    techStack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'REST API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/rakaalpiansyah/web-GreenV',
    liveUrl: '',
  },
  {
    id: 'royale',
    image: './projects/royale-essence.png',
    isIconFrame: false,
    techStack: ['Laravel 11', 'PHP', 'MySQL', 'KiriminAja API', 'Payment Gateway', 'Watzap API'],
    githubUrl: 'https://github.com/rakaalpiansyah',
    liveUrl: '',
  },
];

function ProjectVisual({ project }) {
  if (project.isIconFrame) {
    return (
      <div className="w-full h-full bg-[#111524] relative flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white p-3 shadow-2xl border border-white/20">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain rounded-2xl"
          />
        </div>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover"
    />
  );
}

export default function Projects({ scrollToY }) {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const progressBarRef = useRef(null);
  const underlineRef = useRef(null);
  const pinTriggerRef = useRef(null);
  const mobileTrackRef = useRef(null);
  const closeDrawerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [drawerIndex, setDrawerIndex] = useState(null);

  const projects = STATIC_PROJECT_META.map((meta, idx) => {
    const copy = t.projects.items[idx] || {};
    return {
      ...meta,
      ...copy,
    };
  });

  // 1. Desktop Pinned GSAP 3D Cylindrical Carousel
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (underlineRef.current) {
        const len = underlineRef.current.getTotalLength();
        gsap.set(underlineRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(underlineRef.current, {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true,
          },
        });
      }
    }, section);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const total = STATIC_PROJECT_META.length;
      const stepDeg = 32;
      const radius = 640;

      const positionCards = (progress) => {
        const continuousIdx = progress * (total - 1);
        const nearest = Math.round(continuousIdx);
        setActiveIndex((prev) => (prev === nearest ? prev : nearest));

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${Math.max(0.06, progress)})`;
        }

        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const offset = idx - continuousIdx;
          const angleDeg = offset * stepDeg;
          const angleRad = (angleDeg * Math.PI) / 180;
          const absOffset = Math.abs(offset);

          const x = Math.sin(angleRad) * radius;
          const z = Math.cos(angleRad) * radius - radius;
          const rotateY = -angleDeg * 0.72;
          const opacity = absOffset > 2.35 ? 0 : Math.max(0.28, 1 - absOffset * 0.36);
          const scale = Math.max(0.78, 1 - absOffset * 0.1);
          const blur = absOffset < 0.35 ? 0 : Math.min(3, absOffset * 1.35);

          card.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), -50%, ${z.toFixed(
            1
          )}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(2);
          card.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none';
          card.style.zIndex = String(Math.round(50 - absOffset * 10));
          card.style.pointerEvents = absOffset < 1.3 ? 'auto' : 'none';
        });
      };

      positionCards(0);

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=240%',
        pin: true,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          positionCards(self.progress);
        },
      });

      pinTriggerRef.current = st;

      return () => {
        pinTriggerRef.current = null;
        st.kill();
        cardRefs.current.forEach((card) => {
          if (card) {
            card.style.transform = '';
            card.style.opacity = '';
            card.style.filter = '';
            card.style.zIndex = '';
            card.style.pointerEvents = '';
          }
        });
      };
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  // 2. Escape handler and scroll lock for Case Study Drawer
  useEffect(() => {
    if (drawerIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setTimeout(() => closeDrawerRef.current?.focus(), 60);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setDrawerIndex(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerIndex]);

  const jumpToProject = (targetIdx) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, targetIdx));
    const st = pinTriggerRef.current;

    if (st && window.innerWidth >= 1024) {
      const targetScrollY = st.start + (st.end - st.start) * (clamped / (projects.length - 1));
      if (scrollToY) {
        scrollToY(targetScrollY);
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
      return;
    }

    setActiveIndex(clamped);
    const track = mobileTrackRef.current;
    if (track) {
      const child = track.children[clamped];
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const handleKeyNav = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      jumpToProject(Math.min(projects.length - 1, activeIndex + 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      jumpToProject(Math.max(0, activeIndex - 1));
    }
  };

  const activeProject = projects[activeIndex] || projects[0];
  const drawerProject = drawerIndex !== null ? projects[drawerIndex] : null;

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        data-canvas-theme="dark"
        onKeyDown={handleKeyNav}
        className="relative w-full lg:h-[100dvh] bg-[#080A12] text-[#F8F9FC] kx-grain pt-24 pb-14 lg:pt-24 lg:pb-8 px-4 sm:px-8 flex flex-col justify-between overflow-hidden"
      >
        <div className="max-w-[1440px] w-full mx-auto h-full flex flex-col justify-between gap-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div data-thread-anchor="projects-rail">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#A3AAC2] mb-2">
                <span className="text-[#FF5B4D] font-semibold">(03)</span>
                <span>{t.projects.indexLabel}</span>
              </div>
              <h2 className="kx-display text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[0.86] text-[#F8F9FC]">
                <span>{t.projects.headingLine1} </span>
                <span className="text-[#FF5B4D]">{t.projects.headingLine2}</span>
              </h2>
              <svg
                viewBox="0 0 360 14"
                fill="none"
                className="w-56 sm:w-72 h-3 mt-1.5"
                aria-hidden="true"
              >
                <path
                  ref={underlineRef}
                  d="M 2 9 Q 110 2, 220 8 T 356 5"
                  stroke="#FF5B4D"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#A3AAC2] tabular-nums">
                {t.projects.rangeLabel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => jumpToProject(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  aria-label={t.projects.prevAria}
                  className="w-11 h-11 rounded-full border border-white/20 text-white hover:border-[#FF5B4D] hover:bg-[#FF5B4D] disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors"
                >
                  <ArrowLeft weight="bold" className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => jumpToProject(activeIndex + 1)}
                  disabled={activeIndex === projects.length - 1}
                  aria-label={t.projects.nextAria}
                  className="w-11 h-11 rounded-full border border-white/20 text-white hover:border-[#FF5B4D] hover:bg-[#FF5B4D] disabled:opacity-35 disabled:pointer-events-none flex items-center justify-center transition-colors"
                >
                  <ArrowRight weight="bold" className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop 3D Cylindrical Carousel Stage */}
          <div
            ref={stageRef}
            className="hidden lg:block relative flex-1 min-h-[340px] w-full my-2"
            style={{ perspective: '1800px', transformStyle: 'preserve-3d' }}
          >
            {projects.map((proj, idx) => {
              const isCenter = idx === activeIndex;
              return (
                <article
                  key={proj.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  onClick={() => (isCenter ? setDrawerIndex(idx) : jumpToProject(idx))}
                  data-cursor={isCenter ? 'VIEW' : undefined}
                  className={`absolute top-1/2 left-1/2 w-[430px] aspect-[16/10] rounded-2xl overflow-hidden bg-[#111524] border transition-colors duration-300 cursor-pointer select-none ${
                    isCenter
                      ? 'border-[#FF5B4D] shadow-[0_28px_70px_rgba(0,0,0,0.75)]'
                      : 'border-white/15'
                  }`}
                >
                  <ProjectVisual project={proj} />

                  {/* Readability scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A12] via-[#080A12]/35 to-[#080A12]/55 pointer-events-none" />

                  {/* Top Metadata Bar */}
                  <div className="absolute top-3.5 inset-x-4 flex items-center justify-between font-mono text-[11px] text-white/90">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5B4D]" aria-hidden="true" />
                      <span>{t.projects.camLabel} 0{idx + 1}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#080A12]/80 border border-white/15">
                      {proj.shortTitle}
                    </span>
                  </div>

                  {/* Bottom Title + Inspect Action */}
                  <div className="absolute bottom-4 inset-x-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#FF5B4D] mb-0.5 truncate">
                        {proj.category}
                      </p>
                      <h3 className="kx-display text-2xl xl:text-3xl text-white leading-none truncate">
                        {proj.title.replace(/"/g, '')}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDrawerIndex(idx);
                      }}
                      aria-label={`${t.projects.inspectBtn}: ${proj.shortTitle}`}
                      className="min-h-[40px] px-3.5 rounded-full bg-white text-[#080A12] hover:bg-[#FF5B4D] hover:text-white inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] shrink-0 transition-colors"
                    >
                      <span>{t.projects.inspectBtn}</span>
                      <ArrowUpRight weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile & Tablet Horizontal Snap Carousel */}
          <div
            ref={mobileTrackRef}
            onScroll={(e) => {
              const el = e.currentTarget;
              const childWidth = el.firstElementChild?.clientWidth || 320;
              const idx = Math.round(el.scrollLeft / childWidth);
              setActiveIndex(Math.max(0, Math.min(projects.length - 1, idx)));
            }}
            className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1"
          >
            {projects.map((proj, idx) => (
              <article
                key={proj.id}
                onClick={() => setDrawerIndex(idx)}
                className="snap-center shrink-0 w-[86vw] sm:w-[420px] rounded-2xl overflow-hidden bg-[#111524] border border-white/15 flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <ProjectVisual project={proj} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A12]/80 via-transparent to-[#080A12]/40 pointer-events-none" />
                  <span className="absolute top-3 left-3 font-mono text-[11px] text-white bg-[#080A12]/80 px-2.5 py-1 rounded-md">
                    0{idx + 1} / {proj.shortTitle}
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between gap-3 flex-1">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#FF5B4D] mb-1">
                      {proj.category}
                    </p>
                    <h3 className="kx-display text-2xl text-white leading-tight mb-1.5">
                      {proj.title.replace(/"/g, '')}
                    </h3>
                    <p className="text-xs text-[#A3AAC2] line-clamp-2">{proj.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDrawerIndex(idx);
                    }}
                    className="min-h-[44px] w-full rounded-xl bg-white text-[#080A12] hover:bg-[#FF5B4D] hover:text-white inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.06em] transition-colors"
                  >
                    <span>{t.projects.inspectBtn}</span>
                    <ArrowUpRight weight="bold" className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom HUD + Direct Jump Controls */}
          <div className="pt-3 border-t border-white/12 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="kx-display text-4xl sm:text-5xl text-[#FF5B4D] tabular-nums leading-none">
                  0{activeIndex + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-white truncate">
                    {activeProject.title.replace(/"/g, '')}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#A3AAC2] truncate">
                    {activeProject.metrics}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => jumpToProject(idx)}
                    aria-label={`${p.shortTitle} (0${idx + 1})`}
                    aria-current={idx === activeIndex ? 'true' : undefined}
                    className={`min-h-[40px] min-w-[40px] px-2.5 rounded-full font-mono text-xs transition-colors ${
                      idx === activeIndex
                        ? 'bg-[#FF5B4D] text-[#080A12] font-bold'
                        : 'bg-[#111524] text-[#A3AAC2] border border-white/10 hover:text-white hover:border-white/30'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-px bg-white/15 overflow-hidden relative">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-[#FF5B4D] origin-left transition-transform duration-150"
                style={{
                  transform: `scaleX(${Math.max(0.12, (activeIndex + 1) / projects.length)})`,
                }}
              />
            </div>

            <div className="hidden sm:flex items-center justify-between text-xs font-mono text-[#A3AAC2]">
              <span className="uppercase tracking-[0.08em]">{t.projects.footerStatement}</span>
              <span>{t.projects.footerNote}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Drawer Dialog */}
      {drawerProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={drawerProject.title.replace(/"/g, '')}
          onClick={() => setDrawerIndex(null)}
          className="fixed inset-0 z-[85] bg-black/80 flex items-center justify-end p-0 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[92dvh] bg-[#080A12] text-[#F8F9FC] border-l sm:border border-white/15 sm:rounded-2xl overflow-y-auto p-5 sm:p-8 space-y-6"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/12">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#FF5B4D] mb-1">
                  {drawerProject.category}
                </p>
                <h3 className="kx-display text-3xl sm:text-4xl text-white leading-none">
                  {drawerProject.title.replace(/"/g, '')}
                </h3>
              </div>

              <button
                ref={closeDrawerRef}
                type="button"
                onClick={() => setDrawerIndex(null)}
                aria-label={t.projects.closeDrawer}
                className="min-w-[44px] min-h-[44px] rounded-full border border-white/25 text-white hover:bg-[#FF5B4D] hover:border-[#FF5B4D] flex items-center justify-center shrink-0 transition-colors"
              >
                <X weight="bold" className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#111524] border border-white/12">
              <ProjectVisual project={drawerProject} />
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs text-[#A3AAC2]">{drawerProject.routeBadge}</p>
              <p className="text-base font-medium text-white">{drawerProject.subtitle}</p>
              <p className="text-sm text-[#A3AAC2] leading-relaxed">{drawerProject.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#111524] border border-white/10">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#FF5B4D] mb-1.5">
                  {t.projects.challengeLabel}
                </p>
                <p className="text-xs sm:text-sm text-[#F8F9FC] leading-relaxed">
                  {drawerProject.challenge}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#111524] border border-white/10">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#FF5B4D] mb-1.5">
                  {t.projects.solutionLabel}
                </p>
                <p className="text-xs sm:text-sm text-[#F8F9FC] leading-relaxed">
                  {drawerProject.solution}
                </p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#A3AAC2] mb-2.5">
                {t.projects.stackLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {drawerProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-[#111524] border border-white/15 text-[#F8F9FC]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/12">
              {drawerProject.liveUrl && (
                <a
                  href={drawerProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-5 py-2.5 rounded-full bg-[#FF5B4D] text-[#080A12] font-semibold text-xs uppercase tracking-[0.06em] hover:bg-white inline-flex items-center gap-2 transition-colors"
                >
                  <span>{drawerProject.liveLabel || t.projects.liveDemoDefault}</span>
                  <ArrowUpRight weight="bold" className="w-4 h-4" aria-hidden="true" />
                </a>
              )}

              <a
                href={drawerProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/25 text-white hover:border-[#FF5B4D] hover:text-[#FF5B4D] font-semibold text-xs uppercase tracking-[0.06em] inline-flex items-center gap-2 transition-colors"
              >
                <GithubLogo weight="bold" className="w-4 h-4" aria-hidden="true" />
                <span>{t.projects.sourceCode}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
