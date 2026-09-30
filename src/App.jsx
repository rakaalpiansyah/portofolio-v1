import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CinematicIntro from './components/CinematicIntro';
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
import { LanguageProvider } from './context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor scrolling using Lenis
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -40, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const [isRevealed, setIsRevealed] = useState(false);

  const handleStartReveal = () => {
    setIsRevealed(true);
  };

  const handleIntroComplete = () => {
    setIsRevealed(true);
    setIntroComplete(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-black text-zinc-100 overflow-x-hidden selection:bg-sky-500/25 selection:text-sky-200">
        {!introComplete && (
          <CinematicIntro
            onStartReveal={handleStartReveal}
            onComplete={handleIntroComplete}
          />
        )}
        <CustomCursor />
        <BackgroundSpatial />
        <Navbar isRevealed={isRevealed} />
        <main className="relative z-10">
          <Hero isRevealed={isRevealed} />
          <About />
          <EngineeringManifesto />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
