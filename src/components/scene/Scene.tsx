import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { CellScene } from './CellScene';
import { useStore } from '../../store/useStore';
import type { Mode } from '../../types';

interface Props {
  forcedMode?: Mode;
  /** smaller controls/zoom budget for the compare view */
  compact?: boolean;
}

export function Scene({ forcedMode, compact }: Props) {
  const select = useStore((s) => s.select);

  return (
    <Canvas
      camera={{ position: [0, 1.5, compact ? 11 : 9.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      onPointerMissed={() => select(null)}
    >
      <color attach="background" args={['#070b14']} />
      <fog attach="fog" args={['#070b14', 12, 26]} />

      {/* lighting: external key + internal glow */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={1.1} color="#cfe3ff" />
      <directionalLight position={[-6, -3, -4]} intensity={0.4} color="#5d7bff" />
      <pointLight position={[0, 0, 0]} intensity={6} distance={8} color="#86b8ff" />

      <Suspense fallback={null}>
        <CellScene forcedMode={forcedMode} />
      </Suspense>

      <OrbitControls
        enablePan={!compact}
        minDistance={4}
        maxDistance={22}
        autoRotate={false}
        makeDefault
      />
    </Canvas>
  );
}
