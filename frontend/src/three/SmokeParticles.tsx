import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  progress: number;
  active: boolean;
  radius?: number;
};

export function SmokeParticles({ progress, active, radius = 2.15 }: Props) {
  const ref = useRef<THREE.Points>(null);
  const count = 60;
  const positions = useMemo(() => new Float32Array(count * 3), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const angle = Math.PI * 2 * Math.max(0, progress) - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i += 1) {
      const stride = i * 3;
      const lift = ((time * 0.22 + i / count) % 1) * 1.1;
      positions[stride] = x + Math.sin(time + i) * 0.15 * lift;
      positions[stride + 1] = y + lift;
      positions[stride + 2] = Math.cos(i) * 0.12;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.visible = active;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#AAB0BD" transparent opacity={0.22} depthWrite={false} />
    </points>
  );
}
