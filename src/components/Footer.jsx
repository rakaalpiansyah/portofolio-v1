import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-zinc-800/80 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-heading font-semibold text-sm text-white">
            Raka Alpiansyah
          </span>
          <span className="text-zinc-500 text-xs font-mono">
            &copy; {new Date().getFullYear()} Software Engineer.
          </span>
        </div>

        {/* Links & Back to top */}
        <div className="flex items-center gap-4 text-zinc-400">
          <a
            href="https://github.com/rakaalpiansyah"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub Raka Alpiansyah"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/raka-alpiansyah-a7a1932b6?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn Raka Alpiansyah"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="https://instagram.com/vcols_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Instagram @vcols_"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href="mailto:rakaalpiansyah@gmail.com"
            className="hover:text-white transition-colors"
            aria-label="Email Raka Alpiansyah"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 ml-2 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
