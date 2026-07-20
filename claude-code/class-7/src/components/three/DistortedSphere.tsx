"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

/**
 * The hero centrepiece: a high-detail icosahedron with a morphing, neon
 * distortion material. Slowly rotates every frame and gently floats.
 */
export function DistortedSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.15;
    meshRef.current.rotation.x += delta * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      {/* Core distorted orb */}
      <mesh ref={meshRef} scale={2.1}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.9}
          distort={0.45}
          speed={1.8}
        />
      </mesh>

      {/* Faint wireframe shell for depth */}
      <mesh scale={2.55}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}
