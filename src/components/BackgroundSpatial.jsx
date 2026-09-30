import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Architectural OLED 3D Spatial Continuum (Anti-Slop Master Standard)
 * 
 * Replaces chaotic particle blizzards with a disciplined architectural perspective horizon,
 * ultra-fine starlight motes, and continuous scroll-driven downward camera descent.
 * 
 * Aesthetic Pillars:
 * 1. antislop: Zero particle clutter over typography. High-contrast typographic protection.
 * 2. taste: Pure OLED pitch black (#000000). Architectural blueprint grid with cursor spotlight.
 * 3. impeccable: 60fps locked, single WebGL context, continuous scroll velocity parallax.
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
    scene.fog = new THREE.FogExp2(0x000000, 0.018);

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.2, 16.0);
    camera.lookAt(0, -1.2, -10.0);

    // 2. High-Performance Pure OLED Black Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 1.0); // True OLED Pitch Black
    container.appendChild(renderer.domElement);

    // 3. Mouse & Raycasting Setup
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      worldX: 0,
      worldY: 0,
      targetWorldX: 0,
      targetWorldY: 0,
    };

    const raycaster = new THREE.Raycaster();
    const mouseNdc = new THREE.Vector2(-999, -999);
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0.15), 5);

    // 4. ARCHITECTURAL 3D TOPOGRAPHIC HORIZON PLANE (Linear / Vercel Standard)
    const planeSegments = isMobile ? 40 : 64;
    const planeGeo = new THREE.PlaneGeometry(90, 90, planeSegments, planeSegments);

    const terrainMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      extensions: {
        derivatives: true,
      },
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorBase: { value: new THREE.Color(0x18181b) }, // deep zinc
        uColorGlow: { value: new THREE.Color(0x71717a) }, // refined titanium silver
        uFogNear: { value: 10.0 },
        uFogFar: { value: 45.0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying float vElevation;
        varying float vDistToMouse;
        varying vec3 vWorldPos;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Gentle architectural wave
          float wave1 = sin(pos.x * 0.08 + uTime * 0.3) * cos(pos.y * 0.08 + uTime * 0.25) * 1.2;
          float wave2 = sin(pos.x * 0.14 - uTime * 0.2) * sin(pos.y * 0.1 + uTime * 0.18) * 0.4;
          float elevation = wave1 + wave2;

          // Smooth interactive dip near cursor
          float distToMouse = length(pos.xy - uMouse);
          float mouseInfluence = smoothstep(14.0, 0.0, distToMouse);
          elevation += sin(distToMouse * 0.4 - uTime * 1.8) * mouseInfluence * 0.8;

          pos.z += elevation;
          vElevation = elevation;
          vDistToMouse = distToMouse;

          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorBase;
        uniform vec3 uColorGlow;
        uniform float uFogNear;
        uniform float uFogFar;
        varying vec2 vUv;
        varying float vElevation;
        varying float vDistToMouse;
        varying vec3 vWorldPos;

        void main() {
          // Antialiased architectural grid lines
          vec2 gridUv = vUv * vec2(42.0, 42.0);
          vec2 dgrid = fwidth(gridUv);
          vec2 gridDist = abs(fract(gridUv - 0.5) - 0.5);
          vec2 aagrid = smoothstep(vec2(0.0), dgrid * 1.4, gridDist);
          float lineIntensity = 1.0 - min(aagrid.x, aagrid.y);

          // Cursor spotlight falloff
          float lightSpread = smoothstep(16.0, 0.0, vDistToMouse);

          // Deep subtle silver-zinc blending
          vec3 finalColor = mix(uColorBase, uColorGlow, lightSpread * 0.7 + max(0.0, vElevation * 0.1));

          // Depth fog
          float dist = length(vWorldPos - cameraPosition);
          float fogFactor = clamp((dist - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);

          // Edge boundary fadeout
          float edgeFade = smoothstep(0.0, 0.15, vUv.x) * smoothstep(1.0, 0.85, vUv.x) *
                           smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);

          float alpha = lineIntensity * (0.12 + lightSpread * 0.45) * (1.0 - fogFactor) * edgeFade;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
    });

    const terrainMesh = new THREE.Mesh(planeGeo, terrainMaterial);
    terrainMesh.rotation.x = -Math.PI / 2.3;
    terrainMesh.position.set(0, -6.5, -16);
    scene.add(terrainMesh);

    // 5. ULTRA-FINE STARLIGHT PARTICLES (No clutter, pure atmospheric depth)
    const starCount = isMobile ? 180 : 360;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSpeeds = new Float32Array(starCount);

    // Generate crisp circular particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.3, 'rgba(241, 245, 249, 0.8)');
    grad.addColorStop(0.7, 'rgba(148, 163, 184, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = grad;
    pCtx.fillRect(0, 0, 32, 32);
    const starTexture = new THREE.CanvasTexture(pCanvas);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 55;
      // Distributed vertically along the entire page descent
      starPositions[i * 3 + 1] = 8 - Math.random() * 75;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 45 - 8;

      starSpeeds[i] = 0.15 + Math.random() * 0.4;

      const lum = 0.5 + Math.random() * 0.45;
      starColors[i * 3] = lum;
      starColors[i * 3 + 1] = lum;
      starColors[i * 3 + 2] = lum + 0.05;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: isMobile ? 0.35 : 0.48,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 6. Interaction Event Listeners
    const onPointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseNdc.x = mouse.targetX;
      mouseNdc.y = mouse.targetY;
      raycaster.setFromCamera(mouseNdc, camera);

      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(interactionPlane, hit)) {
        const local = terrainMesh.worldToLocal(hit.clone());
        mouse.targetWorldX = local.x;
        mouse.targetWorldY = local.y;
      }
    };

    let scrollProgress = 0;
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // 7. Render Loop
    let animId;
    const clock = new THREE.Clock();
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isTabVisible) return;

      const elapsed = clock.getElapsedTime();
      const time = prefersReducedMotion ? 0 : elapsed;

      // Mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      mouse.worldX += (mouse.targetWorldX - mouse.worldX) * 0.06;
      mouse.worldY += (mouse.targetWorldY - mouse.worldY) * 0.06;

      // Downward vertical camera travel synchronized with page scroll ("searah gitu")
      const targetCamY = 3.2 - scrollProgress * 30.0;
      const targetCamZ = 16.0 - Math.sin(scrollProgress * Math.PI) * 4.0;

      camera.position.x += (mouse.x * 2.2 - camera.position.x) * 0.05;
      camera.position.y += (targetCamY + mouse.y * 1.2 - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.lookAt(mouse.x * 0.4, camera.position.y - 2.5 + mouse.y * 0.2, -10.0);

      // Update terrain shader uniforms
      terrainMaterial.uniforms.uTime.value = time;
      terrainMaterial.uniforms.uMouse.value.set(mouse.worldX, mouse.worldY);

      // Starfield gentle downward drift
      const sArr = starGeo.attributes.position.array;
      for (let i = 0; i < starCount; i++) {
        sArr[i * 3 + 1] -= starSpeeds[i] * 0.012;
        if (sArr[i * 3 + 1] < -70) {
          sArr[i * 3 + 1] = 8;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      planeGeo.dispose();
      terrainMaterial.dispose();
      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
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
