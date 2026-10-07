import React, { useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger, MQ } from '../lib/gsap';
import { revealChars } from '../lib/reveal';
import { projectsData } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

/**
 * Projects: Horizontal Scroll Pin + Scrub Showcase
 * - Pinned desktop track that moves horizontally as the user scrolls vertically.
 * - Displays 6 verified real-world engineering systems with repositories & live links.
 * - Mobile fallback: clean vertical stack (gsap.matchMedia responsive).
 */
export default function Projects() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    // 1. Heading masked character reveal
    revealChars(headingRef.current, {
      trigger: headingRef.current,
      start: 'top 85%',
    });

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // 2. Responsive matchMedia: Horizontal Pin on Desktop, Vertical on Mobile
    const mm = gsap.matchMedia();

    mm.add(MQ.desktop, () => {
      const scrollDistance = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [lang] });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-line bg-ink"
    >
      {/* Top Section Header */}
      <div className="pt-24 pb-8 wrap">
        <span className="text-xs font-mono text-bone-3 tracking-widest uppercase block mb-3">
          05 / Production Systems
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 ref={headingRef} className="h-section text-bone uppercase">
            {t.projects?.heading || 'Projects.'}
          </h2>
          <p className="text-bone-2 text-xs sm:text-sm font-mono max-w-md">
            {lang === 'id'
              ? 'Arsitektur sistem nyata, kecerdasan buatan, dan aplikasi live di Google Play Store.'
              : 'Real-world production systems, artificial intelligence, and live app on Google Play Store.'}
          </p>
        </div>
      </div>

      {/* Horizontal Slider Track (Pinned on Desktop) */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row lg:h-[85vh] lg:items-center px-4 sm:px-12 gap-8 lg:gap-12 pb-24 lg:pb-0"
      >
        {projectsData.map((project) => {
          const desc = lang === 'en' ? project.descriptionEn : project.description;
          const challenge = lang === 'en' ? project.challengeEn : project.challenge;
          const solution = lang === 'en' ? project.solutionEn : project.solution;

          return (
            <div
              key={project.id}
              className="w-full lg:w-[72vw] xl:w-[62vw] flex-shrink-0 bg-ink-900 border border-line p-6 sm:p-10 flex flex-col justify-between hover:border-signal/40 transition-colors"
            >
              <div>
                {/* Header Row: Number + Category Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                  <span className="font-display font-semibold text-2xl text-signal">
                    {project.num}
                  </span>
                  <span className="text-xs font-mono text-bone-3 tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-bone px-2.5 py-0.5 border border-line bg-ink">
                    {project.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-display font-semibold text-2xl sm:text-4xl text-bone mb-2">
                  {project.title}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-signal mb-6">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-bone-2 leading-relaxed mb-6">
                  {desc}
                </p>

                {/* Engineering Challenge & Architecture Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-ink border border-line mb-6">
                  <div>
                    <span className="text-[11px] font-mono text-bone-3 uppercase block mb-1">
                      {lang === 'id' ? 'Tantangan Rekayasa' : 'Engineering Challenge'}
                    </span>
                    <p className="text-xs text-bone-2 leading-relaxed">
                      {challenge}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-signal uppercase block mb-1">
                      {lang === 'id' ? 'Solusi Arsitektur' : 'Architectural Solution'}
                    </span>
                    <p className="text-xs text-bone-2 leading-relaxed">
                      {solution}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-mono text-bone-3 bg-ink-800 border border-line"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions: GitHub Repo & Live Production Link */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-line">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost text-xs"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t.projects?.sourceCode || 'GitHub Repository'}</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-solid text-xs"
                  >
                    <span>{project.liveLabel || 'Live Production'}</span>
                    <ArrowUpRight className="w-4 h-4 text-ink" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
