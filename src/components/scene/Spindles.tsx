import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useLayoutRef } from '../../three/LayoutContext';
import { useStore } from '../../store/useStore';

const damp = THREE.MathUtils.damp;
const POOL = 2;

export function Spindles() {
  const layoutRef = useLayoutRef();
  const groups = useRef<(THREE.Group | null)[]>([]);
  const fibers = useRef<(THREE.Mesh | null)[]>([]);
  const points = useRef<(THREE.Points | null)[]>([]);
  const select = useStore((s) => s.select);

  // particle positions for the "tension" field along the spindle axis
  const particleGeo = useMemo(() => {
    const N = 120;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 1.9;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);

  useFrame((state, dt) => {
    const { spindles } = layoutRef.current;
    for (let i = 0; i < POOL; i++) {
      const g = groups.current[i];
      if (!g) continue;
      const s = spindles[i];
      if (s) {
        g.visible = true;
        const cx = (s.poleA[0] + s.poleB[0]) / 2;
        const cy = (s.poleA[1] + s.poleB[1]) / 2;
        const len = Math.abs(s.poleB[0] - s.poleA[0]);
        g.position.x = damp(g.position.x, cx, 7, dt);
        g.position.y = damp(g.position.y, cy, 7, dt);
        g.scale.x = damp(g.scale.x, len / 3.4, 7, dt); // base geometry sized for ~3.4
        g.scale.y = damp(g.scale.y, 1, 7, dt);
        g.scale.z = damp(g.scale.z, 1, 7, dt);
      } else {
        const sc = damp(g.scale.x, 0.001, 9, dt);
        g.scale.x = sc;
        if (sc < 0.02) g.visible = false;
      }
      const pts = points.current[i];
      if (pts) pts.rotation.x = state.clock.elapsedTime * 0.6;
    }
  });

  return (
    <group>
      {Array.from({ length: POOL }).map((_, i) => (
        <group key={i} ref={(el) => (groups.current[i] = el)} visible={false}>
          {/* spindle fibres (microtubules) */}
          <mesh
            ref={(el) => (fibers.current[i] = el)}
            rotation={[0, 0, Math.PI / 2]}
            onClick={(e) => {
              e.stopPropagation();
              select('spindle');
            }}
          >
            <cylinderGeometry args={[0.05, 0.7, 3.4, 24, 1, true]} />
            <meshStandardMaterial
              color="#8de8c3"
              emissive="#3fd9a0"
              emissiveIntensity={0.5}
              transparent
              opacity={0.22}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          {/* tension particles */}
          <points ref={(el) => (points.current[i] = el)} geometry={particleGeo}>
            <pointsMaterial color="#aef7da" size={0.045} transparent opacity={0.7} depthWrite={false} />
          </points>
          {/* centrosomes at the poles */}
          {[-1.7, 1.7].map((x) => (
            <mesh
              key={x}
              position={[x, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                select('centrosome');
              }}
            >
              <icosahedronGeometry args={[0.16, 0]} />
              <meshStandardMaterial color="#ffd166" emissive="#ffb703" emissiveIntensity={1.2} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
