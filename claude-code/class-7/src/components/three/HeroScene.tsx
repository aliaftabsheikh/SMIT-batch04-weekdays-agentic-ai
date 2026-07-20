"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { DistortedSphere } from "./DistortedSphere";

/**
 * Full WebGL scene for the hero. Rendered only on the client (see
 * HeroCanvas) so it never touches SSR. Bloom gives the neon glow.
 */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={120} color="#22d3ee" />
      <pointLight position={[-6, -4, 2]} intensity={90} color="#e935c1" />
      <pointLight position={[0, 4, -6]} intensity={60} color="#8b5cf6" />

      <Suspense fallback={null}>
        <DistortedSphere />

        {/* Orbiting accent shards */}
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[2.8, 1.6, -1]} scale={0.28}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>
        <Float speed={1.6} rotationIntensity={2.4} floatIntensity={2.4}>
          <mesh position={[-2.9, -1.4, -0.5]} scale={0.22}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#e935c1"
              emissive="#e935c1"
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </Float>

        <Stars radius={60} depth={40} count={2200} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
