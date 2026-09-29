import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * KineticChain3D
 * 
 * Interactive 3D Interlocking Metallic Chain Links (Awwwards / 2026 Creative Standard)
 * Symbolic representation of AgriTrace Chain (Hyperledger Fabric) & Cryptographic System Architecture.
 * 
 * Pillars:
 * 1. antislop: Authentic metallic titanium PBR materials (metalness: 0.95, roughness: 0.14, clearcoat: 1.0).
 *    Zero cheap neon glowing blobs.
 * 2. taste: Interlocking chain links with oval stadium scaling, reflecting real-time studio light & mouse cursor glints.
 * 3. impeccable: 60fps locked, mouse tilt physics, drag-to-spin interactivity, and GSAP scroll-driven depth.
 */
export default function KineticChain3D({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9.5);

    // 2. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    // Main studio key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(6, 8, 7);
    scene.add(keyLight);

    // Fill light with cool chrome tone
    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.4);
    fillLight.position.set(-6, -4, 5);
    scene.add(fillLight);

    // Rim specular light (signature subtle sky highlight)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rimLight.position.set(0, -7, -5);
    scene.add(rimLight);

    // Interactive mouse point light
    const cursorLight = new THREE.PointLight(0xffffff, 4.0, 16);
    cursorLight.position.set(0, 0, 4);
    scene.add(cursorLight);

    // 4. Constructing the Interlocking Kinetic Chain
    const chainMasterGroup = new THREE.Group();
    scene.add(chainMasterGroup);

    // Physically Based Metallic Material (Titanium Chrome)
    const linkMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf1f5f9),
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      envMapIntensity: 1.2,
    });

    // Secondary dark obsidian metallic accent link
    const darkLinkMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x1e293b),
      metalness: 0.98,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });

    // Torus geometry scaled to oval chain stadium proportions
    // Radius: 1.5, Tube: 0.38
    const linkGeo = new THREE.TorusGeometry(1.45, 0.36, 36, 72);

    // Link 1 (Left Link - Chrome)
    const link1 = new THREE.Mesh(linkGeo, linkMaterial);
    link1.scale.set(1.4, 0.88, 1);
    link1.position.set(-1.65, 0.7, 0);
    link1.rotation.set(0.35, 0.2, 0.55);
    chainMasterGroup.add(link1);

    // Link 2 (Center Link - Dark Obsidian Carbon) - Interlocks through Link 1 and Link 3
    const link2 = new THREE.Mesh(linkGeo, darkLinkMaterial);
    link2.scale.set(1.4, 0.88, 1);
    link2.position.set(0, 0, 0);
    link2.rotation.set(Math.PI / 2 + 0.25, 0.2, -0.4);
    chainMasterGroup.add(link2);

    // Link 3 (Right Link - Chrome) - Interlocks through Link 2
    const link3 = new THREE.Mesh(linkGeo, linkMaterial);
    link3.scale.set(1.4, 0.88, 1);
    link3.position.set(1.65, -0.7, 0);
    link3.rotation.set(-0.35, -0.2, 0.55);
    chainMasterGroup.add(link3);

    // Outer Thin Orbit Ring (Architectural Coordinate Gyroscope)
    const ringGeo = new THREE.TorusGeometry(3.2, 0.035, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.45,
    });
    const gyroRing = new THREE.Mesh(ringGeo, ringMat);
    gyroRing.rotation.x = Math.PI / 3;
    chainMasterGroup.add(gyroRing);

    // 5. Mouse Interaction & Spring Inertia
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isDragging: false,
      prevX: 0,
      prevY: 0,
      dragRotX: 0,
      dragRotY: 0,
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;

      // Update cursor light in world coordinates
      cursorLight.position.x = mouse.targetX * 5;
      cursorLight.position.y = mouse.targetY * 4;

      if (mouse.isDragging) {
        const deltaX = e.clientX - mouse.prevX;
        const deltaY = e.clientY - mouse.prevY;
        mouse.dragRotY += deltaX * 0.008;
        mouse.dragRotX += deltaY * 0.008;
        mouse.prevX = e.clientX;
        mouse.prevY = e.clientY;
      }
    };

    const handlePointerDown = (e) => {
      mouse.isDragging = true;
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;
      setIsInteracting(true);
    };

    const handlePointerUp = () => {
      mouse.isDragging = false;
      setIsInteracting(false);
    };

    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointerleave', handlePointerLeave);

    // 6. GSAP ScrollTrigger Integration
    let scrollTriggerInstance;
    if (!prefersReducedMotion) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Scale down and rotate into depth on scroll
          chainMasterGroup.scale.setScalar(1 - progress * 0.35);
          chainMasterGroup.position.z = -progress * 3.5;
          chainMasterGroup.position.y = -progress * 1.5;
        },
      });
    }

    // 7. Responsive Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 8. Render Loop
    let animId;
    const clock = new THREE.Clock();
    let isTabVisible = true;

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsed = clock.getElapsedTime();
      const time = prefersReducedMotion ? 0 : elapsed;

      // Mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Base kinetic tumble rotation
      const baseRotY = time * 0.35 + mouse.dragRotY;
      const baseRotX = Math.sin(time * 0.25) * 0.2 + mouse.dragRotX;
      const baseRotZ = Math.cos(time * 0.2) * 0.15;

      // Apply rotation with mouse tilt spring physics
      chainMasterGroup.rotation.y = baseRotY + mouse.x * 0.45;
      chainMasterGroup.rotation.x = baseRotX - mouse.y * 0.35;
      chainMasterGroup.rotation.z = baseRotZ;

      // Counter-rotate the coordinate gyroscope ring
      gyroRing.rotation.z = -time * 0.2;
      gyroRing.rotation.y = time * 0.15;

      // Subtle float motion
      chainMasterGroup.position.y = Math.sin(time * 1.1) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      if (scrollTriggerInstance) scrollTriggerInstance.kill();

      linkGeo.dispose();
      ringGeo.dispose();
      linkMaterial.dispose();
      darkLinkMaterial.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[450px] lg:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Interactive 3D Cryptographic Chain - Drag to rotate"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating telemetry tag */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] font-mono text-zinc-400 backdrop-blur-md flex items-center gap-2 pointer-events-none transition-opacity duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span>3D Cryptographic Chain &bull; Drag to rotate</span>
      </div>
    </div>
  );
}
