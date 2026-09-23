import React, { useState } from 'react';
import { Mail, Github, Linkedin, Instagram, Send, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const emailAddress = 'rakaalpiansyah@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4500);
  };

  return (
    <section
      id="contact"
      className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
        Mari Terhubung &amp; Berkolaborasi
      </h2>
      <p className="text-zinc-400 text-sm sm:text-base max-w-lg mb-14">
        Terbuka untuk diskusi rekayasa perangkat lunak, peluang kerja sama proyek backend &amp; mobile, 
        atau penjajakan karier profesional.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contact Info Card */}
        <div className="md:col-span-5 card-surface p-7 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg text-white mb-5">
              Kanal Komunikasi
            </h3>

            {/* Email Box */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 mb-5">
              <div className="text-[11px] font-mono text-zinc-500 mb-1.5 flex items-center justify-between">
                <span>Alamat Email</span>
                {copied && (
                  <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                    <Check className="w-3 h-3" /> Disalin
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-zinc-200 truncate font-mono">{emailAddress}</span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-400 hover:text-white transition-colors flex-shrink-0"
                  title="Salin Email"
                  aria-label="Salin alamat email"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Social channels */}
            <div className="space-y-2">
              <a
                href="https://github.com/rakaalpiansyah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/40 hover:border-zinc-700 transition-colors"
              >
                <Github className="w-4 h-4 text-zinc-400" />
                <div>
                  <span className="text-sm text-zinc-200 block">GitHub</span>
                  <span className="text-[11px] text-zinc-500 font-mono">github.com/rakaalpiansyah</span>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/raka-alpiansyah-a7a1932b6?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/40 hover:border-zinc-700 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-zinc-400" />
                <div>
                  <span className="text-sm text-zinc-200 block">LinkedIn</span>
                  <span className="text-[11px] text-zinc-500 font-mono">linkedin.com/in/raka-alpiansyah</span>
                </div>
              </a>

              <a
                href="https://instagram.com/vcols_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/30 border border-zinc-800/40 hover:border-zinc-700 transition-colors"
              >
                <Instagram className="w-4 h-4 text-zinc-400" />
                <div>
                  <span className="text-sm text-zinc-200 block">Instagram</span>
                  <span className="text-[11px] text-zinc-500 font-mono">@vcols_</span>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/60 text-xs text-zinc-500 flex items-center justify-between">
            <span>Bandung / Ciamis, Indonesia</span>
            <span>Remote / On-site</span>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 card-surface p-7 rounded-2xl">
          <h3 className="font-heading font-semibold text-lg text-white mb-5">
            Kirimkan Pesan Langsung
          </h3>

          {formSubmitted ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-semibold text-white">Pesan Berhasil Terkirim</h4>
              <p className="text-zinc-300 text-sm">
                Terima kasih atas pesannya. Raka Alpiansyah akan segera merespons ke alamat email Anda.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1.5 text-xs font-medium">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-white placeholder:text-zinc-600 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1.5 text-xs font-medium">Alamat Email</label>
                  <input
                    type="email"
                    required
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-white placeholder:text-zinc-600 text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 text-xs font-medium">Topik / Keperluan</label>
                <input
                  type="text"
                  required
                  placeholder="Proyek Backend / Aplikasi Mobile / Peluang Kolaborasi"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-white placeholder:text-zinc-600 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 text-xs font-medium">Pesan</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Deskripsikan kebutuhan proyek atau pesan Anda..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-white placeholder:text-zinc-600 text-sm transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                Kirim Pesan
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
