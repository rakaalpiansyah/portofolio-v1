import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * EngineeringManifesto (V2 - 1 View Full & Edge-to-Edge)
 * 
 * Inspired by Pablo Miguez's iconic "MOTION IS THE FUTURE" editorial statement,
 * tailored for Raka Alpiansyah as "SOFTWARE ENGINEER IS THE FUTURE".
 * 
 * Standards applied (4 skills: UI/UX Pro Max, Impeccable, Taste, Anti-Slop UI):
 * 1. 1 View Full (100dvh Pinned Section): Locks deterministically into full view,
 *    scrubbing the entrance, presentation lock, and exit motion seamlessly on scroll.
 * 2. Edge-to-Edge (Mentok Kanan-Kiri): Fluid brutalist typography stretching from
 *    extreme left to extreme right with zero restrictive container boxes.
 * 3. Museum-Grade 3D Gyroscope (Three.js): Titanium & ruthenium PBR gimbal rings
 *    with an inner glowing wireframe node lattice (symbolizing software architecture & AI pipelines),
 *    reacting to scroll scrub and mouse drag/tilt.
 * 4. Zero Slop: No ugly tooltips, no noisy floating badges; pure typography + 3D sculpture.
 */
export default function EngineeringManifesto() {
  const { language } = useLanguage();
  const isId = language === 'id';

  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Typography refs
  const wareRef = useRef(null);
  const engineerRef = useRef(null);
  const isRef = useRef(null);
  const futureRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  // ═══════════════════════════════════════════════════════════════════
  // 1. THREE.JS 3D ARCHITECTURAL GIMBAL SCENE
  // ═══════════════════════════════════════════════════════════════════
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      section.clientWidth / section.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.2);

    // High Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(section.clientWidth, section.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Studio Lighting Rig (Clean & Architectural)
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x64748b, 1.8);
    fillLight.position.set(-6, -5, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimLight.position.set(0, -6, -4);
    scene.add(rimLight);

    // Dynamic mouse spotlight
    const cursorLight = new THREE.PointLight(0xffffff, 3.8, 16);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // Master 3D Group
    const gyroGroup = new THREE.Group();
    scene.add(gyroGroup);

    // Physically Based Metallic Materials
    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf8fafc),
      metalness: 0.98,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      reflectivity: 1.0,
    });

    const obsidianMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0f172a),
      metalness: 0.96,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });

    // Mesh 1: Outer Aerospace Titanium Gimbal Ring
    const outerRingGeo = new THREE.TorusGeometry(2.35, 0.1, 32, 80);
    const outerRing = new THREE.Mesh(outerRingGeo, titaniumMat);
    outerRing.rotation.set(0.4, 0.25, 0.5);
    gyroGroup.add(outerRing);

    // Mesh 2: Middle Ruthenium Counter-Gimbal Ring
    const midRingGeo = new THREE.TorusGeometry(1.85, 0.09, 32, 72);
    const midRing = new THREE.Mesh(midRingGeo, obsidianMat);
    midRing.rotation.set(Math.PI / 2 + 0.2, 0.3, -0.4);
    gyroGroup.add(midRing);

    // Mesh 3: Inner Architectural Octahedron Node Lattice (System Logic)
    const latticeGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const wireframeGeo = new THREE.WireframeGeometry(latticeGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
    });
    const innerLattice = new THREE.LineSegments(wireframeGeo, wireframeMat);
    gyroGroup.add(innerLattice);

    // Center Quantum Specular Core
    const coreGeo = new THREE.SphereGeometry(0.38, 24, 24);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25,
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    gyroGroup.add(coreSphere);

    // Outer Orbit Coordinate Ring
    const orbitGeo = new THREE.TorusGeometry(3.1, 0.015, 16, 96);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.22,
    });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 3.2;
    gyroGroup.add(orbitRing);

    // Coordinate nodes along orbit
    const dotGeo = new THREE.SphereGeometry(0.04, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(Math.cos(angle) * 3.1, Math.sin(angle) * 3.1, 0);
      orbitRing.add(dot);
    }

    // Interactive mouse & scroll state
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

    const handlePointerMove = (e) => {
      const rect = section.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;

      // Update cursor light
      cursorLight.position.x = mouse.targetX * 5;
      cursorLight.position.y = mouse.targetY * 4;

      if (mouse.isDown) {
        const deltaX = e.clientX - mouse.prevX;
        const deltaY = e.clientY - mouse.prevY;
        mouse.dragVelY = deltaX * 0.006;
        mouse.dragVelX = deltaY * 0.006;
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

    // Responsive camera zoom
    const handleResize = () => {
      if (!section || !renderer || !camera) return;
      const width = section.clientWidth;
      const height = section.clientHeight;
      camera.aspect = width / height;
      if (width < 768) {
        camera.position.z = 10.2; // Move further back on mobile
      } else {
        camera.position.z = 8.2;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Render loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Inertia drag damping
      if (!mouse.isDown) {
        mouse.dragVelX *= 0.93;
        mouse.dragVelY *= 0.93;
        mouse.dragRotX += mouse.dragVelX;
        mouse.dragRotY += mouse.dragVelY;
      }

      // Smooth mouse follow
      mouse.currX += (mouse.targetX - mouse.currX) * 0.06;
      mouse.currY += (mouse.targetY - mouse.currY) * 0.06;

      if (!prefersReducedMotion) {
        // Continuous rotation blended with scroll scrub and cursor drag
        const scrollRot = scrollProgress * Math.PI * 2.4;
        gyroGroup.rotation.y = scrollRot + mouse.currX * 0.4 + mouse.dragRotY;
        gyroGroup.rotation.x = 0.2 + mouse.currY * 0.3 + mouse.dragRotX;

        // Counter-rotations
        innerLattice.rotation.y -= delta * 0.5;
        innerLattice.rotation.z += delta * 0.35;
        midRing.rotation.z += delta * 0.2;
        orbitRing.rotation.z += delta * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Public method for GSAP ScrollTrigger to update 3D progress
    section._update3DProgress = (p) => {
      scrollProgress = p;
    };

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      outerRingGeo.dispose();
      midRingGeo.dispose();
      latticeGeo.dispose();
      wireframeGeo.dispose();
      coreGeo.dispose();
      orbitGeo.dispose();
      dotGeo.dispose();
      titaniumMat.dispose();
      obsidianMat.dispose();
      wireframeMat.dispose();
      coreMat.dispose();
      orbitMat.dispose();
      dotMat.dispose();
      renderer.dispose();
    };
  }, []);

  // ═══════════════════════════════════════════════════════════════════
  // 2. GSAP SCROLLTRIGGER PINNED 1-VIEW FULL ANIMATION
  // ═══════════════════════════════════════════════════════════════════
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const ware = wareRef.current;
      const engineer = engineerRef.current;
      const isWord = isRef.current;
      const future = futureRef.current;

      if (!ware || !engineer || !isWord || !future) return;

      // Initial offsets: rows enter from opposing screen edges
      gsap.set(ware, { x: '35vw' });
      gsap.set(engineer, { x: '45vw' });
      gsap.set(isWord, { x: '-35vw' });
      gsap.set(future, { x: '40vw' });

      // PINNED TIMELINE:
      // The section locks into 1 full screen view as it reaches top of screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (section._update3DProgress) {
              section._update3DProgress(self.progress);
            }
          },
        },
      });

      // ── PHASE 1: Slide In & Lock (0% -> 45%) ──
      tl.to(
        ware,
        { x: '0vw', ease: 'power2.out' },
        0
      )
        .to(
          engineer,
          { x: '0vw', ease: 'power2.out' },
          0.02
        )
        .to(
          isWord,
          { x: '0vw', ease: 'power2.out' },
          0.04
        )
        .to(
          future,
          { x: '0vw', ease: 'power2.out' },
          0.06
        );

      // ── PHASE 2: Lock & Admire (45% -> 70%) ──
      // Subtle scale pulse and 3D focus
      tl.to(
        [ware, engineer, isWord, future],
        { opacity: 1, ease: 'none' },
        0.45
      );

      // ── PHASE 3: Exit Depth Dissolve (70% -> 100%) ──
      tl.to(
        ware,
        { x: '18vw', opacity: 0.25, ease: 'power1.in' },
        0.72
      )
        .to(
          engineer,
          { x: '-22vw', opacity: 0.25, ease: 'power1.in' },
          0.72
        )
        .to(
          isWord,
          { x: '22vw', opacity: 0.25, ease: 'power1.in' },
          0.72
        )
        .to(
          future,
          { x: '-28vw', opacity: 0.25, ease: 'power1.in' },
          0.72
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full h-[100dvh] bg-black text-white flex flex-col justify-between overflow-hidden select-none"
      aria-label="Software Engineer Manifesto"
    >
      {/* Screen-reader accessible landmark */}
      <h2 className="sr-only">Software Engineer is the Future</h2>

      {/* 3D WebGL Canvas Layer (Zero ugly browser tooltips) */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-auto">
        <canvas
          ref={canvasRef}
          className={`w-full h-full cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        />
      </div>

      {/* Top Architectural Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent z-10" />

      {/* ── TOP EDITORIAL BAR (EDGE-TO-EDGE) ── */}
      <header className="relative z-10 w-full px-4 sm:px-8 pt-6 sm:pt-8 flex items-center justify-between pointer-events-none font-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.25em]">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-zinc-400">MANIFESTO // '26</span>
        </div>
        <div className="text-zinc-500 tracking-widest hidden sm:block">
          BANDUNG, ID &bull; 6&deg;54&apos;S 107&deg;36&apos;E
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN KINETIC BRUTALIST TYPOGRAPHY GRID
          FULL EDGE-TO-EDGE (MENTOK KANAN & KIRI)
          ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={containerRef}
        className="relative z-10 w-full px-2 sm:px-4 md:px-6 flex flex-col justify-center my-auto pointer-events-none"
      >
        {/* ROW 1: SOFTWARE (FLUSH TO THE EXTREME LEFT) */}
        <div className="flex items-baseline justify-start w-full overflow-hidden leading-[0.80]">
          <div className="flex items-baseline font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.055em] uppercase text-white drop-shadow-2xl whitespace-nowrap">
            <span className="inline-block">SOFT</span>
            <span
              ref={wareRef}
              className="inline-block text-zinc-300 ml-[0.02em] will-change-transform"
            >
              WARE
            </span>
          </div>
        </div>

        {/* ROW 2: ENGINEER (INDENTED LEFT) */}
        <div className="flex items-center justify-start w-full overflow-hidden leading-[0.80] pl-[6vw] sm:pl-[10vw] md:pl-[14vw]">
          <span
            ref={engineerRef}
            className="inline-block font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.055em] uppercase text-zinc-100 drop-shadow-2xl whitespace-nowrap will-change-transform"
          >
            ENGINEER
          </span>
        </div>

        {/* ROW 3: IS (DYNAMIC DISPLAY ACCENT) */}
        <div className="flex items-center justify-start w-full overflow-hidden leading-[0.80] pl-[3vw] sm:pl-[6vw] md:pl-[8vw]">
          <span
            ref={isRef}
            className="inline-block font-display italic font-normal text-[15vw] sm:text-[14vw] md:text-[13.5vw] lg:text-[13vw] text-sky-400 drop-shadow-2xl tracking-tight whitespace-nowrap will-change-transform"
          >
            IS
          </span>
        </div>

        {/* ROW 4: THE FUTURE (FLUSH TO THE EXTREME RIGHT) */}
        <div className="flex items-center justify-end w-full overflow-hidden leading-[0.80]">
          <span
            ref={futureRef}
            className="inline-block font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.055em] uppercase text-white drop-shadow-2xl text-right whitespace-nowrap will-change-transform"
          >
            THE FUTURE
          </span>
        </div>
      </div>

      {/* ── BOTTOM EDITORIAL FOOTER (EDGE-TO-EDGE) ── */}
      <footer className="relative z-10 w-full px-4 sm:px-8 pb-6 sm:pb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-none">
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg font-light leading-snug">
          {isId
            ? 'Rekayasa perangkat lunak adalah arsitektur masa depan komputasi, keandalan sistem terdistribusi, dan ekosistem AI berkinerja tinggi.'
            : 'Software engineering is the architecture of computational futures, distributed system resilience, and high-performance AI ecosystems.'}
        </p>

        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest">
          <span>RAKA ALPIANSYAH</span>
          <span className="text-zinc-700">&bull;</span>
          <span className="text-sky-400">INFORMATICS</span>
        </div>
      </footer>
    </section>
  );
}
