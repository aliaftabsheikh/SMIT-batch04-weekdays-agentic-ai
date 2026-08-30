import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import NeuralField from './NeuralField'
import CentralCore from './CentralCore'
import Constellation from './Constellation'
import DataRings from './DataRings'
import ScrollCamera from './ScrollCamera'

interface Scene3DProps {
  scrollProgress: number
}

export default function Scene3D({ scrollProgress }: Scene3DProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null)

  const handleMouse = useCallback((e: any) => {
    setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    })
  }, [])

  const constellationPositions: [number, number, number][] = [
    [-5, 2, -10],
    [5, -1.5, -10],
    [-4, -2.5, -10],
    [6, 2, -10],
    [-5.5, 0.5, -10],
    [4.5, -0.5, -10],
  ]

  const isFeatures = scrollProgress >= 0.15 && scrollProgress < 0.35
  const isCta = scrollProgress >= 0.82

  return (
    <div
      className="fixed inset-0 z-0"
      onMouseMove={handleMouse}
      style={{ touchAction: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60, near: 0.1, far: 120 }}
        dpr={[0.5, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#6366f1" />
        <pointLight position={[-5, -3, -10]} intensity={0.5} color="#06b6d4" />

        <NeuralField mouse={mouse} scrollProgress={scrollProgress} />
        <CentralCore scrollProgress={scrollProgress} />

        {isFeatures &&
          constellationPositions.map((pos, i) => (
            <Constellation
              key={i}
              position={pos}
              count={25 + i * 5}
              color={i % 2 === 0 ? '#6366f1' : '#06b6d4'}
              hovered={hoveredCluster === i}
            />
          ))}

        <DataRings visible={isCta} />
        <ScrollCamera progress={scrollProgress} />
      </Canvas>
    </div>
  )
}
