import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COLORS = {
  interface: '#9db0ff',
  server: '#ffb84d',
  data: '#6be3b8',
  packet: '#ece9df',
}

const LAYER_GAP = 1.55
const INTRO_SECONDS = 1.6
const INTRO_SPREAD = 2.4

type Vec3 = [number, number, number]

type ShapeProps = {
  geometry: THREE.BufferGeometry
  position: Vec3
  color: string
  fill?: number
}

function Shape({ geometry, position, color, fill = 0.1 }: ShapeProps) {
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry, 20), [geometry])
  return (
    <group position={position}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} transparent opacity={fill} depthWrite={false} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.9} />
      </lineSegments>
    </group>
  )
}

function Block({ size, ...rest }: Omit<ShapeProps, 'geometry'> & { size: Vec3 }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(...size), [size])
  return <Shape geometry={geometry} {...rest} />
}

function Drum({ position, color }: { position: Vec3; color: string }) {
  const geometry = useMemo(() => new THREE.CylinderGeometry(0.42, 0.42, 0.5, 40), [])
  return <Shape geometry={geometry} position={position} color={color} fill={0.14} />
}

const PLATE: Vec3 = [3.4, 0.06, 3.4]
const ORIGIN: Vec3 = [0, 0, 0]

/* A page wireframe: header, sidebar, two cards, one wide panel. */
const INTERFACE_BLOCKS: { size: Vec3; position: Vec3 }[] = [
  { size: [3.0, 0.05, 0.4], position: [0, 0.07, -1.3] },
  { size: [0.7, 0.05, 2.3], position: [-1.15, 0.07, 0.2] },
  { size: [1.0, 0.05, 1.0], position: [-0.15, 0.07, -0.45] },
  { size: [1.0, 0.05, 1.0], position: [1.0, 0.07, -0.45] },
  { size: [2.15, 0.05, 1.1], position: [0.42, 0.07, 0.8] },
]

/* Services: four endpoints around a central hub. */
const SERVER_BLOCKS: { size: Vec3; position: Vec3 }[] = [
  { size: [0.62, 0.62, 0.62], position: [0, 0.35, 0] },
  { size: [0.42, 0.42, 0.42], position: [-1.05, 0.25, -1.05] },
  { size: [0.42, 0.42, 0.42], position: [1.05, 0.25, -1.05] },
  { size: [0.42, 0.42, 0.42], position: [-1.05, 0.25, 1.05] },
  { size: [0.42, 0.42, 0.42], position: [1.05, 0.25, 1.05] },
]

const DATA_DRUMS: Vec3[] = [
  [-1.0, 0.29, -0.35],
  [0.05, 0.29, 0.45],
  [1.05, 0.29, -0.3],
]

/* Requests travelling down the stack and responses coming back up. */
const PACKETS = [
  { x: -1.05, z: -1.05, speed: 0.55, offset: 0.0, direction: -1 },
  { x: 1.05, z: 1.05, speed: 0.42, offset: 0.35, direction: 1 },
  { x: 0, z: 0, speed: 0.65, offset: 0.6, direction: -1 },
  { x: 1.05, z: -1.05, speed: 0.48, offset: 0.15, direction: 1 },
  { x: -1.05, z: 1.05, speed: 0.38, offset: 0.8, direction: -1 },
]

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function FitCamera() {
  const { camera, size } = useThree()
  useEffect(() => {
    camera.zoom = Math.min(size.width / 5.6, size.height / 6.6)
    camera.updateProjectionMatrix()
  }, [camera, size])
  return null
}

function Stack({ animated }: { animated: boolean }) {
  const root = useRef<THREE.Group>(null)
  const top = useRef<THREE.Group>(null)
  const bottom = useRef<THREE.Group>(null)
  const packets = useRef<(THREE.Mesh | null)[]>([])
  const pointer = useRef({ x: 0, y: 0 })
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    if (!animated) return
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [animated])

  useFrame(({ clock }) => {
    if (!animated) return
    const time = clock.elapsedTime
    startedAt.current ??= time
    const intro = easeOutCubic(Math.min((time - startedAt.current) / INTRO_SECONDS, 1))
    const spread = (1 - intro) * INTRO_SPREAD

    if (top.current) top.current.position.y = LAYER_GAP + spread
    if (bottom.current) bottom.current.position.y = -LAYER_GAP - spread

    if (root.current) {
      const targetY = Math.sin(time * 0.25) * 0.12 + pointer.current.x * 0.3
      const targetX = pointer.current.y * 0.12
      root.current.rotation.y += (targetY - root.current.rotation.y) * 0.05
      root.current.rotation.x += (targetX - root.current.rotation.x) * 0.05
    }

    PACKETS.forEach((packet, index) => {
      const mesh = packets.current[index]
      if (!mesh) return
      const progress = (time * packet.speed + packet.offset) % 1
      const travel = packet.direction === 1 ? progress : 1 - progress
      mesh.position.y = -LAYER_GAP + travel * LAYER_GAP * 2 + 0.3
      const fade = Math.sin(progress * Math.PI)
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = fade * intro
    })
  })

  return (
    <group ref={root}>
      <group ref={top} position={[0, LAYER_GAP, 0]}>
        <Block size={PLATE} position={ORIGIN} color={COLORS.interface} fill={0.07} />
        {INTERFACE_BLOCKS.map((block, index) => (
          <Block key={index} {...block} color={COLORS.interface} fill={0.16} />
        ))}
      </group>

      <group>
        <Block size={PLATE} position={ORIGIN} color={COLORS.server} fill={0.07} />
        {SERVER_BLOCKS.map((block, index) => (
          <Block key={index} {...block} color={COLORS.server} fill={0.16} />
        ))}
      </group>

      <group ref={bottom} position={[0, -LAYER_GAP, 0]}>
        <Block size={PLATE} position={ORIGIN} color={COLORS.data} fill={0.07} />
        {DATA_DRUMS.map((position, index) => (
          <Drum key={index} position={position} color={COLORS.data} />
        ))}
      </group>

      {PACKETS.map((packet, index) => (
        <mesh
          key={index}
          ref={(mesh) => {
            packets.current[index] = mesh
          }}
          position={[packet.x, (index - 2) * 0.6, packet.z]}
        >
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={COLORS.packet} transparent opacity={animated ? 0 : 0.9} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene({ animated }: { animated: boolean }) {
  return (
    <Canvas
      orthographic
      camera={{ position: [6, 4.6, 6], near: 0.1, far: 50 }}
      dpr={[1, 2]}
      frameloop={animated ? 'always' : 'demand'}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <FitCamera />
      <Stack animated={animated} />
    </Canvas>
  )
}
