import React, { useState, useRef } from 'react';
import { useGSAP } from '../lib/gsap';
import { revealChars } from '../lib/reveal';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Github, Linkedin, Instagram, Copy, Check, ArrowUpRight } from 'lucide-react';

/**
 * Contact:
 * - Direct email clipboard copy with real-time feedback.
 * - FormSubmit AJAX integration with prefilled mailto fallback.
 * - Oversized Clash Display typography + direct communication channels.
 */
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
  const containerRef = useRef(null);
  const headingRef = useRef(null);

  const emailAddress = 'rakaalpiansyah@gmail.com';

  useGSAP(() => {
    revealChars(headingRef.current, {
      trigger: headingRef.current,
      start: 'top 85%',
    });
  }, { scope: containerRef, dependencies: [t] });

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
    } catch {
      // Graceful fallback to mailto draft
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
      ref={containerRef}
      className="relative py-28 sm:py-36 wrap border-t border-line overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-16 sm:mb-20">
        <span className="text-xs font-mono text-bone-3 tracking-widest uppercase block mb-3">
          06 / Connection
        </span>
        <h2 ref={headingRef} className="h-section text-bone uppercase">
          {t.contact?.heading || "Let's Connect."}
        </h2>
        <p className="text-bone-2 text-sm sm:text-base max-w-xl mt-4">
          {t.contact?.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Direct Channels & Giant Email */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
          <div>
            <span className="text-xs font-mono text-bone-3 uppercase tracking-wider block mb-4">
              Direct Inquiries
            </span>
            <div className="p-6 bg-ink-900 border border-line mb-6">
              <span className="text-xs font-mono text-signal block mb-2">
                {t.contact?.emailLabel || 'Email Address'}
              </span>
              <a
                href={`mailto:${emailAddress}`}
                className="font-display font-semibold text-xl sm:text-2xl text-bone hover:text-signal transition-colors block break-all mb-4"
              >
                {emailAddress}
              </a>
              <button
                type="button"
                onClick={copyToClipboard}
                className="btn btn-ghost text-xs w-full py-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-signal" />
                    <span className="text-signal">{t.contact?.copied || 'Tersalin'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Alamat Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Location & Availability */}
            <div className="space-y-2 text-xs font-mono text-bone-3">
              <div className="flex justify-between py-2 border-b border-line">
                <span>Location</span>
                <span className="text-bone">Bandung, Indonesia</span>
              </div>
              <div className="flex justify-between py-2 border-b border-line">
                <span>Working Mode</span>
                <span className="text-bone">Remote / On-site</span>
              </div>
            </div>
          </div>

          {/* Social Network Channels */}
          <div>
            <span className="text-xs font-mono text-bone-3 uppercase tracking-wider block mb-4">
              Professional Networks
            </span>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/rakaalpiansyah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-line bg-ink-900 hover:border-signal/50 hover:text-signal text-bone transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4" />
                  <span className="font-mono text-xs">github.com/rakaalpiansyah</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.linkedin.com/in/raka-alpiansyah-a7a1932b6?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-line bg-ink-900 hover:border-signal/50 hover:text-signal text-bone transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4" />
                  <span className="font-mono text-xs">linkedin.com/in/raka-alpiansyah</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://instagram.com/vcols_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border border-line bg-ink-900 hover:border-signal/50 hover:text-signal text-bone transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4" />
                  <span className="font-mono text-xs">@vcols_</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7 bg-ink-900 border border-line p-8 sm:p-10">
          <h3 className="font-display font-semibold text-2xl text-bone mb-2">
            {t.contact?.formTitle || 'Kirimkan Pesan Langsung'}
          </h3>
          <p className="text-xs font-mono text-bone-3 mb-8">
            Pesan akan diteruskan langsung ke kotak masuk rakaalpiansyah@gmail.com
          </p>

          {submitStatus === 'success' ? (
            <div className="p-8 border border-signal bg-signal/10 text-center space-y-4">
              <span className="w-10 h-10 rounded-full bg-signal text-ink flex items-center justify-center mx-auto">
                <Check className="w-5 h-5 font-bold" />
              </span>
              <h4 className="font-display font-semibold text-xl text-bone">
                {t.contact?.successTitle || 'Pesan Berhasil Terkirim'}
              </h4>
              <p className="text-xs text-bone-2 font-mono">
                Terima kasih atas pesan Anda. Saya akan segera merespons.
              </p>
              <button
                type="button"
                onClick={() => setSubmitStatus(null)}
                className="btn btn-ghost text-xs mt-4"
              >
                {t.contact?.sendAnother || 'Kirim Pesan Lainnya'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-xs font-mono text-bone-3 block mb-2">
                    {t.contact?.nameLabel || 'Nama Lengkap'}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact?.namePlaceholder || 'Nama Anda'}
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-xs font-mono text-bone-3 block mb-2">
                    {t.contact?.emailInputLabel || 'Alamat Email'}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="text-xs font-mono text-bone-3 block mb-2">
                  {t.contact?.topicLabel || 'Topik / Keperluan'}
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.contact?.topicPlaceholder || 'Topik pembicaraan atau peluang'}
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs font-mono text-bone-3 block mb-2">
                  {t.contact?.messageLabel || 'Pesan Anda'}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact?.messagePlaceholder || 'Tulis pesan Anda di sini...'}
                  className="field resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-solid disabled:opacity-50"
                >
                  <span>
                    {isSubmitting
                      ? t.contact?.sending || 'Mengirim...'
                      : t.contact?.sendBtn || 'Kirimkan Pesan'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-ink" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
