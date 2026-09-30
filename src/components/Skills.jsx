import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// ═══════════════════════════════════════════════════════════════════
// OFFICIAL VECTOR BRAND LOGOS (16 SKILLS)
// ═══════════════════════════════════════════════════════════════════

function LinuxLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      {/* Tux penguin body */}
      <path d="M12 2C9.8 2 8 3.8 8 6v4c-1.1.5-2 1.6-2 2.9 0 1.2.7 2.2 1.7 2.7-.4.9-.7 1.9-.7 3 0 .8.5 1.4 1.3 1.4h7.4c.8 0 1.3-.6 1.3-1.4 0-1.1-.3-2.1-.7-3 1-.5 1.7-1.5 1.7-2.7 0-1.3-.9-2.4-2-2.9V6c0-2.2-1.8-4-4-4z" />
      <ellipse cx="12" cy="14" rx="3.2" ry="4.2" fill="#f4f4f5" />
      <circle cx="10.5" cy="5.5" r="0.7" fill="#f4f4f5" />
      <circle cx="13.5" cy="5.5" r="0.7" fill="#f4f4f5" />
      <circle cx="10.5" cy="5.5" r="0.35" fill="#09090b" />
      <circle cx="13.5" cy="5.5" r="0.35" fill="#09090b" />
      <polygon points="12,6.5 10.5,8.2 13.5,8.2" fill="#f59e0b" />
      <ellipse cx="9" cy="20.5" rx="2.2" ry="1" fill="#f59e0b" />
      <ellipse cx="15" cy="20.5" rx="2.2" ry="1" fill="#f59e0b" />
    </svg>
  );
}

function DockerLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="2" y="8" width="2.4" height="2" rx="0.3" fill="currentColor" />
      <rect x="5.4" y="8" width="2.4" height="2" rx="0.3" fill="currentColor" />
      <rect x="8.8" y="8" width="2.4" height="2" rx="0.3" fill="currentColor" />
      <rect x="5.4" y="5.4" width="2.4" height="2" rx="0.3" fill="currentColor" />
      <rect x="8.8" y="5.4" width="2.4" height="2" rx="0.3" fill="currentColor" />
      <rect x="12.2" y="5.4" width="2.4" height="2" rx="0.3" fill="currentColor" />
      <rect x="8.8" y="2.8" width="2.4" height="2" rx="0.3" fill="currentColor" />
      <path d="M22.5 10.5c-.4-.3-1.4-.4-2.2.2-.4.3-.8.8-1 1.4-1.3-.2-3.8-.2-5.3 1.2H1c-.3 0-.6.3-.6.6.2 3.8 3.3 6.6 7.4 6.6 4.8 0 8.6-2.5 9.8-6.9 1.5-.1 3.4.4 4.5-.4.4-.3.6-.8.6-1.3-.1-.6-.7-1.1-1.2-1.4z" />
      <circle cx="6" cy="14" r="0.6" fill="#0284c7" />
    </svg>
  );
}

function GitLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" fill="currentColor" fillOpacity="0.25" />
      <circle cx="6" cy="6" r="3" fill="currentColor" fillOpacity="0.25" />
      <circle cx="18" cy="6" r="3" fill="currentColor" fillOpacity="0.25" />
      <path d="M6 9v12" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function CiscoLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="2" y="10" width="1.6" height="4.5" rx="0.6" />
      <rect x="4.5" y="7" width="1.6" height="10.5" rx="0.6" />
      <rect x="7" y="10" width="1.6" height="4.5" rx="0.6" />
      <rect x="9.5" y="5" width="1.6" height="14.5" rx="0.6" />
      <rect x="12" y="9" width="1.6" height="6.5" rx="0.6" />
      <rect x="14.5" y="5" width="1.6" height="14.5" rx="0.6" />
      <rect x="17" y="10" width="1.6" height="4.5" rx="0.6" />
      <rect x="19.5" y="7" width="1.6" height="10.5" rx="0.6" />
      <rect x="22" y="10" width="1.6" height="4.5" rx="0.6" />
    </svg>
  );
}

function LaravelLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.5 2.2a1 1 0 0 1 1 0l8.5 4.9a1 1 0 0 1 .5.9v9.8a1 1 0 0 1-.5.9l-8.5 4.9a1 1 0 0 1-1 0l-8.5-4.9a1 1 0 0 1-.5-.9V8a1 1 0 0 1 .5-.9l8.5-4.9zm0 2.2L4.5 8.5l7 4 7-4-7-4.1zm-7.5 6.1v6.9l7 4.1v-6.9l-7-4.1zm15 0l-7 4.1v6.9l7-4.1v-6.9z" />
    </svg>
  );
}

function PhpLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <ellipse cx="12" cy="12" rx="10" ry="6.5" fill="#4338ca" />
      <text x="12" y="14.5" fontSize="6.5" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" fill="#ffffff">
        PHP
      </text>
    </svg>
  );
}

function MysqlLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.5 7.5c-1-1.5-2.8-2.5-4.8-2.5-2.5 0-4.5 1.5-5.5 3.5-.8 1.5-1.5 3-2.5 4-1 .8-2.2 1.2-3.7 1.2V15c2 0 3.5-.5 4.8-1.5 1.2-1 2-2.3 2.7-3.8.8-1.7 2.3-2.7 4.2-2.7 1.5 0 2.8.7 3.5 1.8l-1.5 1.2c-.5-.7-1.2-1.1-2-1.1-1.2 0-2.2.7-2.7 1.8-.4.9-.9 1.8-1.5 2.5 1.5.8 3.2 1.3 5 1.3 3.5 0 6.5-1.8 7.5-4.5l-1.7-.5z" />
      <circle cx="15.5" cy="8.5" r="0.8" fill="#ffffff" />
      <path d="M4 18h16v1.5H4zM6 21h12v1.5H6z" opacity="0.6" />
    </svg>
  );
}

function OracleLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7 6h10a6 6 0 0 1 0 12H7A6 6 0 0 1 7 6zm10 9a3 3 0 0 0 0-6H7a3 3 0 0 0 0 6h10z" />
    </svg>
  );
}

function FlutterLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M14.2 2.5L4 12.7l3.2 3.2L20.6 2.5h-6.4zm-.2 8.5L8.5 16.5l3.2 3.2 5.5-5.5 4.8 4.8h6.4l-8-8-6.4 0z" />
    </svg>
  );
}

function DartLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.5 3.5h7.2L20 12l-5.3 7.8L3 17.5l1.5-14zm1.8 2.2l-.8 9.5 8.2 1.6 3.6-5.3-5-5.8H6.3z" />
    </svg>
  );
}

function ReactLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function TsLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#2563eb" />
      <path d="M6 8h6v2H9.5v7h-2V10H6V8zm7.5 4.5c0-1.5 1-2.5 3-2.5 1.5 0 2.5.5 3 1.2l-1.3 1.2c-.4-.4-.9-.6-1.7-.6-.8 0-1.2.3-1.2.8 0 .5.3.7 1.4 1 2 .5 2.8 1.2 2.8 2.5 0 1.6-1.2 2.6-3.2 2.6-1.8 0-2.8-.7-3.4-1.5l1.3-1.2c.5.6 1.1.9 2.1.9.8 0 1.3-.3 1.3-.8 0-.5-.4-.7-1.5-1-1.8-.4-2.6-1.1-2.6-2.6z" fill="#ffffff" />
    </svg>
  );
}

function JavaLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
      {/* Steam lines */}
      <path d="M9 2c0 2 1.5 2.5 1.5 4.5S9 9 9 10" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13 1c0 2 1.5 2.5 1.5 4.5S13 8 13 9.5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17 2c0 2 1.5 2.5 1.5 4.5S17 9 17 10" strokeWidth="1.6" strokeLinecap="round" />
      {/* Cup body */}
      <path d="M5 12h12a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.8" />
      {/* Cup handle */}
      <path d="M17 12.5h1.5a2 2 0 0 1 0 4H15" strokeWidth="1.8" />
      {/* Saucer */}
      <path d="M4 19.5h16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function JsLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#facc15" />
      <path d="M8 8h2v6.5c0 1.5-.8 2.2-2 2.2-.6 0-1.3-.2-1.7-.5l.5-1.5c.3.2.7.4 1.1.4.5 0 .8-.3.8-.9V8zm5.5 4.5c0-1.5 1-2.5 3-2.5 1.5 0 2.5.5 3 1.2l-1.3 1.2c-.4-.4-.9-.6-1.7-.6-.8 0-1.2.3-1.2.8 0 .5.3.7 1.4 1 2 .5 2.8 1.2 2.8 2.5 0 1.6-1.2 2.6-3.2 2.6-1.8 0-2.8-.7-3.4-1.5l1.3-1.2c.5.6 1.1.9 2.1.9.8 0 1.3-.3 1.3-.8 0-.5-.4-.7-1.5-1-1.8-.4-2.6-1.1-2.6-2.6z" fill="#09090b" />
    </svg>
  );
}

function ApiLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h12a3 3 0 0 1 3 3v1" />
      <polyline points="7 4 4 7 7 10" />
      <path d="M20 17H8a3 3 0 0 1-3-3v-1" />
      <polyline points="17 14 20 17 17 20" />
    </svg>
  );
}

function PythonLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M11.9 2c-3.1 0-5 1.5-5 3.5v2.5h5v1H4.5C2.5 9 1 10.9 1 14s1.5 5 3.5 5h2v-2.5c0-1.8 1.4-3.5 3.5-3.5h5v-1h-5v-5c0-1.4 1-2.5 2.5-2.5h4c1.4 0 2.5 1 2.5 2.5v1h2V5.5C21 3.5 19.1 2 16 2h-4.1zm-2.4 2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" fill="#38bdf8" />
      <path d="M12.1 22c3.1 0 5-1.5 5-3.5v-2.5h-5v-1h7.4c2 0 3.5-1.9 3.5-5s-1.5-5-3.5-5h-2v2.5c0 1.8-1.4 3.5-3.5 3.5h-5v1h5v5c0 1.4-1 2.5-2.5 2.5h-4c-1.4 0-2.5-1-2.5-2.5v-1h-2v1.5C3 20.5 4.9 22 8 22h4.1zm2.4-2a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" fill="#facc15" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SKILLS COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function Skills() {
  const [activeKey, setActiveKey] = useState('linux');
  const [pressedKey, setPressedKey] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const detailsPanelRef = useRef(null);
  const keyboardDeckRef = useRef(null);

  const { t } = useLanguage();

  // Static visual attributes for 16 Mechanical Keycaps
  const staticKeycaps = [
    { id: 'linux', key: 'L', label: 'Linux', Logo: LinuxLogo, accentColor: '#38bdf8', bg: 'bg-zinc-800 text-white border-zinc-600 shadow-[0_5px_0_#27272a]', glowColor: 'rgba(56,189,248,0.25)' },
    { id: 'docker', key: 'K', label: 'Docker', Logo: DockerLogo, accentColor: '#0284c7', bg: 'bg-sky-600 text-white border-sky-400 shadow-[0_5px_0_#0284c7]', glowColor: 'rgba(2,132,199,0.3)' },
    { id: 'git', key: 'G', label: 'Git', Logo: GitLogo, accentColor: '#ef4444', bg: 'bg-red-700 text-white border-red-500 shadow-[0_5px_0_#b91c1c]', glowColor: 'rgba(239,68,68,0.3)' },
    { id: 'cisco', key: 'C', label: 'Cisco', Logo: CiscoLogo, accentColor: '#06b6d4', bg: 'bg-cyan-700 text-white border-cyan-500 shadow-[0_5px_0_#0e7490]', glowColor: 'rgba(6,182,212,0.3)' },
    { id: 'laravel', key: 'V', label: 'Laravel', Logo: LaravelLogo, accentColor: '#f43f5e', bg: 'bg-rose-600 text-white border-rose-400 shadow-[0_5px_0_#e11d48]', glowColor: 'rgba(244,63,94,0.3)' },
    { id: 'php', key: 'P', label: 'PHP', Logo: PhpLogo, accentColor: '#6366f1', bg: 'bg-indigo-700 text-white border-indigo-500 shadow-[0_5px_0_#4338ca]', glowColor: 'rgba(99,102,241,0.3)' },
    { id: 'mysql', key: 'M', label: 'MySQL', Logo: MysqlLogo, accentColor: '#3b82f6', bg: 'bg-blue-700 text-white border-blue-500 shadow-[0_5px_0_#1d4ed8]', glowColor: 'rgba(59,130,246,0.3)' },
    { id: 'oracle', key: 'O', label: 'Oracle', Logo: OracleLogo, accentColor: '#ef4444', bg: 'bg-red-800 text-white border-red-600 shadow-[0_5px_0_#991b1b]', glowColor: 'rgba(239,68,68,0.3)' },
    { id: 'flutter', key: 'F', label: 'Flutter', Logo: FlutterLogo, accentColor: '#38bdf8', bg: 'bg-sky-500 text-white border-sky-300 shadow-[0_5px_0_#0369a1]', glowColor: 'rgba(56,189,248,0.3)' },
    { id: 'dart', key: 'D', label: 'Dart', Logo: DartLogo, accentColor: '#14b8a6', bg: 'bg-teal-600 text-white border-teal-400 shadow-[0_5px_0_#0f766e]', glowColor: 'rgba(20,184,166,0.3)' },
    { id: 'react', key: 'R', label: 'React', Logo: ReactLogo, accentColor: '#06b6d4', bg: 'bg-cyan-600 text-white border-cyan-400 shadow-[0_5px_0_#0891b2]', glowColor: 'rgba(6,182,212,0.3)' },
    { id: 'ts', key: 'T', label: 'TS', Logo: TsLogo, accentColor: '#3b82f6', bg: 'bg-blue-600 text-white border-blue-400 shadow-[0_5px_0_#2563eb]', glowColor: 'rgba(59,130,246,0.3)' },
    { id: 'java', key: 'J', label: 'Java', Logo: JavaLogo, accentColor: '#f59e0b', bg: 'bg-amber-700 text-white border-amber-500 shadow-[0_5px_0_#b45309]', glowColor: 'rgba(245,158,11,0.3)' },
    { id: 'js', key: 'S', label: 'JS', Logo: JsLogo, accentColor: '#eab308', bg: 'bg-yellow-500 text-zinc-950 font-bold border-yellow-300 shadow-[0_5px_0_#ca8a04]', glowColor: 'rgba(234,179,8,0.35)' },
    { id: 'rest', key: 'A', label: 'API', Logo: ApiLogo, accentColor: '#10b981', bg: 'bg-emerald-700 text-white border-emerald-500 shadow-[0_5px_0_#047857]', glowColor: 'rgba(16,185,129,0.3)' },
    { id: 'ai_python', key: 'Y', label: 'AI / Py', Logo: PythonLogo, accentColor: '#38bdf8', bg: 'bg-emerald-600 text-white border-emerald-400 shadow-[0_5px_0_#059669]', glowColor: 'rgba(56,189,248,0.3)' },
  ];

  const keycaps = staticKeycaps.map((k) => {
    const data = t.skills.keycaps[k.id] || {};
    return {
      ...k,
      tag: data.tag || '',
      punchline: data.punchline || '',
      description: data.description || '',
      highlights: data.highlights || [],
    };
  });

  const currentSkill = keycaps.find((k) => k.id === activeKey) || keycaps[0];

  const handleKeySelect = (id) => {
    setActiveKey(id);
    setPressedKey(id);
    setTimeout(() => {
      setPressedKey(null);
    }, 120);
  };

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

  // Section entrance reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (detailsPanelRef.current) {
        gsap.fromTo(
          detailsPanelRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      if (keyboardDeckRef.current) {
        gsap.fromTo(
          keyboardDeckRef.current,
          { y: 50, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Micro-transition when activeKey changes
  useEffect(() => {
    if (detailsPanelRef.current) {
      gsap.fromTo(
        detailsPanelRef.current,
        { opacity: 0.4, y: 8 },
        { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }
      );
    }
  }, [activeKey]);

  // Smooth 3D deck tilt via GSAP (avoids CSS transition freezing hit-tests)
  const handleDeckMouseMove = (e) => {
    const deck = keyboardDeckRef.current;
    if (!deck) return;
    const rect = deck.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(deck, {
      rotationX: 18 - y * 10,
      rotationY: 12 + x * 12,
      rotationZ: -3,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleDeckMouseLeave = () => {
    const deck = keyboardDeckRef.current;
    if (!deck) return;
    gsap.to(deck, {
      rotationX: 18,
      rotationY: 12,
      rotationZ: -3,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const ActiveLogo = currentSkill.Logo;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center mb-16">
        <h2 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          {t.skills.heading}
        </h2>
        <span className="font-mono text-xs sm:text-sm text-zinc-500 mt-2">
          {t.skills.hint}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Active Tech Showcase & Specs */}
        <div ref={detailsPanelRef} className="lg:col-span-5 flex flex-col justify-center">
          {/* Top row: Category badge + Large glowing Logo Emblem */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-14 h-14 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 flex items-center justify-center p-3 shadow-lg relative flex-shrink-0"
              style={{
                boxShadow: `0 0 25px ${currentSkill.glowColor}`,
              }}
            >
              <ActiveLogo className="w-full h-full" />
              <span
                className="absolute inset-0 rounded-2xl pointer-events-none border opacity-60"
                style={{ borderColor: currentSkill.accentColor }}
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300 w-fit mb-1">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: currentSkill.accentColor }}
                />
                <span>{currentSkill.tag}</span>
              </div>
              <p className="text-zinc-500 font-mono text-[11px]">{t.skills.profileBadge}</p>
            </div>
          </div>

          <h3 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight mb-2">
            {currentSkill.label}
          </h3>

          <div className="text-zinc-300 font-mono text-sm sm:text-base leading-relaxed mb-5">
            &quot;{currentSkill.punchline}&quot;
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-zinc-800/80 pt-4 mb-6">
            {currentSkill.description}
          </p>

          {/* Core Competency Highlights */}
          <div className="mb-6">
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider mb-2">
              {t.skills.focusLabel}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {currentSkill.highlights.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900/70 border border-zinc-800 text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 pt-3 border-t border-zinc-900">
            <kbd className="px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold">
              {currentSkill.key}
            </kbd>
            <span>{t.skills.pressKey ? t.skills.pressKey.replace('{key}', currentSkill.key) : `Tekan tombol [${currentSkill.key}] untuk beralih`}</span>
          </div>
        </div>

        {/* Right: 3D Mechanical Macropad with Official Logos & 100% Reliable Hit-Testing */}
        <div className="lg:col-span-7 flex justify-center items-center py-6">
          <div
            className="perspective-[1400px] w-full max-w-[520px]"
            style={{ perspective: '1400px' }}
          >
            <div
              ref={keyboardDeckRef}
              onMouseMove={handleDeckMouseMove}
              onMouseLeave={handleDeckMouseLeave}
              className="p-5 sm:p-7 rounded-[30px] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border-2 border-zinc-700/80 shadow-[0_30px_80px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.18)]"
              style={{
                transform: 'rotateX(18deg) rotateY(12deg) rotateZ(-3deg)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Chassis Top Bar: Hardware Hex Screws + Status OLED */}
              <div className="mb-4 pb-3 border-b border-zinc-800/80 flex items-center justify-between select-none">
                {/* Left Screw & Brand */}
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center">
                    <span className="w-1 h-0.5 bg-zinc-500" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                    PRO-BOARD 16K
                  </span>
                </div>

                {/* OLED Mini Status Pill */}
                <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full glass-pill font-mono text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                  <span className="text-zinc-400 uppercase">ONLINE</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-sky-400 font-bold uppercase">{currentSkill.key}: {currentSkill.label}</span>
                </div>

                {/* Right Screw */}
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center">
                  <span className="w-1 h-0.5 bg-zinc-500 rotate-90" />
                </span>
              </div>

              {/* Keyboard Macropad Grid (4x4 Matrix) */}
              <div className="grid grid-cols-4 gap-3 sm:gap-3.5">
                {keycaps.map((kc) => {
                  const isSelected = activeKey === kc.id;
                  const isDepressed = pressedKey === kc.id;
                  const KeyLogo = kc.Logo;

                  return (
                    <button
                      key={kc.id}
                      type="button"
                      onClick={() => handleKeySelect(kc.id)}
                      onMouseEnter={() => setActiveKey(kc.id)}
                      onMouseMove={() => {
                        if (activeKey !== kc.id) setActiveKey(kc.id);
                      }}
                      onPointerEnter={() => setActiveKey(kc.id)}
                      onPointerOver={() => setActiveKey(kc.id)}
                      onPointerMove={() => {
                        if (activeKey !== kc.id) setActiveKey(kc.id);
                      }}
                      onFocus={() => setActiveKey(kc.id)}
                      className={`relative group rounded-2xl p-2.5 sm:p-3 text-center font-mono font-bold transition-all duration-75 select-none focus:outline-none cursor-pointer flex flex-col items-center justify-between min-h-[76px] sm:min-h-[86px] ${kc.bg} ${
                        isSelected
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-950 translate-y-1 shadow-[0_1px_0_rgba(0,0,0,0.8)]'
                          : ''
                      } ${
                        isDepressed
                          ? 'translate-y-2 shadow-none'
                          : 'hover:-translate-y-0.5 active:translate-y-2 active:shadow-none'
                      }`}
                      style={{
                        boxShadow: isSelected
                          ? `0 0 16px ${kc.glowColor}, 0 2px 0 rgba(0,0,0,0.8)`
                          : undefined,
                      }}
                      title={`${kc.label} (Tekan ${kc.key})`}
                      aria-label={`${kc.label} (${kc.key})`}
                    >
                      {/* Top Stamp: Monospace Key Bind Indicator */}
                      <div className="pointer-events-none w-full flex items-center justify-between text-[10px] opacity-75 leading-none">
                        <span className="font-mono text-[9px] px-1 py-0.5 rounded bg-black/25">
                          {kc.key}
                        </span>
                        {isSelected && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: kc.accentColor }}
                          />
                        )}
                      </div>

                      {/* Center: Official Vector Brand Logo */}
                      <div className="pointer-events-none my-1 flex items-center justify-center text-white filter drop-shadow">
                        <KeyLogo className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      {/* Bottom: Crisp Tech Name */}
                      <div className="pointer-events-none text-xs sm:text-sm font-extrabold truncate w-full text-center leading-none">
                        {kc.label}
                      </div>

                      {/* Tactile Keycap Top-Bevel Specular Reflection */}
                      <div className="pointer-events-none absolute inset-x-1.5 top-1 h-[2px] bg-white/35 rounded-full" />
                    </button>
                  );
                })}
              </div>

              {/* Chassis Bottom Bar */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500 select-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  {t.skills.keycapsCount || '16 Keycaps Mekanikal'}
                </span>
                <span>{t.skills.keycapsAction || 'Klik atau arahkan kursor'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
