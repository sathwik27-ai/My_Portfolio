import { useEffect, useRef } from "react";
import * as THREE from "three";

export function FloatingBackground3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return; // Gracefully fallback if WebGL is unavailable
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 24;

    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Color palettes
    const getPalette = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        return {
          colors: [0xa7c8ad, 0x8ccbc0, 0xe9a18d, 0x5a7d68, 0x7da48d],
          ambient: 0x222a24,
          lightDir: 0xa7c8ad,
        };
      } else {
        return {
          colors: [0x8db7a1, 0xcdebdd, 0xffd7c2, 0xdcd5f4, 0xf5e6a8],
          ambient: 0xffffff,
          lightDir: 0x8db7a1,
        };
      }
    };

    let palette = getPalette();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // Geometries list for floating 3D shapes
    const geos = [
      new THREE.OctahedronGeometry(0.7, 0),
      new THREE.IcosahedronGeometry(0.85, 0),
      new THREE.TetrahedronGeometry(0.75, 0),
      new THREE.TorusGeometry(0.65, 0.15, 8, 24),
      new THREE.DodecahedronGeometry(0.6, 0),
    ];

    interface FloatingItem {
      mesh: THREE.Mesh;
      wireMesh?: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      speedY: number;
      speedRotX: number;
      speedRotY: number;
      phase: number;
    }

    const items: FloatingItem[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const geo = geos[i % geos.length];
      const color = palette.colors[i % palette.colors.length];

      // Solid translucent inner core
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.35,
        metalness: 0.5,
        transparent: true,
        opacity: 0.38,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geo, mat);

      // Outer wireframe edge
      const wireMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.scale.setScalar(1.08);
      mesh.add(wireMesh);

      // Distribute across screen depth
      const posX = ((i % 4) - 1.5) * 7.5 + (Math.random() - 0.5) * 3;
      const posY = (Math.floor(i / 4) - 1) * 7 + (Math.random() - 0.5) * 3;
      const posZ = -4 + (Math.random() - 0.5) * 8;

      mesh.position.set(posX, posY, posZ);
      const scale = 0.55 + Math.random() * 0.55;
      mesh.scale.setScalar(scale);

      shapesGroup.add(mesh);

      items.push({
        mesh,
        wireMesh,
        baseX: posX,
        baseY: posY,
        baseZ: posZ,
        speedY: 0.6 + Math.random() * 0.8,
        speedRotX: (Math.random() - 0.5) * 0.012,
        speedRotY: (Math.random() - 0.5) * 0.012,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) * 0.0006;
      mouseY = (e.clientY - halfH) * 0.0006;
    };
    window.addEventListener("mousemove", onPointerMove, { passive: true });

    // Resize handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Theme observer
    const observer = new MutationObserver(() => {
      palette = getPalette();
      items.forEach((item, idx) => {
        const col = palette.colors[idx % palette.colors.length];
        (item.mesh.material as THREE.MeshStandardMaterial).color.setHex(col);
        if (item.wireMesh) {
          (item.wireMesh.material as THREE.MeshBasicMaterial).color.setHex(col);
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      camera.position.x = targetX * 12;
      camera.position.y = -targetY * 12;
      camera.lookAt(0, 0, 0);

      // Animate floating items
      if (!prefersReducedMotion) {
        items.forEach((item) => {
          item.mesh.position.y =
            item.baseY + Math.sin(elapsed * item.speedY + item.phase) * 0.8;
          item.mesh.position.x =
            item.baseX + Math.cos(elapsed * 0.5 * item.speedY + item.phase) * 0.4;
          item.mesh.rotation.x += item.speedRotX;
          item.mesh.rotation.y += item.speedRotY;
          if (item.wireMesh) {
            item.wireMesh.rotation.z += 0.004;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();

      renderer.dispose();
      geos.forEach((g) => g.dispose());
      items.forEach((item) => {
        (item.mesh.material as THREE.Material).dispose();
        if (item.wireMesh) {
          (item.wireMesh.material as THREE.Material).dispose();
        }
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-75 dark:opacity-45 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
