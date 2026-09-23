import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const mountRef = useRef(null);
  const telemetryRef = useRef({ qx: 0, qy: 0, qz: 0, qw: 1 });
  const [telemetry, setTelemetry] = useState({ qx: '0.00', qy: '-0.22', qz: '0.00', qw: '0.98' });
  const resetTriggerRef = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0c0c, 0.016);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0c0c0c, 0);
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    keyLight.position.set(15, 20, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 0.8);
    fillLight.position.set(-15, -12, -10);
    scene.add(fillLight);

    // Main 3D World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- 1. ALCHE-Style Curved 3D Spatial Grid (Photo 1 & 2) ---
    // A large curved cylindrical coordinate grid with crosshairs
    const gridRadius = 26;
    const gridHeight = 44;
    const gridRadialSegments = 54;
    const gridHeightSegments = 28;

    const cylGeo = new THREE.CylinderGeometry(
      gridRadius,
      gridRadius,
      gridHeight,
      gridRadialSegments,
      gridHeightSegments,
      true,
      -Math.PI * 0.75,
      Math.PI * 1.5
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

    // Crosshairs '+' at vertex intersections
    const createCrosshairTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      // Draw '+'
      ctx.beginPath();
      ctx.moveTo(16, 6);
      ctx.lineTo(16, 26);
      ctx.moveTo(6, 16);
      ctx.lineTo(26, 16);
      ctx.stroke();
      return new THREE.CanvasTexture(canvas);
    };

    const crosshairTex = createCrosshairTexture();
    const crosshairMat = new THREE.PointsMaterial({
      size: 0.65,
      map: crosshairTex,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const crosshairPoints = new THREE.Points(cylGeo, crosshairMat);
    crosshairPoints.rotation.y = Math.PI;
    worldGroup.add(crosshairPoints);

    // --- 2. Central Computational Lattice (High-Tech 3D Core) ---
    const coreGroup = new THREE.Group();
    worldGroup.add(coreGroup);

    // Outer crystalline wireframe
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const outerWireframe = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const outerCoreMesh = new THREE.LineSegments(outerWireframe, outerMat);
    coreGroup.add(outerCoreMesh);

    // Inner physical solid core
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

    // Gimbal rings
    const ringGeo1 = new THREE.RingGeometry(6.2, 6.25, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(8.0, 8.05, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.15,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // --- 3. Ambient Code Particles ---
    const particleCount = window.innerWidth < 768 ? 500 : 1000;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 8 + Math.random() * 26;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(ph) * Math.cos(th);
      particlePositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      particlePositions[i * 3 + 2] = r * Math.cos(ph);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particles);

    // --- High-Response Pointer Tracking & Inertia ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let dragVelocity = { x: 0, y: 0 };
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        dragVelocity.x = deltaX * 0.005;
        dragVelocity.y = deltaY * 0.005;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e) => {
      // Allow drag when clicking background
      if (e.target.tagName === 'CANVAS' || e.target.id === 'spatial-bg') {
        isDragging = true;
        prevMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    // --- Resize Handler ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    let animId;
    const clock = new THREE.Clock();
    let frameCount = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Check reset trigger
      if (resetTriggerRef.current) {
        mouse.targetX = 0;
        mouse.targetY = 0;
        dragVelocity.x = 0;
        dragVelocity.y = 0;
        worldGroup.rotation.x *= 0.9;
        worldGroup.rotation.y *= 0.9;
        resetTriggerRef.current = false;
      }

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;

      dragVelocity.x *= 0.92;
      dragVelocity.y *= 0.92;

      // Scroll-driven camera parallax
      const scrollY = window.scrollY || 0;
      const targetCamY = -scrollY * 0.006;
      const targetCamZ = 28 + Math.sin(scrollY * 0.0005) * 2;

      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.position.x = mouse.x * 3.4;
      camera.lookAt(0, targetCamY, 0);

      // World rotation responding dynamically to movement & drag
      worldGroup.rotation.y += dragVelocity.x + mouse.x * 0.003;
      worldGroup.rotation.x += dragVelocity.y - mouse.y * 0.002;

      // Continuous subtle ambient drift
      gridMesh.rotation.y = Math.PI + Math.sin(elapsed * 0.2) * 0.06;
      crosshairPoints.rotation.y = gridMesh.rotation.y;

      coreGroup.rotation.y = elapsed * 0.15;
      coreGroup.rotation.x = elapsed * 0.08;
      ring1.rotation.z = elapsed * 0.18;
      ring2.rotation.z = -elapsed * 0.12;

      particles.rotation.y = elapsed * 0.02 + mouse.x * 0.1;

      // Update telemetry quaternion every 10 frames
      frameCount++;
      if (frameCount % 10 === 0) {
        const q = worldGroup.quaternion;
        setTelemetry({
          qx: q.x.toFixed(2),
          qy: q.y.toFixed(2),
          qz: q.z.toFixed(2),
          qw: q.w.toFixed(2),
        });
      }

      renderer.render(scene, camera);
    };

    render();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      cylGeo.dispose();
      wireframeGeo.dispose();
      gridMat.dispose();
      crosshairTex.dispose();
      crosshairMat.dispose();
      outerGeo.dispose();
      outerWireframe.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
    };
  }, []);

  const handleResetQuaternion = () => {
    resetTriggerRef.current = true;
  };

  return (
    <>
      <div
        id="spatial-bg"
        ref={mountRef}
        className="fixed inset-0 pointer-events-auto z-0"
        aria-hidden="true"
      />

      {/* ALCHE-Style 3D Telemetry HUD (Photo 1) */}
      <div className="fixed top-20 right-6 z-20 hidden lg:flex flex-col items-end gap-2 pointer-events-auto select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md text-[10px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>Spatial Quaternion</span>
          <span className="text-zinc-200">
            {telemetry.qx} {telemetry.qy} {telemetry.qz} {telemetry.qw}
          </span>
        </div>

        {/* 3D Gimbal Compass Widget with Reset Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetQuaternion}
            className="px-2.5 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-sky-500/50 hover:text-white text-[10px] font-mono text-zinc-400 transition-colors"
            title="Reset 3D Orientation"
          >
            Reset Orientation
          </button>

          <div className="w-7 h-7 rounded-full bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-sky-400 text-xs shadow-inner">
            <div
              className="w-4 h-4 border-t-2 border-r-2 border-sky-400 rounded-sm transition-transform duration-75"
              style={{
                transform: `rotate(${parseFloat(telemetry.qy) * 180}deg) scale(0.9)`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
