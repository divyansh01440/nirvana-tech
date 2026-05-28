"use client";

// =============================================================================
// ✨ NIRVANA TECH — Particle Field
// =============================================================================
// 3D constellation of floating gold + blue particles connected by faint lines.
// Reacts to mouse movement with parallax. Performance-aware on weak devices.
//
// Usage:
//   <ParticleField />
// =============================================================================

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// =============================================================================
// 🔧 CONFIG
// =============================================================================
const DEFAULT_PARTICLE_COUNT = 3000;
const MOBILE_PARTICLE_COUNT = 1000;
const FIELD_SIZE = 30;            // Spread of particles in 3D space
const CONNECTION_DISTANCE = 2.5;  // Max distance between connected particles
const MAX_CONNECTIONS = 800;      // Cap connections to keep perf high
const MOUSE_PARALLAX_STRENGTH = 2;

// Brand colors as THREE.Color
const COLOR_GOLD = new THREE.Color("#D4AF37");
const COLOR_BLUE = new THREE.Color("#3B82F6");

// =============================================================================
// 🌌 PARTICLES MESH (inner)
// =============================================================================
interface ParticlesProps {
  count: number;
}

function Particles({ count }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // ---------------------------------------------------------------------------
  // 🎨 CREATE PARTICLE GEOMETRY (positions, colors, original positions)
  // ---------------------------------------------------------------------------
  const { positions, colors, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute particles in a sphere with bias toward center
      const radius = Math.cbrt(Math.random()) * FIELD_SIZE;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Random color: 70% gold, 30% blue
      const useGold = Math.random() > 0.3;
      const color = useGold ? COLOR_GOLD : COLOR_BLUE;
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors, originalPositions };
  }, [count]);

  // ---------------------------------------------------------------------------
  // 🔗 LINE GEOMETRY (pre-allocate buffers for performance)
  // ---------------------------------------------------------------------------
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    // Each line = 2 vertices × 3 coords = 6 floats
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );
    geometry.setDrawRange(0, 0); // Start with 0 lines visible
    return geometry;
  }, []);

  // ---------------------------------------------------------------------------
  // 🖱️ MOUSE TRACKING — for parallax
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ---------------------------------------------------------------------------
  // 🎬 ANIMATION LOOP — runs every frame
  // ---------------------------------------------------------------------------
  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const points = pointsRef.current;
    const positionAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;

    // ---- FLOATING MOTION (sin/cos waves) + MOUSE PARALLAX ----
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Gentle wave motion (each particle has slightly different phase)
      const waveX = Math.sin(time * 0.3 + i * 0.01) * 0.3;
      const waveY = Math.cos(time * 0.2 + i * 0.015) * 0.3;
      const waveZ = Math.sin(time * 0.25 + i * 0.02) * 0.2;

      // Mouse parallax (subtle shift based on cursor)
      const parallaxX = mouseRef.current.x * MOUSE_PARALLAX_STRENGTH;
      const parallaxY = mouseRef.current.y * MOUSE_PARALLAX_STRENGTH;

      posArray[i3] = ox + waveX + parallaxX;
      posArray[i3 + 1] = oy + waveY + parallaxY;
      posArray[i3 + 2] = oz + waveZ;
    }
    positionAttr.needsUpdate = true;

    // ---- CONNECT NEARBY PARTICLES WITH LINES (every 2 frames for perf) ----
    if (Math.floor(state.clock.elapsedTime * 60) % 2 === 0) {
      const lines = linesRef.current;
      const linePosAttr = lines.geometry.attributes.position as THREE.BufferAttribute;
      const lineColorAttr = lines.geometry.attributes.color as THREE.BufferAttribute;
      const linePosArr = linePosAttr.array as Float32Array;
      const lineColorArr = lineColorAttr.array as Float32Array;

      let connectionIndex = 0;

      for (let i = 0; i < count && connectionIndex < MAX_CONNECTIONS; i++) {
        const i3 = i * 3;
        const x1 = posArray[i3];
        const y1 = posArray[i3 + 1];
        const z1 = posArray[i3 + 2];

        // Only check ~10 random neighbors to save CPU (still looks great)
        for (let k = 0; k < 10 && connectionIndex < MAX_CONNECTIONS; k++) {
          const j = (i + 1 + k * 5) % count;
          if (j === i) continue;
          const j3 = j * 3;
          const x2 = posArray[j3];
          const y2 = posArray[j3 + 1];
          const z2 = posArray[j3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(distSq);
            const alpha = 1 - dist / CONNECTION_DISTANCE; // Fade with distance

            const ci6 = connectionIndex * 6;
            linePosArr[ci6] = x1;
            linePosArr[ci6 + 1] = y1;
            linePosArr[ci6 + 2] = z1;
            linePosArr[ci6 + 3] = x2;
            linePosArr[ci6 + 4] = y2;
            linePosArr[ci6 + 5] = z2;

            // Blend gold color, scaled by alpha (fade)
            const r = COLOR_GOLD.r * alpha;
            const g = COLOR_GOLD.g * alpha;
            const b = COLOR_GOLD.b * alpha;
            lineColorArr[ci6] = r;
            lineColorArr[ci6 + 1] = g;
            lineColorArr[ci6 + 2] = b;
            lineColorArr[ci6 + 3] = r;
            lineColorArr[ci6 + 4] = g;
            lineColorArr[ci6 + 5] = b;

            connectionIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, connectionIndex * 2);
      linePosAttr.needsUpdate = true;
      lineColorAttr.needsUpdate = true;
    }

    // ---- CAMERA SLOW ROTATION ----
    state.camera.position.x = Math.sin(time * 0.05) * 2;
    state.camera.position.y = Math.cos(time * 0.04) * 1;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* ----- PARTICLES ----- */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
            count={colors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* ----- CONSTELLATION LINES ----- */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

// =============================================================================
// 📦 PUBLIC COMPONENT — wraps Particles in Canvas with perf detection
// =============================================================================
export default function ParticleField() {
  const [isMobile, setIsMobile] = useState(false);
  const [particleCount, setParticleCount] = useState(DEFAULT_PARTICLE_COUNT);

  useEffect(() => {
    // Detect mobile / weak devices
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const isMobileDevice = mediaQuery.matches;
    setIsMobile(isMobileDevice);
    setParticleCount(isMobileDevice ? MOBILE_PARTICLE_COUNT : DEFAULT_PARTICLE_COUNT);

    // Further reduce if hardware is weak (low CPU cores)
    if (typeof navigator !== "undefined" && navigator.hardwareConcurrency) {
      if (navigator.hardwareConcurrency <= 4) {
        setParticleCount((prev) => Math.floor(prev * 0.6));
      }
    }

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Particles count={particleCount} />
        </Suspense>
      </Canvas>
    </div>
  );
}