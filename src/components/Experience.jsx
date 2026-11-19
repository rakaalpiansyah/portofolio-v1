import React, { useState } from 'react';
import { ArrowRight, CaretDown, MapPin } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

const TOOLKIT_ITEMS = [
  { id: 'laravel', label: 'Laravel 11', category: 'backend' },
  { id: 'php', label: 'PHP 8', category: 'backend' },
  { id: 'mysql', label: 'MySQL', category: 'backend' },
  { id: 'oracle', label: 'Oracle SQL', category: 'backend' },
  { id: 'rest', label: 'REST & Webhooks', category: 'backend' },
  { id: 'ai_python', label: 'Python / FastAPI / AI', category: 'ai' },
  { id: 'flutter', label: 'Flutter', category: 'mobile_web' },
  { id: 'dart', label: 'Dart', category: 'mobile_web' },
  { id: 'react', label: 'React', category: 'mobile_web' },
  { id: 'ts', label: 'TypeScript', category: 'mobile_web' },
  { id: 'js', label: 'JavaScript', category: 'mobile_web' },
  { id: 'java', label: 'Java OOP', category: 'mobile_web' },
  { id: 'linux', label: 'Linux', category: 'infra' },
  { id: 'docker', label: 'Docker', category: 'infra' },
  { id: 'git', label: 'Git & GitHub', category: 'infra' },
  { id: 'cisco', label: 'Cisco CCNA', category: 'infra' },
];

const MARQUEE_ROW_ONE = [
  'LARAVEL 11',
  'FASTAPI',
  'FLUTTER',
  'REACT',
  'HYPERLEDGER FABRIC',
  'TENSORFLOW LITE',
];

const MARQUEE_ROW_TWO = [
  'MYSQL & ORACLE SQL',
  'WHISPER AI',
  'DOCKER',
  'LINUX',
  'CISCO CCNA',
  'TYPESCRIPT',
];

export default function Experience() {
  const { t } = useLanguage();
  const [expFilter, setExpFilter] = useState('all');
  const [expandedId, setExpandedId] = useState('sonasoft');
  const [techCategory, setTechCategory] = useState('all');
  const [activeTechId, setActiveTechId] = useState('laravel');

  const filteredExp =
    expFilter === 'all'
      ? t.experience.items
      : t.experience.items.filter((item) => item.category === expFilter);

  const visibleTools =
    techCategory === 'all'
      ? TOOLKIT_ITEMS
      : TOOLKIT_ITEMS.filter((tool) => tool.category === techCategory);

  const selectedToolMeta =
    TOOLKIT_ITEMS.find((item) => item.id === activeTechId) || TOOLKIT_ITEMS[0];
  const selectedToolCopy = t.skills.keycaps[selectedToolMeta.id] || {};

  const handleCategoryPick = (catId) => {
    setTechCategory(catId);
    const nextList =
      catId === 'all' ? TOOLKIT_ITEMS : TOOLKIT_ITEMS.filter((i) => i.category === catId);
    if (nextList.length && !nextList.some((i) => i.id === activeTechId)) {
      setActiveTechId(nextList[0].id);
    }
  };

  return (
    <section
      id="experience"
      data-canvas-theme="mist"
      className="relative w-full bg-[#F5F4F0] text-[#0B0E1A] pt-20 md:pt-28 border-t border-[#0B0E1A]/10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pb-16 md:pb-24 space-y-12">
        {/* Header + Track Record Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#4A5068] mb-4">
              <span className="text-[#C92A1D] font-semibold">(07)</span>
              <span>{t.experience.indexLabel}</span>
            </div>
            <h2 className="kx-display text-[clamp(2.8rem,6.2vw,5.25rem)] leading-[0.86] text-[#0B0E1A]">
              <span className="block">{t.experience.headingLine1}</span>
              <span className="block text-[#C92A1D]">{t.experience.headingLine2}</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#4A5068] mr-2 tabular-nums">
              {t.experience.spanLabel}
            </span>
            <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#0B0E1A]/12">
              {[
                { id: 'all', label: t.experience.allTab },
                { id: 'work', label: t.experience.workTab },
                { id: 'education', label: t.experience.eduTab },
              ].map((tab) => {
                const active = expFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setExpFilter(tab.id)}
                    aria-pressed={active}
                    className={`min-h-[40px] px-4 rounded-full font-mono text-xs uppercase tracking-[0.06em] transition-colors ${
                      active
                        ? 'bg-[#0B0E1A] text-white font-semibold'
                        : 'text-[#4A5068] hover:text-[#0B0E1A]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 12-Column Career Track Record + Categorized Toolkit Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Columns: Editorial Accordion Rows */}
          <div className="lg:col-span-7 border-b border-[#0B0E1A]/15">
            {filteredExp.map((exp) => {
              const isOpen = expandedId === exp.id;
              return (
                <div key={exp.id} className="border-t border-[#0B0E1A]/15">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isOpen ? null : exp.id)}
                    aria-expanded={isOpen}
                    className="w-full py-6 text-left group flex items-start justify-between gap-4 transition-colors"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 flex-1 items-baseline">
                      <span className="sm:col-span-4 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-[#C92A1D] tabular-nums">
                        {exp.period}
                      </span>
                      <div className="sm:col-span-8">
                        <h3 className="kx-display text-3xl sm:text-4xl text-[#0B0E1A] leading-none group-hover:translate-x-1.5 transition-transform duration-200">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[#4A5068] mt-1.5">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <span className="min-w-[40px] min-h-[40px] rounded-full border border-[#0B0E1A]/15 group-hover:border-[#C92A1D] flex items-center justify-center shrink-0 transition-colors">
                      {isOpen ? (
                        <CaretDown
                          weight="bold"
                          className="w-4 h-4 text-[#C92A1D]"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowRight
                          weight="bold"
                          className="w-4 h-4 text-[#0B0E1A] group-hover:text-[#C92A1D] group-hover:-rotate-45 transition-all duration-200"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pl-0 sm:pl-[33.333%] space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#4A5068]">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin weight="bold" className="w-3.5 h-3.5 text-[#C92A1D]" aria-hidden="true" />
                          <span>{exp.location}</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#0B0E1A]/12 text-[#0B0E1A]">
                          {exp.tag}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {exp.highlights.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-[#0B0E1A] leading-relaxed flex items-start gap-2.5"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#C92A1D] mt-2 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white border border-[#0B0E1A]/12 text-[#0B0E1A]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right 5 Columns: White Architectural Toolkit Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#0B0E1A]/12 p-5 sm:p-7 space-y-6">
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#0B0E1A]/12">
              <h3 className="kx-display text-3xl text-[#0B0E1A] leading-none">
                {t.experience.toolkitTitle}
              </h3>
              <span className="font-mono text-xs font-semibold text-[#C92A1D] tracking-[0.08em]">
                {t.experience.toolkitCount}
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleCategoryPick('all')}
                aria-pressed={techCategory === 'all'}
                className={`min-h-[36px] px-3 rounded-full font-mono text-[11px] uppercase tracking-[0.06em] border transition-colors ${
                  techCategory === 'all'
                    ? 'bg-[#C92A1D] border-[#C92A1D] text-white font-semibold'
                    : 'bg-[#F5F4F0] border-[#0B0E1A]/12 text-[#4A5068] hover:text-[#0B0E1A]'
                }`}
              >
                {t.experience.allTab} (16)
              </button>
              {t.experience.categories.map((cat) => {
                const active = techCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryPick(cat.id)}
                    aria-pressed={active}
                    className={`min-h-[36px] px-3 rounded-full font-mono text-[11px] uppercase tracking-[0.06em] border transition-colors ${
                      active
                        ? 'bg-[#C92A1D] border-[#C92A1D] text-white font-semibold'
                        : 'bg-[#F5F4F0] border-[#0B0E1A]/12 text-[#4A5068] hover:text-[#0B0E1A]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Technology Buttons */}
            <div className="flex flex-wrap gap-2">
              {visibleTools.map((tool) => {
                const isSelected = activeTechId === tool.id;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setActiveTechId(tool.id)}
                    aria-pressed={isSelected}
                    className={`min-h-[40px] px-3.5 py-1.5 rounded-xl font-mono text-xs border transition-colors ${
                      isSelected
                        ? 'bg-[#0B0E1A] border-[#0B0E1A] text-white font-semibold'
                        : 'bg-white border-[#0B0E1A]/15 text-[#0B0E1A] hover:border-[#C92A1D] hover:text-[#C92A1D]'
                    }`}
                  >
                    {tool.label}
                  </button>
                );
              })}
            </div>

            {/* Verified Competency Detail View */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#F5F4F0] border border-[#0B0E1A]/10 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="kx-display text-2xl text-[#0B0E1A] leading-none">
                  {selectedToolMeta.label}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#C92A1D] font-semibold">
                  {selectedToolCopy.tag}
                </span>
              </div>

              <p className="text-sm font-medium text-[#0B0E1A] leading-snug">
                {selectedToolCopy.punchline}
              </p>

              <p className="text-xs sm:text-sm text-[#4A5068] leading-relaxed">
                {selectedToolCopy.description}
              </p>

              {Array.isArray(selectedToolCopy.highlights) && (
                <div className="pt-2 border-t border-[#0B0E1A]/10">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#4A5068] mb-2">
                    {t.experience.focusLabel}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedToolCopy.highlights.map((hl) => (
                      <span
                        key={hl}
                        className="px-2.5 py-1 rounded-md bg-white border border-[#0B0E1A]/12 font-mono text-[11px] text-[#0B0E1A]"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Single Marquee on Entire Page: Dual-Row Opposing Stack Strip */}
      <div
        data-thread-anchor="experience-marquee"
        className="kx-marquee-wrap border-y border-[#0B0E1A]/12 bg-white py-6 sm:py-8 overflow-hidden select-none"
        aria-label="Engineering Stack Ticker"
      >
        <div className="kx-marquee-track flex items-center gap-8 mb-3">
          {[...MARQUEE_ROW_ONE, ...MARQUEE_ROW_ONE].map((item, idx) => (
            <span
              key={idx}
              className="kx-display italic text-3xl sm:text-5xl leading-none text-[#0B0E1A] whitespace-nowrap inline-flex items-center gap-8"
            >
              <span>{item}</span>
              <span className="text-[#C92A1D] text-xl not-italic" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </div>

        <div className="kx-marquee-track-reverse flex items-center gap-8">
          {[...MARQUEE_ROW_TWO, ...MARQUEE_ROW_TWO].map((item, idx) => (
            <span
              key={idx}
              className="kx-display italic text-3xl sm:text-5xl leading-none text-[#C92A1D] whitespace-nowrap inline-flex items-center gap-8"
            >
              <span>{item}</span>
              <span className="text-[#0B0E1A] text-xl not-italic" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
