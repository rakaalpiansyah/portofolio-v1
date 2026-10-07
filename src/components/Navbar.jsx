import React, { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, ScrollToPlugin, CustomEase, useGSAP } from '../lib/gsap';
import { useLanguage } from '../context/LanguageContext';

/**
 * Navbar:
 * - Smart hide on scroll down / reveal on scroll up.
 * - Smooth anchor navigation using ScrollToPlugin with custom "silk" ease.
 * - Active section tracking via ScrollTrigger with glowing lime node.
 * - Language switcher (ID / EN) + mobile slide-in menu.
 */
export default function Navbar({ isRevealed = true, lenisRef }) {
  const { lang, toggleLang, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'experience', label: t.nav.experience },
    { id: 'gallery', label: 'Gallery' },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  // 1. Scroll hide/show & Active Section Observer
  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Show/hide navbar based on scroll direction
    const showNav = gsap.from(nav, {
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: 'power2.out',
    }).progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        // Only toggle hide/show after scrolling past 120px
        if (self.scroll() > 120) {
          if (self.direction === 1) {
            showNav.reverse(); // Scrolling down -> hide
          } else {
            showNav.play(); // Scrolling up -> show
          }
        } else {
          showNav.play();
        }
      },
    });

    // Active Section Tracking via ScrollTrigger
    const sections = ['hero', 'about', 'skills', 'experience', 'gallery', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      }
    });
  }, { scope: navRef });

  // 2. Smooth Navigation Handler (ScrollToPlugin with 'silk' ease)
  const scrollTo = (targetId) => {
    setMobileOpen(false);
    const target = document.getElementById(targetId);
    if (!target) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(target, { offset: -60, duration: 1.4 });
    } else {
      gsap.to(window, {
        duration: 1.4,
        scrollTo: { y: target, offsetY: 60, autoKill: true },
        ease: CustomEase.get('silk'),
      });
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-[var(--nav-h)] transition-colors duration-300 bg-ink/75 backdrop-blur-md border-b border-line"
      >
        <div className="wrap h-full flex items-center justify-between">
          {/* Brand Mark */}
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="group flex items-center gap-3 text-left focus-visible:outline-none"
            aria-label="Scroll to top"
          >
            <div className="w-8 h-8 rounded-full border border-bone/25 flex items-center justify-center font-display font-bold text-xs text-bone group-hover:border-signal group-hover:text-signal transition-colors">
              RA
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-semibold text-sm tracking-tight text-bone group-hover:text-signal transition-colors">
                Raka Alpiansyah
              </span>
              <span className="text-[11px] font-mono text-bone-3 leading-none">
                Software &amp; AI
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-ink-900/90 border border-line px-2 py-1.5 rounded-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-ink font-semibold'
                      : 'text-bone-2 hover:text-bone'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-signal rounded-full -z-10 shadow-[0_0_16px_rgba(198,255,61,0.4)]"
                      style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language + Contact CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full border border-line text-xs font-mono font-medium text-bone-2 hover:text-bone hover:border-bone/40 transition-colors"
              title="Ganti Bahasa / Switch Language"
              aria-label={`Switch language, currently ${lang.toUpperCase()}`}
            >
              <span className={lang === 'id' ? 'text-signal font-bold' : ''}>ID</span>
              <span className="mx-1 text-bone-3">/</span>
              <span className={lang === 'en' ? 'text-signal font-bold' : ''}>EN</span>
            </button>

            {/* Quick Contact CTA */}
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bone text-ink text-xs font-semibold hover:bg-signal transition-colors shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-ink inline-block" />
              <span>{t.nav.contactCta || 'Get in Touch'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-bone hover:text-signal focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <div className="w-6 h-4 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transition-transform duration-300 ${
                    mobileOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-opacity duration-300 ${
                    mobileOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-transform duration-300 ${
                    mobileOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl lg:hidden flex flex-col justify-between p-8 pt-24"
        >
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono tracking-widest text-bone-3 uppercase">
              Navigation
            </span>
            <div className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="text-left font-display text-3xl font-semibold text-bone hover:text-signal transition-colors flex items-center justify-between py-2 border-b border-line"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-bone-3">0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 border-t border-line">
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="w-full btn btn-solid"
            >
              {t.nav.contactCta || 'Hubungi Saya'}
            </button>
            <div className="flex justify-between items-center text-xs font-mono text-bone-3">
              <span>Bandung, Indonesia</span>
              <span>Available for Hire</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
