import React from 'react';
import { gsap, CustomEase } from '../lib/gsap';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp } from 'lucide-react';

/**
 * Footer:
 * - Monumental closing typography in Clash Display.
 * - Smooth Back to Top action with custom 'silk' ease.
 * - Social links & copyright.
 */
export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      gsap.to(window, {
        duration: 1.4,
        scrollTo: { y: 0, autoKill: true },
        ease: CustomEase.get('silk'),
      });
    }
  };

  return (
    <footer className="relative border-t border-line bg-ink py-16 wrap overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <span className="text-xs font-mono text-signal tracking-widest uppercase block mb-2">
            Raka Alpiansyah
          </span>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl text-bone tracking-tight">
            Software &amp; AI Engineer.
          </h2>
        </div>

        {/* Back to top magnetic button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="btn btn-ghost text-xs group"
          aria-label="Back to top"
        >
          <span>{t.footer?.backToTop || 'Kembali ke atas'}</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-line text-xs font-mono text-bone-3">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/rakaalpiansyah"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-signal transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/raka-alpiansyah-a7a1932b6?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-signal transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/vcols_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-signal transition-colors"
          >
            Instagram
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Raka Alpiansyah.</span>
          <span>Bandung, ID.</span>
        </div>
      </div>
    </footer>
  );
}
