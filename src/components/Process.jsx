import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef(null);
  const stepCardRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);
  const [frameTick, setFrameTick] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setFrameTick((prev) => (prev + 1) % 3600);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      stepCardRefs.current.forEach((card, idx) => {
        if (!card) return;
        ScrollTrigger.create({
          trigger: card,
          start: 'top 56%',
          end: 'bottom 44%',
          onEnter: () => setActiveStep(idx),
          onEnterBack: () => setActiveStep(idx),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const formatTimecode = (tick) => {
    const mins = String(Math.floor(tick / 600)).padStart(2, '0');
    const secs = String(Math.floor((tick % 600) / 10)).padStart(2, '0');
    const frames = String((tick % 10) * 2 + 14).padStart(2, '0');
    return `00:${mins}:${secs}:${frames}`;
  };

  const steps = t.process.steps;
  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      id="process"
      ref={sectionRef}
      data-canvas-theme="light"
      className="relative w-full bg-white text-[#0B0E1A] py-20 md:py-28 px-4 sm:px-8 border-t border-[#0B0E1A]/10"
    >
      <div className="max-w-[1440px] mx-auto space-y-12 md:space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#4A5068] mb-4">
            <span className="text-[#C92A1D] font-semibold">(06)</span>
            <span>{t.process.indexLabel}</span>
          </div>
          <h2 className="kx-display text-[clamp(2.8rem,6.2vw,5.25rem)] leading-[0.86] text-[#0B0E1A] mb-4">
            <span className="block">{t.process.headingLine1}</span>
            <span className="block text-[#C92A1D]">{t.process.headingLine2}</span>
          </h2>
          <p className="text-sm sm:text-base text-[#4A5068] max-w-[54ch] leading-relaxed">
            {t.process.subtext}
          </p>
        </div>

        {/* 12-Column Sticky Monitor + Ordered Engineering Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 5 Columns: Sticky 4:5 Viewfinder Monitor with Vertical Clip-Path Wipe */}
          <div className="lg:col-span-5 lg:sticky lg:top-[14vh]">
            <div className="relative w-full aspect-[4/5] rounded-2xl bg-[#080A12] overflow-hidden border border-[#0B0E1A]/15">
              {steps.map((step, idx) => {
                const isShown = idx <= activeStep;
                return (
                  <img
                    key={step.num}
                    src={step.image}
                    alt={step.title}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-[clip-path] duration-300 ease-out"
                    style={{
                      clipPath: isShown ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                      zIndex: idx + 1,
                    }}
                  />
                );
              })}

              {/* Scrim & Scanlines */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080A12] via-[#080A12]/25 to-[#080A12]/65 z-10 pointer-events-none" />
              <div className="kx-scan absolute inset-0 z-10 pointer-events-none opacity-45" />

              {/* Viewfinder Corner Brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/80 z-20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/80 z-20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/80 z-20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/80 z-20 pointer-events-none" />

              {/* Top Viewfinder Readout */}
              <div className="absolute top-5 inset-x-7 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-white z-20">
                <span>
                  {t.process.stepPrefix} {currentStep.num} / 0{steps.length}
                </span>
                <span className="inline-flex items-center gap-1.5 tabular-nums">
                  <span className="w-2 h-2 rounded-full bg-[#FF3B30] kx-rec-blink" aria-hidden="true" />
                  <span>{formatTimecode(frameTick)}</span>
                </span>
              </div>

              {/* Bottom Stage Caption + 4-Segment Progress Bar */}
              <div className="absolute bottom-6 inset-x-7 z-20 space-y-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#FF5B4D] mb-1">
                    {currentStep.tag}
                  </p>
                  <h3 className="kx-display text-3xl sm:text-4xl text-white leading-none">
                    {currentStep.title}
                  </h3>
                </div>

                <div className="grid grid-cols-4 gap-2" aria-hidden="true">
                  {steps.map((s, idx) => (
                    <span
                      key={s.num}
                      className={`h-1 rounded-full transition-colors duration-300 ${
                        idx <= activeStep ? 'bg-[#FF5B4D]' : 'bg-white/25'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: 4 Engineering Phase Cards */}
          <ol className="lg:col-span-7 space-y-5">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <li
                  key={step.num}
                  ref={(el) => {
                    stepCardRefs.current[idx] = el;
                  }}
                  data-thread-anchor={idx === 1 ? 'process-steps' : undefined}
                  data-thread-loop={idx === 1 ? 'circle' : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    aria-pressed={isActive}
                    className={`relative w-full text-left p-6 sm:p-8 rounded-2xl border transition-colors duration-200 overflow-hidden ${
                      isActive
                        ? 'bg-[#F5F4F0] border-[#C92A1D]'
                        : 'bg-white border-[#0B0E1A]/12 hover:border-[#0B0E1A]/35'
                    }`}
                  >
                    {/* Animated Left Vermilion Active Rail */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#C92A1D] origin-top transition-transform duration-300"
                      style={{ transform: `scaleY(${isActive ? 1 : 0})` }}
                    />

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-semibold text-[#4A5068]">
                        {step.num} /
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] px-3 py-1 rounded-full border border-[#0B0E1A]/15 bg-white text-[#0B0E1A]">
                        {step.tag}
                      </span>
                    </div>

                    <h3
                      className={`kx-display text-3xl sm:text-4xl leading-none mb-3 transition-colors ${
                        isActive ? 'text-[#C92A1D]' : 'text-[#0B0E1A]'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#4A5068] leading-relaxed max-w-[60ch] mb-4">
                      {step.desc}
                    </p>

                    <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.06em] text-[#0B0E1A]">
                      <span className="w-2 h-2 rounded-full bg-[#C92A1D] shrink-0" aria-hidden="true" />
                      <span className="font-semibold">{t.process.deliverableLabel}</span>
                      <span className="text-[#4A5068]">{step.deliverable}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
