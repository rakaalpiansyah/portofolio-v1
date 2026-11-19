import React, { useEffect, useState } from 'react';
import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onNavigate, onScrollTop }) {
  const { t } = useLanguage();
  const [bandungTime, setBandungTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setBandungTime(`Bandung, ID / ${timeStr} WIB`);
      } catch (err) {
        setBandungTime('Bandung, ID / WIB');
      }
    };
    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      data-canvas-theme="accent"
      className="relative w-full bg-[#C92A1D] text-white pt-16 pb-8 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* Top Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-4 space-y-4">
            <span className="kx-display text-3xl sm:text-4xl text-white leading-none block">
              RAKA ALPIANSYAH
            </span>
            <p className="text-sm text-white leading-relaxed max-w-[38ch]">{t.footer.bio}</p>
            <a
              href="mailto:rakaalpiansyah@gmail.com"
              className="inline-block font-mono text-xs sm:text-sm underline underline-offset-4 text-white hover:text-[#FFD8D2] transition-colors"
            >
              rakaalpiansyah@gmail.com
            </a>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#FFD8D2]">
              {t.footer.navTitle}
            </p>
            <ul className="space-y-1.5 text-sm">
              {[
                { href: '#hero', label: 'Home' },
                { href: '#about', label: t.nav.about },
                { href: '#projects', label: t.nav.projects },
                { href: '#capabilities', label: t.nav.capabilities },
                { href: '#process', label: t.nav.process },
                { href: '#experience', label: t.nav.experience },
                { href: '#contact', label: t.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLink(e, link.href)}
                    className="text-white hover:text-[#FFD8D2] transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#FFD8D2]">
              {t.footer.projectsTitle}
            </p>
            <ul className="space-y-1.5 text-sm">
              {t.projects.items.slice(0, 5).map((item) => (
                <li key={item.shortTitle}>
                  <a
                    href="#projects"
                    onClick={(e) => handleLink(e, '#projects')}
                    className="text-white hover:text-[#FFD8D2] transition-colors inline-block py-0.5"
                  >
                    {item.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-5">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#FFD8D2]">
                {t.footer.socialTitle}
              </p>
              <ul className="space-y-1.5 text-sm">
                {[
                  { name: 'GitHub', href: 'https://github.com/rakaalpiansyah' },
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rakaalpiansyah' },
                  { name: 'Instagram', href: 'https://www.instagram.com/vcols_/' },
                ].map((soc) => (
                  <li key={soc.name}>
                    <a
                      href={soc.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="text-white hover:text-[#FFD8D2] transition-colors inline-flex items-center gap-1 py-0.5"
                    >
                      <span>{soc.name}</span>
                      <ArrowUpRight weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#FFD8D2] mb-1">
                {t.footer.timeTitle}
              </p>
              <p className="font-mono text-xs sm:text-sm font-semibold tabular-nums text-white">
                {bandungTime}
              </p>
            </div>
          </div>
        </div>

        {/* Giant Edge-to-Edge Wordmark */}
        <div className="select-none overflow-hidden py-2" aria-hidden="true">
          <div className="kx-display text-[clamp(5.2rem,24vw,21rem)] leading-[0.8] tracking-[-0.03em] text-center flex items-center justify-center">
            <span
              className="kx-wordmark-clipped kx-wordmark-outline inline-block"
              style={{ backgroundImage: "url('./projects/agritrace-chain.png')" }}
            >
              RAKA
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Thread Terminus Back-to-Top */}
        <div className="pt-6 border-t border-white/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white text-center sm:text-left">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>

          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-white hidden md:inline">
            {t.footer.builtIn}
          </span>

          <button
            type="button"
            onClick={onScrollTop}
            data-thread-anchor="footer-top"
            data-thread-loop="circle"
            className="min-h-[44px] px-5 py-2 rounded-full border border-white/45 text-white hover:bg-white hover:text-[#C92A1D] inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
          >
            <span>{t.footer.backToTop}</span>
            <ArrowUp weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
