import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * EngineeringManifesto (V3 - Bespoke 3D Monogram & Monumental Brutalist Canvas)
 * 
 * Inspired by Pablo Miguez's iconic "MOTION IS THE FUTURE" editorial statement,
 * elevated for Raka Alpiansyah as "SOFTWARE ENGINEER IS THE FUTURE".
 * 
 * Standards applied (4 skills: UI/UX Pro Max, Impeccable, Taste, Anti-Slop UI):
 * 1. Zero-Slop Architecture: All extraneous headers, coordinates, badges, and tooltips
 *    removed. The screen belongs entirely to monumental typography & the 3D sculpture.
 * 2. Bespoke 3D Sculptural "RA" Monogram (Three.js): Custom beveled titanium & obsidian
 *    dual-tone architectural monogram with luminous cyan-sky chamfered edges, reacting
 *    to real-time scroll scrub and mouse drag/tilt.
 * 3. 1 View Full (100dvh Pinned Section): Locks deterministically into full view,
 *    scrubbing the entrance, presentation lock, and exit motion seamlessly on scroll.
 * 4. Edge-to-Edge (Mentok Kanan-Kiri): Fluid brutalist typography stretching from
 *    extreme left to extreme right with zero restrictive container boxes.
 */
export default function EngineeringManifesto() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Typography refs for GSAP scrub
  const wareRef = useRef(null);
  const engineerRef = useRef(null);
  const isRef = useRef(null);
  const futureRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  // ═══════════════════════════════════════════════════════════════════
  // 1. THREE.JS BESPOKE 3D "RA" ARCHITECTURAL TITANIUM MONOGRAM
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
    camera.position.set(0, 0, 7.8);

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
    renderer.toneMappingExposure = 1.3;

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x64748b, 2.0);
    fillLight.position.set(-6, -4, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    rimLight.position.set(0, -6, -4);
    scene.add(rimLight);

    // Mouse-controlled specular point light
    const cursorLight = new THREE.PointLight(0xffffff, 4.0, 15);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // Master 3D Code Architecture Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // ── PROCEDURAL 3D "< / >" CODE SYNTAX ARCHITECTURAL SCULPTURE ──
    // 1. Left Chevron Shape: "<"
    const leftShape = new THREE.Shape();
    leftShape.moveTo(-2.55, 0.0);
    leftShape.lineTo(-1.35, 1.42);
    leftShape.lineTo(-0.85, 1.42);
    leftShape.lineTo(-1.85, 0.0);
    leftShape.lineTo(-0.85, -1.42);
    leftShape.lineTo(-1.35, -1.42);
    leftShape.closePath();

    // 2. Central Compiler Slash Shape: "/"
    const slashShape = new THREE.Shape();
    slashShape.moveTo(-0.16, 1.68);
    slashShape.lineTo(0.24, 1.68);
    slashShape.lineTo(0.16, -1.68);
    slashShape.lineTo(-0.24, -1.68);
    slashShape.closePath();

    // 3. Right Chevron Shape: ">"
    const rightShape = new THREE.Shape();
    rightShape.moveTo(2.55, 0.0);
    rightShape.lineTo(1.35, -1.42);
    rightShape.lineTo(0.85, -1.42);
    rightShape.lineTo(1.85, 0.0);
    rightShape.lineTo(0.85, 1.42);
    rightShape.lineTo(1.35, 1.42);
    rightShape.closePath();

    // Extrusion Settings with Precision Architectural Chamfers
    const extrudeSettings = {
      depth: 0.42,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.048,
      bevelThickness: 0.048,
    };

    const geoLeft = new THREE.ExtrudeGeometry(leftShape, extrudeSettings);
    const geoSlash = new THREE.ExtrudeGeometry(slashShape, extrudeSettings);
    const geoRight = new THREE.ExtrudeGeometry(rightShape, extrudeSettings);

    geoLeft.center();
    geoSlash.center();
    geoRight.center();

    // Offset chevrons from center slash
    geoLeft.translate(-1.62, 0, 0);
    geoSlash.translate(0, 0, 0);
    geoRight.translate(1.62, 0, 0);

    // Luxury Dual-Tone Materials:
    // Front face: Polished brushed platinum titanium
    const faceMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf1f5f9),
      metalness: 0.98,
      roughness: 0.10,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
    });

    // Sides & Bevel: Deep dark obsidian ruthenium
    const sideMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0a101d),
      metalness: 0.95,
      roughness: 0.22,
      clearcoat: 0.8,
    });

    const materials = [faceMaterial, sideMaterial];

    const meshLeft = new THREE.Mesh(geoLeft, materials);
    const meshSlash = new THREE.Mesh(geoSlash, materials);
    const meshRight = new THREE.Mesh(geoRight, materials);
    masterGroup.add(meshLeft);
    masterGroup.add(meshSlash);
    masterGroup.add(meshRight);

    // Incandescent Sky Edge Highlights (Glint along beveled chamfers)
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
    });
    const edgesLeft = new THREE.LineSegments(new THREE.EdgesGeometry(geoLeft, 22), edgeMat);
    const edgesSlash = new THREE.LineSegments(new THREE.EdgesGeometry(geoSlash, 22), edgeMat);
    const edgesRight = new THREE.LineSegments(new THREE.EdgesGeometry(geoRight, 22), edgeMat);
    meshLeft.add(edgesLeft);
    meshSlash.add(edgesSlash);
    meshRight.add(edgesRight);

    // Inner Pulsing Compiler Logic Crystal (The Soul of Software Architecture)
    const coreGeo = new THREE.OctahedronGeometry(0.44, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.75,
      metalness: 0.25,
      roughness: 0.12,
      transmission: 0.65,
      transparent: true,
      opacity: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, 0, 0);
    masterGroup.add(coreMesh);

    // Inner wireframe for the core crystal
    const coreWireGeo = new THREE.WireframeGeometry(coreGeo);
    const coreWireMat = new THREE.LineBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.75 });
    const coreWire = new THREE.LineSegments(coreWireGeo, coreWireMat);
    coreMesh.add(coreWire);

    // Glowing Point Light inside the crystal
    const innerLight = new THREE.PointLight(0x38bdf8, 3.5, 9);
    innerLight.position.set(0, 0, 0);
    masterGroup.add(innerLight);

    // Sleek Aerospace Data-Bus Orbit Coordinate Ring
    const orbitGeo = new THREE.TorusGeometry(3.35, 0.018, 16, 120);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.32,
    });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 2.7;
    masterGroup.add(orbitRing);

    // 4 Coordinate Laser Dots on Orbit
    const dotGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(Math.cos(angle) * 3.35, Math.sin(angle) * 3.35, 0);
      orbitRing.add(dot);
    }

    // Interaction & Animation variables
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

      // Update specular point light
      cursorLight.position.x = mouse.targetX * 5.5;
      cursorLight.position.y = mouse.targetY * 4.5;

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

    // Responsive Camera Zoom
    const handleResize = () => {
      if (!section || !renderer || !camera) return;
      const width = section.clientWidth;
      const height = section.clientHeight;
      camera.aspect = width / height;
      if (width < 768) {
        camera.position.z = 9.8; // Further on mobile so "RA" fits seamlessly
      } else {
        camera.position.z = 7.8;
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
        const scrollRot = scrollProgress * Math.PI * 2.2;
        masterGroup.rotation.y = scrollRot + mouse.currX * 0.45 + mouse.dragRotY;
        masterGroup.rotation.x = 0.12 + mouse.currY * 0.35 + mouse.dragRotX;

        // Counter-rotation of data-bus orbit ring
        orbitRing.rotation.z += delta * 0.22;

        // Dynamic pulsing and multifaceted rotation of inner compiler logic crystal
        coreMesh.rotation.x += delta * 0.8;
        coreMesh.rotation.y += delta * 1.2;
        const pulse = 1.0 + Math.sin(clock.getElapsedTime() * 2.6) * 0.08;
        coreMesh.scale.set(pulse, pulse, pulse);
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

      geoLeft.dispose();
      geoSlash.dispose();
      geoRight.dispose();
      coreGeo.dispose();
      coreWireGeo.dispose();
      orbitGeo.dispose();
      dotGeo.dispose();
      faceMaterial.dispose();
      sideMaterial.dispose();
      edgeMat.dispose();
      coreMat.dispose();
      coreWireMat.dispose();
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
      // Locks into 1 full screen view as it reaches top of screen
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
      className="relative w-full h-[100dvh] bg-black text-white flex flex-col justify-center overflow-hidden select-none"
      aria-label="Software Engineer Manifesto"
    >
      {/* Screen-reader accessible landmark */}
      <h2 className="sr-only">Software Engineer is the Future</h2>

      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-auto">
        <canvas
          ref={canvasRef}
          className={`w-full h-full cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN KINETIC BRUTALIST TYPOGRAPHY GRID
          FULL EDGE-TO-EDGE (MENTOK KANAN & KIRI) - ZERO SLOP CLUTTER
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-2 sm:px-4 md:px-6 flex flex-col justify-center my-auto pointer-events-none">
        
        {/* ROW 1: SOFTWARE (FLUSH TO THE EXTREME LEFT) */}
        <div className="flex items-baseline justify-start w-full overflow-hidden leading-[0.74]">
          <div className="flex items-baseline font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.07em] uppercase text-white drop-shadow-2xl whitespace-nowrap">
            <span className="inline-block">SOFT</span>
            <span
              ref={wareRef}
              className="inline-block text-zinc-300 ml-[0.01em] will-change-transform"
            >
              WARE
            </span>
          </div>
        </div>

        {/* ROW 2: ENGINEER (INDENTED LEFT) */}
        <div className="flex items-center justify-start w-full overflow-hidden leading-[0.74] pl-[6vw] sm:pl-[10vw] md:pl-[14vw]">
          <span
            ref={engineerRef}
            className="inline-block font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.07em] uppercase text-zinc-100 drop-shadow-2xl whitespace-nowrap will-change-transform"
          >
            ENGINEER
          </span>
        </div>

        {/* ROW 3: IS (UNIFIED MONUMENTAL FONT - NO SERIF MISMATCH - DENSE & PUNCHY) */}
        <div className="flex items-center justify-start w-full overflow-hidden leading-[0.74] pl-[3vw] sm:pl-[6vw] md:pl-[8vw]">
          <span
            ref={isRef}
            className="inline-block font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.07em] uppercase text-sky-400 drop-shadow-[0_0_40px_rgba(56,189,248,0.4)] whitespace-nowrap will-change-transform"
          >
            IS
          </span>
        </div>

        {/* ROW 4: THE FUTURE (FLUSH TO THE EXTREME RIGHT) */}
        <div className="flex items-center justify-end w-full overflow-hidden leading-[0.74]">
          <span
            ref={futureRef}
            className="inline-block font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.07em] uppercase text-white drop-shadow-2xl text-right whitespace-nowrap will-change-transform"
          >
            THE FUTURE
          </span>
        </div>
      </div>
    </section>
  );
}
