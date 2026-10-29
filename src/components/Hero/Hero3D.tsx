import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check if touch device
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Graceful WebGL availability check
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      // Fallback: WebGL not available
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.2;

    // Theme color palette definitions
    const getThemeColors = (isDark: boolean) => {
      if (isDark) {
        return {
          core: 0x202823,
          wirePrimary: 0xa7c8ad,    // Sage
          wireSecondary: 0x8ccbc0,  // Soft Teal
          accentHighlight: 0xe9a18d,// Restrained Coral
          nodeColor: 0xa7c8ad,
          lightAmbient: 0x39443c,
          lightDir: 0xa7c8ad,
        };
      } else {
        return {
          core: 0xf1f3eb,
          wirePrimary: 0x8db7a1,    // Pastel Sage
          wireSecondary: 0xcdebdd,  // Mint
          accentHighlight: 0xe98c75,// Coral
          nodeColor: 0x38604c,
          lightAmbient: 0xfaf8f2,
          lightDir: 0x8db7a1,
        };
      }
    };

    let isDark =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");
    let themeColors = getThemeColors(isDark);

    // Group to hold all 3D sculptural elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central faceted core sphere (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: themeColors.core,
      roughness: 0.25,
      metalness: 0.1,
      transmission: 0.4,
      transparent: true,
      opacity: isDark ? 0.75 : 0.6,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Outer Wireframe Armature (Subtle geodesic lines)
    const wireGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: themeColors.wirePrimary,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.4,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // 3. Orbital Elliptical Rings
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.018, 16, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: themeColors.wirePrimary,
      transparent: true,
      opacity: isDark ? 0.6 : 0.5,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI * 0.35;
    ring1.rotation.y = Math.PI * 0.15;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.35, 0.015, 16, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: themeColors.wireSecondary,
      transparent: true,
      opacity: isDark ? 0.45 : 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI * 0.25;
    ring2.rotation.z = Math.PI * 0.3;
    mainGroup.add(ring2);

    // 4. Subtle Orbital Satellite Nodes
    const nodeCount = 14;
    const nodeGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: themeColors.accentHighlight,
      transparent: true,
      opacity: 0.85,
    });
    const nodes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.1 + (i % 3) * 0.2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 1.5) * 0.5,
        Math.sin(angle) * radius,
      );
      mainGroup.add(node);
      nodes.push(node);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(themeColors.lightAmbient, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(themeColors.lightDir, 1.8);
    dirLight.position.set(4, 5, 4);
    scene.add(dirLight);

    // Dynamic Theme Listener
    const observer = new MutationObserver(() => {
      const newDark = document.documentElement.classList.contains("dark");
      if (newDark !== isDark) {
        isDark = newDark;
        themeColors = getThemeColors(isDark);

        coreMat.color.setHex(themeColors.core);
        coreMat.opacity = isDark ? 0.75 : 0.6;
        wireMat.color.setHex(themeColors.wirePrimary);
        wireMat.opacity = isDark ? 0.45 : 0.4;
        ringMat1.color.setHex(themeColors.wirePrimary);
        ringMat2.color.setHex(themeColors.wireSecondary);
        nodeMat.color.setHex(themeColors.accentHighlight);
        ambientLight.color.setHex(themeColors.lightAmbient);
        dirLight.color.setHex(themeColors.lightDir);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Pointer Interaction (Smoothed parallax)
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (isTouch) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.5;
      targetRotationX = y * 0.5;
    };

    const handlePointerLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
    };

    if (!isTouch) {
      window.addEventListener("mousemove", handlePointerMove);
      window.addEventListener("mouseleave", handlePointerLeave);
    }

    // Responsive resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    let time = 0;

    const animate = () => {
      time += 0.015;

      if (!reducedMotion) {
        // Smooth gentle rotation
        coreMesh.rotation.y += 0.003;
        coreMesh.rotation.x += 0.0015;

        wireMesh.rotation.y -= 0.002;
        wireMesh.rotation.z += 0.001;

        ring1.rotation.z += 0.004;
        ring2.rotation.z -= 0.003;

        // Micro-pulsing of node satellites
        for (let i = 0; i < nodes.length; i++) {
          const s = 1 + Math.sin(time * 2 + i) * 0.2;
          nodes[i].scale.set(s, s, s);
        }

        // Soft floating respiration
        mainGroup.position.y = Math.sin(time * 0.8) * 0.08;

        // Smooth mouse parallax lerp
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        mainGroup.rotation.x = currentRotationX;
        mainGroup.rotation.y = currentRotationY;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      if (!isTouch) {
        window.removeEventListener("mousemove", handlePointerMove);
        window.removeEventListener("mouseleave", handlePointerLeave);
      }
      window.removeEventListener("resize", handleResize);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative select-none flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    />
  );
}
