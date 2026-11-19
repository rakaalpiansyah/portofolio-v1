import React, { useRef, useState } from 'react';
import {
  ArrowUpRight,
  CopySimple,
  Check,
  PaperPlaneTilt,
  EnvelopeSimple,
  X,
} from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const emailAddress = 'rakaalpiansyah@gmail.com';
  const nameInputRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailAddress).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const openAndFocusForm = () => {
    setFormOpen(true);
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 80);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMsg = formData.message.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedName || !emailValid || !trimmedSubject || !trimmedMsg) {
      setValidationError(t.contact.errorValidation);
      return;
    }

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
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMsg,
          _subject: `[Portfolio] Pesan Baru dari ${trimmedName}: ${trimmedSubject}`,
        }),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('FormSubmit network error');
      }
    } catch (err) {
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
        trimmedSubject
      )}&body=${encodeURIComponent(
        `Halo Raka,\n\nNama: ${trimmedName}\nEmail: ${trimmedEmail}\n\nPesan:\n${trimmedMsg}`
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
      data-canvas-theme="dark"
      className="relative w-full bg-[#080A12] text-[#F8F9FC] py-20 md:py-28 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left 7 Columns: Headline, Giant Copyable Email, Metadata Specs, Socials */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-[#A3AAC2] mb-4">
                <span className="text-[#FF5B4D] font-semibold">(08)</span>
                <span>{t.contact.indexLabel}</span>
              </div>
              <h2 className="kx-display text-[clamp(2.8rem,6.5vw,5.75rem)] leading-[0.86] text-white">
                <span className="block">{t.contact.headingLine1}</span>
                <span className="block text-[#FF5B4D]">{t.contact.headingLine2}</span>
              </h2>
            </div>

            {/* Email + Copy Pill */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${emailAddress}`}
                className="kx-display text-2xl sm:text-4xl md:text-5xl text-white underline underline-offset-8 decoration-white/35 hover:decoration-[#FF5B4D] hover:text-[#FF5B4D] transition-colors break-all"
              >
                {emailAddress.toUpperCase()}
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="COPY"
                className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/25 text-white hover:border-[#FF5B4D] hover:bg-[#FF5B4D] hover:text-[#080A12] inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.08em] transition-colors"
              >
                {copied ? (
                  <>
                    <Check weight="bold" className="w-4 h-4" aria-hidden="true" />
                    <span>{t.contact.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <CopySimple weight="bold" className="w-4 h-4" aria-hidden="true" />
                    <span>{t.contact.copyBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* 3-Column Factual Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/15">
              {t.contact.specs.map((spec) => (
                <div key={spec.label}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#A3AAC2] block mb-1">
                    {spec.label}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Links & Direct Form Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-5">
                {[
                  { name: 'GitHub', href: 'https://github.com/rakaalpiansyah' },
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/rakaalpiansyah' },
                  { name: 'Instagram', href: 'https://www.instagram.com/vcols_/' },
                ].map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[#A3AAC2] hover:text-[#FF5B4D] transition-colors"
                  >
                    <span>{soc.name}</span>
                    <ArrowUpRight weight="bold" className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => (formOpen ? setFormOpen(false) : openAndFocusForm())}
                aria-expanded={formOpen}
                className="min-h-[44px] px-5 py-2.5 rounded-full border border-white/25 text-white hover:border-[#FF5B4D] hover:text-[#FF5B4D] font-mono text-xs uppercase tracking-[0.08em] transition-colors"
              >
                {formOpen ? t.contact.formToggleClose : t.contact.formToggleOpen}
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Circular Swiss Signal Vermilion Disc CTA with Rotating SVG Ring */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <button
              type="button"
              onClick={openAndFocusForm}
              data-thread-anchor="contact-disc"
              data-thread-loop="circle"
              data-cursor="OPEN"
              aria-label={t.contact.formToggleOpen}
              className="group relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#C92A1D] text-white hover:bg-[#9E1F14] active:scale-[0.98] transition-colors flex flex-col items-center justify-center p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {/* Continuously Rotating Outer Circular Text */}
              <svg
                viewBox="0 0 240 240"
                className="kx-spin-slow absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="kx-contact-circle"
                    d="M 120, 120 m -98, 0 a 98,98 0 1,1 196,0 a 98,98 0 1,1 -196,0"
                  />
                </defs>
                <text
                  fill="#FFFFFF"
                  fontSize="10.5"
                  fontWeight="600"
                  letterSpacing="2.4"
                  className="font-mono uppercase"
                >
                  <textPath href="#kx-contact-circle" startOffset="0%">
                    {t.contact.discRing}
                  </textPath>
                </text>
              </svg>

              <span className="relative z-10 text-center space-y-1.5">
                <span className="kx-display text-4xl sm:text-5xl leading-[0.88] block">
                  {t.contact.discTop}
                  <br />
                  {t.contact.discBottom}
                </span>
                <ArrowUpRight
                  weight="bold"
                  className="w-6 h-6 mx-auto group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white block">
                  {t.contact.discSub}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Inline Progressive Direct Message Form */}
        {formOpen && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111524] border border-white/15 space-y-6">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/12">
              <h3 className="kx-display text-3xl text-white leading-none">
                {t.contact.formTitle}
              </h3>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label={t.contact.formToggleClose}
                className="min-w-[44px] min-h-[44px] rounded-full border border-white/20 text-white hover:border-[#FF5B4D] hover:text-[#FF5B4D] flex items-center justify-center transition-colors"
              >
                <X weight="bold" className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-6 rounded-xl bg-[#080A12] border border-emerald-500/40 text-center space-y-3"
              >
                <Check weight="bold" className="w-8 h-8 text-emerald-400 mx-auto" aria-hidden="true" />
                <h4 className="text-lg font-semibold text-white">{t.contact.successTitle}</h4>
                <p className="text-sm text-[#A3AAC2]">
                  {t.contact.successDesc}{' '}
                  <span className="font-mono text-white">{emailAddress}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className="min-h-[44px] px-5 py-2 rounded-full bg-white text-[#080A12] text-xs font-semibold uppercase tracking-[0.06em]"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : submitStatus === 'fallback' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-6 rounded-xl bg-[#080A12] border border-[#FF5B4D]/40 text-center space-y-3"
              >
                <EnvelopeSimple
                  weight="bold"
                  className="w-8 h-8 text-[#FF5B4D] mx-auto"
                  aria-hidden="true"
                />
                <h4 className="text-lg font-semibold text-white">{t.contact.fallbackTitle}</h4>
                <p className="text-sm text-[#A3AAC2]">
                  {t.contact.fallbackDesc}{' '}
                  <span className="font-mono text-white">{emailAddress}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus(null)}
                  className="min-h-[44px] px-5 py-2 rounded-full bg-white text-[#080A12] text-xs font-semibold uppercase tracking-[0.06em]"
                >
                  {t.contact.backToForm}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {validationError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-[#C92A1D] text-white text-xs sm:text-sm font-medium"
                  >
                    {validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#F8F9FC]"
                    >
                      {t.contact.nameLabel}
                    </label>
                    <input
                      ref={nameInputRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#080A12] border border-[#6B728E] focus:border-[#FF5B4D] text-white placeholder:text-[#9BA3BC] text-sm transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#F8F9FC]"
                    >
                      {t.contact.emailInputLabel}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#080A12] border border-[#6B728E] focus:border-[#FF5B4D] text-white placeholder:text-[#9BA3BC] text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#F8F9FC]"
                  >
                    {t.contact.topicLabel}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.contact.topicPlaceholder}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#080A12] border border-[#6B728E] focus:border-[#FF5B4D] text-white placeholder:text-[#9BA3BC] text-sm transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold uppercase tracking-[0.06em] text-[#F8F9FC]"
                  >
                    {t.contact.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080A12] border border-[#6B728E] focus:border-[#FF5B4D] text-white placeholder:text-[#9BA3BC] text-sm transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[44px] px-7 py-3 rounded-full bg-[#C92A1D] hover:bg-[#FF5B4D] hover:text-[#080A12] text-white font-semibold text-xs uppercase tracking-[0.08em] inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                  >
                    <span>{isSubmitting ? t.contact.sending : t.contact.sendBtn}</span>
                    <PaperPlaneTilt weight="bold" className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href={`mailto:${emailAddress}?subject=${encodeURIComponent(
                      formData.subject || t.contact.topicPlaceholder
                    )}`}
                    className="font-mono text-xs text-[#A3AAC2] hover:text-white underline underline-offset-4 transition-colors"
                  >
                    {t.contact.orMailto}
                  </a>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
