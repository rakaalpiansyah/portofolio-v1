import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Tentang', href: '#about' },
    { label: 'Keahlian', href: '#skills' },
    { label: 'Proyek', href: '#projects' },
    { label: 'Pengalaman', href: '#experience' },
    { label: 'Kontak', href: '#contact' },
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
        {/* Monogram / Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-zinc-100 group transition-opacity hover:opacity-90"
        >
          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700/80 flex items-center justify-center font-heading font-bold text-xs text-white group-hover:border-sky-400 transition-colors">
            RA
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-semibold text-xs sm:text-sm text-white tracking-tight">
              Raka Alpiansyah
            </span>
            <span className="text-[10px] text-zinc-400 font-mono -mt-0.5">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/60 px-2.5 py-1 rounded-full border border-zinc-800/60">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1 rounded-full text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Status indicator & CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[11px] font-mono text-zinc-400">
            Ciamis / Bandung
          </span>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-all duration-150"
          >
            <span>Hubungi</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          aria-label="Buka menu navigasi"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 p-5 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col gap-3 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 text-xs font-medium text-zinc-400">
            <span>Navigasi</span>
            <span className="font-mono text-[11px] text-zinc-500">Raka Alpiansyah</span>
          </div>

          <div className="flex flex-col gap-1 py-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
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
            <span>Hubungi Saya</span>
          </a>
        </div>
      )}
    </header>
  );
}
