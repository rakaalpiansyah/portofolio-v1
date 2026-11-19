import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ArrowUpRight, MapPin } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

function RollLink({ href, label, suffix, onClick, className = '' }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`kx-roll-link h-5 leading-5 text-xs font-semibold uppercase tracking-[0.08em] px-1 ${className}`}
    >
      <span className="kx-roll-track">
        <span className="flex items-center gap-1 h-5 leading-5 whitespace-nowrap">
          <span>{label}</span>
          {suffix && <span className="opacity-75 font-mono text-[11px]">{suffix}</span>}
        </span>
        <span
          aria-hidden="true"
          className="flex items-center gap-1 h-5 leading-5 whitespace-nowrap"
        >
          <span>{label}</span>
          {suffix && <span className="opacity-75 font-mono text-[11px]">{suffix}</span>}
        </span>
      </span>
    </a>
  );
}

export default function Navbar({ activeTheme = 'light', onNavigate }) {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bandungTime, setBandungTime] = useState('');

  const overlayRef = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setBandungTime(`${formatted} WIB`);
      } catch (e) {
        setBandungTime('WIB');
      }
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && overlayRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          overlayRef.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.48, ease: 'power4.inOut' }
        );
        gsap.fromTo(
          '.kx-menu-item',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.42, stagger: 0.045, delay: 0.16, ease: 'power3.out' }
        );
      }, overlayRef);

      setTimeout(() => closeBtnRef.current?.focus(), 100);

      return () => {
        document.body.style.overflow = prevOverflow;
        ctx.revert();
      };
    }

    setTimeout(() => closeBtnRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
    }
    if (onNavigate) {
      onNavigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects, suffix: t.nav.workCount },
    { href: '#capabilities', label: t.nav.capabilities },
    { href: '#process', label: t.nav.process },
    { href: '#experience', label: t.nav.experience },
    { href: '#contact', label: t.nav.contact },
  ];

  // Explicit high-contrast surface adaptation per active canvas theme (1 glass element max: scrolled header bar)
  const themeClasses = {
    light: {
      bar: scrolled
        ? 'bg-white/90 backdrop-blur-md border-b border-[#0B0E1A]/10 text-[#0B0E1A]'
        : 'bg-transparent text-[#0B0E1A]',
      muted: 'text-[#4A5068]',
      hover: 'hover:text-[#C92A1D]',
      pillWrap: 'border-[#0B0E1A]/15 bg-white',
      langActive: 'bg-[#0B0E1A] text-white',
      langIdle: 'text-[#4A5068] hover:text-[#0B0E1A]',
      menuBtn: 'border-[#0B0E1A]/25 text-[#0B0E1A] hover:border-[#C92A1D] hover:text-[#C92A1D]',
    },
    mist: {
      bar: scrolled
        ? 'bg-[#F5F4F0]/90 backdrop-blur-md border-b border-[#0B0E1A]/10 text-[#0B0E1A]'
        : 'bg-transparent text-[#0B0E1A]',
      muted: 'text-[#4A5068]',
      hover: 'hover:text-[#C92A1D]',
      pillWrap: 'border-[#0B0E1A]/15 bg-white',
      langActive: 'bg-[#0B0E1A] text-white',
      langIdle: 'text-[#4A5068] hover:text-[#0B0E1A]',
      menuBtn: 'border-[#0B0E1A]/25 text-[#0B0E1A] hover:border-[#C92A1D] hover:text-[#C92A1D]',
    },
    dark: {
      bar: scrolled
        ? 'bg-[#080A12]/88 backdrop-blur-md border-b border-white/12 text-[#F8F9FC]'
        : 'bg-transparent text-[#F8F9FC]',
      muted: 'text-[#A3AAC2]',
      hover: 'hover:text-[#FF5B4D]',
      pillWrap: 'border-white/15 bg-[#111524]',
      langActive: 'bg-[#F8F9FC] text-[#080A12]',
      langIdle: 'text-[#A3AAC2] hover:text-white',
      menuBtn: 'border-white/25 text-white hover:border-[#FF5B4D] hover:text-[#FF5B4D]',
    },
    accent: {
      bar: scrolled
        ? 'bg-[#C92A1D]/92 backdrop-blur-md border-b border-white/20 text-white'
        : 'bg-transparent text-white',
      muted: 'text-white/90',
      hover: 'hover:text-[#FFD8D2]',
      pillWrap: 'border-white/30 bg-[#9E1F14]',
      langActive: 'bg-white text-[#C92A1D]',
      langIdle: 'text-white/90 hover:text-white',
      menuBtn: 'border-white/40 text-white hover:bg-white hover:text-[#C92A1D]',
    },
  }[activeTheme] || {
    bar: 'bg-white/90 backdrop-blur-md text-[#0B0E1A]',
    muted: 'text-[#4A5068]',
    hover: 'hover:text-[#C92A1D]',
    pillWrap: 'border-[#0B0E1A]/15 bg-white',
    langActive: 'bg-[#0B0E1A] text-white',
    langIdle: 'text-[#4A5068] hover:text-[#0B0E1A]',
    menuBtn: 'border-[#0B0E1A]/25 text-[#0B0E1A]',
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 md:h-[72px] transition-colors duration-300 ${themeClasses.bar}`}
      >
        <nav
          aria-label="Main Navigation"
          className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4"
        >
          {/* Left: Brand & Location */}
          <div className="flex items-center gap-5 shrink-0">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="kx-display text-2xl sm:text-3xl tracking-tight leading-none flex items-baseline gap-0.5 py-2"
            >
              <span>RAKA</span>
              <span className={activeTheme === 'accent' ? 'text-[#FFD8D2]' : activeTheme === 'dark' ? 'text-[#FF5B4D]' : 'text-[#C92A1D]'}>
                .
              </span>
            </a>

            <span
              className={`hidden xl:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.08em] whitespace-nowrap ${themeClasses.muted}`}
            >
              <MapPin weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.nav.location}</span>
            </span>
          </div>

          {/* Center: Single-line Editorial Nav Links */}
          <div className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <RollLink
                key={item.href}
                href={item.href}
                label={item.label}
                suffix={item.suffix}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`transition-colors ${themeClasses.hover}`}
              />
            ))}
          </div>

          {/* Right: Language Switch + Menu Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div
              className={`inline-flex items-center p-1 rounded-full border text-[11px] font-mono ${themeClasses.pillWrap}`}
              role="group"
              aria-label="Language switch"
            >
              <button
                type="button"
                onClick={() => setLang('id')}
                aria-pressed={lang === 'id'}
                className={`min-w-[34px] min-h-[32px] px-2.5 rounded-full font-semibold transition-colors ${
                  lang === 'id' ? themeClasses.langActive : themeClasses.langIdle
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`min-w-[34px] min-h-[32px] px-2.5 rounded-full font-semibold transition-colors ${
                  lang === 'en' ? themeClasses.langActive : themeClasses.langIdle
                }`}
              >
                EN
              </button>
            </div>

            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.nav.menuAria}
              aria-expanded={menuOpen}
              className={`min-h-[44px] px-3.5 sm:px-4 rounded-full border inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-colors active:scale-[0.98] ${themeClasses.menuBtn}`}
            >
              <span className="flex flex-col items-end gap-[3.5px] w-4" aria-hidden="true">
                <span className="w-full h-[1.5px] bg-current" />
                <span className="w-2/3 h-[1.5px] bg-current" />
                <span className="w-full h-[1.5px] bg-current" />
              </span>
              <span>{t.nav.menuLabel}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Swiss Signal Vermilion Navigation Overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Overlay"
          className="fixed inset-0 z-[80] bg-[#C92A1D] text-white kx-grid-accent overflow-y-auto"
        >
          <div className="max-w-[1440px] mx-auto min-h-[100dvh] px-4 sm:px-8 py-5 flex flex-col justify-between gap-10">
            {/* Top Bar */}
            <div className="flex items-center justify-between h-14">
              <span className="kx-display text-3xl tracking-tight text-white">
                RAKA ALPIANSYAH
              </span>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  menuBtnRef.current?.focus();
                }}
                aria-label={t.nav.closeAria}
                className="min-h-[44px] px-4 rounded-full border border-white/40 text-white hover:bg-white hover:text-[#C92A1D] inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
              >
                <X weight="bold" className="w-4 h-4" aria-hidden="true" />
                <span>{t.nav.closeLabel}</span>
              </button>
            </div>

            {/* Main Links + Metadata */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 my-auto py-4">
              <div className="lg:col-span-7 flex flex-col gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/90 mb-2">
                  {t.nav.navigationHeading}
                </p>
                {navItems.map((item, idx) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="kx-menu-item group flex items-baseline gap-4 sm:gap-6 py-2 border-b border-white/20 hover:border-white transition-colors"
                  >
                    <span className="font-mono text-xs sm:text-sm text-white/90 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="kx-display text-5xl sm:text-6xl md:text-7xl text-white group-hover:translate-x-2 transition-transform duration-200">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      weight="bold"
                      className="w-6 h-6 text-white ml-auto opacity-75 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between gap-8 lg:pl-8 lg:border-l border-white/20">
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/90 mb-2">
                      {t.nav.softwareEngineer}
                    </p>
                    <p className="text-lg font-medium text-white">{t.nav.available}</p>
                    <p className="text-sm text-white/90 mt-1">{t.nav.location}</p>
                  </div>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/90 mb-2">
                      Direct Email
                    </p>
                    <a
                      href="mailto:rakaalpiansyah@gmail.com"
                      className="text-xl sm:text-2xl font-semibold underline underline-offset-4 text-white hover:text-[#FFD8D2] transition-colors break-all"
                    >
                      rakaalpiansyah@gmail.com
                    </a>
                  </div>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/90 mb-3">
                      {t.nav.socialHeading}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { name: 'GitHub', href: 'https://github.com/rakaalpiansyah' },
                        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rakaalpiansyah' },
                        { name: 'Instagram', href: 'https://www.instagram.com/vcols_/' },
                      ].map((soc) => (
                        <a
                          key={soc.name}
                          href={soc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] px-4 rounded-full border border-white/35 text-white hover:bg-white hover:text-[#C92A1D] inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] transition-colors"
                        >
                          <span>{soc.name}</span>
                          <ArrowUpRight weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/20">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/85 block">
                      {t.nav.localTimeLabel}
                    </span>
                    <span className="font-mono text-sm font-semibold tabular-nums text-white">
                      {bandungTime}
                    </span>
                  </div>

                  <div className="inline-flex items-center p-1 rounded-full bg-[#9E1F14] border border-white/30 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setLang('id')}
                      aria-pressed={lang === 'id'}
                      className={`min-h-[36px] px-3 rounded-full font-semibold transition-colors ${
                        lang === 'id' ? 'bg-white text-[#C92A1D]' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      ID
                    </button>
                    <button
                      type="button"
                      onClick={() => setLang('en')}
                      aria-pressed={lang === 'en'}
                      className={`min-h-[36px] px-3 rounded-full font-semibold transition-colors ${
                        lang === 'en' ? 'bg-white text-[#C92A1D]' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
