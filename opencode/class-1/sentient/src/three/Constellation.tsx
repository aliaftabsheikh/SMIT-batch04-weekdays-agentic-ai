import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ConstellationProps {
  position: [number, number, number]
  count?: number
  color?: string
  label?: string
  hovered?: boolean
}

export default function Constellation({
  position,
  count = 30,
  color = '#6366f1',
  hovered = false,
}: ConstellationProps) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const c = new THREE.Color(color)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = 0.8 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = r * Math.cos(phi)
      pos[i3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      const c2 = c.clone().lerp(new THREE.Color('#06b6d4'), Math.random() * 0.4)
      col[i3] = c2.r
      col[i3 + 1] = c2.g
      col[i3 + 2] = c2.b
    }
    return { positions: pos, colors: col }
  }, [count, color])

  useFrame((state) => {
    if (!meshRef.current) return
    const scale = hovered ? 1.4 : 1
    meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05)
  })

  return (
    <points ref={meshRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.9}
        blending={2}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
