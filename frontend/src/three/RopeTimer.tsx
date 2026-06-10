import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { FireParticles } from "./FireParticles";
import { FocusEnvironment } from "./FocusEnvironment";
import { flameFragmentShader, flameVertexShader } from "./FlameShader";
import { RopeGeometry } from "./RopeGeometry";
import { SmokeParticles } from "./SmokeParticles";

type SceneProps = {
  progress: number;
  active: boolean;
};

function Flame({ progress, active }: SceneProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const angle = Math.PI * 2 * Math.max(0, progress) - Math.PI / 2;
  const position: [number, number, number] = [Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0.08];
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  if (!active) return null;

  return (
    <Billboard position={position}>
      <mesh scale={[0.34, 0.56, 0.34]}>
        <planeGeometry args={[1, 1]} />
        <shaderMaterial ref={material} vertexShader={flameVertexShader} fragmentShader={flameFragmentShader} uniforms={uniforms} transparent blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </Billboard>
  );
}

function BurnScar({ progress }: { progress: number }) {
  const angle = Math.PI * 2 * Math.max(0, progress) - Math.PI / 2;
  return (
    <mesh position={[Math.cos(angle) * 2.15, Math.sin(angle) * 2.15, 0]} scale={0.16}>
      <sphereGeometry args={[1, 18, 18]} />
      <meshStandardMaterial color="#111111" emissive="#F97316" emissiveIntensity={0.9} roughness={0.48} />
    </mesh>
  );
}

export function RopeTimer({ progress, active }: SceneProps) {
  return (
    <Canvas dpr={[1, 1.8]} gl={{ antialias: true, powerPreference: "high-performance" }} shadows>
      <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={42} />
      <FocusEnvironment />
      <RopeGeometry progress={progress} />
      <BurnScar progress={progress} />
      <Flame progress={progress} active={active} />
      <FireParticles progress={progress} active={active} />
      <SmokeParticles progress={progress} active={active} />
    </Canvas>
  );
}
