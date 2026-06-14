import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLayoutRef } from '../../three/LayoutContext';
import { useStore } from '../../store/useStore';

const damp = THREE.MathUtils.damp;
const POOL = 4;

export function Nuclei() {
  const layoutRef = useLayoutRef();
  const groups = useRef<(THREE.Group | null)[]>([]);
  const select = useStore((s) => s.select);

  useFrame((_, dt) => {
    const { nuclei } = layoutRef.current;
    for (let i = 0; i < POOL; i++) {
      const g = groups.current[i];
      if (!g) continue;
      const n = nuclei[i];
      if (n) {
        g.visible = true;
        g.position.x = damp(g.position.x, n.x, 7, dt);
        g.position.y = damp(g.position.y, n.y, 7, dt);
        const s = damp(g.scale.x, n.r, 7, dt);
        g.scale.setScalar(s);
      } else {
        const s = damp(g.scale.x, 0.001, 9, dt);
        g.scale.setScalar(s);
        if (s < 0.02) g.visible = false;
      }
    }
  });

  return (
    <group>
      {Array.from({ length: POOL }).map((_, i) => (
        <group key={i} ref={(el) => (groups.current[i] = el)} visible={false}>
          {/* nuclear envelope */}
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              select('nucleus');
            }}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#7b8cff"
              transparent
              opacity={0.16}
              roughness={0.3}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* nucleolus */}
          <mesh
            position={[0.25, 0.15, 0.1]}
            onClick={(e) => {
              e.stopPropagation();
              select('nucleolus');
            }}
          >
            <sphereGeometry args={[0.32, 24, 24]} />
            <meshStandardMaterial color="#b388ff" emissive="#6a3fc0" emissiveIntensity={0.4} roughness={0.5} />
          </mesh>
          {/* diffuse chromatin */}
          <Chromatin />
        </group>
      ))}
    </group>
  );
}

function Chromatin() {
  return (
    <group>
      {[...Array(5)].map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.45, Math.sin(a * 1.7) * 0.4, Math.sin(a) * 0.45]} rotation={[a, a * 0.5, 0]}>
            <torusKnotGeometry args={[0.18, 0.03, 40, 6, 2, 3]} />
            <meshStandardMaterial color="#9aa6ff" emissive="#3b4bd8" emissiveIntensity={0.25} roughness={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}
