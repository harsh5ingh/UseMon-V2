import { Float, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function FocusEnvironment() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <Stars radius={45} depth={18} count={900} factor={2.5} saturation={0} fade speed={0.35} />
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.25}>
        <mesh position={[0, 0, -1.8]}>
          <torusGeometry args={[2.45, 0.006, 8, 180]} />
          <meshBasicMaterial color="#4F7CFF" transparent opacity={0.28} />
        </mesh>
      </Float>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 1.5, 3]} intensity={24} color="#F59E0B" distance={6} />
      <pointLight position={[-3, -2, 2]} intensity={10} color="#4F7CFF" distance={8} />
    </group>
  );
}
