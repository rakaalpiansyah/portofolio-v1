import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ChevronLeft, ChevronRight, Smartphone, ShoppingBag, Recycle, Gamepad2, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const card3dRef = useRef(null);
  const isAnimating = useRef(false);

  const projects = [
    {
      title: '"Rehat" Android Application',
      category: 'Mobile Engineering',
      tag: 'Live on Google Play Store',
      icon: Smartphone,
      subtitle: 'Aplikasi Produktivitas & Manajemen Istirahat Mental',
      description:
        'Aplikasi mobile yang dikembangkan menggunakan Flutter & Dart untuk membantu pengguna menjaga ritme kerja dan mencegah burnout dengan interval istirahat teratur.',
      challenge: 'Menciptakan antarmuka yang bebas distraksi dengan konsumsi daya baterai minimal saat berjalan di background.',
      solution: 'Arsitektur modular clean architecture, state management reaktif, notifikasi lokal terjadwal, dan database lokal SQLite efisien.',
      techStack: ['Flutter', 'Dart', 'Android Studio', 'SQLite', 'Play Console'],
      githubUrl: 'https://github.com/rakaalpiansyah',
      metrics: 'Google Play Store Global Release',
      color: 'from-sky-500/20 to-cyan-500/10',
      accentColor: '#38bdf8',
    },
    {
      title: 'E-Commerce & Logistics Platform',
      category: 'Backend Architecture',
      tag: 'CV Milionare Aromas',
      icon: ShoppingBag,
      subtitle: 'Arsitektur Backend E-Commerce & Otomasi Kurir',
      description:
        'Sistem backend e-commerce end-to-end dengan integrasi payment gateway otomatis, kalkulasi ongkos kirim dinamis KiriminAja, dan notifikasi transaksi WhatsApp.',
      challenge: 'Kesalahan perhitungan ongkir manual pada paket berukuran besar dan perlunya otomasi nomor resi pengiriman.',
      solution: 'Implementasi API logistik KiriminAja untuk pembandingan berat aktual vs volumetrik, integrasi payment gateway real-time, dan otomasi invoice WhatsApp.',
      techStack: ['Laravel', 'PHP', 'MySQL', 'Payment Gateway', 'KiriminAja API', 'Watzap API', 'Brevo SMTP'],
      githubUrl: 'https://github.com/rakaalpiansyah',
      metrics: 'End-to-End Automated Orders',
      color: 'from-rose-500/20 to-orange-500/10',
      accentColor: '#f43f5e',
    },
    {
      title: 'Smart Waste Management System',
      category: 'Web Architecture & SDGs',
      tag: 'Juara 1 Harapan Nasional MIPA 2024',
      icon: Recycle,
      subtitle: 'Inovasi Digital Pengelolaan Sampah Terintegrasi',
      description:
        'Platform digital pengelolaan sampah terpadu yang menghubungkan masyarakat dengan pengepul sampah daur ulang, mengantarkan Juara Harapan 1 Lomba Karya Tulis Nasional Universitas Jambi.',
      challenge: 'Rendahnya kesadaran memilah sampah dan ketiadaan sistem penjemputan terkoordinasi.',
      solution: 'Aplikasi web dengan kalkulator reward daur ulang otomatis, pemantauan titik jemput kurir, dan dashboard analitik limbah terdistribusi.',
      techStack: ['Laravel', 'React.js', 'REST API', 'Tailwind CSS', 'MySQL'],
      githubUrl: 'https://github.com/rakaalpiansyah',
      metrics: 'Juara Harapan 1 Nasional MIPA',
      color: 'from-emerald-500/20 to-teal-500/10',
      accentColor: '#10b981',
    },
    {
      title: '2D Desktop Game Engine & Simulation',
      category: 'OOP Software Engineering',
      tag: 'Java Systems Architecture',
      icon: Gamepad2,
      subtitle: 'Engine Game Desktop 2D Berbasis OOP Murni',
      description:
        'Pengembangan simulasi dan engine game 2D dari nol menggunakan bahasa Java dan prinsip Object-Oriented Programming tanpa library game pihak ketiga.',
      challenge: 'Memastikan stabilitas frame loop rendering dan kalkulasi tabrakan fisika yang presisi.',
      solution: 'Desain continuous game loop kustom (tick/render), algoritma AABB collision detection, pemisahan modular entity-component, dan optimasi event listener.',
      techStack: ['Java', 'OOP Design Patterns', 'Java AWT/Swing', 'Game Physics'],
      githubUrl: 'https://github.com/rakaalpiansyah',
      metrics: 'Custom 60 FPS Game Loop',
      color: 'from-amber-500/20 to-yellow-500/10',
      accentColor: '#f59e0b',
    },
  ];

  const currentProject = projects[activeIndex];

  const nextProject = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const nextIdx = (activeIndex + 1) % projects.length;
    animateSlide(nextIdx, 1);
  };

  const prevProject = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
    animateSlide(prevIdx, -1);
  };

  const animateSlide = (newIndex, direction) => {
    const card = card3dRef.current;
    if (!card) {
      setActiveIndex(newIndex);
      isAnimating.current = false;
      return;
    }

    // 3D slide-out transition
    gsap.to(card, {
      x: direction * -120,
      rotationY: direction * -28,
      rotationX: 8,
      scale: 0.9,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(newIndex);
        // 3D slide-in transition
        gsap.fromTo(
          card,
          {
            x: direction * 120,
            rotationY: direction * 28,
            rotationX: -8,
            scale: 0.9,
            opacity: 0,
          },
          {
            x: 0,
            rotationY: -14,
            rotationX: 6,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => {
              isAnimating.current = false;
            },
          }
        );
      },
    });
  };

  // Dynamic 3D tilt tracking mouse
  useEffect(() => {
    const card = card3dRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (isAnimating.current) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: -14 + x * 16,
        rotationX: 6 - y * 12,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (isAnimating.current) return;
      gsap.to(card, {
        rotationY: -14,
        rotationX: 6,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeIndex]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 block">
            Selected Works // 3D Perspective Showcase
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Proyek Rekayasa Unggulan
          </h2>
        </div>

        {/* 3D Slide Navigation Controls (Photo 2 Style) */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400">
            0{activeIndex + 1} / 0{projects.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevProject}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 hover:text-white text-zinc-400 transition-colors"
              aria-label="Previous Project"
              title="Slide 3D Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 hover:text-white text-zinc-400 transition-colors"
              aria-label="Next Project"
              title="Slide 3D Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Perspective Showcase (Photo 2 ALCHE Style) */}
      <div
        className="perspective-[1600px] w-full"
        style={{ perspective: '1600px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: 3D Tilted Perspective Card in Front of 3D Scene */}
          <div className="lg:col-span-6 flex justify-center py-6">
            <div
              ref={card3dRef}
              className={`w-full max-w-[500px] min-h-[380px] sm:min-h-[440px] rounded-3xl p-7 sm:p-9 bg-gradient-to-br ${currentProject.color} bg-zinc-950/85 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)] flex flex-col justify-between transition-colors`}
              style={{
                transform: 'rotateY(-14deg) rotateX(6deg) translateZ(40px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Top Bar of the 3D Card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-200">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentProject.accentColor }}
                  />
                  <span>{currentProject.tag}</span>
                </div>
                <currentProject.icon className="w-6 h-6 text-zinc-300" />
              </div>

              {/* Center Visual Mockup & Watermark in 3D */}
              <div className="my-8 py-6 border-y border-white/10 text-center">
                <div className="text-[11px] font-mono text-zinc-400 mb-1">
                  PROJECT SPECIFICATION
                </div>
                <div className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {currentProject.title}
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-2">
                  {currentProject.metrics}
                </div>
              </div>

              {/* Bottom Tech Pills on Card */}
              <div className="flex flex-wrap gap-1.5">
                {currentProject.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-white/[0.06] border border-white/10 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Detailed Engineering Specifications */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs font-mono text-sky-400 mb-2">
              {currentProject.category}
            </div>

            <h3 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight mb-2">
              {currentProject.title}
            </h3>

            <p className="text-zinc-300 font-mono text-xs sm:text-sm mb-6">
              {currentProject.subtitle}
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {currentProject.description}
            </p>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-[11px] font-mono text-zinc-500 mb-1">Tantangan Rekayasa</div>
                <p className="text-zinc-300 text-xs leading-relaxed">{currentProject.challenge}</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-[11px] font-mono text-zinc-500 mb-1">Solusi Arsitektur</div>
                <p className="text-zinc-300 text-xs leading-relaxed">{currentProject.solution}</p>
              </div>
            </div>

            {/* Tech Stack Chips & Action Link */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <div className="flex flex-wrap gap-1.5">
                {currentProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-950 bg-white hover:bg-zinc-200 transition-colors shadow-sm whitespace-nowrap"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Selector Pills (Bottom Quick Access) */}
      <div className="flex flex-wrap justify-center gap-2 mt-14 pt-8 border-t border-zinc-900">
        {projects.map((p, idx) => (
          <button
            key={p.title}
            onClick={() => {
              if (idx !== activeIndex) {
                const dir = idx > activeIndex ? 1 : -1;
                animateSlide(idx, dir);
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
              activeIndex === idx
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
            }`}
          >
            0{idx + 1} // {p.title.replace(/"/g, '')}
          </button>
        ))}
      </div>
    </section>
  );
}
