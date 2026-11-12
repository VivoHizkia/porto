import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PALETTE = ['#22d3ee', '#60a5fa', '#ffffff', '#ffffff']
const COUNT = 1400

function Particles({ animated }: { animated: boolean }) {
  const points = useRef<THREE.Points>(null)
  const pointer = useRef({ x: 0, y: 0 })

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const color = new THREE.Color()
    /* A fixed seed keeps the field identical between renders. */
    let seed = 7
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let index = 0; index < COUNT; index++) {
      positions[index * 3] = (random() - 0.5) * 30
      positions[index * 3 + 1] = 8 - random() * 46
      positions[index * 3 + 2] = -5 - random() * 12
      color.set(PALETTE[Math.floor(random() * PALETTE.length)])
      colors.set([color.r, color.g, color.b], index * 3)
    }
    const built = new THREE.BufferGeometry()
    built.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    built.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return built
  }, [])

  /* A soft round dot, so particles are not drawn as squares. */
  const dot = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 32
    const context = canvas.getContext('2d')!
    const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.6)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    context.fillStyle = gradient
    context.fillRect(0, 0, 32, 32)
    return new THREE.CanvasTexture(canvas)
  }, [])

  useEffect(() => {
    if (!animated) return
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [animated])

  useFrame(({ camera, clock }) => {
    if (!animated || !points.current) return
    const targetY = -window.scrollY * 0.0045
    camera.position.y += (targetY - camera.position.y) * 0.08
    camera.position.x += (pointer.current.x * 0.6 - camera.position.x) * 0.04
    points.current.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.12
    points.current.position.y = Math.sin(clock.elapsedTime * 0.2) * 0.25
  })

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.11}
        map={dot}
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

export default function Backdrop({ animated }: { animated: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      frameloop={animated ? 'always' : 'demand'}
      gl={{ antialias: false, alpha: true }}
      aria-hidden="true"
    >
      <Particles animated={animated} />
    </Canvas>
  )
}
