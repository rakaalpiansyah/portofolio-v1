import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

/**
 * EngineeringManifesto (Chapter 05 - Pinned Split-Expand Showreel + Lazy Three.js 3D </>)
 *
 * - Dynamically imports Three.js and constructs the 3D "< / >" sculpture & industrial chains
 *   only when near the viewport, pausing automatically when offscreen.
 * - Desktop (>=768px): Pinned GSAP ScrollTrigger expands the central 3D viewfinder via clip-path
 *   while CODE / CRAFT split outward.
 */
export default function EngineeringManifesto({ onNavigate }) {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const leftWordRef = useRef(null);
  const rightWordRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const { t } = useLanguage();

  // 1. Viewport-Lazy Three.js 3D Sculpture & Industrial Chains (Swiss Signal Vermilion & Titanium)
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    let isDisposed = false;
    let isVisible = false;
    let hasInitialized = false;
    let cleanupThree = null;

    const initThreeScene = async () => {
      if (hasInitialized || isDisposed) return;
      hasInitialized = true;

      try {
        const THREE = await import('three');
        if (isDisposed || !sectionRef.current || !canvasRef.current) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          42,
          section.clientWidth / Math.max(1, section.clientHeight),
          0.1,
          100
        );
        camera.position.set(0, 0, 7.8);

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: window.innerWidth >= 768,
          powerPreference: 'high-performance',
        });
        renderer.setSize(section.clientWidth, section.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;

        const ambientLight = new THREE.AmbientLight(0x111524, 2.0);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
        keyLight.position.set(6, 8, 7);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0xa3aac2, 2.2);
        fillLight.position.set(-6, -4, 5);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xff5b4d, 4.2);
        rimLight.position.set(0, -6, -4);
        scene.add(rimLight);

        const cursorLight = new THREE.PointLight(0xffffff, 3.5, 15);
        cursorLight.position.set(0, 0, 4);
        scene.add(cursorLight);

        const masterGroup = new THREE.Group();
        scene.add(masterGroup);

        // 1. Left Chevron Shape: "<"
        const leftShape = new THREE.Shape();
        leftShape.moveTo(-2.55, 0.0);
        leftShape.lineTo(-1.35, 1.42);
        leftShape.lineTo(-0.85, 1.42);
        leftShape.lineTo(-1.85, 0.0);
        leftShape.lineTo(-0.85, -1.42);
        leftShape.lineTo(-1.35, -1.42);
        leftShape.closePath();

        // 2. Central Slash Shape: "/"
        const slashShape = new THREE.Shape();
        slashShape.moveTo(-0.16, 1.68);
        slashShape.lineTo(0.24, 1.68);
        slashShape.lineTo(0.16, -1.68);
        slashShape.lineTo(-0.24, -1.68);
        slashShape.closePath();

        // 3. Right Chevron Shape: ">"
        const rightShape = new THREE.Shape();
        rightShape.moveTo(2.55, 0.0);
        rightShape.lineTo(1.35, -1.42);
        rightShape.lineTo(0.85, -1.42);
        rightShape.lineTo(1.85, 0.0);
        rightShape.lineTo(0.85, 1.42);
        rightShape.lineTo(1.35, 1.42);
        rightShape.closePath();

        const extrudeSettings = {
          depth: 0.42,
          bevelEnabled: true,
          bevelSegments: 4,
          steps: 1,
          bevelSize: 0.048,
          bevelThickness: 0.048,
        };

        const geoLeft = new THREE.ExtrudeGeometry(leftShape, extrudeSettings);
        const geoSlash = new THREE.ExtrudeGeometry(slashShape, extrudeSettings);
        const geoRight = new THREE.ExtrudeGeometry(rightShape, extrudeSettings);

        geoLeft.center();
        geoSlash.center();
        geoRight.center();

        geoLeft.translate(-1.62, 0, 0);
        geoSlash.translate(0, 0, 0);
        geoRight.translate(1.62, 0, 0);

        const faceMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x111524),
          metalness: 0.94,
          roughness: 0.22,
          clearcoat: 0.85,
          clearcoatRoughness: 0.08,
          reflectivity: 1.0,
          emissive: new THREE.Color(0x9e1f14),
          emissiveIntensity: 0.08,
        });

        const sideMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x080a12),
          metalness: 0.96,
          roughness: 0.35,
          clearcoat: 0.6,
        });

        const materials = [faceMaterial, sideMaterial];

        const meshLeft = new THREE.Mesh(geoLeft, materials);
        const meshSlash = new THREE.Mesh(geoSlash, materials);
        const meshRight = new THREE.Mesh(geoRight, materials);
        masterGroup.add(meshLeft, meshSlash, meshRight);

        const edgeMat = new THREE.LineBasicMaterial({
          color: 0xff5b4d,
          transparent: true,
          opacity: 0.9,
        });
        meshLeft.add(new THREE.LineSegments(new THREE.EdgesGeometry(geoLeft, 14), edgeMat));
        meshSlash.add(new THREE.LineSegments(new THREE.EdgesGeometry(geoSlash, 14), edgeMat));
        meshRight.add(new THREE.LineSegments(new THREE.EdgesGeometry(geoRight, 14), edgeMat));

        const createIndustrialChain = (
          radius,
          numLinks,
          scaleX,
          scaleY,
          scaleZ,
          tiltX,
          tiltY,
          colorHex
        ) => {
          const linkGeo = new THREE.TorusGeometry(0.12, 0.034, 8, 20);
          linkGeo.scale(scaleX, scaleY, scaleZ);

          const chainMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(colorHex),
            metalness: 0.96,
            roughness: 0.22,
            clearcoat: 0.85,
            clearcoatRoughness: 0.12,
            reflectivity: 1.0,
            emissive: new THREE.Color(0x7f1d1d),
            emissiveIntensity: 0.08,
          });

          const instanced = new THREE.InstancedMesh(linkGeo, chainMat, numLinks);
          const dTheta = (2 * Math.PI) / numLinks;

          for (let i = 0; i < numLinks; i++) {
            const theta = i * dTheta;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);

            const T = new THREE.Vector3(-Math.sin(theta), Math.cos(theta), 0).normalize();
            const N = new THREE.Vector3(Math.cos(theta), Math.sin(theta), 0).normalize();
            const B = new THREE.Vector3(0, 0, 1);

            const angle = i % 2 === 0 ? Math.PI / 4 : -Math.PI / 4;
            const Y = new THREE.Vector3()
              .copy(N)
              .multiplyScalar(Math.cos(angle))
              .addScaledVector(B, Math.sin(angle))
              .normalize();
            const Z = new THREE.Vector3().crossVectors(T, Y).normalize();

            const rotMatrix = new THREE.Matrix4().makeBasis(T, Y, Z);
            rotMatrix.setPosition(x, y, 0);
            instanced.setMatrixAt(i, rotMatrix);
          }

          instanced.instanceMatrix.needsUpdate = true;
          const group = new THREE.Group();
          group.add(instanced);
          group.rotation.x = tiltX;
          group.rotation.y = tiltY;

          return { group, instanced, linkGeo, chainMat };
        };

        const outerChain = createIndustrialChain(3.38, 104, 1.45, 0.82, 1.0, Math.PI / 2.65, 0.22, 0x2a2f45);
        const innerChain = createIndustrialChain(2.88, 80, 1.3, 0.75, 0.9, -Math.PI / 3.1, -0.18, 0x181b2a);
        masterGroup.add(outerChain.group, innerChain.group);

        const mouse = {
          targetX: 0,
          currX: 0,
          isDown: false,
          prevX: 0,
          dragRotY: 0,
          dragVelY: 0,
        };

        const handlePointerMove = (e) => {
          if (!isVisible) return;
          const rect = section.getBoundingClientRect();
          const clientX = e.clientX - rect.left;

          mouse.targetX = (clientX / Math.max(1, rect.width)) * 2 - 1;
          cursorLight.position.x = mouse.targetX * 5.5;

          if (mouse.isDown) {
            const deltaX = e.clientX - mouse.prevX;
            mouse.dragVelY = deltaX * 0.006;
            mouse.dragRotY += mouse.dragVelY;
            mouse.prevX = e.clientX;
          }
        };

        const handlePointerDown = (e) => {
          mouse.isDown = true;
          setIsDragging(true);
          mouse.prevX = e.clientX;
        };

        const handlePointerUp = () => {
          mouse.isDown = false;
          setIsDragging(false);
        };

        canvas.addEventListener('pointerdown', handlePointerDown, { passive: true });
        window.addEventListener('pointermove', handlePointerMove, { passive: true });
        window.addEventListener('pointerup', handlePointerUp, { passive: true });

        const handleResize = () => {
          if (!section || !renderer || !camera) return;
          const width = section.clientWidth;
          const height = Math.max(1, section.clientHeight);
          camera.aspect = width / height;
          camera.position.z = width < 768 ? 9.0 : 7.8;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        let animId;
        const clock = new THREE.Clock();

        const animate = () => {
          animId = requestAnimationFrame(animate);
          if (!isVisible) return;

          const delta = clock.getDelta();

          if (!mouse.isDown) {
            mouse.dragVelY *= 0.93;
            mouse.dragRotY += mouse.dragVelY;
          }

          mouse.currX += (mouse.targetX - mouse.currX) * 0.06;

          if (!prefersReducedMotion) {
            const scrollProgress = section._scrollProgress || 0;
            const scrollRot = scrollProgress * Math.PI * 2.1;
            masterGroup.rotation.y = scrollRot + mouse.currX * 0.42 + mouse.dragRotY;
            masterGroup.rotation.x = 0.08;

            outerChain.group.rotation.z += delta * 0.16;
            innerChain.group.rotation.z -= delta * 0.13;
          }

          renderer.render(scene, camera);
        };

        animate();

        cleanupThree = () => {
          cancelAnimationFrame(animId);
          canvas.removeEventListener('pointerdown', handlePointerDown);
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('pointerup', handlePointerUp);
          window.removeEventListener('resize', handleResize);

          geoLeft.dispose();
          geoSlash.dispose();
          geoRight.dispose();
          outerChain.linkGeo.dispose();
          outerChain.chainMat.dispose();
          outerChain.instanced.dispose();
          innerChain.linkGeo.dispose();
          innerChain.chainMat.dispose();
          innerChain.instanced.dispose();
          faceMaterial.dispose();
          sideMaterial.dispose();
          edgeMat.dispose();
          renderer.dispose();
        };
      } catch (err) {
        // Fallback silently if WebGL is unavailable
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && !hasInitialized) {
          initThreeScene();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(section);

    return () => {
      isDisposed = true;
      observer.disconnect();
      if (cleanupThree) cleanupThree();
    };
  }, []);

  // 2. Desktop Pinned Split-Expand Scroll Choreography
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      if (!frameRef.current || !leftWordRef.current || !rightWordRef.current) return;

      const applySymmetricClip = (progress) => {
        if (!frameRef.current) return;
        const insetY = (16 * (1 - progress)).toFixed(2);
        const insetX = (20 * (1 - progress)).toFixed(2);
        const radius = (16 * (1 - progress)).toFixed(1);
        frameRef.current.style.clipPath = `inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${radius}px)`;
      };

      const proxy = { progress: 0 };
      applySymmetricClip(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            section._scrollProgress = self.progress;
          },
        },
      });

      tl.to(
        proxy,
        {
          progress: 1,
          ease: 'power2.inOut',
          onUpdate: () => applySymmetricClip(proxy.progress),
        },
        0
      )
        .to(
          leftWordRef.current,
          {
            xPercent: -120,
            opacity: 0.12,
            ease: 'power2.inOut',
          },
          0
        )
        .to(
          rightWordRef.current,
          {
            xPercent: 120,
            opacity: 0.12,
            ease: 'power2.inOut',
          },
          0
        );

      return () => {
        if (frameRef.current) frameRef.current.style.clipPath = '';
        gsap.set([leftWordRef.current, rightWordRef.current], {
          clearProps: 'all',
        });
      };
    });

    return () => mm.revert();
  }, []);

  const handleProcessNav = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('#process');
    } else {
      document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      data-canvas-theme="dark"
      aria-label={t.showreel.title}
      className="relative w-full min-h-[72dvh] md:h-[100dvh] bg-[#080A12] text-[#F8F9FC] flex items-center justify-center overflow-hidden"
    >
      {/* Left Anchor for Continuous Thread */}
      <div
        data-thread-anchor="manifesto-frame"
        className="hidden md:block absolute left-10 top-1/2 w-2 h-2 pointer-events-none"
        aria-hidden="true"
      />

      {/* Giant Split Display Words Flanking the Expanding Viewfinder (Desktop) */}
      <div
        className="hidden md:flex absolute inset-0 items-center justify-between px-6 lg:px-12 pointer-events-none z-20 select-none"
        aria-hidden="true"
      >
        <span
          ref={leftWordRef}
          className="kx-display text-[11.5vw] leading-[0.8] text-[#FF5B4D] will-change-transform"
        >
          {t.showreel.leftWord}
        </span>
        <span
          ref={rightWordRef}
          className="kx-display text-[11.5vw] leading-[0.8] text-[#FF5B4D] will-change-transform"
        >
          {t.showreel.rightWord}
        </span>
      </div>

      {/* Expanding 3D Viewfinder Frame */}
      <div
        ref={frameRef}
        data-cursor="DRAG"
        className="relative w-full h-[72dvh] md:h-full bg-[#111524] overflow-hidden z-10"
      >
        {/* Three.js Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
        />

        {/* Subtle Monitor Scanlines */}
        <div className="kx-scan absolute inset-0 pointer-events-none opacity-65" />
      </div>

      {/* Outer Unclipped Viewfinder Chrome & HUD */}
      <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between">
        {/* Top Viewfinder HUD (Clear of Fixed Navbar) */}
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 pt-20 md:pt-24 flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-white">
            <span className="text-[#FF5B4D] font-semibold">(05)</span>
            <span>{t.showreel.indexLabel}</span>
          </div>
        </div>

        {/* Mobile Title Fallback */}
        <div className="md:hidden text-center px-4">
          <p className="kx-display text-5xl text-[#FF5B4D] leading-none">
            {t.showreel.leftWord} / {t.showreel.rightWord}
          </p>
        </div>

        {/* Bottom Viewfinder HUD */}
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-10 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="kx-display text-3xl sm:text-5xl text-white leading-none mb-1">
              {t.showreel.title}
            </h2>
            <p className="font-mono text-xs text-[#A3AAC2] uppercase tracking-[0.08em]">
              {t.showreel.hint}
            </p>
          </div>

          <a
            href="#process"
            onClick={handleProcessNav}
            className="pointer-events-auto min-h-[44px] px-5 py-2.5 rounded-full border border-white/30 bg-[#080A12]/85 text-white hover:bg-white hover:text-[#080A12] inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors w-fit"
          >
            <span>{t.showreel.cta}</span>
            <ArrowDown weight="bold" className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
