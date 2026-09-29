import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-5 transition-all duration-300">
      <nav
        className={`w-full max-w-5xl flex items-center justify-between px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? 'nav-glass shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
            : 'bg-zinc-900/40 backdrop-blur-md border border-white/[0.06]'
        }`}
      >
        {/* Brand / Nameplate */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-zinc-100 group transition-opacity hover:opacity-90"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] group-hover:scale-125 transition-transform duration-200" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xs sm:text-sm text-white tracking-tight group-hover:text-sky-400 transition-colors">
              Raka Alpiansyah
            </span>
            <span className="text-[10px] text-zinc-400 font-mono -mt-0.5">
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
        <div className="sm:hidden flex items-center gap-2">
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            aria-label={t.nav.menuAria}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 p-5 rounded-2xl glass-surface flex flex-col gap-3 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs font-medium text-zinc-400">
            <span>{t.nav.mobileNavTitle}</span>
            <span className="font-mono text-[11px] text-zinc-500">Raka Alpiansyah</span>
          </div>

          <div className="flex flex-col gap-1 py-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-colors mt-2"
          >
            <span>{t.nav.contactCta}</span>
          </a>
        </div>
      )}
    </header>
  );
}
