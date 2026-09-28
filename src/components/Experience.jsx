import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, MapPin, Sparkles, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const spineLineRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const experiences = [
    {
      id: 'sonasoft',
      period: 'Feb 2026 - Jun 2026',
      role: 'Back End Developer',
      company: 'Sonasoft IT Services LLC',
      location: 'Bandung, Indonesia (Remote)',
      type: 'work',
      category: 'work',
      isLatest: true,
      tag: 'Pengalaman Industri',
      highlights: [
        'Mengembangkan arsitektur Backend REST API menggunakan framework Laravel 11 untuk kebutuhan layanan enterprise.',
        'Merancang dan membangun modul Syirkah (skema kemitraan bisnis / bagi hasil) dengan validasi logika bisnis ketat dan struktur data terpercaya.',
        'Mengimplementasikan Content Resources API modular untuk pengelolaan dan distribusi konten dinamis secara terstandar.',
        'Menerapkan standar RESTful API modern: API resource transformation, modular form request validation, dan penanganan error terpusat.',
      ],
      skills: ['Laravel 11', 'REST API', 'PHP', 'Backend Architecture', 'Content Resources', 'MySQL'],
    },
    {
      id: 'royale',
      period: 'Magang / Internship',
      role: 'Backend Web Developer',
      company: 'PT. Royale Essence Indonesia',
      location: 'Indonesia',
      type: 'work',
      category: 'work',
      isLatest: false,
      tag: 'E-Commerce Backend',
      highlights: [
        'Mengembangkan dan memelihara arsitektur backend e-commerce menggunakan framework Laravel end-to-end.',
        'Mengintegrasikan Payment Gateway untuk memproses transaksi pembayaran pelanggan secara otomatis, aman, dan real-time.',
        'Mengimplementasikan API logistik KiriminAja untuk mengotomatisasi kalkulasi ongkos kirim dinamis (berat aktual vs volumetrik) serta otomasi request pickup dan pembuatan AWB.',
        'Membangun sistem notifikasi pesan otomatis menggunakan API Watzap.id untuk pengiriman invoice dan status pesanan WhatsApp langsung ke pelanggan.',
        'Mengonfigurasi layanan SMTP Brevo untuk pengiriman email transaksional yang dilengkapi otentikasi domain DKIM dan SPF.',
      ],
      skills: ['Laravel', 'PHP', 'MySQL', 'Payment Gateway', 'KiriminAja API', 'Watzap API', 'Brevo SMTP'],
    },
    {
      id: 'informatika',
      period: '2023 - Sekarang',
      role: 'S1 Teknik Informatika',
      company: 'Teknik Informatika',
      location: 'Bandung, Indonesia',
      type: 'education',
      category: 'education',
      isLatest: false,
      tag: 'Studi Akademik & Prestasi',
      highlights: [
        'Fokus akademik: Software Engineering, Web Development, Mobile Architecture, dan AI Engineering.',
        'Meraih Juara Harapan 1 Lomba Karya Tulis MIPA Tingkat Nasional 2024 di Universitas Jambi bertema SDGs dengan solusi website pengelolaan sampah terpadu.',
        'Mendalami arsitektur perangkat lunak modular, clean code, algoritma struktur data, dan pengembangan aplikasi Flutter.',
      ],
      skills: ['Software Engineering', 'AI Engineering', 'Flutter/Dart', 'Web Development', 'Algorithms'],
    },
    {
      id: 'pos-indonesia',
      period: 'Okt 2021 - Des 2021',
      role: 'Magang / Praktik Kerja Lapangan (PKL)',
      company: 'PT POS INDONESIA (PERSERO)',
      location: 'Jawa Barat, Indonesia',
      type: 'work',
      category: 'work',
      isLatest: false,
      tag: 'Operasional Logistik & Jaringan',
      highlights: [
        'Menangani proses entri data paket logistik menggunakan sistem internal perusahaan dengan tingkat akurasi tinggi.',
        'Melakukan maintenance berkala jaringan lokal (LAN) kantor untuk memastikan stabilitas koneksi operasional harian.',
        'Memberikan dukungan teknis (troubleshooting) perangkat keras dan perangkat lunak kepada seluruh staf kantor.',
      ],
      skills: ['LAN Maintenance', 'Hardware & Software Troubleshooting', 'Data Logistics Operations'],
    },
  ];

  const categories = [
    {
      id: 'all',
      label: 'Semua Rekam Jejak',
      shortLabel: 'Semua',
      count: experiences.length,
    },
    {
      id: 'work',
      label: 'Pengalaman Industri & Magang',
      shortLabel: 'Industri',
      count: experiences.filter((e) => e.category === 'work').length,
    },
    {
      id: 'education',
      label: 'Pendidikan & Prestasi',
      shortLabel: 'Pendidikan',
      count: experiences.filter((e) => e.category === 'education').length,
    },
  ];

  const filteredExperiences =
    activeCategory === 'all'
      ? experiences
      : experiences.filter((exp) => exp.category === activeCategory);

  // GSAP ScrollTrigger for spine progress and cards stagger
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline spine drawing down on scroll
      if (spineLineRef.current && timelineRef.current) {
        gsap.fromTo(
          spineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.5,
            },
          }
        );
      }

      // Stagger reveal of cards
      if (timelineRef.current) {
        gsap.from(timelineRef.current.children, {
          x: -24,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 82%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter transition animation
  const handleCategoryChange = (catId) => {
    if (catId === activeCategory) return;
    const cards = timelineRef.current;
    if (cards) {
      gsap.to(cards.children, {
        opacity: 0,
        y: -10,
        duration: 0.18,
        stagger: 0.03,
        ease: 'power2.in',
        onComplete: () => {
          setActiveCategory(catId);
          gsap.fromTo(
            cards.children,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.06,
              ease: 'power2.out',
            }
          );
        },
      });
    } else {
      setActiveCategory(catId);
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto"
    >
      {/* Header */}
      <div className="mb-14">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-4">
          Pengalaman Kerja &amp; Pendidikan
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
          Rekam jejak terverifikasi dalam rekayasa backend industri, studi akademik teknik informatika,
          dan infrastruktur jaringan.
        </p>

        {/* Category Filter Tabs */}
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md max-w-full overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-3 sm:px-4 py-2 sm:py-1.5 rounded-xl text-xs font-mono transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap select-none ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
                aria-label={`Filter ${cat.label}`}
              >
                <span className="sm:hidden">{cat.shortLabel}</span>
                <span className="hidden sm:inline">{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isActive
                      ? 'bg-zinc-900 text-zinc-100 font-bold'
                      : 'bg-zinc-900/60 text-zinc-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline track container */}
      <div className="relative pl-7 sm:pl-10">
        {/* Background static spine */}
        <div className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-px bg-zinc-800/80" />

        {/* Scroll-driven active spine fill */}
        <div
          ref={spineLineRef}
          className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-sky-400 via-sky-500 to-indigo-500 origin-top pointer-events-none"
        />

        {/* Timeline items list */}
        <div ref={timelineRef} className="space-y-8 sm:space-y-10">
          {filteredExperiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Station Node */}
              <div
                className={`absolute -left-[24px] sm:-left-[29px] top-5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                  exp.isLatest
                    ? 'bg-sky-400 ring-4 ring-sky-500/20 shadow-[0_0_14px_rgba(56,189,248,0.7)]'
                    : 'bg-zinc-900 border-2 border-zinc-700 group-hover:border-sky-400 group-hover:scale-110'
                }`}
              >
                {exp.isLatest && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                {!exp.isLatest && (
                  <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover:bg-sky-400 transition-colors" />
                )}
              </div>

              {/* Card Surface */}
              <div className="card-surface p-5 sm:p-8 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                {/* Subtle top ambient glow for the latest role */}
                {exp.isLatest && (
                  <div className="absolute top-0 right-0 w-72 h-36 bg-sky-500/[0.07] rounded-full blur-3xl pointer-events-none" />
                )}

                {/* Card Top Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-zinc-900/90 border border-white/10 font-mono text-xs text-zinc-200">
                      {exp.period}
                    </span>
                    {exp.isLatest && (
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Terkini
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                      {exp.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Role Title */}
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight mb-2 group-hover:text-sky-300 transition-colors">
                  {exp.role}
                </h3>

                {/* Company / Institution Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 mb-5">
                  {exp.type === 'work' ? (
                    <Briefcase className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                  <span className="font-semibold text-white">{exp.company}</span>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2.5 mb-6">
                  {exp.highlights.map((item, hIdx) => (
                    <li
                      key={hIdx}
                      className="text-zinc-300 text-xs sm:text-sm flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400/70 mt-1.5 flex-shrink-0 group-hover:bg-sky-400 transition-colors" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills Footer */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/80">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-900/80 text-zinc-300 border border-zinc-800/80 hover:border-zinc-600 hover:text-white transition-colors select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
