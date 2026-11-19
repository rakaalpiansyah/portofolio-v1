import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from './components/CustomCursor';
import KineticThread from './components/KineticThread';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Capabilities from './components/Capabilities';
import EngineeringManifesto from './components/EngineeringManifesto';
import Process from './components/Process';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

function PortfolioShell() {
  const wrapperRef = useRef(null);
  const lenisRef = useRef(null);
  const [activeTheme, setActiveTheme] = useState('light');
  const { lang, t } = useLanguage();

  // Initialize Lenis smooth scroll synced cleanly to GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isDisposed = false;
    let updateLenis = null;

    const initLenis = async () => {
      if (isDisposed || lenisRef.current) return;
      try {
        const { default: Lenis } = await import('lenis');
        if (isDisposed) return;

        const lenis = new Lenis({
          duration: 1.1,
          easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
        });

        lenisRef.current = lenis;
        lenis.on('scroll', ScrollTrigger.update);

        updateLenis = (time) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);
      } catch (err) {
        // Native scroll fallback
      }
    };

    initLenis();

    return () => {
      isDisposed = true;
      if (updateLenis) gsap.ticker.remove(updateLenis);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  // Track active canvas theme for Navbar & Cursor + keep ScrollTrigger aligned after fonts/lang changes
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const themeSections = Array.from(wrapper.querySelectorAll('[data-canvas-theme]'));
    const triggers = themeSections.map((sec) => {
      const theme = sec.getAttribute('data-canvas-theme') || 'light';
      return ScrollTrigger.create({
        trigger: sec,
        start: 'top 64px',
        end: 'bottom 64px',
        onEnter: () => setActiveTheme(theme),
        onEnterBack: () => setActiveTheme(theme),
      });
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      clearTimeout(refreshTimer);
      triggers.forEach((st) => st.kill());
    };
  }, [lang]);

  const scrollToTarget = (selectorOrEl) => {
    const target =
      typeof selectorOrEl === 'string' ? document.querySelector(selectorOrEl) : selectorOrEl;
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: 0, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToY = (yPos) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(yPos, { duration: 0.9 });
    } else {
      window.scrollTo({ top: yPos, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.15 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative min-h-screen w-full overflow-x-clip bg-white text-[#0B0E1A]"
    >
      <a href="#main-content" className="skip-link">
        {t.skipToContent}
      </a>

      <CustomCursor activeTheme={activeTheme} />
      <KineticThread wrapperRef={wrapperRef} activeTheme={activeTheme} lang={lang} />
      <Navbar activeTheme={activeTheme} onNavigate={scrollToTarget} />

      <main id="main-content" className="relative z-10 w-full">
        <Hero onNavigate={scrollToTarget} />
        <About />
        <Projects scrollToY={scrollToY} />
        <Capabilities onNavigate={scrollToTarget} />
        <EngineeringManifesto onNavigate={scrollToTarget} />
        <Process />
        <Experience />
        <Contact />
      </main>

      <Footer onNavigate={scrollToTarget} onScrollTop={scrollToTop} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioShell />
    </LanguageProvider>
  );
}
