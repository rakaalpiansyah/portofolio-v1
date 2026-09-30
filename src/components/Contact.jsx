import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Instagram, Send, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'fallback' | null
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const emailAddress = 'rakaalpiansyah@gmail.com';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[Portfolio] Pesan Baru dari ${formData.name}: ${formData.subject}`,
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('FormSubmit network response not ok');
      }
    } catch (err) {
      // Graceful fallback: Open mailto client with prefilled draft
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        formData.subject || 'Pesan dari Portofolio'
      )}&body=${encodeURIComponent(
        `Halo Raka,\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitStatus('fallback');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      <div ref={contentRef}>
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight mb-4">
          {t.contact.heading}
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-lg mb-14">
          {t.contact.subtitle}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contact Info Card */}
        <div className="md:col-span-5 card-surface p-7 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg text-white mb-5">
              {t.contact.channelsTitle}
            </h3>

            {/* Email Box */}
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 mb-5">
              <div className="text-[11px] font-mono text-zinc-500 mb-1.5 flex items-center justify-between">
                <span>{t.contact.emailLabel}</span>
                {copied && (
                  <span className="text-emerald-400 text-[10px] font-mono flex items-center gap-1">
                    <Check className="w-3 h-3" /> {t.contact.copied}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-zinc-200 truncate font-mono">{emailAddress}</span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-400 hover:text-white active:scale-90 transition-all duration-100 flex-shrink-0"
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
            <span>{t.contact.location}</span>
            <span>{t.contact.mode}</span>
          </div>
        </div>

        {/* Message Form */}
        <div className="md:col-span-7 card-surface p-7 rounded-2xl">
          <h3 className="font-heading font-semibold text-lg text-white mb-5">
            {t.contact.formTitle}
          </h3>

          {submitStatus === 'success' ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-semibold text-white text-base">{t.contact.successTitle}</h4>
              <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                {t.contact.successDesc} <span className="text-emerald-400 font-mono text-xs">{emailAddress}</span>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus(null)}
                className="mt-3 px-5 py-2 rounded-xl text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                {t.contact.sendAnother}
              </button>
            </div>
          ) : submitStatus === 'fallback' ? (
            <div className="p-8 rounded-xl bg-sky-500/10 border border-sky-500/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-semibold text-white text-base">{t.contact.fallbackTitle}</h4>
              <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                {t.contact.fallbackDesc} <span className="text-sky-400 font-mono text-xs">{emailAddress}</span>.
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus(null)}
                className="mt-3 px-5 py-2 rounded-xl text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                {t.contact.backToForm}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1.5 text-xs font-medium">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-white placeholder:text-zinc-600 text-sm transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 mb-1.5 text-xs font-medium">{t.contact.emailInputLabel}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@contoh.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-white placeholder:text-zinc-600 text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 text-xs font-medium">{t.contact.topicLabel}</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.contact.topicPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-white placeholder:text-zinc-600 text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1.5 text-xs font-medium">{t.contact.messageLabel}</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800 focus:border-zinc-600 focus:outline-none text-white placeholder:text-zinc-600 text-sm transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl text-sm font-medium text-zinc-950 bg-white hover:bg-zinc-200 active:scale-95 transition-all duration-100 flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                    <span>{t.contact.sending}</span>
                  </>
                ) : (
                  <>
                    <span>{t.contact.sendBtn}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <a
                  href={`mailto:${emailAddress}?subject=${encodeURIComponent(
                    formData.subject || (t.contact.topicPlaceholder)
                  )}`}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  {t.contact.orMailto}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}
