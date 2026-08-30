import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { SECTION_RANGES } from '../constants/scene'

interface ScrollCameraProps {
  progress: number
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export default function ScrollCamera({ progress }: ScrollCameraProps) {
  const { camera } = useThree()
  const currentSection = useRef(0)

  useFrame(() => {
    const targetZ = (() => {
      for (let i = 0; i < SECTION_RANGES.length; i++) {
        const s = SECTION_RANGES[i]
        if (progress >= s.start && progress < s.end) {
          const rangeSize = s.end - s.start
          const within = (progress - s.start) / rangeSize
          currentSection.current = i
          if (i < SECTION_RANGES.length - 1) {
            const next = SECTION_RANGES[i + 1]
            return lerp(s.z, next.z, within)
          }
          return s.z
        }
      }
      return SECTION_RANGES[SECTION_RANGES.length - 1].z
    })()

    camera.position.z = lerp(camera.position.z, targetZ, 0.035)
    camera.position.x = lerp(camera.position.x, 0, 0.02)
    camera.position.y = lerp(camera.position.y, 0, 0.02)
    camera.lookAt(0, 0, -20)
  })

  return null
}
