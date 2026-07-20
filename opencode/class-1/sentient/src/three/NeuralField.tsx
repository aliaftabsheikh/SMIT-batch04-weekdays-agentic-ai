import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, Color, BufferGeometry, PointsMaterial } from 'three'
import { COLORS, PARTICLE_COUNT } from '../constants/scene'

interface NeuralFieldProps {
  mouse: { x: number; y: number }
  scrollProgress: number
}

export default function NeuralField({ mouse, scrollProgress }: NeuralFieldProps) {
  const meshRef = useRef<any>(null)

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    const siz = new Float32Array(PARTICLE_COUNT)
    const c1 = new Color(COLORS.accent1)
    const c2 = new Color(COLORS.accent2)
    const c3 = new Color(COLORS.accent3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const radius = 15 + Math.random() * 35
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.cos(phi) * (Math.random() > 0.5 ? 1 : -1)
      pos[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 20

      const mix = Math.random()
      const c = c1.clone().lerp(c2, mix).lerp(c3, Math.random() * 0.3)
      col[i3] = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b
      siz[i] = 0.04 + Math.random() * 0.08
    }
    return { positions: pos, colors: col, sizes: siz }
  }, [])

  const velocities = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 0.005,
      y: (Math.random() - 0.5) * 0.005,
      z: (Math.random() - 0.5) * 0.005,
    }))
  }, [])

  const basePositions = useMemo(() => {
    const arr = new Float32Array(positions)
    return arr
  }, [positions])

  useFrame((state) => {
    if (!meshRef.current) return
    const geo = meshRef.current.geometry as BufferGeometry
    const pos = geo.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    const mouseInfluence = 2 + scrollProgress * 3
    const waveAmp = 0.3 + scrollProgress * 0.5

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const baseX = basePositions[i3]
      const baseY = basePositions[i3 + 1]
      const baseZ = basePositions[i3 + 2]

      const wave = Math.sin(time * 0.3 + baseZ * 0.1 + baseX * 0.05) * waveAmp
      const wave2 = Math.cos(time * 0.2 + baseY * 0.08) * waveAmp * 0.5

      const dx = mouse.x * 10 - baseX
      const dy = -mouse.y * 10 - baseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const gravity = Math.max(0, 1 - dist / 20) * mouseInfluence * 0.3

      pos[i3] = baseX + wave + dx * gravity * 0.01
      pos[i3 + 1] = baseY + wave2 + dy * gravity * 0.01
      pos[i3 + 2] = baseZ + Math.sin(time * 0.15 + i * 0.01) * 0.5

      velocities[i].x += (Math.random() - 0.5) * 0.001
      velocities[i].y += (Math.random() - 0.5) * 0.001
      pos[i3] += velocities[i].x * 0.5
      pos[i3 + 1] += velocities[i].y * 0.5
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
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
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        blending={2}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
