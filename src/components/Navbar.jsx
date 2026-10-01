import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ isRevealed = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const { lang, setLang, t } = useLanguage();

  const closeMobileMenu = () => {
    if (!drawerRef.current) {
      setMobileMenuOpen(false);
      return;
    }
    gsap.to(drawerRef.current, {
      opacity: 0,
      y: -14,
      scale: 0.96,
      duration: 0.2,
      ease: 'power2.in',
    });
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setMobileMenuOpen(false),
      });
    } else {
      setTimeout(() => setMobileMenuOpen(false), 200);
    }
  };

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      setMobileMenuOpen(true);
    }
  };

  useEffect(() => {
    if (mobileMenuOpen && drawerRef.current) {
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
      }
      gsap.fromTo(
        drawerRef.current,
        { opacity: 0, y: -20, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
      );
      const items = drawerRef.current.querySelectorAll('.mobile-nav-item');
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.3, stagger: 0.045, ease: 'power2.out', delay: 0.08 }
        );
      }
      const footer = drawerRef.current.querySelector('.mobile-nav-footer');
      if (footer) {
        gsap.fromTo(
          footer,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', delay: 0.22 }
        );
      }
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!headerRef.current) return;
    if (isRevealed) {
      gsap.fromTo(
        headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out', delay: 0.1 }
      );
    } else {
      gsap.set(headerRef.current, { y: -60, opacity: 0 });
    }
  }, [isRevealed]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-5 transition-all duration-300"
    >
      <nav
        className={`w-full max-w-5xl flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'nav-glass shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : 'bg-zinc-900/40 backdrop-blur-md border border-white/[0.06]'
        }`}
      >
        {/* Brand / Nameplate */}
        <a
          href="#"
          className="flex items-center gap-2.5 sm:gap-3 text-zinc-100 group transition-all shrink-0"
        >
          {/* 3D Character Avatar (Transparent WebP) */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-900 border border-white/15 p-0.5 group-hover:border-sky-400/60 group-hover:shadow-[0_0_14px_rgba(56,189,248,0.3)] transition-all duration-300 shrink-0 overflow-hidden">
            <img
              src="/avatar.webp"
              alt="Raka Alpiansyah"
              width="36"
              height="36"
              className="w-full h-full object-cover object-top rounded-full block group-hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          </div>

          {/* Name & Title */}
          <div className="flex flex-col text-left">
            <span className="font-heading font-bold text-xs sm:text-[15px] text-white tracking-tight group-hover:text-sky-300 transition-colors leading-tight whitespace-nowrap">
              Raka Alpiansyah
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 tracking-wider uppercase leading-tight whitespace-nowrap">
              {t.nav.softwareEngineer}
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 glass-pill px-2.5 py-1 rounded-full">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Language Switcher & CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Switcher Pill */}
          <div className="inline-flex items-center p-0.5 rounded-full glass-pill text-[11px] font-mono select-none">
            <button
              onClick={() => setLang('id')}
              className={`px-2.5 py-0.5 rounded-full transition-all duration-150 ${
                lang === 'id'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Bahasa Indonesia"
              aria-label="Pilih Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-0.5 rounded-full transition-all duration-150 ${
                lang === 'en'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="English"
              aria-label="Select English"
            >
              EN
            </button>
          </div>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 active:scale-95 transition-all duration-150 shadow-sm"
          >
            <span>{t.nav.contactCta}</span>
          </a>
        </div>

        {/* Mobile: Lang Switcher & Menu Button */}
        <div className="sm:hidden flex items-center gap-1.5 shrink-0">
          {/* Quick Mobile Language Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-full glass-pill text-[10px] font-mono select-none">
            <button
              onClick={() => setLang('id')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'id'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400'
              }`}
              aria-label="ID"
            >
              ID
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'en'
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400'
              }`}
              aria-label="EN"
            >
              EN
            </button>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl text-zinc-300 hover:text-white bg-zinc-900/80 border border-white/10 hover:border-sky-400/40 active:scale-90 transition-all duration-200"
            aria-label={t.nav.menuAria}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`w-4 h-[1.5px] bg-current rounded-full transform transition-all duration-300 origin-center ${
                mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-current rounded-full transition-all duration-200 ${
                mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-current rounded-full transform transition-all duration-300 origin-center ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur */}
          <div
            ref={overlayRef}
            onClick={closeMobileMenu}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            aria-hidden="true"
          />

          {/* Floating Glass Drawer */}
          <div
            ref={drawerRef}
            className="md:hidden fixed inset-x-4 top-[74px] p-5 rounded-3xl bg-zinc-950/95 border border-white/10 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_30px_rgba(56,189,248,0.12)] flex flex-col gap-3.5 z-50 overflow-hidden"
          >
            {/* Top specular hairline */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-medium text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="font-mono text-[11px] tracking-wider uppercase text-zinc-400">
                  {t.nav.mobileNavTitle || 'Navigasi'}
                </span>
              </div>
              <span className="font-mono text-[11px] text-zinc-500">Raka Alpiansyah</span>
            </div>

            {/* Staggered Nav Items */}
            <div className="flex flex-col gap-1 py-1">
              {navLinks.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="mobile-nav-item group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.1] transition-all duration-150"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-zinc-500 group-hover:text-sky-400 transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </a>
              ))}
            </div>

            {/* Drawer Footer: Language Switcher & Contact CTA */}
            <div className="mobile-nav-footer flex flex-col gap-3 pt-3 border-t border-white/[0.08]">
              {/* Language Switcher Row Inside Menu */}
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-zinc-900/80 border border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span>{lang === 'id' ? 'Bahasa / Language' : 'Language / Bahasa'}</span>
                </div>
                <div className="inline-flex items-center p-0.5 rounded-full bg-zinc-950 border border-white/10 text-xs font-mono select-none">
                  <button
                    onClick={() => setLang('id')}
                    className={`px-3 py-1 rounded-full transition-all duration-200 ${
                      lang === 'id'
                        ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    aria-label="Bahasa Indonesia"
                  >
                    ID
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-full transition-all duration-200 ${
                      lang === 'en'
                        ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    aria-label="English"
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Contact CTA */}
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-zinc-950 bg-white hover:bg-zinc-200 active:scale-[0.98] transition-all duration-150 shadow-sm"
              >
                <span>{t.nav.contactCta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
