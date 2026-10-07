import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * ThreeCanvas: Full-screen WebGL backdrop linked to ScrollTrigger.
 * - Distorted wireframe icosahedron + 1,200 particle nebula constellation.
 * - Mouse inertia parallax with subtle dampening.
 * - Scroll scrub drives rotation, camera dolly, and section color shifts.
 * - Robust error handling: gracefully falls back to static gradient if WebGL fails.
 * - Lifecycle: disposes geometries & materials on unmount, pauses on tab hide.
 */
export default function ThreeCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check prefers-reduced-motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setWebglSupported(false);
      return;
    }

    let isVisible = true;
    let animationFrameId = null;
    let renderer = null;
    let scene = null;
    let camera = null;
    let icoGeometry = null;
    let wireGeometry = null;
    let ringGeometry = null;
    let particleGeometry = null;
    let coreMaterial = null;
    let cageMaterial = null;
    let ringMaterial = null;
    let particleMaterial = null;
    let st = null;

    try {
      // 1. Scene, Camera, Renderer (wrapped in try-catch)
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0a0a0a, 0.08);

      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      // 2. Geometry Group
      const worldGroup = new THREE.Group();
      scene.add(worldGroup);

      // Core 3D Shape: Dual Icosahedron (Inner solid obsidian + Outer lime wireframe cage)
      icoGeometry = new THREE.IcosahedronGeometry(1.65, 2);
      wireGeometry = new THREE.IcosahedronGeometry(1.85, 1);

      const icoPositions = icoGeometry.attributes.position.clone();

      coreMaterial = new THREE.MeshBasicMaterial({
        color: 0x0f0f10,
        wireframe: false,
      });
      const coreMesh = new THREE.Mesh(icoGeometry, coreMaterial);
      worldGroup.add(coreMesh);

      cageMaterial = new THREE.MeshBasicMaterial({
        color: 0xc6ff3d,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const cageMesh = new THREE.Mesh(wireGeometry, cageMaterial);
      worldGroup.add(cageMesh);

      ringGeometry = new THREE.TorusGeometry(2.4, 0.015, 16, 100);
      ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xf5f5f0,
        transparent: true,
        opacity: 0.15,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 2.3;
      worldGroup.add(ringMesh);

      // 3. Particle Starfield / Nebula
      const particleCount = 650;
      particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 18;
        particlePositions[i + 1] = (Math.random() - 0.5) * 18;
        particlePositions[i + 2] = (Math.random() - 0.5) * 14;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleMaterial = new THREE.PointsMaterial({
        color: 0xa3a39f,
        size: 0.04,
        transparent: true,
        opacity: 0.45,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      // 4. Mouse Coordinates & Smoothing
      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      const handleMouseMove = (e) => {
        mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', handleMouseMove, { passive: true });

      // 5. ScrollTrigger Scrubbing
      worldGroup.position.set(1.4, 0, 0);

      st = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          worldGroup.rotation.y = p * Math.PI * 4;
          worldGroup.rotation.x = p * Math.PI * 2;
          ringMesh.rotation.z = p * Math.PI * 3;

          if (p < 0.25) {
            worldGroup.position.x = gsap.utils.interpolate(1.4, -0.6, p / 0.25);
            worldGroup.position.y = gsap.utils.interpolate(0, 0.4, p / 0.25);
            worldGroup.scale.setScalar(gsap.utils.interpolate(1, 0.9, p / 0.25));
          } else if (p < 0.6) {
            const localP = (p - 0.25) / 0.35;
            worldGroup.position.x = gsap.utils.interpolate(-0.6, 1.1, localP);
            worldGroup.position.y = gsap.utils.interpolate(0.4, -0.3, localP);
            worldGroup.scale.setScalar(gsap.utils.interpolate(0.9, 1.15, localP));
          } else {
            const localP = (p - 0.6) / 0.4;
            worldGroup.position.x = gsap.utils.interpolate(1.1, 0, localP);
            worldGroup.position.y = gsap.utils.interpolate(-0.3, 0.2, localP);
            worldGroup.scale.setScalar(gsap.utils.interpolate(1.15, 0.85, localP));
          }

          if (p > 0.85) {
            cageMaterial.opacity = 0.65;
          } else {
            cageMaterial.opacity = 0.35;
          }
        },
      });

      // 6. Resize Handler
      const handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (window.innerWidth < 768) {
          worldGroup.position.x = 0;
          worldGroup.scale.setScalar(0.7);
        }
      };
      window.addEventListener('resize', handleResize);
      handleResize();

      // 7. Visibility Handling
      const handleVisibilityChange = () => {
        isVisible = !document.hidden;
        if (isVisible && !animationFrameId) {
          clock.start();
          animate();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // 8. Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        if (!isVisible) {
          animationFrameId = null;
          return;
        }
        animationFrameId = requestAnimationFrame(animate);

        const elapsed = clock.getElapsedTime();

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        camera.position.x = mouse.x * 0.4;
        camera.position.y = mouse.y * 0.3;
        camera.lookAt(0, 0, 0);

        const posAttr = icoGeometry.attributes.position;
        const orig = icoPositions.array;
        const arr = posAttr.array;
        for (let i = 0; i < arr.length; i += 3) {
          const wave = Math.sin(elapsed * 1.5 + orig[i] * 2.0) * 0.04;
          arr[i] = orig[i] * (1 + wave);
          arr[i + 1] = orig[i + 1] * (1 + wave);
          arr[i + 2] = orig[i + 2] * (1 + wave);
        }
        posAttr.needsUpdate = true;

        cageMesh.rotation.y = elapsed * 0.12;
        cageMesh.rotation.z = elapsed * 0.08;
        particles.rotation.y = elapsed * 0.02;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibilityChange);

        if (st) st.kill();

        if (icoGeometry) icoGeometry.dispose();
        if (wireGeometry) wireGeometry.dispose();
        if (ringGeometry) ringGeometry.dispose();
        if (particleGeometry) particleGeometry.dispose();

        if (coreMaterial) coreMaterial.dispose();
        if (cageMaterial) cageMaterial.dispose();
        if (ringMaterial) ringMaterial.dispose();
        if (particleMaterial) particleMaterial.dispose();

        if (renderer) renderer.dispose();
      };
    } catch (err) {
      console.warn('WebGL init skipped, falling back to static gradient:', err);
      setWebglSupported(false);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {webglSupported ? (
        <canvas ref={canvasRef} className="w-full h-full block" />
      ) : (
        /* Graceful static cinematic ambient fallback */
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(198,255,61,0.08),transparent_50%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60 pointer-events-none" />
    </div>
  );
}
