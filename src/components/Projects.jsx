import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  ShoppingBag,
  Recycle,
  Bot,
  ExternalLink,
  Sparkles,
  Activity,
  Cpu,
  ShieldCheck,
  Layers,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const card3dRef = useRef(null);
  const detailsColRef = useRef(null);
  const isAnimating = useRef(false);
  const touchStartX = useRef(0);

  // Real verified projects from github.com/rakaalpiansyah
  const projects = [
    {
      title: '"Rehat" Mental Productivity',
      shortTitle: 'Rehat App',
      category: 'Mobile Engineering & Play Store',
      tag: 'Live on Google Play Store',
      routeBadge: 'play.google.com/store/apps/rehat',
      icon: Smartphone,
      subtitle: 'Aplikasi Produktivitas & Manajemen Interval Istirahat Mental',
      description:
        'Aplikasi mobile berbasis Flutter & Dart yang terpublikasi secara global di Google Play Store untuk membantu pengguna mengelola ritme kerja fokus dan mencegah burnout melalui interval istirahat terukur.',
      challenge:
        'Menjaga efisiensi daya baterai saat notifikasi interval berjalan di background dan mempertahankan UI responsif 60 FPS.',
      solution:
        'Menerapkan modular clean architecture, state management reaktif terisolasi, notifikasi lokal terjadwal, dan penyimpanan SQLite lokal yang ringan.',
      techStack: ['Flutter', 'Dart', 'Android Studio', 'SQLite', 'Play Console'],
      githubUrl: 'https://github.com/rakaalpiansyah/rehat-app',
      liveUrl: 'https://play.google.com',
      liveLabel: 'Google Play Store',
      metrics: 'Global Play Store Release',
      color: 'from-sky-500/20 via-sky-600/10 to-transparent',
      accentColor: '#38bdf8',
      image: '/projects/rehat.png',
      type: 'mobile_app',
    },
    {
      title: 'Meeting AI: Real-time Speech & Diarization',
      shortTitle: 'Meeting AI',
      category: 'AI Engineering & Speech Intelligence',
      tag: 'Live on Railway Production',
      routeBadge: 'api.meeting-ai.app/v1/transcribe',
      icon: Bot,
      subtitle: 'Backend Transkripsi Otomatis, Speaker Diarization, & Analisis Rapat',
      description:
        'Layanan kecerdasan buatan berbasis FastAPI dan model Whisper AI untuk pemrosesan audio rapat, transkripsi real-time berlatensi rendah, pemisahan suara multi-pembicara (speaker diarization), dan analisis ringkasan cerdas.',
      challenge:
        'Tingginya latensi inferensi saat memproses file audio berdurasi panjang dan kompleksitas pemisahan suara tumpang tindih.',
      solution:
        'Pipeline asynchronous berbasis FastAPI, chunking audio streaming teroptimasi, caching semantic, dan deployment containerized di Railway Cloud.',
      techStack: ['Python 3.11', 'FastAPI', 'Whisper AI', 'PyTorch', 'Railway', 'Docker'],
      githubUrl: 'https://github.com/rakaalpiansyah/Meeting-AI-Backend',
      liveUrl: 'https://meeting-ai-backend-production-b61e.up.railway.app/docs',
      liveLabel: 'Railway Swagger Docs',
      metrics: 'FastAPI Production Microservice',
      color: 'from-emerald-500/20 via-teal-600/10 to-transparent',
      accentColor: '#10b981',
      type: 'speech_ai',
    },
    {
      title: 'AgriTraceChain: Blockchain Traceability',
      shortTitle: 'AgriTraceChain',
      category: 'Enterprise Blockchain & Smart Contracts',
      tag: 'Hyperledger Fabric & Caliper',
      routeBadge: 'fabric.agritrace/channel-agri',
      icon: Layers,
      subtitle: 'Platform Rantai Pasok Pertanian & Smart Contract Multi-Organisasi',
      description:
        'Platform blockchain konsorsium enterprise berbasis Hyperledger Fabric untuk melacak perjalanan komoditas pertanian dari petani hingga pembeli secara transparan dan tamper-proof, dengan 4 smart contract (chaincode) serta benchmark performa via Hyperledger Caliper.',
      challenge:
        'Menghilangkan ketergantungan pada server pusat yang rentan manipulasi data dan mengkoordinasikan konsensus di antara 5 organisasi independen.',
      solution:
        'Merancang arsitektur konsorsium 5 organisasi (Farmer, Aggregator, Processor, Regulator, Buyer), deployment 4 smart contract modular, dan settlement otomatis Letter of Credit (LoC).',
      techStack: ['Hyperledger Fabric', 'Go / Node Chaincode', 'Docker', 'Hyperledger Caliper', 'Cryptography', 'Consortium Network'],
      githubUrl: 'https://github.com/rakaalpiansyah/agritraceChain',
      metrics: '5-Org Consortium • Caliper Benchmarked',
      color: 'from-indigo-500/20 via-purple-600/10 to-transparent',
      accentColor: '#818cf8',
      type: 'blockchain',
    },
    {
      title: 'PlantVillage AI: Deep Learning Crop Vision',
      shortTitle: 'PlantVillage AI',
      category: 'Computer Vision & Deep Learning',
      tag: '97.12% Test Accuracy',
      routeBadge: 'vision.plantvillage.ai/infer',
      icon: Cpu,
      subtitle: 'Klasifikasi Patologi Penyakit Daun Tanaman Berbasis CNN & TFLite',
      description:
        'Sistem diagnosis citra patologi tanaman menggunakan arsitektur Custom CNN 4-Blok Konvolusi yang berhasil meraih akurasi pengujian 97.12% dan dikuantisasi ke TensorFlow Lite untuk inferensi edge CPU dalam ~6ms.',
      challenge:
        'Variasi pencahayaan dan background bising pada daun di lapangan, serta kebutuhan inferensi cepat tanpa ketergantungan GPU cloud.',
      solution:
        'Pipeline augmentasi citra variatif, arsitektur CNN dengan dropout regularized, serta optimasi ekspor TensorFlow Lite berbobot ringan.',
      techStack: ['Python', 'TensorFlow', 'Keras', 'TensorFlow Lite', 'OpenCV', 'NumPy'],
      githubUrl: 'https://github.com/rakaalpiansyah/plantvillage-disease-detection',
      metrics: '97.12% Test Accuracy • ~6ms CPU',
      color: 'from-amber-500/20 via-yellow-600/10 to-transparent',
      accentColor: '#f59e0b',
      type: 'vision_ai',
    },
    {
      title: 'GreenV: Smart Waste Management & SDGs',
      shortTitle: 'GreenV Platform',
      category: 'Web Architecture & Sustainable Tech',
      tag: 'Juara Harapan 1 Nasional MIPA 2024',
      routeBadge: 'greenv.sdgs.org/dashboard',
      icon: Recycle,
      subtitle: 'Inovasi Digital Pengelolaan Sampah Terpadu & Reward Daur Ulang',
      description:
        'Platform web terpadu yang menghubungkan masyarakat penghasil limbah dengan pengepul daur ulang berizin, mengantarkan Juara Harapan 1 Lomba Karya Tulis Ilmiah Nasional SDGs 2024 di Universitas Jambi.',
      challenge:
        'Rendahnya motivasi pemilahan sampah mandiri dan ketiadaan koordinasi logistik rute penjemputan limbah bernilai ekonomi.',
      solution:
        'Membangun modul kalkulator reward poin sampah otomatis, pemantauan titik jemput kurir terintegrasi, dan analitik sirkulasi limbah.',
      techStack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'REST API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/rakaalpiansyah/web-GreenV',
      metrics: 'Juara Harapan 1 Nasional MIPA SDGs',
      color: 'from-cyan-500/20 via-emerald-600/10 to-transparent',
      accentColor: '#06b6d4',
      type: 'waste_platform',
    },
    {
      title: 'PT. Royale Essence Indonesia E-Commerce',
      shortTitle: 'Royale Essence',
      category: 'Enterprise Backend Architecture',
      tag: 'PT. Royale Essence Indonesia',
      routeBadge: 'royale-essence.co.id/api/v1',
      icon: ShoppingBag,
      subtitle: 'Arsitektur Backend E-Commerce & Otomasi Ekspedisi Logistik',
      description:
        'Sistem backend e-commerce skala produksi dengan orkestrasi kurir logistik otomatis via KiriminAja API (pembandingan volumetrik vs aktual), payment gateway instan, dan webhook notifikasi transaksi WhatsApp.',
      challenge:
        'Kesalahan perhitungan ongkir manual pada paket berukuran besar dan beban verifikasi bukti transfer perbankan konvensional.',
      solution:
        'Integrasi API logistik KiriminAja untuk pembuatan AWB otomatis, payment gateway real-time terotentikasi, dan bot WhatsApp otomatisasi invoice.',
      techStack: ['Laravel 11', 'PHP', 'MySQL', 'KiriminAja API', 'Payment Gateway', 'Watzap API'],
      githubUrl: 'https://github.com/rakaalpiansyah',
      metrics: 'End-to-End Automated Orders & Shipping',
      color: 'from-rose-500/20 via-red-600/10 to-transparent',
      accentColor: '#f43f5e',
      type: 'logistics_backend',
    },
  ];

  const currentProject = projects[activeIndex];

  const animateSlide = (newIndex, direction = 1) => {
    if (newIndex === activeIndex) return;
    const card = card3dRef.current;
    const details = detailsColRef.current;

    if (!card || !details) {
      setActiveIndex(newIndex);
      return;
    }

    // Kill any active tweens on card and details to prevent conflict / snapping
    gsap.killTweensOf(card);
    gsap.killTweensOf(details);
    if (details.children) {
      gsap.killTweensOf(details.children);
    }

    isAnimating.current = true;
    const dir = direction >= 0 ? 1 : -1;

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Step 1: Fluid 3D Exit Animation
    tl.to(card, {
      x: -45 * dir,
      rotationY: -14 - 15 * dir,
      rotationX: 2,
      opacity: 0,
      scale: 0.93,
      duration: 0.22,
      ease: 'power2.in',
    })
      .to(
        details,
        {
          opacity: 0,
          y: -8 * dir,
          duration: 0.16,
          ease: 'power2.in',
        },
        '<0.02'
      )
      // Step 2: Swap content via React state while elements are invisible
      .call(() => {
        setActiveIndex(newIndex);
      })
      // Step 3: Stage incoming state
      .call(() => {
        gsap.set(card, {
          x: 55 * dir,
          rotationY: -14 + 16 * dir,
          rotationX: 10,
          opacity: 0,
          scale: 0.94,
        });
        gsap.set(details, {
          opacity: 1,
          y: 0,
        });
        if (details.children) {
          gsap.set(details.children, {
            opacity: 0,
            y: 14,
          });
        }
      })
      // Step 4: Fluid swooping entrance
      .to(card, {
        x: 0,
        rotationY: -14,
        rotationX: 6,
        opacity: 1,
        scale: 1,
        duration: 0.42,
        ease: 'power3.out',
      })
      .to(
        details.children,
        {
          opacity: 1,
          y: 0,
          stagger: 0.035,
          duration: 0.35,
          ease: 'power2.out',
        },
        '-=0.28'
      );
  };

  const nextProject = () => {
    const nextIdx = (activeIndex + 1) % projects.length;
    animateSlide(nextIdx, 1);
  };

  const prevProject = () => {
    const prevIdx = (activeIndex - 1 + projects.length) % projects.length;
    animateSlide(prevIdx, -1);
  };

  // Section Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth mouse tilt tracking & initial 3D pose for card
  useEffect(() => {
    const card = card3dRef.current;
    if (!card) return;

    // Set initial 3D pose via GSAP to avoid React VDOM clobbering
    gsap.set(card, {
      rotationY: -14,
      rotationX: 6,
      z: 40,
      transformPerspective: 1600,
      transformStyle: 'preserve-3d',
    });

    const showcase = card.parentElement;
    if (!showcase) return;

    const handlePointerMove = (e) => {
      if (isAnimating.current) return;
      const rect = card.getBoundingClientRect();
      const rawX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const rawY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      const clampedX = Math.max(-1, Math.min(1, rawX));
      const clampedY = Math.max(-1, Math.min(1, rawY));

      gsap.to(card, {
        rotationY: -14 + clampedX * 10,
        rotationX: 6 - clampedY * 8,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handlePointerLeave = () => {
      if (isAnimating.current) return;
      gsap.to(card, {
        rotationY: -14,
        rotationX: 6,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    showcase.addEventListener('pointermove', handlePointerMove);
    showcase.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      showcase.removeEventListener('pointermove', handlePointerMove);
      showcase.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) nextProject();
      else prevProject();
    }
  };

  const CurrentIcon = currentProject.icon;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <div>
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 block">
            Selected Works
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Proyek Rekayasa Unggulan
          </h2>
        </div>

        {/* 3D Slide Navigation Controls */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400">
            0{activeIndex + 1} / 0{projects.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevProject}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 hover:text-white text-zinc-400 active:scale-90 active:bg-zinc-800 transition-all duration-100"
              aria-label="Previous Project"
              title="Proyek Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-sky-500/50 hover:text-white text-zinc-400 active:scale-90 active:bg-zinc-800 transition-all duration-100"
              aria-label="Next Project"
              title="Proyek Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Perspective Showcase */}
      <div
        className="perspective-[1600px] w-full"
        style={{ perspective: '1600px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: 3D Tilted Perspective Preview Window */}
          <div className="lg:col-span-6 flex justify-center py-6">
            <div
              ref={card3dRef}
              className={`w-full max-w-[500px] rounded-3xl p-5 sm:p-7 bg-gradient-to-br ${currentProject.color} bg-zinc-950/90 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.14)] flex flex-col justify-between transition-colors relative overflow-hidden`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* App / Window Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-4 select-none">
                {/* Window Control Buttons */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                {/* Route / URL Badge */}
                <span className="px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[10px] text-zinc-300 max-w-[200px] truncate">
                  {currentProject.routeBadge}
                </span>

                {/* Status Dot */}
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: currentProject.accentColor }}
                  />
                </div>
              </div>

              {/* Visual Mockup & Viewport Area */}
              <div className="relative rounded-2xl bg-black/50 border border-white/10 p-4 sm:p-5 min-h-[240px] sm:min-h-[260px] flex flex-col justify-center items-center overflow-hidden">
                {/* Ambient backglow */}
                <div
                  className="absolute inset-0 opacity-20 blur-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${currentProject.accentColor} 0%, transparent 70%)`,
                  }}
                />

                {/* Case 1: Real Mobile App Screenshot (Rehat) */}
                {currentProject.image ? (
                  <div className="relative z-10 w-full flex items-center justify-center py-2">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="max-h-[200px] sm:max-h-[220px] w-auto object-contain rounded-xl shadow-2xl border border-white/10 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : null}

                {/* Case 2: Meeting AI — Speech Audio Waveform & Diarization Mockup */}
                {currentProject.type === 'speech_ai' && (
                  <div className="relative z-10 w-full space-y-3 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Activity className="w-3.5 h-3.5 animate-pulse" /> WHISPER STREAMING
                      </span>
                      <span>00:14 / LIVE</span>
                    </div>

                    {/* Audio Waveform Bars */}
                    <div className="flex items-end justify-center gap-1 h-10 py-1">
                      {[35, 60, 90, 45, 80, 100, 70, 50, 85, 95, 40, 65, 80, 30, 75, 90, 60, 40].map((h, i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-full bg-emerald-400/80 transition-all duration-150"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>

                    {/* Speaker Diarization Preview Box */}
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-emerald-500/30 text-[11px] leading-relaxed">
                      <span className="text-emerald-400 font-bold">[Speaker 01 - 00:08]:</span>{' '}
                      <span className="text-zinc-200">
                        &quot;Model diarization membagi audio rapat secara presisi dengan latensi rendah.&quot;
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>HTTP 200 OK • JSON</span>
                      <span className="text-emerald-400">Railway Deployed</span>
                    </div>
                  </div>
                )}

                {/* Case 3: PlantVillage AI — Deep Learning Computer Vision Scanner */}
                {currentProject.type === 'vision_ai' && (
                  <div className="relative z-10 w-full space-y-3 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
                      <span className="flex items-center gap-1.5 text-amber-400">
                        <Sparkles className="w-3.5 h-3.5" /> CNN 4-BLOCK INFERENCE
                      </span>
                      <span className="text-emerald-400 font-bold">ACC: 97.12%</span>
                    </div>

                    {/* Vision Detection Scanning Reticle */}
                    <div className="relative h-20 rounded-xl bg-zinc-900/80 border border-dashed border-amber-500/40 p-2.5 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] text-amber-400 uppercase block tracking-wider">
                          Target Diagnosa
                        </span>
                        <span className="font-heading text-sm font-bold text-white block">
                          PlantVillage Leaf Dataset
                        </span>
                        <span className="text-[10px] text-emerald-400 block">
                          Inferensi CPU ~6ms (TFLite)
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-lg border-2 border-amber-400/70 bg-amber-400/10 flex items-center justify-center text-amber-300 font-bold text-xs">
                        97%
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>TensorFlow Lite Quantized</span>
                      <span className="text-amber-400">Edge Device Ready</span>
                    </div>
                  </div>
                )}

                {/* Case 4: GreenV — Environmental Sustainability Platform */}
                {currentProject.type === 'waste_platform' && (
                  <div className="relative z-10 w-full space-y-3 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <Recycle className="w-3.5 h-3.5" /> UNIVERSITAS JAMBI SDGs
                      </span>
                      <span className="text-yellow-400 font-bold">JUARA 1 HARAPAN</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-cyan-500/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-400 block mb-0.5">Sirkulasi Sampah Terverifikasi</span>
                        <span className="font-heading text-base font-extrabold text-white">
                          Waste-to-Reward Calculator
                        </span>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
                        Eco Point
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>Smart Pickup Routing</span>
                      <span className="text-cyan-400">SDGs Action 2024</span>
                    </div>
                  </div>
                )}

                {/* Case 5: PT. Royale Essence Indonesia E-Commerce Backend */}
                {currentProject.type === 'logistics_backend' && (
                  <div className="relative z-10 w-full space-y-3 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
                      <span className="flex items-center gap-1.5 text-rose-400">
                        <ShieldCheck className="w-3.5 h-3.5" /> LOGISTICS AUTOMATION
                      </span>
                      <span className="text-emerald-400">AUTO-AWB</span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-rose-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white font-bold">KiriminAja Logistics API</span>
                        <span className="text-emerald-400 text-[10px] font-bold">Connected</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-zinc-400">
                        <span>Payment Gateway: Midtrans</span>
                        <span className="text-sky-400">Watzap Bot: Active</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>Automated Shipping Rates</span>
                      <span className="text-rose-400">Production Ready</span>
                    </div>
                  </div>
                )}

                {/* Case 6: AgriTraceChain — Hyperledger Fabric Blockchain Visualizer */}
                {currentProject.type === 'blockchain' && (
                  <div className="relative z-10 w-full space-y-3 font-mono">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/10 pb-2">
                      <span className="flex items-center gap-1.5 text-indigo-400">
                        <Layers className="w-3.5 h-3.5" /> FABRIC CHANNEL: AGRI
                      </span>
                      <span className="text-emerald-400 font-bold">5 ORGS CONSENSUS</span>
                    </div>

                    {/* Cryptographic Block Nodes Flow */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded-xl bg-zinc-900/90 border border-indigo-500/40">
                        <span className="text-zinc-500 block mb-0.5 text-[9px]">BLOCK #142</span>
                        <span className="text-indigo-300 font-bold block truncate">Farmer Reg</span>
                        <span className="text-emerald-400 text-[9px]">Confirmed</span>
                      </div>
                      <div className="p-2 rounded-xl bg-zinc-900/90 border border-indigo-500/40">
                        <span className="text-zinc-500 block mb-0.5 text-[9px]">BLOCK #143</span>
                        <span className="text-indigo-300 font-bold block truncate">Certify Batch</span>
                        <span className="text-emerald-400 text-[9px]">Confirmed</span>
                      </div>
                      <div className="p-2 rounded-xl bg-zinc-900/90 border border-indigo-500/40">
                        <span className="text-zinc-500 block mb-0.5 text-[9px]">BLOCK #144</span>
                        <span className="text-indigo-300 font-bold block truncate">LoC Settle</span>
                        <span className="text-emerald-400 text-[9px]">Confirmed</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 flex items-center justify-between text-[10px]">
                      <span className="text-zinc-300">4 Chaincodes Deployed</span>
                      <span className="text-indigo-400 font-bold">Caliper Benchmarked</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-400">
                      <span>Immutable Ledger Record</span>
                      <span className="text-indigo-400">Zero-Tamper Audit</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Bar: Category & Spec */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300 font-semibold">{currentProject.metrics}</span>
                <span className="text-zinc-400">{currentProject.category.split('&')[0]}</span>
              </div>
            </div>
          </div>

          {/* Right: Detailed Engineering Specifications */}
          <div ref={detailsColRef} className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
              <CurrentIcon className="w-4 h-4" />
              <span>{currentProject.category}</span>
            </div>

            <h3 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight mb-2">
              {currentProject.title}
            </h3>

            <p className="text-zinc-300 font-mono text-xs sm:text-sm mb-5">
              {currentProject.subtitle}
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {currentProject.description}
            </p>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-[11px] font-mono text-zinc-400 mb-1">Tantangan Rekayasa</div>
                <p className="text-zinc-300 text-xs leading-relaxed">{currentProject.challenge}</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="text-[11px] font-mono text-zinc-400 mb-1">Solusi Arsitektur</div>
                <p className="text-zinc-300 text-xs leading-relaxed">{currentProject.solution}</p>
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {currentProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-800">
              {/* Live Demo or Live Docs if available */}
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 active:scale-95 transition-all duration-100 shadow-sm whitespace-nowrap"
                >
                  <span>{currentProject.liveLabel || 'Live Demo'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {/* GitHub Repository */}
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white active:scale-95 transition-all duration-100 whitespace-nowrap"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Selector (Bottom Segmented Control Navigation) */}
      <div className="mt-14 pt-8 border-t border-zinc-900/80 flex flex-col items-center gap-3">
        {/* Segmented control bar */}
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md shadow-lg max-w-full">
          {projects.map((p, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={p.title}
                onClick={() => {
                  if (idx !== activeIndex) {
                    const dir = idx > activeIndex ? 1 : -1;
                    animateSlide(idx, dir);
                  }
                }}
                className={`relative px-3 sm:px-4 py-1.5 rounded-xl text-xs font-mono transition-all duration-150 active:scale-95 select-none ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
                aria-label={`Pilih proyek ${idx + 1}`}
                title={p.title.replace(/"/g, '')}
              >
                {/* Mobile: compact '01', Desktop/Tablet: '01. Rehat App' */}
                <span className="sm:hidden font-bold">0{idx + 1}</span>
                <span className="hidden sm:inline">
                  0{idx + 1}. {p.shortTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile active project title indicator */}
        <div className="sm:hidden flex items-center gap-2 text-xs font-mono text-zinc-400 pt-0.5">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: currentProject.accentColor }}
          />
          <span className="font-medium text-zinc-200 truncate max-w-[260px]">
            {currentProject.title.replace(/"/g, '')}
          </span>
        </div>
      </div>
    </section>
  );
}
