"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Huruf "A" logo ArrrStudio sebagai objek 3D: badan chrome, rim maroon di belakang, bintang maroon menyala.
// three.js dimuat malas di klien; tanpa WebGL, gambar mark statis tetap tampil.
export default function HeroScene({ label }: { label: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.85;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.className = "absolute inset-0 size-full";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTexture;
      scene.environmentIntensity = 0.55;

      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
      camera.position.set(0, 0, 6.4);

      // ── Bentuk dari logo: chevron A, palang bawah, bintang 4 sudut ──
      const chevron = new THREE.Shape([
        new THREE.Vector2(-1.35, -0.62),
        new THREE.Vector2(0, 1.0),
        new THREE.Vector2(0.8, -0.34),
        new THREE.Vector2(0.52, -0.34),
        new THREE.Vector2(0, 0.6),
        new THREE.Vector2(-0.9, -0.46),
      ]);
      const bar = new THREE.Shape([
        new THREE.Vector2(-1.08, -0.62),
        new THREE.Vector2(0.2, -0.2),
        new THREE.Vector2(0.15, -0.06),
        new THREE.Vector2(-0.74, -0.37),
      ]);
      const star = new THREE.Shape();
      const R = 0.24;
      const r = 0.055;
      for (let i = 0; i < 8; i++) {
        const radius = i % 2 === 0 ? R : r;
        const angle = (i * Math.PI) / 4 + Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) star.moveTo(x, y);
        else star.lineTo(x, y);
      }
      star.closePath();

      const bevel = { depth: 0.22, bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.028, bevelSegments: 4, curveSegments: 1 };
      const bodyGeo = new THREE.ExtrudeGeometry([chevron, bar], bevel);
      const rimGeo = new THREE.ExtrudeGeometry([chevron, bar], { ...bevel, depth: 0.08, bevelSize: 0.075 });
      const starGeo = new THREE.ExtrudeGeometry(star, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.012, bevelSegments: 2 });

      const chrome = new THREE.MeshPhysicalMaterial({ color: 0xaeb3bc, metalness: 1, roughness: 0.26, clearcoat: 0.5, clearcoatRoughness: 0.2 });
      const rimMat = new THREE.MeshStandardMaterial({ color: 0x3a0812, emissive: 0x8e1f33, emissiveIntensity: 0.9, metalness: 0.5, roughness: 0.4 });
      const starMat = new THREE.MeshStandardMaterial({ color: 0xc2445b, emissive: 0xe0304f, emissiveIntensity: 2.4, metalness: 0.2, roughness: 0.3 });

      const mark = new THREE.Group();
      const body = new THREE.Mesh(bodyGeo, chrome);
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.position.z = -0.09;
      rim.scale.setScalar(1.015);
      const starMesh = new THREE.Mesh(starGeo, starMat);
      starMesh.position.set(0.02, 0.06, 0.2);
      mark.add(rim, body, starMesh);

      const box = new THREE.Box3().setFromObject(mark);
      const center = box.getCenter(new THREE.Vector3());
      mark.children.forEach((child) => child.position.sub(new THREE.Vector3(center.x, center.y, 0)));
      scene.add(mark);

      const key = new THREE.DirectionalLight(0xffffff, 0.9);
      key.position.set(2, 3, 4);
      const glow = new THREE.PointLight(0xc2445b, 6, 4, 2);
      glow.position.set(0.02 - center.x, 0.06 - center.y, 0.8);
      const backRim = new THREE.PointLight(0x8e1f33, 18, 8, 2);
      backRim.position.set(1.8, 1.2, -1.6);
      scene.add(key, glow, backRim);

      // ── Interaksi & loop ──
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || reduceMotion) return;
        const rect = el.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      };
      const onLeave = () => {
        pointer.x = 0;
        pointer.y = 0;
      };
      el.addEventListener("pointermove", onPointer);
      el.addEventListener("pointerleave", onLeave);

      const resize = () => {
        const { width, height } = el.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // Di layar sempit, mundurkan kamera supaya mark tetap utuh.
        camera.position.z = camera.aspect < 1.1 ? 8.2 : width < 640 ? 5.4 : 6.4;
        camera.updateProjectionMatrix();
        // Saat loop berhenti (reduced motion / di luar layar) frame tetap digambar ulang sesuai ukuran baru.
        renderer.render(scene, camera);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(el);
      resize();

      const clock = new THREE.Clock();
      let raf = 0;
      let visible = true;
      const frame = () => {
        const t = clock.getElapsedTime();
        // Intro: mark berputar masuk & membesar selama ~1.8 dtk (ease-out cubic).
        const intro = reduceMotion ? 1 : 1 - Math.pow(1 - Math.min(t / 1.8, 1), 3);
        mark.scale.setScalar(0.78 + 0.22 * intro);
        const idle = reduceMotion ? 0 : Math.sin(t * 0.45) * 0.28;
        mark.rotation.y += (idle + pointer.x * 0.45 - (1 - intro) * 2.4 - mark.rotation.y) * 0.08;
        mark.rotation.x += (pointer.y * 0.25 - 0.06 - mark.rotation.x) * 0.06;
        starMat.emissiveIntensity = reduceMotion ? 2.4 : 2.1 + Math.sin(t * 2.2) * 0.5;
        renderer.render(scene, camera);
        raf = visible && !reduceMotion ? requestAnimationFrame(frame) : 0;
      };

      const start = () => {
        if (!raf) raf = requestAnimationFrame(frame);
      };
      const stop = () => {
        cancelAnimationFrame(raf);
        raf = 0;
      };
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible) start();
        else stop();
      });
      intersection.observe(el);
      const onVisibility = () => {
        visible = !document.hidden;
        if (visible) start();
        else stop();
      };
      document.addEventListener("visibilitychange", onVisibility);

      renderer.render(scene, camera);
      setReady(true);
      start();

      cleanup = () => {
        stop();
        intersection.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        el.removeEventListener("pointermove", onPointer);
        el.removeEventListener("pointerleave", onLeave);
        [bodyGeo, rimGeo, starGeo, chrome, rimMat, starMat, envTexture].forEach((item) => item.dispose());
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={host} role="img" aria-label={label} className="absolute inset-0">
      <Image
        src="/brand/arrr-mark.webp"
        alt=""
        width={729}
        height={418}
        priority
        className={cn("absolute left-1/2 top-1/2 h-auto w-[46%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500", ready && "opacity-0")}
      />
    </div>
  );
}
