import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  progress: number;
  active: boolean;
  radius?: number;
};

export function FireParticles({ progress, active, radius = 2.15 }: Props) {
  const ref = useRef<THREE.Points>(null);
  const count = 90;
  const positions = useMemo(() => new Float32Array(count * 3), []);
  const emberPoint = useMemo(() => {
    const angle = Math.PI * 2 * Math.max(0, progress) - Math.PI / 2;
    return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
  }, [progress, radius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i += 1) {
      const stride = i * 3;
      const seed = i * 17.31;
      const lift = ((time * 0.9 + i * 0.038) % 1) * 0.75;
      positions[stride] = emberPoint.x + Math.sin(time * 3 + seed) * 0.08;
      positions[stride + 1] = emberPoint.y + lift + Math.cos(time * 2 + seed) * 0.06;
      positions[stride + 2] = emberPoint.z + Math.sin(seed) * 0.08;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.visible = active;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#F59E0B" transparent opacity={0.92} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}
