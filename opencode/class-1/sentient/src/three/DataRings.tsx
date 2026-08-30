import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DataRingsProps {
  visible: boolean
}

export default function DataRings({ visible }: DataRingsProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rings = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      index: i,
      delay: i * 0.3,
      speed: 0.2 + Math.random() * 0.3,
    }))
  )

  const ringGeo = useMemo(() => new THREE.RingGeometry(0.1, 0.15, 48), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    groupRef.current.children.forEach((child, i) => {
      const r = rings.current[i]
      if (!r) return
      const phase = ((t - r.delay) * r.speed) % 1
      const scale = phase * 30
      const opacity = Math.max(0, 1 - phase * 1.5)

      child.scale.setScalar(scale > 0.1 ? scale : 0.1)
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshBasicMaterial
        mat.opacity = visible ? opacity * 0.3 : 0
      }
    })
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={[0, 0, -44]}>
      {rings.current.map((r) => (
        <mesh key={r.index} geometry={ringGeo} rotation={[-Math.PI / 2, 0, r.index * 0.8]}>
          <meshBasicMaterial
            color="#6366f1"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
