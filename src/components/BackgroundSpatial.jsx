import React, { useEffect, useRef, useState } from 'react';

/**
 * Architectural OLED 3D Spatial Continuum (Zero-TBT Deferred WebGL Standard)
 *
 * - Renders an instant, zero-cost CSS architectural blueprint horizon on Frame 1
 *   so FCP, LCP, and TBT suffer 0ms of WebGL shader compilation overhead.
 * - Dynamically imports Three.js and upgrades to interactive 60fps WebGL upon
 *   first user interaction (scroll / pointermove) or idle fallback.
 */
export default function BackgroundSpatial() {
  const containerRef = useRef(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let isDisposed = false;
    let hasTriggered = false;
    let cleanupWebGL = null;

    const initWebGL = async () => {
      if (hasTriggered || isDisposed) return;
      hasTriggered = true;

      removeTriggerListeners();

      try {
        const THREE = await import('three');
        if (isDisposed || !containerRef.current) return;

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
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 1.0);
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

        // 4. Architectural 3D Topographic Horizon Plane
        const planeSegments = isMobile ? 32 : 52;
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
            uColorBase: { value: new THREE.Color(0x18181b) },
            uColorGlow: { value: new THREE.Color(0x71717a) },
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

              float wave1 = sin(pos.x * 0.08 + uTime * 0.3) * cos(pos.y * 0.08 + uTime * 0.25) * 1.2;
              float wave2 = sin(pos.x * 0.14 - uTime * 0.2) * sin(pos.y * 0.1 + uTime * 0.18) * 0.4;
              float elevation = wave1 + wave2;

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
              vec2 gridUv = vUv * vec2(42.0, 42.0);
              vec2 dgrid = fwidth(gridUv);
              vec2 gridDist = abs(fract(gridUv - 0.5) - 0.5);
              vec2 aagrid = smoothstep(vec2(0.0), dgrid * 1.4, gridDist);
              float lineIntensity = 1.0 - min(aagrid.x, aagrid.y);

              float lightSpread = smoothstep(16.0, 0.0, vDistToMouse);
              vec3 finalColor = mix(uColorBase, uColorGlow, lightSpread * 0.7 + max(0.0, vElevation * 0.1));

              float dist = length(vWorldPos - cameraPosition);
              float fogFactor = clamp((dist - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);

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

        // 5. Starlight Particles
        const starCount = isMobile ? 140 : 280;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        const starSpeeds = new Float32Array(starCount);

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
        onScroll();

        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

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

          const time = clock.getElapsedTime();

          mouse.x += (mouse.targetX - mouse.x) * 0.04;
          mouse.y += (mouse.targetY - mouse.y) * 0.04;
          mouse.worldX += (mouse.targetWorldX - mouse.worldX) * 0.06;
          mouse.worldY += (mouse.targetWorldY - mouse.worldY) * 0.06;

          const targetCamY = 3.2 - scrollProgress * 30.0;
          const targetCamZ = 16.0 - Math.sin(scrollProgress * Math.PI) * 4.0;

          camera.position.x += (mouse.x * 2.2 - camera.position.x) * 0.05;
          camera.position.y += (targetCamY + mouse.y * 1.2 - camera.position.y) * 0.05;
          camera.position.z += (targetCamZ - camera.position.z) * 0.05;
          camera.lookAt(mouse.x * 0.4, camera.position.y - 2.5 + mouse.y * 0.2, -10.0);

          terrainMaterial.uniforms.uTime.value = time;
          terrainMaterial.uniforms.uMouse.value.set(mouse.worldX, mouse.worldY);

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
        setWebglReady(true);

        cleanupWebGL = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onResize);
          document.removeEventListener('visibilitychange', onVisibilityChange);

          if (container && renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }

          planeGeo.dispose();
          terrainMaterial.dispose();
          starGeo.dispose();
          starMat.dispose();
          starTexture.dispose();
          renderer.dispose();
        };
      } catch (err) {
        // Fallback silently to CSS architectural horizon if WebGL is unavailable
      }
    };

    const removeTriggerListeners = () => {
      window.removeEventListener('scroll', initWebGL);
      window.removeEventListener('pointermove', initWebGL);
      window.removeEventListener('touchstart', initWebGL);
    };

    // Upgrade to WebGL immediately on first user gesture or after post-LCP idle window
    window.addEventListener('scroll', initWebGL, { passive: true, once: true });
    window.addEventListener('pointermove', initWebGL, { passive: true, once: true });
    window.addEventListener('touchstart', initWebGL, { passive: true, once: true });

    const idleTimer = setTimeout(initWebGL, 3500);

    return () => {
      isDisposed = true;
      clearTimeout(idleTimer);
      removeTriggerListeners();
      if (cleanupWebGL) cleanupWebGL();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black"
      aria-hidden="true"
    >
      {/* Instant Zero-Cost CSS Architectural Blueprint Horizon (Visible on Frame 1) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          webglReady ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 65%, rgba(56, 189, 248, 0.06) 0%, rgba(0, 0, 0, 0) 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 65% at 50% 60%, #000 20%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 65% at 50% 60%, #000 20%, transparent 100%)',
        }}
      />
    </div>
  );
}
