import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * EngineeringManifesto (V4 - Viewport-Lazy 3D Monogram & Monumental Brutalist Canvas)
 *
 * - Dynamically imports Three.js and constructs the 3D "< / >" sculpture & industrial chains
 *   ONLY when the user scrolls near the Manifesto section (IntersectionObserver),
 *   eliminating 100% of initial page load main-thread blocking (0ms TBT impact).
 * - Automatically pauses WebGL rendering when scrolled out of the viewport.
 */
export default function EngineeringManifesto() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const wareRef = useRef(null);
  const engineerRef = useRef(null);
  const isRef = useRef(null);
  const futureRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  // 1. Viewport-Lazy Three.js 3D Sculpture & Industrial Chains
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
          section.clientWidth / section.clientHeight,
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
        renderer.toneMappingExposure = 1.3;

        const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.8);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
        keyLight.position.set(6, 8, 7);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x64748b, 2.0);
        fillLight.position.set(-6, -4, 5);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
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

        // 2. Central Compiler Slash Shape: "/"
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
          color: new THREE.Color(0x0e1422),
          metalness: 0.94,
          roughness: 0.22,
          clearcoat: 0.85,
          clearcoatRoughness: 0.08,
          reflectivity: 1.0,
          emissive: new THREE.Color(0x0369a1),
          emissiveIntensity: 0.04,
        });

        const sideMaterial = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(0x05080f),
          metalness: 0.96,
          roughness: 0.35,
          clearcoat: 0.6,
        });

        const materials = [faceMaterial, sideMaterial];

        const meshLeft = new THREE.Mesh(geoLeft, materials);
        const meshSlash = new THREE.Mesh(geoSlash, materials);
        const meshRight = new THREE.Mesh(geoRight, materials);
        masterGroup.add(meshLeft);
        masterGroup.add(meshSlash);
        masterGroup.add(meshRight);

        const edgeMat = new THREE.LineBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.85,
        });
        const edgesLeft = new THREE.LineSegments(new THREE.EdgesGeometry(geoLeft, 14), edgeMat);
        const edgesSlash = new THREE.LineSegments(new THREE.EdgesGeometry(geoSlash, 14), edgeMat);
        const edgesRight = new THREE.LineSegments(new THREE.EdgesGeometry(geoRight, 14), edgeMat);
        meshLeft.add(edgesLeft);
        meshSlash.add(edgesSlash);
        meshRight.add(edgesRight);

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
            roughness: 0.2,
            clearcoat: 0.9,
            clearcoatRoughness: 0.12,
            reflectivity: 1.0,
            emissive: new THREE.Color(0x0284c7),
            emissiveIntensity: 0.08,
          });

          const instanced = new THREE.InstancedMesh(linkGeo, chainMat, numLinks);
          const dTheta = (2 * Math.PI) / numLinks;

          for (let i = 0; i < numLinks; i++) {
            const theta = i * dTheta;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            const z = 0;

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
            rotMatrix.setPosition(x, y, z);
            instanced.setMatrixAt(i, rotMatrix);
          }

          instanced.instanceMatrix.needsUpdate = true;
          const group = new THREE.Group();
          group.add(instanced);
          group.rotation.x = tiltX;
          group.rotation.y = tiltY;

          return { group, instanced, linkGeo, chainMat };
        };

        const outerChain = createIndustrialChain(
          3.38,
          104,
          1.45,
          0.82,
          1.0,
          Math.PI / 2.65,
          0.22,
          0x1e293b
        );
        masterGroup.add(outerChain.group);

        const innerChain = createIndustrialChain(
          2.88,
          80,
          1.3,
          0.75,
          0.9,
          -Math.PI / 3.1,
          -0.18,
          0x0f172a
        );
        masterGroup.add(innerChain.group);

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

          mouse.targetX = (clientX / rect.width) * 2 - 1;
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
          const height = section.clientHeight;
          camera.aspect = width / height;
          camera.position.z = width < 768 ? 8.6 : 7.8;
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
            const scrollRot = scrollProgress * Math.PI * 2.2;
            masterGroup.rotation.y = scrollRot + mouse.currX * 0.45 + mouse.dragRotY;
            masterGroup.rotation.x = 0.08;

            outerChain.group.rotation.z += delta * 0.18;
            innerChain.group.rotation.z -= delta * 0.14;
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
        const entry = entries[0];
        isVisible = entry.isIntersecting;
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

  // 2. GSAP ScrollTrigger Pinned Kinetic Typography Timeline
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ware = wareRef.current;
    const engineer = engineerRef.current;
    const isWord = isRef.current;
    const future = futureRef.current;

    if (!ware || !engineer || !isWord || !future) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.set(ware, { x: '35vw', opacity: 0.9 });
      gsap.set(engineer, { x: '45vw', opacity: 0.9 });
      gsap.set(isWord, { x: '-35vw', opacity: 0.9 });
      gsap.set(future, { x: '40vw', opacity: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            section._scrollProgress = self.progress;
          },
        },
      });

      tl.to(ware, { x: '0vw', opacity: 1, ease: 'power2.out' }, 0)
        .to(engineer, { x: '0vw', opacity: 1, ease: 'power2.out' }, 0.02)
        .to(isWord, { x: '0vw', opacity: 1, ease: 'power2.out' }, 0.04)
        .to(future, { x: '0vw', opacity: 1, ease: 'power2.out' }, 0.06);

      tl.to([ware, engineer, isWord, future], { opacity: 1, ease: 'none' }, 0.45);

      tl.to(ware, { x: '18vw', opacity: 0.25, ease: 'power1.in' }, 0.72)
        .to(engineer, { x: '-22vw', opacity: 0.25, ease: 'power1.in' }, 0.72)
        .to(isWord, { x: '22vw', opacity: 0.25, ease: 'power1.in' }, 0.72)
        .to(future, { x: '-28vw', opacity: 0.25, ease: 'power1.in' }, 0.72);

      return () => {
        gsap.set([ware, engineer, isWord, future], { clearProps: 'all' });
      };
    });

    mm.add('(max-width: 767px)', () => {
      gsap.set([ware, engineer, isWord, future], { x: 0, opacity: 1 });

      const mobileTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.8,
          onUpdate: (self) => {
            section._scrollProgress = self.progress;
          },
        },
      });

      mobileTl
        .fromTo(ware, { x: '8vw' }, { x: '-4vw', ease: 'none' }, 0)
        .fromTo(engineer, { x: '12vw' }, { x: '-6vw', ease: 'none' }, 0)
        .fromTo(isWord, { x: '-10vw' }, { x: '5vw', ease: 'none' }, 0)
        .fromTo(future, { x: '10vw' }, { x: '-5vw', ease: 'none' }, 0);

      return () => {
        gsap.set([ware, engineer, isWord, future], { clearProps: 'all' });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative w-full min-h-[420px] sm:min-h-[500px] md:h-[100dvh] py-8 sm:py-12 md:py-0 bg-black text-white flex flex-col justify-center overflow-hidden select-none"
      aria-label="Software Engineer Manifesto"
    >
      <h2 className="sr-only">Software Engineer is the Future</h2>

      <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center pointer-events-auto">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`w-full h-full cursor-grab ${isDragging ? 'cursor-grabbing' : ''}`}
        />
      </div>

      <div className="relative z-10 w-full px-2 sm:px-4 md:px-6 flex flex-col justify-center md:my-auto pointer-events-none">
        <div className="flex items-baseline justify-start w-full overflow-hidden leading-[0.74]">
          <div className="flex items-baseline font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.07em] uppercase text-white drop-shadow-2xl whitespace-nowrap">
            <span className="inline-block">SOFT</span>
            <span
              ref={wareRef}
              className="inline-block text-zinc-300 ml-[0.01em] will-change-transform"
            >
              WARE
            </span>
          </div>
        </div>

        <div className="flex items-center justify-start w-full overflow-hidden leading-[0.74] pl-[6vw] sm:pl-[10vw] md:pl-[14vw]">
          <span
            ref={engineerRef}
            className="inline-block font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.07em] uppercase text-zinc-100 drop-shadow-2xl whitespace-nowrap will-change-transform"
          >
            ENGINEER
          </span>
        </div>

        <div className="flex items-center justify-start w-full overflow-hidden leading-[0.74] pl-[3vw] sm:pl-[6vw] md:pl-[8vw]">
          <span
            ref={isRef}
            className="inline-block font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.07em] uppercase text-sky-400 drop-shadow-[0_0_40px_rgba(56,189,248,0.4)] whitespace-nowrap will-change-transform"
          >
            IS
          </span>
        </div>

        <div className="flex items-center justify-end w-full overflow-hidden leading-[0.74]">
          <span
            ref={futureRef}
            className="inline-block font-heading font-black text-[13.5vw] sm:text-[14vw] md:text-[13vw] lg:text-[12.5vw] tracking-[-0.07em] uppercase text-white drop-shadow-2xl text-right whitespace-nowrap will-change-transform"
          >
            THE FUTURE
          </span>
        </div>
      </div>
    </section>
  );
}
