"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import type * as THREE from "three"

function PokerChip({
  position,
  rotation,
  scale,
  chipColor,
  edgeColor,
  centerColor,
  suitSymbol,
  value,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  chipColor: string
  edgeColor: string
  centerColor: string
  suitSymbol: string
  value: string
}) {
  const chipRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (chipRef.current) {
      chipRef.current.rotation.x += 0.008
      chipRef.current.rotation.y += 0.015
      chipRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.002
    }
  })

  return (
    <group ref={chipRef} position={position} rotation={rotation} scale={scale}>
      {/* Main chip body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.2, 64]} />
        <meshStandardMaterial color={chipColor} metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Edge stripes - alternating pattern like real casino chips */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * Math.PI * 2) / 16
        const isEdgeStripe = i % 2 === 0
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.95, 0, Math.sin(angle) * 0.95]} rotation={[0, angle, 0]}>
            <boxGeometry args={[0.15, 0.21, 0.12]} />
            <meshStandardMaterial color={isEdgeStripe ? edgeColor : chipColor} metalness={0.2} roughness={0.5} />
          </mesh>
        )
      })}

      {/* Top face - outer ring */}
      <mesh position={[0, 0.101, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.65, 0.85, 64]} />
        <meshStandardMaterial color={edgeColor} metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Top face - center circle */}
      <mesh position={[0, 0.102, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 64]} />
        <meshStandardMaterial color={centerColor} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Top face - suit symbol circle */}
      <mesh position={[0, 0.103, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 64]} />
        <meshStandardMaterial color={chipColor} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Top suit symbol */}
      <mesh position={[0, 0.104, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {suitSymbol === "♠" && (
          <>
            {/* Spade shape */}
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#000000" />
          </>
        )}
        {suitSymbol === "♦" && (
          <>
            {/* Diamond shape */}
            <circleGeometry args={[0.12, 4]} />
            <meshStandardMaterial color="#ef4444" />
          </>
        )}
        {suitSymbol === "♣" && (
          <>
            {/* Club shape */}
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#000000" />
          </>
        )}
        {suitSymbol === "♥" && (
          <>
            {/* Heart shape */}
            <circleGeometry args={[0.15, 32]} />
            <meshStandardMaterial color="#ef4444" />
          </>
        )}
      </mesh>

      {/* Bottom face - outer ring */}
      <mesh position={[0, -0.101, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.65, 0.85, 64]} />
        <meshStandardMaterial color={edgeColor} metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Bottom face - center circle */}
      <mesh position={[0, -0.102, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 64]} />
        <meshStandardMaterial color={centerColor} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Bottom face - value circle */}
      <mesh position={[0, -0.103, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 64]} />
        <meshStandardMaterial color={chipColor} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Metallic edge ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.97, 1.0, 64]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function DiceDot({ position, size = 0.12 }: { position: [number, number, number]; size?: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.8} />
    </mesh>
  )
}

function DiceFace({ faceNumber, rotation }: { faceNumber: number; rotation: [number, number, number] }) {
  const dotPositions: { [key: number]: [number, number, number][] } = {
    1: [[0, 0, 0.51]],
    2: [
      [-0.25, 0.25, 0.51],
      [0.25, -0.25, 0.51],
    ],
    3: [
      [-0.3, 0.3, 0.51],
      [0, 0, 0.51],
      [0.3, -0.3, 0.51],
    ],
    4: [
      [-0.25, 0.25, 0.51],
      [0.25, 0.25, 0.51],
      [-0.25, -0.25, 0.51],
      [0.25, -0.25, 0.51],
    ],
    5: [
      [-0.3, 0.3, 0.51],
      [0.3, 0.3, 0.51],
      [0, 0, 0.51],
      [-0.3, -0.3, 0.51],
      [0.3, -0.3, 0.51],
    ],
    6: [
      [-0.25, 0.35, 0.51],
      [0.25, 0.35, 0.51],
      [-0.25, 0, 0.51],
      [0.25, 0, 0.51],
      [-0.25, -0.35, 0.51],
      [0.25, -0.35, 0.51],
    ],
  }

  return (
    <group rotation={rotation}>
      {dotPositions[faceNumber].map((pos, i) => (
        <DiceDot key={i} position={pos} />
      ))}
    </group>
  )
}

function FallingDice({ startDelay }: { startDelay: number }) {
  const diceRef = useRef<THREE.Group>(null)
  const [isVisible, setIsVisible] = useState(false)
  const startTime = useRef<number | null>(null)
  const velocity = useRef(0)
  const bounceCount = useRef(0)
  const rotationSpeed = useRef({ x: 0, y: 0, z: 0 })

  useFrame((state) => {
    if (!diceRef.current) return

    const elapsed = state.clock.elapsedTime - startDelay

    if (elapsed < 0) {
      setIsVisible(false)
      return
    }

    if (!isVisible) {
      setIsVisible(true)
      startTime.current = state.clock.elapsedTime
      diceRef.current.position.set((Math.random() - 0.5) * 25, 18, (Math.random() - 0.5) * 15)
      diceRef.current.scale.set(1.2, 1.2, 1.2)
      velocity.current = 0
      bounceCount.current = 0
      rotationSpeed.current = {
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.3,
      }
    }

    const gravity = -35
    const damping = 0.5
    const groundLevel = -8

    velocity.current += gravity * 0.016
    diceRef.current.position.y += velocity.current * 0.016

    // Rotation during fall
    diceRef.current.rotation.x += rotationSpeed.current.x
    diceRef.current.rotation.y += rotationSpeed.current.y
    diceRef.current.rotation.z += rotationSpeed.current.z

    // Bounce physics
    if (diceRef.current.position.y <= groundLevel) {
      diceRef.current.position.y = groundLevel
      velocity.current = -velocity.current * damping
      bounceCount.current += 1

      // Reduce rotation speed after bounce
      rotationSpeed.current.x *= 0.7
      rotationSpeed.current.y *= 0.7
      rotationSpeed.current.z *= 0.7

      // After 2 bounces, start fading
      if (bounceCount.current >= 2) {
        setTimeout(() => {
          setIsVisible(false)
          startTime.current = null
        }, 800)
      }
    }

    // Fade out after bouncing
    if (bounceCount.current >= 2 && diceRef.current.position.y <= groundLevel + 0.1) {
      const timeSinceBounce = state.clock.elapsedTime - (startTime.current || 0) - 2
      const fadeProgress = Math.min(timeSinceBounce / 0.8, 1)
      if (diceRef.current.scale.x > 0) {
        const scale = Math.max(0, 1.2 - fadeProgress * 1.2)
        diceRef.current.scale.set(scale, scale, scale)
      }
    }
  })

  if (!isVisible) return null

  return (
    <group ref={diceRef}>
      {/* Dice cube with rounded corners */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* All six faces with proper dot patterns */}
      <DiceFace faceNumber={1} rotation={[0, 0, 0]} />
      <DiceFace faceNumber={6} rotation={[0, Math.PI, 0]} />
      <DiceFace faceNumber={2} rotation={[0, Math.PI / 2, 0]} />
      <DiceFace faceNumber={5} rotation={[0, -Math.PI / 2, 0]} />
      <DiceFace faceNumber={3} rotation={[-Math.PI / 2, 0, 0]} />
      <DiceFace faceNumber={4} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

function RotatingDice({ position }: { position: [number, number, number] }) {
  const diceRef = useRef<THREE.Group>(null)
  const rotationSpeed = useRef({
    x: (Math.random() - 0.5) * 0.02,
    y: (Math.random() - 0.5) * 0.02,
    z: (Math.random() - 0.5) * 0.02,
  })

  useFrame((state) => {
    if (diceRef.current) {
      diceRef.current.rotation.x += rotationSpeed.current.x
      diceRef.current.rotation.y += rotationSpeed.current.y
      diceRef.current.rotation.z += rotationSpeed.current.z
      diceRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.003
    }
  })

  return (
    <group ref={diceRef} position={position} scale={1.5}>
      {/* Dice cube */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.2}
          roughness={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* All six faces with proper dot patterns */}
      <DiceFace faceNumber={1} rotation={[0, 0, 0]} />
      <DiceFace faceNumber={6} rotation={[0, Math.PI, 0]} />
      <DiceFace faceNumber={2} rotation={[0, Math.PI / 2, 0]} />
      <DiceFace faceNumber={5} rotation={[0, -Math.PI / 2, 0]} />
      <DiceFace faceNumber={3} rotation={[-Math.PI / 2, 0, 0]} />
      <DiceFace faceNumber={4} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

function PlayingCard({
  position,
  rotation,
  scale,
}: { position: [number, number, number]; rotation: [number, number, number]; scale: number }) {
  const cardRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.rotation.z += 0.01
      cardRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0] * 2) * 0.003
    }
  })

  return (
    <group ref={cardRef} position={position} rotation={rotation} scale={scale}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 1, 0.02]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0, 0.011]}>
        <planeGeometry args={[0.6, 0.9]} />
        <meshStandardMaterial color="#b8f400" metalness={0.2} roughness={0.7} />
      </mesh>
    </group>
  )
}

function CasinoElements() {
  const chipStyles = [
    { color: "#ef4444", edge: "#ffffff", center: "#ffffff", suit: "♠", value: "50" },
    { color: "#f97316", edge: "#000000", center: "#fbbf24", suit: "♠", value: "5" },
    { color: "#3b82f6", edge: "#fbbf24", center: "#ffffff", suit: "♦", value: "25" },
    { color: "#10b981", edge: "#ffffff", center: "#ffffff", suit: "♠", value: "250" },
    { color: "#8b5cf6", edge: "#ec4899", center: "#fbbf24", suit: "♣", value: "10" },
    { color: "#b8f400", edge: "#000000", center: "#ffffff", suit: "♦", value: "100" },
    { color: "#000000", edge: "#b8f400", center: "#ffffff", suit: "♠", value: "500" },
    { color: "#ec4899", edge: "#3b82f6", center: "#ffffff", suit: "♥", value: "1000" },
  ]

  const elements = useMemo(() => {
    const items = []
    for (let i = 0; i < 30; i++) {
      const type = i % 6 === 0 ? 1 : 0 // More chips
      const chipStyle = chipStyles[i % chipStyles.length]
      items.push({
        type,
        position: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20 - 10] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
        scale: 0.5 + Math.random() * 0.4,
        chipStyle,
      })
    }
    return items
  }, [])

  const rotatingDicePositions = useMemo(() => {
    const positions: [number, number, number][] = []
    for (let i = 0; i < 8; i++) {
      positions.push([(Math.random() - 0.5) * 28, (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 20 - 10])
    }
    return positions
  }, [])

  return (
    <>
      {elements.map((item, i) => {
        if (item.type === 0) {
          return (
            <PokerChip
              key={i}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
              chipColor={item.chipStyle.color}
              edgeColor={item.chipStyle.edge}
              centerColor={item.chipStyle.center}
              suitSymbol={item.chipStyle.suit}
              value={item.chipStyle.value}
            />
          )
        } else {
          return <PlayingCard key={i} position={item.position} rotation={item.rotation} scale={item.scale} />
        }
      })}
      {rotatingDicePositions.map((pos, i) => (
        <RotatingDice key={`rotating-${i}`} position={pos} />
      ))}
      {[0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5].map((delay) => (
        <FallingDice key={delay} startDelay={delay} />
      ))}
    </>
  )
}

export function CasinoBackground3D() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 55 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={1.8} />
        <pointLight position={[15, 15, 15]} intensity={3.5} color="#b8f400" />
        <pointLight position={[-15, -10, -10]} intensity={2.5} color="#ffffff" />
        <pointLight position={[0, -15, 10]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[0, 15, 10]} intensity={2.5} castShadow />
        <spotLight position={[0, 20, 0]} intensity={3} angle={0.6} penumbra={0.5} castShadow />
        <CasinoElements />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
