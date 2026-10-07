import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/gsap';

import Preloader from './components/Preloader';
import ThreeCanvas from './components/ThreeCanvas';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    window.__lenis = lenis;

    // Link Lenis scroll event to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
    // Refresh ScrollTrigger once fonts and DOM are stable
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-ink text-bone overflow-x-clip selection:bg-signal selection:text-ink">
        {/* Cinematic Preloader Curtain */}
        <Preloader onComplete={handlePreloaderComplete} />

        {/* Ambient Film Grain Overlay */}
        <div className="grain" aria-hidden="true" />

        {/* Interactive Custom Follower Cursor */}
        <CustomCursor />

        {/* Fixed Full-Screen WebGL Canvas behind UI */}
        <ThreeCanvas />

        {/* Floating Smart Header Navigation */}
        <Navbar isRevealed={isLoaded} />

        {/* Main Content Sections (Strict Flow Order) */}
        <main className="relative z-10">
          <Hero isRevealed={isLoaded} />
          <About />
          <Skills />
          <Experience />
          {/* New Section: Gallery placed directly below Experience */}
          <Gallery />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
