import { useEffect, useRef } from "react";
import * as THREE from "three";

interface NodePoint {
    pos: THREE.Vector3;
    vel: THREE.Vector3;
    baseColor: THREE.Color;
    currentColor: THREE.Color;
    baseSize: number;
    currentSize: number;
    pulsePhase: number;
    pulseSpeed: number;
}

export function Hero3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // Detect mobile
        const isMobile = window.innerWidth < 768;
        const nodeCount = isMobile ? 35 : 110;
        const maxConnectDistance = isMobile ? 2.5 : 3.0;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.z = isMobile ? 9.5 : 8.5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if (containerRef.current) {
            containerRef.current.innerHTML = "";
            containerRef.current.appendChild(renderer.domElement);
        }

        // Node systems
        const nodes: NodePoint[] = [];
        const positions = new Float32Array(nodeCount * 3);
        const colors = new Float32Array(nodeCount * 3);
        const sizes = new Float32Array(nodeCount);

        const colorPalette = [
            new THREE.Color("#6366f1"), // Indigo
            new THREE.Color("#4f46e5"), // Deep Indigo
            new THREE.Color("#06b6d4"), // Cyan
            new THREE.Color("#3b82f6"), // Blue
        ];

        // Initialize nodes scattered inside a bounding box
        const sphereRadius = 3.8;
        for (let i = 0; i < nodeCount; i++) {
            // Uniform distribution on sphere shell/interior
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = sphereRadius * Math.pow(Math.random(), 0.5); // Density towards center

            const vec = new THREE.Vector3(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)].clone();
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.006,
                (Math.random() - 0.5) * 0.006,
                (Math.random() - 0.5) * 0.006
            );

            nodes.push({
                pos: vec,
                vel: velocity,
                baseColor: color,
                currentColor: color.clone(),
                baseSize: 0.08 + Math.random() * 0.1,
                currentSize: 0.08,
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 1 + Math.random() * 2,
            });

            positions[i * 3] = vec.x;
            positions[i * 3 + 1] = vec.y;
            positions[i * 3 + 2] = vec.z;

            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = nodes[i].baseSize;
        }

        // Geometry of particles
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        // Shader or round particle point material
        // Creating standard circular points by drawing a simple particle texture
        const createCircleTexture = () => {
            const size = 64;
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                // Gradient fill
                const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
                grad.addColorStop(0, "rgba(255,255,255,1)");
                grad.addColorStop(0.2, "rgba(255,255,255,0.85)");
                grad.addColorStop(0.5, "rgba(255,255,255,0.2)");
                grad.addColorStop(1, "rgba(255,255,255,0)");
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, size, size);
            }
            return new THREE.CanvasTexture(canvas);
        };

        const particleMat = new THREE.PointsMaterial({
            size: 0.35,
            map: createCircleTexture(),
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particleSystem = new THREE.Points(particleGeo, particleMat);
        particleSystem.position.x = 0;
        scene.add(particleSystem);

        // Line network geometry (drawing dynamic connections)
        // We construct a dynamic line segment system
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        // Max potential connections: nodeCount * (nodeCount - 1) / 2
        // We prepare a BufferGeometry containing line rendering
        const maxLineSegments = nodeCount * 12; // cap connections
        const linePositions = new Float32Array(maxLineSegments * 2 * 3);
        const lineColors = new Float32Array(maxLineSegments * 2 * 3);

        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
        lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

        const lineSystem = new THREE.LineSegments(lineGeo, lineMat);
        lineSystem.position.x = 0;
        scene.add(lineSystem);

        // Mouse and Raycasting system
        let mouse = new THREE.Vector2(-999, -999);
        let rawMouse = new THREE.Vector2(0, 0);
        let targetRotation = new THREE.Vector2(0, 0);
        const currentRotation = new THREE.Vector2(0, 0);
        const raycaster = new THREE.Raycaster();

        const handleMouseMove = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Normalized coordinates
            mouse.x = (x / rect.width) * 2 - 1;
            mouse.y = -(y / rect.height) * 2 + 1;

            rawMouse.x = mouse.x;
            rawMouse.y = mouse.y;

            // Rotation target
            targetRotation.x = mouse.x * 0.4;
            targetRotation.y = mouse.y * 0.4;
        };

        const handleMouseLeave = () => {
            mouse.set(-999, -999);
            targetRotation.set(0, 0);
        };

        // Ripple click dynamics
        interface ClickWave {
            origin: THREE.Vector3;
            radius: number;
            speed: number;
            maxRadius: number;
            strength: number;
        }

        const clickWaves: ClickWave[] = [];

        const handleMouseClick = (event: MouseEvent) => {
            // Find mouse 3D position by raycasting against a dummy grid plane
            raycaster.setFromCamera(mouse, camera);
            const tempPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            const intersectionPoint = new THREE.Vector3();
            raycaster.ray.intersectPlane(tempPlane, intersectionPoint);

            if (intersectionPoint) {
                // Trigger a new wave
                clickWaves.push({
                    origin: intersectionPoint.clone(),
                    radius: 0.1,
                    speed: 0.18,
                    maxRadius: 7.0,
                    strength: 1.5,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("click", handleMouseClick);

        // Animation frames loop
        let animationFrameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();

            // Slow global rotation plus drag rotation lag
            currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
            currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

            particleSystem.rotation.y = time * 0.06 + currentRotation.x;
            particleSystem.rotation.x = time * 0.02 + currentRotation.y;
            lineSystem.rotation.y = particleSystem.rotation.y;
            lineSystem.rotation.x = particleSystem.rotation.x;

            // Raycaster calculation
            raycaster.setFromCamera(mouse, camera);

            // Node operations
            const posAttr = particleGeo.getAttribute("position") as THREE.BufferAttribute;
            const colAttr = particleGeo.getAttribute("color") as THREE.BufferAttribute;

            // We will perform operations relative to global rotation space
            // For accurate intersection, we raycast against intersections
            // But we can approximate it or project nodes directly

            // Update wave ripples
            for (let w = clickWaves.length - 1; w >= 0; w--) {
                const wave = clickWaves[w];
                wave.radius += wave.speed;
                if (wave.radius > wave.maxRadius) {
                    clickWaves.splice(w, 1);
                }
            }

            // Update Node Positions and pulse phases
            for (let i = 0; i < nodeCount; i++) {
                const node = nodes[i];

                // Apply velocity & boundaries bounce
                node.pos.add(node.vel);

                // Keep inside sphere limits
                const distance = node.pos.length();
                if (distance > sphereRadius) {
                    node.pos.normalize().multiplyScalar(sphereRadius);
                    node.vel.reflect(node.pos.clone().normalize()).multiplyScalar(0.9);
                }

                // Apply pulse wave animation
                node.pulsePhase += delta * node.pulseSpeed;
                const sizePulse = Math.sin(node.pulsePhase) * 0.02;

                // Visual hover interactions
                // Find raycast close proximity to nodes
                // Since nodes are in local space, we transform ray details to local space
                const localRay = new THREE.Ray();
                localRay.copy(raycaster.ray).applyMatrix4(particleSystem.matrixWorld.clone().invert());

                const distToRay = localRay.distanceSqToPoint(node.pos);
                let hoverGlow = 0;

                if (distToRay < 0.28) {
                    // Attract slightly towards cursor
                    const targetAttract = localRay.closestPointToPoint(node.pos, new THREE.Vector3());
                    const pull = targetAttract.sub(node.pos).normalize().multiplyScalar(0.007 * (1.0 - distToRay / 0.28));
                    node.pos.add(pull);

                    hoverGlow = (1.0 - distToRay / 0.28) * 1.5;
                }

                // Apply ripple effects
                let rippleEffect = 0;
                for (const wave of clickWaves) {
                    // Approximate with distance in local space
                    const distToWaveCenter = node.pos.distanceTo(wave.origin);
                    const distanceRange = Math.abs(distToWaveCenter - wave.radius);
                    if (distanceRange < 0.8) {
                        // Impact factor
                        const factor = 1.0 - distanceRange / 0.8;
                        rippleEffect += factor * wave.strength;

                        // Push node away from wave center
                        const pushDir = node.pos.clone().sub(wave.origin).normalize();
                        node.pos.add(pushDir.multiplyScalar(factor * 0.05));
                    }
                }

                // Calculate sizes & colors
                node.currentSize = node.baseSize + sizePulse + hoverGlow * 0.12 + rippleEffect * 0.15;

                // Dynamic colors: brighten on hover or ripple
                node.currentColor.copy(node.baseColor);
                if (hoverGlow > 0) {
                    node.currentColor.lerp(new THREE.Color("#22d3ee"), Math.min(hoverGlow, 1.0)); // Lerp clean cyan
                }
                if (rippleEffect > 0) {
                    node.currentColor.lerp(new THREE.Color("#a855f7"), Math.min(rippleEffect, 1.0)); // Purple shockwave
                }

                // Write position color attributes
                posAttr.setXYZ(i, node.pos.x, node.pos.y, node.pos.z);
                colAttr.setXYZ(i, node.currentColor.r, node.currentColor.g, node.currentColor.b);
            }

            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;

            // Draw connection lines between close nodes
            const linePosAttr = lineGeo.getAttribute("position") as THREE.BufferAttribute;
            const lineColAttr = lineGeo.getAttribute("color") as THREE.BufferAttribute;

            let lineCount = 0;
            for (let i = 0; i < nodeCount; i++) {
                if (lineCount >= maxLineSegments) break;
                const nodeA = nodes[i];

                for (let j = i + 1; j < nodeCount; j++) {
                    if (lineCount >= maxLineSegments) break;
                    const nodeB = nodes[j];

                    const d = nodeA.pos.distanceTo(nodeB.pos);
                    if (d < maxConnectDistance) {
                        const index = lineCount * 2;

                        // Set positions
                        linePosAttr.setXYZ(index, nodeA.pos.x, nodeA.pos.y, nodeA.pos.z);
                        linePosAttr.setXYZ(index + 1, nodeB.pos.x, nodeB.pos.y, nodeB.pos.z);

                        // Compute opacity based on connectivity distance
                        const alpha = (1.0 - d / maxConnectDistance) * 0.4;

                        // Draw line gradient representation
                        const blendColor = nodeA.currentColor.clone().lerp(nodeB.currentColor, 0.5);
                        lineColAttr.setXYZ(index, blendColor.r * alpha, blendColor.g * alpha, blendColor.b * alpha);
                        lineColAttr.setXYZ(index + 1, blendColor.r * alpha, blendColor.g * alpha, blendColor.b * alpha);

                        lineCount++;
                    }
                }
            }

            // Fill remaining line entries with 0 to prevent render artifact loops
            const remainingLinesIndex = lineCount * 2;
            for (let k = remainingLinesIndex; k < maxLineSegments * 2; k++) {
                linePosAttr.setXYZ(k, 0, 0, 0);
                lineColAttr.setXYZ(k, 0, 0, 0);
            }

            linePosAttr.needsUpdate = true;
            lineColAttr.needsUpdate = true;

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("click", handleMouseClick);
            cancelAnimationFrame(animationFrameId);

            if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }

            particleGeo.dispose();
            particleMat.dispose();
            lineGeo.dispose();
            lineMat.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center cursor-crosshair"
        />
    );
}
