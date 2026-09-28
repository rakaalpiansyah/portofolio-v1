import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a, 0);
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    dirLight.position.set(12, 16, 12);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 0.9);
    fillLight.position.set(-12, -10, -10);
    scene.add(fillLight);

    // World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ═══════════════════════════════════════════════════════════════════
    // 1. "PAGAR" — CURVED 3D CYLINDRICAL SPATIAL GRID WIREFRAME
    // ═══════════════════════════════════════════════════════════════════
    const gridRadius = 26;
    const gridHeight = 44;
    const gridRadialSegments = 36;
    const gridHeightSegments = 18;

    const cylGeo = new THREE.CylinderGeometry(
      gridRadius,
      gridRadius,
      gridHeight,
      gridRadialSegments,
      gridHeightSegments,
      true,
      -Math.PI * 0.7,
      Math.PI * 1.4
    );

    const wireframeGeo = new THREE.WireframeGeometry(cylGeo);
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
    });
    const gridMesh = new THREE.LineSegments(wireframeGeo, gridMat);
    gridMesh.rotation.y = Math.PI;
    worldGroup.add(gridMesh);

    // ═══════════════════════════════════════════════════════════════════
    // 2. CENTRAL 3D ENGINEERING CORE (CRYSTALLINE ICOSAHEDRON)
    // ═══════════════════════════════════════════════════════════════════
    const coreGroup = new THREE.Group();
    worldGroup.add(coreGroup);

    // Outer refined polyhedral wireframe
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const outerWireframe = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
    });
    const outerCoreMesh = new THREE.LineSegments(outerWireframe, outerMat);
    coreGroup.add(outerCoreMesh);

    // Inner physical faceted crystal
    const innerGeo = new THREE.IcosahedronGeometry(2.6, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x090d16,
      roughness: 0.2,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true,
    });
    const innerCoreMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCoreMesh);

    // Inner glowing edge lines
    const innerEdgesGeo = new THREE.EdgesGeometry(innerGeo);
    const innerEdgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
    });
    const innerEdges = new THREE.LineSegments(innerEdgesGeo, innerEdgesMat);
    coreGroup.add(innerEdges);

    // Primary gimbal orbital ring
    const ringGeo1 = new THREE.RingGeometry(6.0, 6.05, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // Secondary gimbal orbital ring
    const ringGeo2 = new THREE.RingGeometry(7.5, 7.55, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.16,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    coreGroup.add(ring2);

    // ═══════════════════════════════════════════════════════════════════
    // 3. GLITTERING STARDUST GALAXY (STARFIELD)
    // ═══════════════════════════════════════════════════════════════════
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 64, 64);

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.9)');
      grad.addColorStop(0.55, 'rgba(14, 165, 233, 0.35)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    const starTexture = createStarTexture();
    const starCount = window.innerWidth < 768 ? 600 : 1200;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colWhite = new THREE.Color(0xffffff);
    const colCyan  = new THREE.Color(0x38bdf8);
    const colSky   = new THREE.Color(0x7dd3fc);
    const colIndigo = new THREE.Color(0x818cf8);

    for (let i = 0; i < starCount; i++) {
      const radius = 6 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const col = r < 0.45 ? colWhite : r < 0.75 ? colCyan : r < 0.9 ? colSky : colIndigo;
      starColors[i * 3]     = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.34,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starfield = new THREE.Points(starGeo, starMat);
    worldGroup.add(starfield);

    // ═══════════════════════════════════════════════════════════════════
    // 4. INTRO ENTRANCE ANIMATION & MOUSE/SCROLL PARALLAX (RESTORED)
    // ═══════════════════════════════════════════════════════════════════
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    // Initial Entrance Animation when entering the website
    const intro = { progress: 0 };
    gsap.to(intro, {
      progress: 1,
      duration: 1.8,
      ease: 'power2.out',
    });

    gsap.fromTo(
      camera.position,
      { z: 36 },
      { z: 24, duration: 1.8, ease: 'power3.out' }
    );

    gsap.fromTo(
      coreGroup.scale,
      { x: 0.001, y: 0.001, z: 0.001 },
      { x: 1, y: 1, z: 1, duration: 1.6, ease: 'power3.out', delay: 0.15 }
    );

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };
    window.addEventListener('resize', onResize);

    // Visibility & Render Loop
    let animId;
    let isTabActive = true;

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isTabActive) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;

      // Scroll-driven camera parallax (subtle vertical drift)
      const scrollY = window.scrollY || 0;
      const targetCamY = -scrollY * 0.005;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.x = mouse.x * 2.8;
      camera.lookAt(0, targetCamY, 0);

      // World Group subtle kinetic rotation
      worldGroup.rotation.y = mouse.x * 0.15;
      worldGroup.rotation.x = -mouse.y * 0.10;

      // Pagar (Curved Grid) ambient sway
      gridMesh.rotation.y = Math.PI + Math.sin(elapsed * 0.18) * 0.05;
      gridMat.opacity = intro.progress * 0.16;

      // Core rotation: continuous spin + mouse look-at tilt
      coreGroup.rotation.y = elapsed * 0.15 + mouse.x * 0.35;
      coreGroup.rotation.x = elapsed * 0.08 - mouse.y * 0.25;

      // Gimbal orbital rings counter-rotating
      ring1.rotation.z = elapsed * 0.20;
      ring2.rotation.z = -elapsed * 0.14;

      // Twinkling stars
      starMat.opacity = intro.progress * (0.78 + Math.sin(elapsed * 2.5) * 0.18);
      starfield.rotation.y = elapsed * 0.02 + mouse.x * 0.08;
      starfield.rotation.x = elapsed * 0.01 - mouse.y * 0.05;

      renderer.render(scene, camera);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      cylGeo.dispose();
      wireframeGeo.dispose();
      gridMat.dispose();
      outerGeo.dispose();
      outerWireframe.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      innerEdgesGeo.dispose();
      innerEdgesMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
