import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [activeKey, setActiveKey] = useState('linux');
  const [pressedKey, setPressedKey] = useState(null);
  const sectionRef = useRef(null);
  const keyboardDeckRef = useRef(null);

  // Mechanical Keycaps Data (matching Photo 3 & Raka's CV)
  const keycaps = [
    // Row 1
    {
      id: 'linux',
      key: 'L',
      label: 'Linux',
      symbol: 'TUX',
      bg: 'bg-zinc-800 text-white border-zinc-600 shadow-[0_6px_0_#27272a]',
      tag: 'OS & Infrastructure',
      punchline: "where 'chmod 777' is the ultimate flex",
      description: 'Administrasi server Linux, shell bash automation, permissions management, dan sertifikasi resmi Linux Essentials dari Cisco Networking Academy.',
    },
    {
      id: 'docker',
      key: 'K',
      label: 'Docker',
      symbol: '🐳',
      bg: 'bg-sky-600 text-white border-sky-400 shadow-[0_6px_0_#0284c7]',
      tag: 'Containerization',
      punchline: "works on my machine, and in production",
      description: 'Isolasi dependensi aplikasi, pembuatan Dockerfile modular multi-stage, dan konsistensi lingkungan deployment.',
    },
    {
      id: 'git',
      key: 'G',
      label: 'Git',
      symbol: '⌥',
      bg: 'bg-red-600 text-white border-red-400 shadow-[0_6px_0_#dc2626]',
      tag: 'Version Control',
      punchline: "git commit -m 'fixed it for real this time'",
      description: 'Trunk-based development, semantic commits, branching workflow, dan kolaborasi repositori GitHub terstruktur.',
    },
    {
      id: 'cisco',
      key: 'C',
      label: 'Cisco',
      symbol: '⊛',
      bg: 'bg-cyan-700 text-white border-cyan-500 shadow-[0_6px_0_#0e7490]',
      tag: 'CCNA Networking',
      punchline: "packet tracer dreams & subnets for breakfast",
      description: 'Sertifikasi CCNA: Introduction to Networks. Pemahaman mendalam tentang switching, routing protocols, subnetting IP, dan LAN maintenance.',
    },

    // Row 2
    {
      id: 'laravel',
      key: 'V',
      label: 'Laravel',
      symbol: '⬡',
      bg: 'bg-rose-600 text-white border-rose-400 shadow-[0_6px_0_#e11d48]',
      tag: 'Backend Core',
      punchline: "eloquent relationships & zero-friction routing",
      description: 'Framework backend utama. Arsitektur MVC end-to-end, migrasi database, middleware autentikasi, integrasi KiriminAja API dan Payment Gateway.',
    },
    {
      id: 'php',
      key: 'P',
      label: 'PHP',
      symbol: 'PHP',
      bg: 'bg-indigo-700 text-white border-indigo-500 shadow-[0_6px_0_#4338ca]',
      tag: 'Backend Language',
      punchline: "powering 75% of the web, and my production APIs",
      description: 'Object-oriented programming, request lifecycle handling, composer dependency management, dan arsitektur backend e-commerce CV Milionare Aromas.',
    },
    {
      id: 'mysql',
      key: 'M',
      label: 'MySQL',
      symbol: '🐬',
      bg: 'bg-blue-700 text-white border-blue-500 shadow-[0_6px_0_#1d4ed8]',
      tag: 'Relational DB',
      punchline: "SELECT * FROM solutions WHERE latency < 50ms",
      description: 'Pemodelan skema relasional 3NF, index optimization, foreign key cascading, dan transaksi ACID untuk pencatatan order e-commerce.',
    },
    {
      id: 'oracle',
      key: 'O',
      label: 'Oracle',
      symbol: '◈',
      bg: 'bg-red-800 text-white border-red-600 shadow-[0_6px_0_#991b1b]',
      tag: 'Database Academy',
      punchline: "enterprise-grade SQL & verified database design",
      description: 'Sertifikasi Oracle Academy: Database Programming with SQL & Database Design. Query profiling terstruktur dan pemodelan entitas relasional.',
    },

    // Row 3
    {
      id: 'flutter',
      key: 'F',
      label: 'Flutter',
      symbol: '◈',
      bg: 'bg-sky-500 text-white border-sky-300 shadow-[0_6px_0_#0369a1]',
      tag: 'Mobile Engineering',
      punchline: "60 FPS reactive UI & live on Google Play Store",
      description: 'Pengembangan aplikasi mobile lintas platform. Berhasil mempublikasikan aplikasi produktivitas "Rehat" secara global di Google Play Store.',
    },
    {
      id: 'dart',
      key: 'D',
      label: 'Dart',
      symbol: '🎯',
      bg: 'bg-teal-600 text-white border-teal-400 shadow-[0_6px_0_#0f766e]',
      tag: 'Mobile Language',
      punchline: "sound null safety & async futures that never fail",
      description: 'Bahasa utama untuk mobile. Pemrograman asynchronous berbasis Streams dan Futures, state management modular, dan performa kompilasi AOT.',
    },
    {
      id: 'react',
      key: 'R',
      label: 'React',
      symbol: '⚛',
      bg: 'bg-cyan-600 text-white border-cyan-400 shadow-[0_6px_0_#0891b2]',
      tag: 'Frontend Web',
      punchline: "declarative components & silky reactive state",
      description: 'Pembangunan antarmuka web modern, integrasi WebGL 3D Three.js, transisi GSAP interaktif, dan rendering arsitektur komponen modular.',
    },
    {
      id: 'ts',
      key: 'T',
      label: 'TS',
      symbol: 'TS',
      bg: 'bg-blue-600 text-white border-blue-400 shadow-[0_6px_0_#2563eb]',
      tag: 'Type Safety',
      punchline: "preventing 'undefined is not a function' since day one",
      description: 'Koleksi tipe data ketat, interface kontrak data, generic abstractions, dan keandalan kode skala besar.',
    },

    // Row 4
    {
      id: 'java',
      key: 'J',
      label: 'Java',
      symbol: '☕',
      bg: 'bg-amber-700 text-white border-amber-500 shadow-[0_6px_0_#b45309]',
      tag: 'OOP Systems',
      punchline: "pure OOP discipline & custom 2D game loops",
      description: 'Pemrograman berorientasi objek murni, implementasi design patterns, algoritma struktur data, dan pengembangan engine game desktop 2D kustom.',
    },
    {
      id: 'js',
      key: 'S',
      label: 'JS',
      symbol: 'JS',
      bg: 'bg-yellow-500 text-zinc-950 font-bold border-yellow-300 shadow-[0_6px_0_#ca8a04]',
      tag: 'Web Core',
      punchline: "the single-threaded async miracle of modern computing",
      description: 'Asynchronous event loop, ESNext features, V8 engine optimizations, Web Workers, dan manipulasi DOM performant.',
    },
    {
      id: 'rest',
      key: 'A',
      label: 'API',
      symbol: '⇄',
      bg: 'bg-emerald-700 text-white border-emerald-500 shadow-[0_6px_0_#047857]',
      tag: 'Integrations',
      punchline: "KiriminAja logistics & Watzap messaging on autopilot",
      description: 'Perancangan API RESTful standar, integrasi payment gateway Midtrans, webhook otomatisasi notifikasi, dan Brevo SMTP terotentikasi.',
    },
    {
      id: 'html',
      key: 'H',
      label: 'HTML5',
      symbol: '5',
      bg: 'bg-orange-600 text-white border-orange-400 shadow-[0_6px_0_#ea580c]',
      tag: 'Semantic Web',
      punchline: "accessible semantic markup & modern canvas API",
      description: 'Struktur semantik standar WCAG AA, integrasi canvas WebGL, responsive viewport optimization, dan metadata teroptimasi.',
    },
  ];

  const currentSkill = keycaps.find((k) => k.id === activeKey) || keycaps[0];

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const char = e.key.toUpperCase();
      const matched = keycaps.find((k) => k.key === char || k.label.toUpperCase().startsWith(char));
      if (matched) {
        setPressedKey(matched.id);
        setActiveKey(matched.id);
      }
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 3D Perspective Tilt on Mouse Movement
  useEffect(() => {
    const deck = keyboardDeckRef.current;
    if (!deck) return;

    const onMouseMove = (e) => {
      const rect = deck.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(deck, {
        rotationY: x * 16 + 12,
        rotationX: -y * 14 + 18,
        ease: 'power2.out',
        duration: 0.5,
      });
    };

    const onMouseLeave = () => {
      gsap.to(deck, {
        rotationY: 12,
        rotationX: 18,
        ease: 'power3.out',
        duration: 0.8,
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    deck.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      deck.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          SKILLS
        </h2>
        <span className="font-mono text-xs sm:text-sm text-zinc-500 mt-2">
          (hint: click a keycap or press your keyboard)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Active Tech Details (Photo 3 Style Display) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-sky-400 mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>{currentSkill.tag}</span>
          </div>

          <h3 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-3">
            {currentSkill.label}
          </h3>

          <div className="text-zinc-300 font-mono text-sm sm:text-base leading-relaxed mb-6">
            &quot;{currentSkill.punchline}&quot;
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-zinc-800/80 pt-5">
            {currentSkill.description}
          </p>

          <div className="mt-8 flex items-center gap-3 text-xs font-mono text-zinc-500">
            <kbd className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold">
              {currentSkill.key}
            </kbd>
            <span>Tekan tombol [{currentSkill.key}] untuk mengaktifkan</span>
          </div>
        </div>

        {/* Right: 3D Mechanical Macropad (Matching Photo 3) */}
        <div className="lg:col-span-7 flex justify-center items-center py-6">
          <div
            className="perspective-[1400px] w-full max-w-[500px]"
            style={{ perspective: '1400px' }}
          >
            <div
              ref={keyboardDeckRef}
              className="p-5 sm:p-7 rounded-[28px] bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-zinc-800 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-100 ease-out"
              style={{
                transform: 'rotateX(18deg) rotateY(12deg) rotateZ(-3deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Keyboard Macropad Grid (4x4 Matrix) */}
              <div className="grid grid-cols-4 gap-3 sm:gap-3.5">
                {keycaps.map((kc) => {
                  const isSelected = activeKey === kc.id;
                  const isDepressed = pressedKey === kc.id;

                  return (
                    <button
                      key={kc.id}
                      onClick={() => setActiveKey(kc.id)}
                      onMouseEnter={() => setActiveKey(kc.id)}
                      className={`relative group rounded-xl p-3 sm:p-4 text-center font-mono font-bold transition-all duration-75 select-none focus:outline-none ${kc.bg} ${
                        isSelected
                          ? 'ring-2 ring-sky-400 ring-offset-2 ring-offset-zinc-950 translate-y-1 shadow-[0_2px_0_rgba(0,0,0,0.6)]'
                          : ''
                      } ${
                        isDepressed
                          ? 'translate-y-1.5 shadow-none'
                          : 'hover:-translate-y-0.5'
                      }`}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                      title={`${kc.label} (Press ${kc.key})`}
                    >
                      <div className="text-[10px] sm:text-xs opacity-75 mb-0.5 tracking-wider">
                        {kc.key}
                      </div>
                      <div className="text-sm sm:text-base font-extrabold truncate">
                        {kc.label}
                      </div>

                      <div className="absolute inset-x-1 top-1 h-[2px] bg-white/30 rounded-full pointer-events-none" />
                    </button>
                  );
                })}
              </div>

              {/* Chassis Branding */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>MECHANICAL MATRIX // 16 KEYS</span>
                <span>RAKA.DEV // 60 FPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
