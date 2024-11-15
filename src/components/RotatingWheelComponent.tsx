import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

interface RotatingWheelProps {
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export default function RotatingWheelComponent({ activeIndex, setActiveIndex }: RotatingWheelProps) {
  const wheelRef = useRef<Mesh>(null)

  useFrame(() => {
    if (wheelRef.current) {
      wheelRef.current.rotation.z = activeIndex * (Math.PI * 2 / 3)
    }
  })

  return (
    <mesh ref={wheelRef}>
      <torusGeometry args={[2, 0.2, 16, 100]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
} 