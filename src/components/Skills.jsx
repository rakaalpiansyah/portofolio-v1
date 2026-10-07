import React, { useState, useEffect, useRef } from 'react';
import { useGSAP, gsap } from '../lib/gsap';
import { revealChars } from '../lib/reveal';
import { useLanguage } from '../context/LanguageContext';

// ═══════════════════════════════════════════════════════════════════
// OFFICIAL VECTOR BRAND LOGOS
// ═══════════════════════════════════════════════════════════════════

function LinuxLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C9.8 2 8 3.8 8 6v4c-1.1.5-2 1.6-2 2.9 0 1.2.7 2.2 1.7 2.7-.4.9-.7 1.9-.7 3 0 .8.5 1.4 1.3 1.4h7.4c.8 0 1.3-.6 1.3-1.4 0-1.1-.3-2.1-.7-3 1-.5 1.7-1.5 1.7-2.7 0-1.3-.9-2.4-2-2.9V6c0-2.2-1.8-4-4-4z" />
      <ellipse cx="12" cy="14" rx="3.2" ry="4.2" fill="#f4f4f5" />
      <circle cx="10.5" cy="5.5" r="0.7" fill="#f4f4f5" />
      <circle cx="13.5" cy="5.5" r="0.7" fill="#f4f4f5" />
      <polygon points="12,6.5 10.5,8.2 13.5,8.2" fill="#c6ff3d" />
      <ellipse cx="9" cy="20.5" rx="2.2" ry="1" fill="#c6ff3d" />
      <ellipse cx="15" cy="20.5" rx="2.2" ry="1" fill="#c6ff3d" />
    </svg>
  );
}

function DockerLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="2" y="8" width="2.4" height="2" rx="0.3" />
      <rect x="5.4" y="8" width="2.4" height="2" rx="0.3" />
      <rect x="8.8" y="8" width="2.4" height="2" rx="0.3" />
      <rect x="5.4" y="5.4" width="2.4" height="2" rx="0.3" />
      <rect x="8.8" y="5.4" width="2.4" height="2" rx="0.3" />
      <rect x="12.2" y="5.4" width="2.4" height="2" rx="0.3" />
      <rect x="8.8" y="2.8" width="2.4" height="2" rx="0.3" />
      <path d="M22.5 10.5c-.4-.3-1.4-.4-2.2.2-.4.3-.8.8-1 1.4-1.3-.2-3.8-.2-5.3 1.2H1c-.3 0-.6.3-.6.6.2 3.8 3.3 6.6 7.4 6.6 4.8 0 8.6-2.5 9.8-6.9 1.5-.1 3.4.4 4.5-.4.4-.3.6-.8.6-1.3-.1-.6-.7-1.1-1.2-1.4z" />
    </svg>
  );
}

function GitLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="6" cy="6" r="3" fill="currentColor" fillOpacity="0.2" />
      <circle cx="18" cy="6" r="3" fill="currentColor" fillOpacity="0.2" />
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
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 4C6.5 4 2 7.6 2 12s4.5 8 10 8 10-3.6 10-8-4.5-8-10-8zm-4 11H6.5l1-6H9c1.5 0 2.5.7 2.5 2s-1 4-3.5 4zm6.5 0h-1.5l1-6h1.5c1.5 0 2.5.7 2.5 2s-1 4-3.5 4z" />
    </svg>
  );
}

function MysqlLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.5 7.5c-1-1.5-2.8-2.5-4.8-2.5-2.5 0-4.5 1.5-5.5 3.5-.8 1.5-1.5 3-2.5 4-1 .8-2.2 1.2-3.7 1.2V15c2 0 3.5-.5 4.8-1.5 1.2-1 2-2.3 2.7-3.8.8-1.7 2.3-2.7 4.2-2.7 1.5 0 2.8.7 3.5 1.8l-1.5 1.2c-.5-.7-1.2-1.1-2-1.1-1.2 0-2.2.7-2.7 1.8-.4.9-.9 1.8-1.5 2.5 1.5.8 3.2 1.3 5 1.3 3.5 0 6.5-1.8 7.5-4.5l-1.7-.5z" />
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
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#1d1d1c" stroke="#3a3a38" />
      <path d="M6 8h6v2H9.5v7h-2V10H6V8zm7.5 4.5c0-1.5 1-2.5 3-2.5 1.5 0 2.5.5 3 1.2l-1.3 1.2c-.4-.4-.9-.6-1.7-.6-.8 0-1.2.3-1.2.8 0 .5.3.7 1.4 1 2 .5 2.8 1.2 2.8 2.5 0 1.6-1.2 2.6-3.2 2.6-1.8 0-2.8-.7-3.4-1.5l1.3-1.2c.5.6 1.1.9 2.1.9.8 0 1.3-.3 1.3-.8 0-.5-.4-.7-1.5-1-1.8-.4-2.6-1.1-2.6-2.6z" fill="#f5f5f0" />
    </svg>
  );
}

function JavaLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
      <path d="M9 2c0 2 1.5 2.5 1.5 4.5S9 9 9 10" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M13 1c0 2 1.5 2.5 1.5 4.5S13 8 13 9.5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M5 12h12a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4z" fill="currentColor" fillOpacity="0.25" strokeWidth="1.8" />
      <path d="M17 12.5h1.5a2 2 0 0 1 0 4H15" strokeWidth="1.8" />
      <path d="M4 19.5h16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function JsLogo({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#1d1d1c" stroke="#3a3a38" />
      <path d="M8 8h2v6.5c0 1.5-.8 2.2-2 2.2-.6 0-1.3-.2-1.7-.5l.5-1.5c.3.2.7.4 1.1.4.5 0 .8-.3.8-.9V8zm5.5 4.5c0-1.5 1-2.5 3-2.5 1.5 0 2.5.5 3 1.2l-1.3 1.2c-.4-.4-.9-.6-1.7-.6-.8 0-1.2.3-1.2.8 0 .5.3.7 1.4 1 2 .5 2.8 1.2 2.8 2.5 0 1.6-1.2 2.6-3.2 2.6-1.8 0-2.8-.7-3.4-1.5l1.3-1.2c.5.6 1.1.9 2.1.9.8 0 1.3-.3 1.3-.8 0-.5-.4-.7-1.5-1-1.8-.4-2.6-1.1-2.6-2.6z" fill="#f5f5f0" />
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
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.9 2c-3.1 0-5 1.5-5 3.5v2.5h5v1H4.5C2.5 9 1 10.9 1 14s1.5 5 3.5 5h2v-2.5c0-1.8 1.4-3.5 3.5-3.5h5v-1h-5v-5c0-1.4 1-2.5 2.5-2.5h4c1.4 0 2.5 1 2.5 2.5v1h2V5.5C21 3.5 19.1 2 16 2h-4.1zm-2.4 2a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z" />
      <path d="M12.1 22c3.1 0 5-1.5 5-3.5v-2.5h-5v-1h7.4c2 0 3.5-1.9 3.5-5s-1.5-5-3.5-5h-2v2.5c0 1.8-1.4 3.5-3.5 3.5h-5v1h5v5c0 1.4-1 2.5-2.5 2.5h-4c-1.4 0-2.5-1-2.5-2.5v-1h-2v1.5C3 20.5 4.9 22 8 22h4.1zm2.4-2a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" opacity="0.6" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SKILLS COMPONENT
// ═══════════════════════════════════════════════════════════════════

export default function Skills() {
  const [activeKey, setActiveKey] = useState('linux');
  const [pressedKey, setPressedKey] = useState(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const deckRef = useRef(null);

  const { t } = useLanguage();

  const staticKeycaps = [
    { id: 'linux', key: 'L', label: 'Linux', Logo: LinuxLogo },
    { id: 'docker', key: 'K', label: 'Docker', Logo: DockerLogo },
    { id: 'git', key: 'G', label: 'Git', Logo: GitLogo },
    { id: 'cisco', key: 'C', label: 'Cisco', Logo: CiscoLogo },
    { id: 'laravel', key: 'V', label: 'Laravel', Logo: LaravelLogo },
    { id: 'php', key: 'P', label: 'PHP', Logo: PhpLogo },
    { id: 'mysql', key: 'M', label: 'MySQL', Logo: MysqlLogo },
    { id: 'oracle', key: 'O', label: 'Oracle', Logo: OracleLogo },
    { id: 'flutter', key: 'F', label: 'Flutter', Logo: FlutterLogo },
    { id: 'dart', key: 'D', label: 'Dart', Logo: DartLogo },
    { id: 'react', key: 'R', label: 'React', Logo: ReactLogo },
    { id: 'ts', key: 'T', label: 'TS', Logo: TsLogo },
    { id: 'java', key: 'J', label: 'Java', Logo: JavaLogo },
    { id: 'js', key: 'S', label: 'JS', Logo: JsLogo },
    { id: 'rest', key: 'A', label: 'REST API', Logo: ApiLogo },
    { id: 'ai_python', key: 'Y', label: 'Python / AI', Logo: PythonLogo },
  ];

  const keycaps = staticKeycaps.map((k) => {
    const data = t.skills?.keycaps?.[k.id] || {};
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
    setTimeout(() => setPressedKey(null), 150);
  };

  // Keyboard Navigation: trigger skill by matching character key
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      const char = e.key.toUpperCase();
      const matched = staticKeycaps.find((k) => k.key === char);
      if (matched) {
        handleKeySelect(matched.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useGSAP(() => {
    revealChars(headingRef.current, {
      trigger: headingRef.current,
      start: 'top 85%',
    });

    gsap.from(deckRef.current?.children || [], {
      scale: 0.9,
      opacity: 0,
      stagger: 0.03,
      duration: 0.7,
      ease: 'expoSoft',
      scrollTrigger: {
        trigger: deckRef.current,
        start: 'top 85%',
      },
    });
  }, { scope: containerRef, dependencies: [t] });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-28 sm:py-36 wrap border-t border-line overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-4xl mb-16 sm:mb-20">
        <span className="text-xs font-mono text-bone-3 tracking-widest uppercase block mb-3">
          02 / Technical Competencies
        </span>
        <h2 ref={headingRef} className="h-section text-bone uppercase">
          {t.skills.heading || 'Skills.'}
        </h2>
        <p className="text-xs font-mono text-signal mt-4">
          {t.skills.hint || '(hint: hover or press matching keyboard keys)'}
        </p>
      </div>

      {/* Main 2-Column Deck: Keycaps Grid + Live Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: 16 Keycaps Mechanical Matrix */}
        <div className="lg:col-span-7">
          <div
            ref={deckRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-ink-900 border border-line"
          >
            {keycaps.map((k) => {
              const isActive = activeKey === k.id;
              const isPressed = pressedKey === k.id;
              const Logo = k.Logo;

              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => handleKeySelect(k.id)}
                  onMouseEnter={() => setActiveKey(k.id)}
                  aria-pressed={isActive}
                  className={`group relative p-4 flex flex-col justify-between aspect-square text-left transition-all duration-200 select-none border ${
                    isActive
                      ? 'bg-signal text-ink border-signal shadow-[0_0_24px_rgba(198,255,61,0.35)] translate-y-0.5'
                      : 'bg-ink-800 text-bone border-line hover:border-bone/50 hover:bg-ink-700'
                  } ${isPressed ? 'scale-95' : 'scale-100'}`}
                >
                  {/* Top Key Label & Keyboard Shortcut Tag */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 border ${
                        isActive
                          ? 'border-ink/40 text-ink bg-ink/10'
                          : 'border-bone/20 text-bone-3 bg-ink'
                      }`}
                    >
                      {k.key}
                    </span>
                    <Logo
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-ink' : 'text-bone-2'
                      }`}
                    />
                  </div>

                  {/* Bottom Skill Title */}
                  <div className="mt-auto">
                    <span className="block font-display font-semibold text-sm leading-tight">
                      {k.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Telemetry Inspector */}
        <div className="lg:col-span-5 bg-ink-900 border border-line p-7 sm:p-8 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
              <span className="text-xs font-mono text-signal uppercase tracking-wider">
                {currentSkill.tag}
              </span>
              <span className="text-xs font-mono text-bone-3">
                Key [{currentSkill.key}]
              </span>
            </div>

            <h3 className="font-display font-semibold text-2xl sm:text-3xl text-bone mb-3">
              {currentSkill.label}
            </h3>

            <p className="text-sm font-mono text-bone-2 mb-6 leading-relaxed">
              "{currentSkill.punchline}"
            </p>

            <p className="text-xs sm:text-sm text-bone-2 leading-relaxed mb-8">
              {currentSkill.description}
            </p>
          </div>

          {/* Highlights Chip Array */}
          <div className="border-t border-line pt-6">
            <span className="text-[11px] font-mono text-bone-3 uppercase tracking-wider block mb-3">
              Core Highlights
            </span>
            <div className="flex flex-wrap gap-2">
              {currentSkill.highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-mono border border-line text-bone bg-ink"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
