import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Interactive3DOrbProps {
  className?: string;
}

export function Interactive3DOrb({ className = "" }: Interactive3DOrbProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 180;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      return; // Fallback gracefully if WebGL fails
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const group = new THREE.Group();
    scene.add(group);

    // Theme color resolver
    const isDark = document.documentElement.classList.contains("dark");
    const primaryColor = isDark ? 0xa7c8ad : 0x4d7c66;
    const accentColor = isDark ? 0xe9a18d : 0xd97757;
    const wireColor = isDark ? 0x8ccbc0 : 0x5a9e87;

    // 1. Inner solid faceted icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      roughness: 0.25,
      metalness: 0.65,
      flatShading: true,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Outer delicate wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: wireColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // 3. Orbital ring
    const ringGeo = new THREE.TorusGeometry(1.65, 0.015, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // 4. Subtle orbiting particle nodes
    const particleCount = 24;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = (i / particleCount) * Math.PI * 2;
      const radius = 1.65 + (Math.random() - 0.5) * 0.2;
      particlePositions[i * 3] = Math.cos(theta) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      particlePositions[i * 3 + 2] = Math.sin(theta) * radius;
    }
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: accentColor,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(accentColor, 1.2);
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    // Drag and hover state
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velX = 0;
    let velY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velX = 0;
      velY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      velX = deltaX * 0.008;
      velY = deltaY * 0.008;

      group.rotation.y += velX;
      group.rotation.x += velY;
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const dom = renderer.domElement;
    dom.style.touchAction = "none";
    dom.style.cursor = "grab";
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Responsive resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 180;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Theme observer
    const observer = new MutationObserver(() => {
      const darkNow = document.documentElement.classList.contains("dark");
      const pCol = darkNow ? 0xa7c8ad : 0x4d7c66;
      const aCol = darkNow ? 0xe9a18d : 0xd97757;
      const wCol = darkNow ? 0x8ccbc0 : 0x5a9e87;
      coreMat.color.setHex(pCol);
      wireMat.color.setHex(wCol);
      ringMat.color.setHex(aCol);
      particleMat.color.setHex(aCol);
      dirLight2.color.setHex(aCol);
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
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        // Inertia damping
        velX *= 0.94;
        velY *= 0.94;
        group.rotation.y += velX;
        group.rotation.x += velY;

        // Idle floating & auto-spin
        if (!prefersReducedMotion) {
          group.rotation.y += 0.006;
          wireMesh.rotation.x -= 0.003;
          wireMesh.rotation.z += 0.003;
          ringMesh.rotation.z += 0.005;
          group.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className={`relative rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md overflow-hidden p-4 shadow-sm group hover:border-primary/40 hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground">
            3D Polyhedral Core
          </span>
        </div>
        <span
          className={`text-[11px] font-medium transition-colors ${
            isInteracting ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {isInteracting ? "Rotating..." : "Drag to inspect"}
        </span>
      </div>

      <div
        ref={mountRef}
        className="w-full h-36 sm:h-40 flex items-center justify-center cursor-grab active:cursor-grabbing"
        title="Interactive 3D Core - Drag to rotate"
      />

      <div className="text-[11px] text-muted-foreground text-center mt-1">
        Faceted mathematical geometry modeled in Three.js
      </div>
    </div>
  );
}
