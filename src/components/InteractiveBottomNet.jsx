import React, { useEffect, useRef } from 'react';

/**
 * InteractiveBottomNet (Viewport-Lazy Architectural Topographic Horizon Mesh)
 *
 * - Dynamically imports Three.js and initializes WebGL ONLY when scrolled within
 *   250px of the bottom Contact/Footer section (0% CPU/GPU overhead on initial load).
 */
export default function InteractiveBottomNet() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let isVisible = false;
    let hasInitialized = false;
    let cleanupThree = null;

    const initNet = async () => {
      if (hasInitialized || isDisposed) return;
      hasInitialized = true;

      try {
        const THREE = await import('three');
        if (isDisposed || !containerRef.current) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth < 768;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
          46,
          container.clientWidth / container.clientHeight,
          0.1,
          120
        );
        camera.position.set(0, 5.8, 15.0);
        camera.lookAt(0, -1.2, -4.0);

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: !isMobile,
          powerPreference: 'high-performance',
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0.0);
        container.appendChild(renderer.domElement);

        const planeWidth = 78;
        const planeHeight = 52;
        const segmentsX = isMobile ? 28 : 42;
        const segmentsY = isMobile ? 20 : 30;
        const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight, segmentsX, segmentsY);

        const tiltAngle = Math.PI / 2.45;
        const meshPosY = -4.8;
        const meshPosZ = -3.5;

        const meshMaterial = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          extensions: {
            derivatives: true,
          },
          uniforms: {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(-999, -999) },
            uMouseActive: { value: 0.3 },
            uColorBase: { value: new THREE.Color(0x0a0f1d) },
            uColorGrid: { value: new THREE.Color(0x1e293b) },
            uColorCrest: { value: new THREE.Color(0x64748b) },
            uColorHotspot: { value: new THREE.Color(0x38bdf8) },
          },
          vertexShader: `
            uniform float uTime;
            uniform vec2 uMouse;
            uniform float uMouseActive;
            varying vec2 vUv;
            varying float vElevation;
            varying float vDistToMouse;
            varying vec3 vWorldPos;

            void main() {
              vUv = uv;
              vec3 pos = position;

              float w1 = sin(pos.x * 0.085 + uTime * 0.38) * cos(pos.y * 0.095 + uTime * 0.32) * 1.6;
              float w2 = sin((pos.x + pos.y) * 0.055 - uTime * 0.22) * 0.75;
              float w3 = cos(pos.x * 0.14 + uTime * 0.28) * sin(pos.y * 0.11 - uTime * 0.25) * 0.35;
              float elevation = w1 + w2 + w3;

              float dist = length(pos.xy - uMouse);
              float influence = smoothstep(18.0, 0.0, dist) * uMouseActive;
              float ripple = sin(dist * 0.42 - uTime * 2.0) * influence * 0.85;
              elevation += ripple - influence * 0.95;

              pos.z += elevation;
              vElevation = elevation;
              vDistToMouse = dist;

              vec4 worldPos = modelMatrix * vec4(pos, 1.0);
              vWorldPos = worldPos.xyz;
              gl_Position = projectionMatrix * viewMatrix * worldPos;
            }
          `,
          fragmentShader: `
            uniform vec3 uColorBase;
            uniform vec3 uColorGrid;
            uniform vec3 uColorCrest;
            uniform vec3 uColorHotspot;
            varying vec2 vUv;
            varying float vElevation;
            varying float vDistToMouse;
            varying vec3 vWorldPos;

            void main() {
              vec2 gridFreq = vec2(26.0, 17.0);
              vec2 coord = vUv * gridFreq;
              vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
              float line = 1.0 - min(min(grid.x, grid.y), 1.0);

              float mouseLight = smoothstep(16.0, 0.0, vDistToMouse);
              float crest = clamp((vElevation + 1.2) / 2.8, 0.0, 1.0);

              vec3 col = mix(uColorGrid, uColorCrest, crest * 0.65);
              col = mix(col, uColorHotspot, mouseLight * 0.55);

              float camDist = length(vWorldPos - cameraPosition);
              float fog = smoothstep(12.0, 36.0, camDist);

              float fadeTop = smoothstep(1.0, 0.38, vUv.y);
              float fadeBottom = smoothstep(0.0, 0.12, vUv.y);
              float fadeSides = smoothstep(0.0, 0.08, vUv.x) * smoothstep(1.0, 0.92, vUv.x);
              float boundaryMask = fadeTop * fadeBottom * fadeSides;

              float alpha = line * (0.16 + crest * 0.12 + mouseLight * 0.22) * (1.0 - fog * 0.75) * boundaryMask;

              gl_FragColor = vec4(col, alpha);
            }
          `,
        });

        const mesh = new THREE.Mesh(planeGeo, meshMaterial);
        mesh.rotation.x = -tiltAngle;
        mesh.position.set(0, meshPosY, meshPosZ);
        scene.add(mesh);

        const raycaster = new THREE.Raycaster();
        const mouseNdc = new THREE.Vector2(-999, -999);

        const planeNormal = new THREE.Vector3(
          0,
          Math.sin(tiltAngle),
          Math.cos(tiltAngle)
        ).normalize();
        const interactionPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
          planeNormal,
          mesh.position
        );

        const mouseState = {
          currX: 0,
          currY: 0,
          targetX: 0,
          targetY: 0,
          active: 0.25,
          targetActive: 0.25,
        };

        const handlePointerMove = (e) => {
          if (!isVisible || !container) return;
          const rect = container.getBoundingClientRect();
          const clientX = e.clientX;
          const clientY = e.clientY;

          if (clientY >= rect.top - 120 && clientY <= rect.bottom + 60) {
            mouseNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
            mouseNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouseNdc, camera);
            const hit = new THREE.Vector3();
            if (raycaster.ray.intersectPlane(interactionPlane, hit)) {
              const local = mesh.worldToLocal(hit.clone());
              mouseState.targetX = local.x;
              mouseState.targetY = local.y;
              mouseState.targetActive = 1.0;
            }
          }
        };

        const handlePointerLeave = () => {
          mouseState.targetActive = 0.25;
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerleave', handlePointerLeave);

        const handleResize = () => {
          if (!container || !renderer || !camera) return;
          const width = container.clientWidth;
          const height = container.clientHeight;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        };
        window.addEventListener('resize', handleResize);

        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;

          const elapsed = clock.getElapsedTime();
          const time = prefersReducedMotion ? 0 : elapsed;

          mouseState.currX += (mouseState.targetX - mouseState.currX) * 0.045;
          mouseState.currY += (mouseState.targetY - mouseState.currY) * 0.045;
          mouseState.active += (mouseState.targetActive - mouseState.active) * 0.035;

          meshMaterial.uniforms.uTime.value = time;
          meshMaterial.uniforms.uMouse.value.set(mouseState.currX, mouseState.currY);
          meshMaterial.uniforms.uMouseActive.value = mouseState.active;

          renderer.render(scene, camera);
        };

        animate();

        cleanupThree = () => {
          cancelAnimationFrame(animId);
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('pointerleave', handlePointerLeave);
          window.removeEventListener('resize', handleResize);

          planeGeo.dispose();
          meshMaterial.dispose();
          renderer.dispose();

          if (container && renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        };
      } catch (err) {
        // Fallback silently if WebGL is unavailable
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !hasInitialized) {
          initNet();
        }
      },
      { rootMargin: '250px' }
    );
    observer.observe(container);

    return () => {
      isDisposed = true;
      observer.disconnect();
      if (cleanupThree) cleanupThree();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
