import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Unified OLED 3D Singularity & Continuous Cosmic Stream
 * 
 * Single global WebGL engine powering the entire website with 100% seamless continuity.
 * 
 * Aesthetic Pillars:
 * 1. antislop: No conflicting dual canvases, no abrupt cutoff seams, no muddy blue blobs.
 * 2. taste: True OLED pitch black (#000000). Pure starlight & titanium silver particles.
 * 3. impeccable: 60fps locked, single WebGL context, scroll-driven continuous vertical journey,
 *    and initial "converge & coalesce" entrance animation.
 */
export default function BackgroundSpatial() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5.2, 14.5);
    camera.lookAt(0, -0.6, 0);

    // 2. Pure OLED Black Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 1.0); // True OLED pitch black
    container.appendChild(renderer.domElement);

    // 3. Generate Starlight Circular Texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(248, 250, 252, 0.9)');
    grad.addColorStop(0.55, 'rgba(203, 213, 225, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    // 4. LAYER 1: Singularity Accretion Vortex (Hero Anchor)
    const vortexCount = isMobile ? 2200 : 3800;
    const vortexGeo = new THREE.BufferGeometry();
    const vPositions = new Float32Array(vortexCount * 3);
    const vInitPositions = new Float32Array(vortexCount * 3);
    const vColors = new Float32Array(vortexCount * 3);
    const vRadii = new Float32Array(vortexCount);
    const vAngles = new Float32Array(vortexCount);
    const vSpeeds = new Float32Array(vortexCount);
    const vFunnels = new Float32Array(vortexCount);

    const minRadius = 1.95;
    const maxRadius = isMobile ? 9.5 : 13.0;

    for (let i = 0; i < vortexCount; i++) {
      const u = Math.pow(Math.random(), 1.6);
      const r = minRadius + u * (maxRadius - minRadius);
      vRadii[i] = r;

      const spiralArm = (i % 3) * ((Math.PI * 2) / 3);
      const theta = Math.random() * Math.PI * 2 + spiralArm + r * 0.42;
      vAngles[i] = theta;

      vSpeeds[i] = (0.75 / Math.pow(r, 0.65)) * (0.85 + Math.random() * 0.3);
      const funnelDepth = -2.8 / Math.pow(r, 0.6) + (Math.random() - 0.5) * 0.35;
      vFunnels[i] = funnelDepth;

      // Initial scattered position for the "masuk menyatu" convergence animation
      const scatterDist = 25 + Math.random() * 40;
      const scatterAngle = Math.random() * Math.PI * 2;
      vInitPositions[i * 3] = Math.cos(scatterAngle) * scatterDist;
      vInitPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      vInitPositions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      vPositions[i * 3] = vInitPositions[i * 3];
      vPositions[i * 3 + 1] = vInitPositions[i * 3 + 1];
      vPositions[i * 3 + 2] = vInitPositions[i * 3 + 2];

      // Pure OLED monochrome starlight palette (pure white & titanium silver)
      if (r < 3.8) {
        vColors[i * 3] = 1.0;
        vColors[i * 3 + 1] = 1.0;
        vColors[i * 3 + 2] = 1.0;
      } else {
        const factor = (r - 3.8) / (maxRadius - 3.8);
        const lum = 0.85 - factor * 0.45;
        vColors[i * 3] = lum;
        vColors[i * 3 + 1] = lum;
        vColors[i * 3 + 2] = lum + 0.05; // very subtle cool tone
      }
    }

    vortexGeo.setAttribute('position', new THREE.BufferAttribute(vPositions, 3));
    vortexGeo.setAttribute('color', new THREE.BufferAttribute(vColors, 3));

    const vortexMat = new THREE.PointsMaterial({
      size: isMobile ? 0.36 : 0.46,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const vortexMesh = new THREE.Points(vortexGeo, vortexMat);
    scene.add(vortexMesh);

    // Singularity Pure Dark Void Disc & Horizon Ring
    const holeGeo = new THREE.CircleGeometry(minRadius * 0.94, 48);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const holeDisc = new THREE.Mesh(holeGeo, holeMat);
    holeDisc.rotation.x = -Math.PI / 2;
    holeDisc.position.y = -1.2;
    scene.add(holeDisc);

    const ringGeo = new THREE.RingGeometry(minRadius * 0.94, minRadius * 1.05, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const horizonRing = new THREE.Mesh(ringGeo, ringMat);
    horizonRing.rotation.x = -Math.PI / 2;
    horizonRing.position.y = -1.18;
    scene.add(horizonRing);

    // 5. LAYER 2: Continuous Downward Cosmic Stream ("Searah Gitu")
    // Spans the full scroll journey from Y: 5 down to Y: -65
    const streamCount = isMobile ? 800 : 1600;
    const streamGeo = new THREE.BufferGeometry();
    const sPositions = new Float32Array(streamCount * 3);
    const sColors = new Float32Array(streamCount * 3);
    const sSpeeds = new Float32Array(streamCount);

    for (let i = 0; i < streamCount; i++) {
      sPositions[i * 3] = (Math.random() - 0.5) * 45;
      // Spread vertically along the entire scroll journey
      sPositions[i * 3 + 1] = 6 - Math.random() * 70;
      sPositions[i * 3 + 2] = (Math.random() - 0.5) * 35 - 5;

      sSpeeds[i] = 0.2 + Math.random() * 0.6;

      const lum = 0.4 + Math.random() * 0.45;
      sColors[i * 3] = lum;
      sColors[i * 3 + 1] = lum;
      sColors[i * 3 + 2] = lum + 0.04;
    }

    streamGeo.setAttribute('position', new THREE.BufferAttribute(sPositions, 3));
    streamGeo.setAttribute('color', new THREE.BufferAttribute(sColors, 3));

    const streamMat = new THREE.PointsMaterial({
      size: isMobile ? 0.32 : 0.42,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const streamMesh = new THREE.Points(streamGeo, streamMat);
    scene.add(streamMesh);

    // 6. Initial Entrance Animation (Converge & Coalesce into Vortex)
    const animState = { introProgress: 0 };
    gsap.to(animState, {
      introProgress: 1,
      duration: 2.3,
      ease: 'power3.out',
      delay: 0.15,
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

    // 8. Continuous Scroll Tracking ("Searah Gitu")
    let scrollProgress = 0;
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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

      // Mouse lerping with gentle inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // Seamless vertical camera journey moving downward in the same direction ("searah gitu")
      const targetCamY = 5.2 - scrollProgress * 36.0;
      const targetCamZ = 14.5 - Math.sin(scrollProgress * Math.PI) * 4.5;

      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.05;
      camera.position.y += (targetCamY + mouse.y * 1.5 - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      // Look slightly ahead of camera position along the downward journey
      camera.lookAt(
        mouse.x * 0.6,
        camera.position.y - 4.5 + mouse.y * 0.3,
        -5
      );

      // Rotations of singularity core
      vortexMesh.rotation.x = Math.sin(time * 0.15) * 0.06 + mouse.y * 0.1;
      vortexMesh.rotation.z = Math.cos(time * 0.12) * 0.05 - mouse.x * 0.1;
      holeDisc.rotation.z = -time * 0.08;
      horizonRing.rotation.z = time * 0.2;

      // Update Layer 1 Vortex Particles
      const vArr = vortexGeo.attributes.position.array;
      const progress = animState.introProgress;

      for (let i = 0; i < vortexCount; i++) {
        const curAngle = vAngles[i] + time * vSpeeds[i];
        const r = vRadii[i];
        const targetX = Math.cos(curAngle) * r;
        const targetY = vFunnels[i] + Math.sin(curAngle * 2.5 + time) * 0.08;
        const targetZ = Math.sin(curAngle) * r;

        if (progress < 1) {
          const ix = vInitPositions[i * 3];
          const iy = vInitPositions[i * 3 + 1];
          const iz = vInitPositions[i * 3 + 2];
          vArr[i * 3] = ix + (targetX - ix) * progress;
          vArr[i * 3 + 1] = iy + (targetY - iy) * progress;
          vArr[i * 3 + 2] = iz + (targetZ - iz) * progress;
        } else {
          vArr[i * 3] = targetX;
          vArr[i * 3 + 1] = targetY;
          vArr[i * 3 + 2] = targetZ;
        }
      }
      vortexGeo.attributes.position.needsUpdate = true;

      // Update Layer 2 Cosmic Stream Particles (gentle downward flow in sync with scroll)
      const sArr = streamGeo.attributes.position.array;
      for (let i = 0; i < streamCount; i++) {
        // Slow natural downward drift
        sArr[i * 3 + 1] -= sSpeeds[i] * 0.015;
        // Loop back up if it falls below the bottom of the world
        if (sArr[i * 3 + 1] < -65) {
          sArr[i * 3 + 1] = 6;
        }
      }
      streamGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      vortexGeo.dispose();
      vortexMat.dispose();
      streamGeo.dispose();
      streamMat.dispose();
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black"
      aria-hidden="true"
    />
  );
}
