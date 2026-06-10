import { useMemo } from "react";
import * as THREE from "three";

type Props = {
  progress: number;
  radius?: number;
};

export function RopeGeometry({ progress, radius = 2.15 }: Props) {
  const points = useMemo(() => {
    const remaining = Math.max(0.01, progress);
    const segmentCount = Math.max(8, Math.floor(160 * remaining));
    return Array.from({ length: segmentCount }, (_, index) => {
      const angle = (index / Math.max(segmentCount - 1, 1)) * Math.PI * 2 * remaining - Math.PI / 2;
      const twist = Math.sin(index * 0.36) * 0.025;
      return new THREE.Vector3(Math.cos(angle) * (radius + twist), Math.sin(angle) * (radius + twist), 0);
    });
  }, [progress, radius]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 220, 0.055, 12, false), [curve]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color="#8A5B35" roughness={0.82} metalness={0.05} emissive="#2A1408" emissiveIntensity={0.08} />
    </mesh>
  );
}
