"use client";

// =============================================================================
// 🌟 NIRVANA TECH — Hero 3D Scene
// =============================================================================
// Centerpiece 3D scene: distorted icosahedron orbited by floating shapes.
// Uses bloom postprocessing for that luminous premium feel.
//
// Performance-aware: PerformanceMonitor auto-reduces DPR if FPS drops.
// =============================================================================

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  PerformanceMonitor,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// =============================================================================
// 🔧 CONFIG
// =============================================================================
const COLOR_GOLD = "#D4AF37";
const COLOR_GOLD_LIGHT = "#E8C766";
const COLOR_BLUE = "#3B82F6";

// =============================================================================
// 🔮 CENTRAL DISTORTED ICOSAHEDRON
// =============================================================================
function CenterIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Slow rotation on multiple axes
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <mesh ref={meshRef} scale={1.5}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color={COLOR_GOLD}
        emissive={COLOR_GOLD}
        emissiveIntensity={0.4}
        roughness={0.2}
        metalness={0.9}
        distort={0.4}
        speed={2}
      />
    </mesh>
  );
}

// =============================================================================
// 🟦 FLOATING SHAPES ORBITING THE CENTER
// =============================================================================
interface FloatingShapeProps {
  position: [number, number, number];
  type: "sphere" | "torus" | "cube" | "octahedron";
  color: string;
  scale: number;
  rotSpeed: [number, number, number];
}

function FloatingShape({ position, type, color, scale, rotSpeed }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * rotSpeed[0];
    meshRef.current.rotation.y = t * rotSpeed[1];
    meshRef.current.rotation.z = t * rotSpeed[2];
  });

  const geometry = useMemo(() => {
    switch (type) {
      case "sphere":
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case "torus":
        return <torusGeometry args={[0.5, 0.15, 16, 32]} />;
      case "cube":
        return <boxGeometry args={[0.7, 0.7, 0.7]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.6, 0]} />;
    }
  }, [type]);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={1.5}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// =============================================================================
// 🖱️ MOUSE PARALLAX CAMERA
// =============================================================================
function CameraRig() {
  useFrame((state) => {
    // Gentle camera follow based on mouse position (-1 to 1)
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.mouse.x * 0.5,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.mouse.y * 0.3,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

// =============================================================================
// 🎬 SCENE CONTENT
// =============================================================================
function Scene() {
  // Generate 8 floating shapes positioned in sphere distribution
  const floatingShapes = useMemo<FloatingShapeProps[]>(() => {
    const shapes: FloatingShapeProps[] = [];
    const types: FloatingShapeProps["type"][] = [
      "sphere",
      "torus",
      "cube",
      "octahedron",
      "sphere",
      "torus",
      "cube",
      "octahedron",
    ];

    for (let i = 0; i < 8; i++) {
      // Distribute around a sphere of radius ~3.5
      const phi = Math.acos(-1 + (2 * i) / 8);
      const theta = Math.sqrt(8 * Math.PI) * phi;
      const radius = 3.5;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      shapes.push({
        position: [x, y, z],
        type: types[i],
        color: i % 2 === 0 ? COLOR_GOLD_LIGHT : COLOR_BLUE,
        scale: 0.4 + Math.random() * 0.3,
        rotSpeed: [
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.3,
        ],
      });
    }
    return shapes;
  }, []);

  return (
    <>
      {/* ===== LIGHTING ===== */}
      <ambientLight intensity={0.3} />

      {/* Gold key light */}
      <pointLight position={[10, 10, 10]} intensity={2} color={COLOR_GOLD} />

      {/* Blue rim light */}
      <pointLight position={[-10, -5, -10]} intensity={1.5} color={COLOR_BLUE} />

      {/* Top fill */}
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#ffffff" />

      {/* ===== CENTRAL DISTORTED ICOSAHEDRON ===== */}
      <CenterIcosahedron />

      {/* ===== FLOATING ORBITING SHAPES ===== */}
      {floatingShapes.map((shape, i) => (
        <FloatingShape key={i} {...shape} />
      ))}

      {/* ===== ENVIRONMENT MAP ===== */}
      <Environment preset="city" />

      {/* ===== MOUSE PARALLAX ===== */}
      <CameraRig />
    </>
  );
}

// =============================================================================
// 📦 PUBLIC COMPONENT — wraps Scene in Canvas with perf monitoring
// =============================================================================
export default function HeroScene() {
  const [dpr, setDpr] = useState<number>(1.5);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Performance monitor — reduces DPR if FPS drops below 45 */}
          <PerformanceMonitor
            onDecline={() => setDpr(1)}
            onIncline={() => setDpr(1.5)}
          />

          <Scene />

          {/* ===== POSTPROCESSING ===== */}
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={1.2}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}