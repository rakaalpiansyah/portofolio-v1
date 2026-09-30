import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../locales/translations';
import { Move3d, Sparkles, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/**
 * EngineeringManifesto
 * 
 * Inspired by Pablo Miguez's iconic "MOTION IS THE FUTURE" editorial statement,
 * reimagined for Raka Alpiansyah as "SOFTWARE ENGINEER IS THE FUTURE".
 * 
 * Pillars (Strict anti-slop, craft, taste):
 * 1. Kinetic Typography: Horizontal scrubbed opposing sliding rows using GSAP ScrollTrigger.
 * 2. Interactive Three.js WebGL Core: Interlocking titanium PBR architectural gyro core
 *    reacting simultaneously to real-time scroll scrub and mouse drag/tilt physics.
 * 3. Pure OLED pitch black (#000000) with high-contrast monochrome & sky specular glints.
 * 4. Full bilingual support (ID/EN) with screen-reader accessibility.
 */
export default function EngineeringManifesto() {
  const { language } = useLanguage();
  const t = translations[language] || translations.id;
  const isId = language === 'id';

  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Typography refs for GSAP scrub
  const softRef = useRef(null);
  const wareRef = useRef(null);
  const engineerRef = useRef(null);
  const isRef = useRef(null);
  const futureRef = useRef(null);
  const badgeRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  // ═══════════════════════════════════════════════════════════════════
  // 1. THREE.JS 3D ARCHITECTURAL KINETIC CORE
  // ═══════════════════════════════════════════════════════════════════
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      section.clientWidth / section.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(section.clientWidth, section.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    rimLight.position.set(-6, -5, -4);
    scene.add(rimLight);

    const cursorLight = new THREE.PointLight(0xffffff, 3.5, 14);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // Master 3D Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Materials: Titanium & Obsidian PBR
    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
    });

    const darkTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.98,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });

    // Mesh 1: Titanium Primary Stadium Ring
    const ringGeo = new THREE.TorusGeometry(1.4, 0.28, 32, 64);
    const ring1 = new THREE.Mesh(ringGeo, titaniumMat);
    ring1.scale.set(1.35, 0.9, 1);
    ring1.rotation.set(0.4, 0.3, 0.5);
    coreGroup.add(ring1);

    // Mesh 2: Interlocking Dark Titanium Counter-Ring
    const ring2 = new THREE.Mesh(ringGeo, darkTitaniumMat);
    ring2.scale.set(1.35, 0.9, 1);
    ring2.rotation.set(Math.PI / 2 + 0.3, 0.2, -0.4);
    coreGroup.add(ring2);

    // Mesh 3: Inner Architectural Octahedron / Node Lattice (System Logic)
    const innerGeo = new THREE.OctahedronGeometry(0.85, 1);
    const wireframeGeo = new THREE.WireframeGeometry(innerGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const innerWireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    coreGroup.add(innerWireframe);

    // Mesh 4: Outer Architectural Gyro Coordinate Ring
    const gyroGeo = new THREE.TorusGeometry(2.6, 0.02, 16, 90);
    const gyroMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.35,
    });
    const gyroRing = new THREE.Mesh(gyroGeo, gyroMat);
    gyroRing.rotation.x = Math.PI / 3;
    coreGroup.add(gyroRing);

    // Cardinal coordinate dots
    const dotGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(Math.cos(angle) * 2.6, Math.sin(angle) * 2.6, 0);
      gyroRing.add(dot);
    }

    // Interaction variables
    const mouse = {
      targetX: 0,
      targetY: 0,
      currX: 0,
      currY: 0,
      isDown: false,
      prevX: 0,
      prevY: 0,
      dragRotX: 0,
      dragRotY: 0,
      dragVelX: 0,
      dragVelY: 0,
    };

    let scrollProgress = 0;

    // ScrollTrigger to scrub 3D rotation with scroll
    const scrollTrigger3D = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    const handlePointerMove = (e) => {
      const rect = section.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;

      // Move specular cursor light
      cursorLight.position.x = mouse.targetX * 4.5;
      cursorLight.position.y = mouse.targetY * 3.5;

      if (mouse.isDown) {
        const deltaX = e.clientX - mouse.prevX;
        const deltaY = e.clientY - mouse.prevY;
        mouse.dragVelY = deltaX * 0.007;
        mouse.dragVelX = deltaY * 0.007;
        mouse.dragRotY += mouse.dragVelY;
        mouse.dragRotX += mouse.dragVelX;
        mouse.prevX = e.clientX;
        mouse.prevY = e.clientY;
      }
    };

    const handlePointerDown = (e) => {
      mouse.isDown = true;
      setIsDragging(true);
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);

    // Responsive Resize
    const handleResize = () => {
      if (!section || !renderer || !camera) return;
      const width = section.clientWidth;
      const height = section.clientHeight;
      camera.aspect = width / height;
      // Adjust camera distance for mobile so 3D model fits
      if (width < 768) {
        camera.position.z = 10.5;
      } else {
        camera.position.z = 8.8;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Render loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Inertia drag damping
      if (!mouse.isDown) {
        mouse.dragVelX *= 0.92;
        mouse.dragVelY *= 0.92;
        mouse.dragRotX += mouse.dragVelX;
        mouse.dragRotY += mouse.dragVelY;
      }

      // Smooth mouse follow
      mouse.currX += (mouse.targetX - mouse.currX) * 0.05;
      mouse.currY += (mouse.targetY - mouse.currY) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous ambient rotation + scroll scrub + mouse drag
        const scrollRot = scrollProgress * Math.PI * 2.2;
        coreGroup.rotation.y = scrollRot + mouse.currX * 0.45 + mouse.dragRotY;
        coreGroup.rotation.x = 0.2 + mouse.currY * 0.35 + mouse.dragRotX + Math.sin(scrollProgress * Math.PI) * 0.3;

        // Inner wireframe counter-rotates
        innerWireframe.rotation.y -= delta * 0.4;
        innerWireframe.rotation.z += delta * 0.3;

        gyroRing.rotation.z += delta * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      scrollTrigger3D.kill();

      ringGeo.dispose();
      innerGeo.dispose();
      wireframeGeo.dispose();
      gyroGeo.dispose();
      dotGeo.dispose();
      titaniumMat.dispose();
      darkTitaniumMat.dispose();
      wireframeMat.dispose();
      gyroMat.dispose();
      dotMat.dispose();
      renderer.dispose();
    };
  }, []);

  // ═══════════════════════════════════════════════════════════════════
  // 2. GSAP SCROLLTRIGGER KINETIC TYPOGRAPHY SCRUB (PABLO MIGUEZ STYLE)
  // ═══════════════════════════════════════════════════════════════════
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Elements
      const ware = wareRef.current;
      const engineer = engineerRef.current;
      const isWord = isRef.current;
      const future = futureRef.current;
      const badge = badgeRef.current;

      if (!ware || !engineer || !isWord || !future) return;

      // ── A. ENTRANCE TIMELINE (Scrub: top enters viewport -> center) ──
      const tlEnter = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'center 45%',
          scrub: 1.8,
        },
      });

      // Set initial opposing offsets matching Pablo Miguez's logic:
      // Row 1 'WARE': slides in from right (+45%)
      // Row 2 'ENGINEER': slides in from right (+60%)
      // Row 3 'IS': slides in from left (-50%)
      // Row 4 'THE FUTURE': slides in from right (+55%)
      gsap.set([ware, engineer, isWord, future], { autoAlpha: 1 });
      gsap.set(ware, { xPercent: 45 });
      gsap.set(engineer, { xPercent: 60 });
      gsap.set(isWord, { xPercent: -50 });
      gsap.set(future, { xPercent: 55 });

      if (badge) {
        gsap.set(badge, { autoAlpha: 0, scale: 0.85, y: 20 });
      }

      tlEnter
        .to(ware, { xPercent: 0, ease: 'none' }, 0)
        .to(engineer, { xPercent: 0, ease: 'none' }, 0.02)
        .to(isWord, { xPercent: 0, ease: 'none' }, 0.04)
        .to(future, { xPercent: 0, ease: 'none' }, 0.06);

      if (badge) {
        tlEnter.to(badge, { autoAlpha: 1, scale: 1, y: 0, ease: 'power2.out' }, 0.08);
      }

      // ── B. EXIT TIMELINE (Scrub: center -> exits viewport top) ──
      const tlExit = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'center 45%',
          end: 'bottom top',
          scrub: 1.8,
        },
      });

      tlExit
        .to(ware, { xPercent: 25, opacity: 0.25, ease: 'none' }, 0)
        .to(engineer, { xPercent: -35, opacity: 0.25, ease: 'none' }, 0)
        .to(isWord, { xPercent: 35, opacity: 0.25, ease: 'none' }, 0)
        .to(future, { xPercent: -45, opacity: 0.25, ease: 'none' }, 0);

      if (badge) {
        tlExit.to(badge, { opacity: 0.2, scale: 0.9, ease: 'none' }, 0);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full bg-black text-white flex flex-col justify-between py-20 sm:py-28 overflow-hidden select-none"
      aria-label="Software Engineer Manifesto"
    >
      {/* Screen-reader accessible title */}
      <h2 className="sr-only">Software Engineer is the Future</h2>

      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-auto">
        <canvas
          ref={canvasRef}
          className={`w-full h-full cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
          title={isId ? 'Klik dan seret untuk memutar arsitektur 3D' : 'Click and drag to rotate 3D architecture'}
        />
      </div>

      {/* Subtle top subtle border divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-10" />

      {/* Top Header Eyebrow Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-[11px] sm:text-xs text-zinc-400 uppercase tracking-[0.25em]">
            MANIFESTO // '26
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
          <Move3d className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
            {isId ? '3D Interactive • GSAP Scrub' : '3D Interactive • GSAP Scrub'}
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN KINETIC BRUTALIST TYPOGRAPHY GRID (PABLO MIGUEZ ADAPTATION)
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center my-auto pointer-events-none">
        
        {/* ROW 1: SOFTWARE (Top Left) */}
        <div className="manifesto-row flex items-baseline justify-between w-full overflow-hidden leading-[0.82] select-none">
          <div className="flex items-baseline font-heading font-extrabold text-[12.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[9.5vw] tracking-tighter uppercase text-white drop-shadow-2xl whitespace-nowrap">
            <span ref={softRef} className="inline-block">SOFT</span>
            <span ref={wareRef} className="inline-block text-zinc-300 ml-[0.04em]">WARE</span>
          </div>
          <div className="hidden lg:flex flex-col items-end text-right font-mono text-[11px] text-zinc-400 tracking-wider">
            <span>[ SYSTEM ARCHITECTURE ]</span>
            <span className="text-zinc-500">LAT 6°54&apos;S / LONG 107°36&apos;E</span>
          </div>
        </div>

        {/* ROW 2: ENGINEER (Indented Left) */}
        <div className="manifesto-row flex items-center justify-start w-full overflow-hidden leading-[0.82] pl-[4vw] sm:pl-[10vw] md:pl-[14vw] select-none">
          <span
            ref={engineerRef}
            className="inline-block font-heading font-extrabold text-[12.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[9.5vw] tracking-tighter uppercase text-zinc-100 drop-shadow-2xl whitespace-nowrap"
          >
            ENGINEER
          </span>
        </div>

        {/* ROW 3: IS + ARCHITECTURAL BADGE (Center / Dynamic) */}
        <div className="manifesto-row flex flex-row items-center justify-between w-full overflow-hidden leading-[0.82] py-2 sm:py-3 select-none">
          <div className="flex items-baseline pl-[1vw] sm:pl-[4vw]">
            <span
              ref={isRef}
              className="inline-block font-display italic font-normal text-[14vw] sm:text-[13vw] md:text-[11vw] lg:text-[9.5vw] text-sky-400 drop-shadow-2xl tracking-tight whitespace-nowrap"
            >
              IS
            </span>
          </div>

          {/* Precision Engineering Badge */}
          <div
            ref={badgeRef}
            className="manifesto-badge pointer-events-auto flex items-center gap-2 sm:gap-3 px-3.5 sm:px-6 py-2 sm:py-3 rounded-full bg-zinc-950/80 border border-zinc-800/90 backdrop-blur-xl shadow-2xl hover:border-sky-500/50 transition-colors duration-300"
          >
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
            <span className="font-mono text-[10px] sm:text-xs text-zinc-300 uppercase tracking-[0.16em] whitespace-nowrap">
              <span className="hidden sm:inline">
                {isId ? 'LOGIKA TINGKAT TINGGI • SKALABILITAS • AI PIPELINE' : 'HIGH-THROUGHPUT LOGIC • SCALABILITY • AI'}
              </span>
              <span className="sm:hidden">
                {isId ? 'ARSITEKTUR & AI' : 'ARCHITECTURE & AI'}
              </span>
            </span>
          </div>
        </div>

        {/* ROW 4: THE FUTURE (Bottom Right) */}
        <div className="manifesto-row flex items-center justify-end w-full overflow-hidden leading-[0.82] select-none">
          <span
            ref={futureRef}
            className="inline-block font-heading font-extrabold text-[12.5vw] sm:text-[12vw] md:text-[11vw] lg:text-[9.5vw] tracking-tighter uppercase text-white drop-shadow-2xl text-right whitespace-nowrap"
          >
            THE FUTURE
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          BOTTOM PHILOSOPHY SUBTEXT & 3D INTERACTION HINT
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-zinc-900 pointer-events-none">
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed font-light">
          {isId
            ? 'Rekayasa perangkat lunak bukan sekadar merangkai sintaks — melainkan disiplin arsitektur dalam membentuk masa depan komputasi, ketahanan sistem terdistribusi, dan ekosistem AI berkinerja tinggi.'
            : 'Software engineering is not merely assembling syntax — it is the architectural discipline of shaping computational futures, distributed system resilience, and high-performance AI ecosystems.'}
        </p>

        <div className="flex items-center gap-3 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Raka Alpiansyah &bull; Bandung, ID</span>
        </div>
      </div>
    </section>
  );
}
