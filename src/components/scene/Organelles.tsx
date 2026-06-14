import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLayoutRef } from '../../three/LayoutContext';
import { useStore } from '../../store/useStore';

const damp = THREE.MathUtils.damp;

export function Organelles() {
  const layoutRef = useLayoutRef();
  const root = useRef<THREE.Group>(null);
  const select = useStore((s) => s.select);

  const mitoData = useMemo(
    () =>
      [...Array(7)].map((_, i) => {
        const a = (i / 7) * Math.PI * 2 + 0.4;
        const r = 1.25 + (i % 2) * 0.25;
        return {
          pos: [Math.cos(a) * r, Math.sin(a * 1.3) * 1.1, Math.sin(a) * r] as [number, number, number],
          rot: [a, a * 0.7, a * 0.3] as [number, number, number],
        };
      }),
    []
  );

  useFrame((_, dt) => {
    const g = root.current;
    if (!g) return;
    const target = layoutRef.current.organelleOpacity;
    g.traverse((o) => {
      const mesh = o as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
      if (mat && 'opacity' in mat) {
        mat.transparent = true;
        mat.opacity = damp(mat.opacity, target, 6, dt);
        mat.depthWrite = target > 0.5;
      }
    });
    g.visible = target > 0.03;
  });

  return (
    <group ref={root}>
      {/* mitochondria */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          select('mitochondria');
        }}
      >
        {mitoData.map((m, i) => (
          <mesh key={i} position={m.pos} rotation={m.rot}>
            <capsuleGeometry args={[0.11, 0.32, 6, 12]} />
            <meshStandardMaterial color="#ef6f6c" emissive="#b23a3a" emissiveIntensity={0.3} roughness={0.5} transparent />
          </mesh>
        ))}
      </group>

      {/* Golgi apparatus: stack of curved cisternae */}
      <group
        position={[-1.1, -0.9, 0.5]}
        rotation={[0.2, 0.3, 0.1]}
        onClick={(e) => {
          e.stopPropagation();
          select('golgi');
        }}
      >
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.12, 0]} scale={[1 - i * 0.12, 1, 1 - i * 0.12]}>
            <torusGeometry args={[0.3, 0.05, 12, 32, Math.PI * 1.1]} />
            <meshStandardMaterial color="#f4a261" emissive="#c97a2c" emissiveIntensity={0.25} roughness={0.5} transparent />
          </mesh>
        ))}
      </group>
    </group>
  );
}
