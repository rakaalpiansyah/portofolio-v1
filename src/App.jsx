import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BackgroundSpatial from './components/BackgroundSpatial';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EngineeringManifesto from './components/EngineeringManifesto';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import InteractiveBottomNet from './components/InteractiveBottomNet';
import { LanguageProvider } from './context/LanguageContext';
import useParallaxLag from './hooks/useParallaxLag';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useParallaxLag(true);

  useEffect(() => {
    let isDisposed = false;
    let lenisInstance = null;
    let updateLenis = null;

    const initLenis = async () => {
      if (isDisposed || lenisInstance) return;
      removeTriggerListeners();

      try {
        const { default: Lenis } = await import('lenis');
        if (isDisposed) return;

        const lenis = new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        });

        lenisInstance = lenis;
        lenis.on('scroll', ScrollTrigger.update);

        updateLenis = (time) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateLenis);
        gsap.ticker.lagSmoothing(0);
      } catch (err) {
        // Fallback to native browser scrolling
      }
    };

    const removeTriggerListeners = () => {
      window.removeEventListener('wheel', initLenis);
      window.removeEventListener('touchstart', initLenis);
      window.removeEventListener('keydown', initLenis);
    };

    window.addEventListener('wheel', initLenis, { passive: true, once: true });
    window.addEventListener('touchstart', initLenis, { passive: true, once: true });
    window.addEventListener('keydown', initLenis, { passive: true, once: true });

    const idleTimer = setTimeout(initLenis, 2800);

    // Smooth anchor scrolling (works both before and after Lenis initializes)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            if (lenisInstance) {
              lenisInstance.scrollTo(target, { offset: -40, duration: 1.15 });
            } else {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      isDisposed = true;
      clearTimeout(idleTimer);
      removeTriggerListeners();
      document.removeEventListener('click', handleAnchorClick);
      if (updateLenis) gsap.ticker.remove(updateLenis);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-black text-zinc-100 overflow-x-hidden selection:bg-sky-500/25 selection:text-sky-200">
        <CustomCursor />
        <BackgroundSpatial />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <EngineeringManifesto />
          <Skills />
          <Projects />
          <Experience />
          <div className="relative overflow-hidden w-full">
            <InteractiveBottomNet />
            <Contact />
            <Footer />
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
}
