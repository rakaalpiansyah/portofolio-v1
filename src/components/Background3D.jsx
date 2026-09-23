import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const mountRef = useRef(null);
  const [telemetry, setTelemetry] = useState({ qx: '0.00', qy: '-0.22', qz: '0.00', qw: '0.98' });
  const resetTriggerRef = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.014);

    const camera = new THREE.PerspectiveCamera(
      48,
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
    renderer.setClearColor(0x0a0a0a, 0);
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    keyLight.position.set(15, 20, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 0.9);
    fillLight.position.set(-15, -12, -10);
    scene.add(fillLight);

    // Main 3D World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // --- 1. ALCHE-Style Curved 3D Spatial Grid (Photo 1 & 2) ---
    const gridRadius = 36;
    const gridHeight = 52;
    const gridRadialSegments = 54;
    const gridHeightSegments = 26;

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
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
    });
    const gridMesh = new THREE.LineSegments(wireframeGeo, gridMat);
    gridMesh.position.z = -10; // Securely in background, no clipping
    gridMesh.rotation.y = Math.PI;
    worldGroup.add(gridMesh);

    // --- 2. Central Computational Lattice (High-Tech 3D Core) ---
    const coreGroup = new THREE.Group();
    worldGroup.add(coreGroup);

    // Outer crystalline wireframe
    const outerGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const outerWireframe = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.32,
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

    // Inner specular edges
    const innerEdgesGeo = new THREE.EdgesGeometry(innerGeo);
    const innerEdgesMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.55,
    });
    const innerEdges = new THREE.LineSegments(innerEdgesGeo, innerEdgesMat);
    coreGroup.add(innerEdges);

    // Gimbal rings
    const ringGeo1 = new THREE.RingGeometry(6.2, 6.25, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.24,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(8.0, 8.05, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // --- 3. Bintang Mengkilat & Berkilau (Sparkling Celestial Starfield) ---
    const createStarGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 64, 64);

      // Radial star glow
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)'); // Inti putih cemerlang
      grad.addColorStop(0.2, 'rgba(56, 189, 248, 0.95)'); // Pendaran cyan tajam
      grad.addColorStop(0.5, 'rgba(129, 140, 248, 0.45)'); // Halo indigo lembut
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparan penuh

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();

      // Sharp cross twinkle flare
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(32, 10);
      ctx.lineTo(32, 54);
      ctx.moveTo(10, 32);
      ctx.lineTo(54, 32);
      ctx.stroke();

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const starTexture = createStarGlowTexture();

    const starCount = window.innerWidth < 768 ? 850 : 1600;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colWhite = new THREE.Color(0xffffff);
    const colCyan = new THREE.Color(0x38bdf8);
    const colIndigo = new THREE.Color(0x818cf8);
    const colSky = new THREE.Color(0x7dd3fc);

    for (let i = 0; i < starCount; i++) {
      const radius = 6 + Math.random() * 32;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const r = Math.random();
      const col = r < 0.45 ? colWhite : r < 0.75 ? colCyan : r < 0.9 ? colSky : colIndigo;
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.38,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starfield = new THREE.Points(starGeo, starMat);
    worldGroup.add(starfield);

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
        worldGroup.rotation.x *= 0.88;
        worldGroup.rotation.y *= 0.88;
        resetTriggerRef.current = false;
      }

      // Smooth mouse lerp with responsive damping
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

      coreGroup.rotation.y = elapsed * 0.15;
      coreGroup.rotation.x = elapsed * 0.08;
      ring1.rotation.z = elapsed * 0.18;
      ring2.rotation.z = -elapsed * 0.12;

      // Dynamic glittering / sparkling twinkle of the stars
      starMat.opacity = 0.78 + Math.sin(elapsed * 3.0) * 0.18;
      starfield.rotation.y = elapsed * 0.02 + mouse.x * 0.12;
      starfield.rotation.x = elapsed * 0.01 - mouse.y * 0.08;

      // Update telemetry quaternion periodically
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

      {/* ALCHE-Style 3D Telemetry HUD */}
      <div className="fixed top-20 right-6 z-20 hidden lg:flex flex-col items-end gap-2 pointer-events-auto select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md text-[10px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
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
