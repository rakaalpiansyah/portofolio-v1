import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SingularityVortex3D
 * 
 * Cinematic 3D Gravitational Hole / Accretion Vortex
 * Features an initial "converge & coalesce" entrance animation (particles suck into the vortex from deep space),
 * followed by perpetual relativistic rotation, mouse gravitational pull, and scroll-driven warp zoom.
 * 
 * Aesthetic Pillars:
 * 1. antislop: No cheesy flat 2D cards. Seamless full-bleed 3D canvas with genuine gravitational physics.
 * 2. taste: Crisp starlight white & titanium silver particles with subtle sky-cyan specular hints. Inner dark void.
 * 3. impeccable: 60fps locked, tab visibility management, smooth lerping, and seamless edge fadeout into #0a0a0a.
 */
export default function SingularityVortex3D({ className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Three.js Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    // Angled top-down view to see the disk and funnel curvature
    camera.position.set(0, 5.5, 14.5);
    camera.lookAt(0, -0.8, 0);

    // 2. High Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    // 3. Generate Circular Soft Glow Particle Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(235, 245, 255, 0.9)');
    grad.addColorStop(0.6, 'rgba(125, 211, 252, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    // 4. Constructing the Singularity Gravitational Vortex
    const count = isMobile ? 2400 : 4500;
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const radii = new Float32Array(count);
    const angles = new Float32Array(count);
    const speeds = new Float32Array(count);
    const funnels = new Float32Array(count);

    const minRadius = 1.9; // Radius of the central black hole event horizon
    const maxRadius = isMobile ? 9.5 : 12.5;

    for (let i = 0; i < count; i++) {
      // Density falls off with power law: denser near the hole
      const u = Math.pow(Math.random(), 1.6);
      const r = minRadius + u * (maxRadius - minRadius);
      radii[i] = r;

      // Logarithmic spiral arm distribution
      const spiralArm = (i % 3) * ((Math.PI * 2) / 3);
      const theta = Math.random() * Math.PI * 2 + spiralArm + r * 0.45;
      angles[i] = theta;

      // Keplerian speed: inner orbit moves faster
      speeds[i] = (0.75 / Math.pow(r, 0.65)) * (0.85 + Math.random() * 0.3);

      // Funnel depth (gravitational well into the center)
      const funnelDepth = -2.8 / Math.pow(r, 0.6) + (Math.random() - 0.5) * 0.35;
      funnels[i] = funnelDepth;

      // Target position
      const tx = Math.cos(theta) * r;
      const ty = funnelDepth;
      const tz = Math.sin(theta) * r;

      // Initial scattered position (for the "masuk menyatu" convergence animation)
      const scatterDist = 25 + Math.random() * 35;
      const scatterAngle = Math.random() * Math.PI * 2;
      const scatterZ = (Math.random() - 0.5) * 30;

      initialPositions[i * 3] = Math.cos(scatterAngle) * scatterDist;
      initialPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      initialPositions[i * 3 + 2] = scatterZ;

      // Start at initial positions
      positions[i * 3] = initialPositions[i * 3];
      positions[i * 3 + 1] = initialPositions[i * 3 + 1];
      positions[i * 3 + 2] = initialPositions[i * 3 + 2];

      // Particle Color Palette: Pure starlight white near center, sky cyan accent, silver slate outer
      const isInner = r < 3.8;
      if (isInner) {
        // Bright white-cyan event horizon
        colors[i * 3] = 0.95;
        colors[i * 3 + 1] = 0.98;
        colors[i * 3 + 2] = 1.0;
        sizes[i] = 0.45 + Math.random() * 0.4;
      } else {
        // Titanium silver to subtle sky blue
        const tColor = (r - 3.8) / (maxRadius - 3.8);
        colors[i * 3] = 0.7 - tColor * 0.35;
        colors[i * 3 + 1] = 0.82 - tColor * 0.3;
        colors[i * 3 + 2] = 0.96 - tColor * 0.25;
        sizes[i] = 0.28 + Math.random() * 0.32;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.38 : 0.48,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const vortexPoints = new THREE.Points(geometry, material);
    scene.add(vortexPoints);

    // 5. Central Event Horizon Hole (Pure Dark Void in the Center)
    const holeGeo = new THREE.CircleGeometry(minRadius * 0.94, 48);
    const holeMat = new THREE.MeshBasicMaterial({
      color: 0x070709,
      transparent: true,
      opacity: 0.96,
      depthWrite: false,
    });
    const holeDisc = new THREE.Mesh(holeGeo, holeMat);
    holeDisc.rotation.x = -Math.PI / 2;
    holeDisc.position.y = -1.2;
    scene.add(holeDisc);

    // Glowing Inner Ring of the Event Horizon
    const ringGeo = new THREE.RingGeometry(minRadius * 0.94, minRadius * 1.06, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe0f2fe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const horizonRing = new THREE.Mesh(ringGeo, ringMat);
    horizonRing.rotation.x = -Math.PI / 2;
    horizonRing.position.y = -1.18;
    scene.add(horizonRing);

    // 6. Entrance Animation Controller (Converge & Coalesce)
    const animState = {
      introProgress: 0, // 0 = fully scattered, 1 = converged in vortex
    };

    gsap.to(animState, {
      introProgress: 1,
      duration: 2.4,
      ease: 'power3.out',
      delay: 0.2,
    });

    // 7. Mouse Gravitational Tracking
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const handlePointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 8. GSAP ScrollTrigger Warp Zoom
    let scrollTriggerInstance;
    if (!prefersReducedMotion) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          // As user scrolls, camera flies into the vortex depth
          camera.position.z = 14.5 - p * 6.5;
          camera.position.y = 5.5 - p * 3.2;
          vortexPoints.rotation.y = p * 1.5;
          // Fade opacity gracefully so it transitions seamlessly into the next section
          material.opacity = Math.max(0, 0.85 * (1 - p * 0.95));
        },
      });
    }

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Render Loop
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
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Camera responds to mouse sway
      camera.position.x = mouse.x * 2.8;
      camera.position.y = 5.5 + mouse.y * 1.8;
      camera.lookAt(mouse.x * 0.8, -0.8 + mouse.y * 0.4, 0);

      // Subtle tilt of the whole vortex
      vortexPoints.rotation.x = Math.sin(time * 0.15) * 0.08 + mouse.y * 0.12;
      vortexPoints.rotation.z = Math.cos(time * 0.12) * 0.06 - mouse.x * 0.12;
      holeDisc.rotation.z = -time * 0.1;
      horizonRing.rotation.z = time * 0.25;

      const pArr = geometry.attributes.position.array;
      const progress = animState.introProgress;

      for (let i = 0; i < count; i++) {
        // Update angle according to speed
        const currentAngle = angles[i] + time * speeds[i];
        const r = radii[i];

        // Gravitational vortex coordinates
        const targetX = Math.cos(currentAngle) * r;
        const targetY = funnels[i] + Math.sin(currentAngle * 2.5 + time) * 0.1;
        const targetZ = Math.sin(currentAngle) * r;

        if (progress < 1) {
          // Lerping from scattered intro position to converged vortex orbit
          const initX = initialPositions[i * 3];
          const initY = initialPositions[i * 3 + 1];
          const initZ = initialPositions[i * 3 + 2];

          pArr[i * 3] = initX + (targetX - initX) * progress;
          pArr[i * 3 + 1] = initY + (targetY - initY) * progress;
          pArr[i * 3 + 2] = initZ + (targetZ - initZ) * progress;
        } else {
          // Perpetual orbital motion
          pArr[i * 3] = targetX;
          pArr[i * 3 + 1] = targetY;
          pArr[i * 3 + 2] = targetZ;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      if (scrollTriggerInstance) scrollTriggerInstance.kill();

      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      holeGeo.dispose();
      holeMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Atmospheric Vignette: dissolves seamlessly into obsidian background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 48%, transparent 20%, rgba(10, 10, 10, 0.4) 60%, #0a0a0a 95%)',
        }}
      />
      {/* Bottom fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
    </div>
  );
}
