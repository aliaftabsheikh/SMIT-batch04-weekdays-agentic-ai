import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, IcosahedronGeometry, MeshStandardMaterial } from 'three'

interface CentralCoreProps {
  scrollProgress: number
}

export default function CentralCore({ scrollProgress }: CentralCoreProps) {
  const meshRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)

  const geo = useMemo(() => new IcosahedronGeometry(1.8, 1), [])

  const particles = useRef(
    Array.from({ length: 60 }, () => ({
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(2 * Math.random() - 1),
      radius: 2.2 + Math.random() * 0.8,
      speed: 0.5 + Math.random() * 1.5,
      offset: Math.random() * 100,
    }))
  )

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const scale = 1 + scrollProgress * 0.2
    meshRef.current.scale.setScalar(scale)
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
    meshRef.current.rotation.y = t * 0.3

    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * 1.2)
      glowRef.current.rotation.x = -Math.sin(t * 0.15) * 0.05
      glowRef.current.rotation.y = t * 0.2
    }
  })

  return (
    <group position={[0, 0, -6]}>
      <mesh ref={meshRef} geometry={geo}>
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.6 + scrollProgress * 0.4}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={glowRef} scale={1.2}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  )
}
