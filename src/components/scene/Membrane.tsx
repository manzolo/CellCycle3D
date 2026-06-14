import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import '../../three/MembraneMaterial';
import { useLayoutRef } from '../../three/LayoutContext';
import { useStore } from '../../store/useStore';

const damp = THREE.MathUtils.damp;
const POOL = 4;

export function Membrane() {
  const layoutRef = useLayoutRef();
  const groups = useRef<(THREE.Group | null)[]>([]);
  const mats = useRef<any[]>([]);
  const select = useStore((s) => s.select);

  useFrame((state, dt) => {
    const { cells } = layoutRef.current;
    const cellType = useStore.getState().cellType;
    const wall = cellType === 'plant' ? 1 : 0;
    for (let i = 0; i < POOL; i++) {
      const g = groups.current[i];
      const mat = mats.current[i];
      if (!g) continue;
      const c = cells[i];
      if (c) {
        g.visible = true;
        g.position.x = damp(g.position.x, c.x, 7, dt);
        g.position.y = damp(g.position.y, c.y, 7, dt);
        g.scale.x = damp(g.scale.x, c.r * c.sx, 7, dt);
        g.scale.y = damp(g.scale.y, c.r, 7, dt);
        g.scale.z = damp(g.scale.z, c.r, 7, dt);
      } else {
        g.scale.x = damp(g.scale.x, 0.001, 9, dt);
        g.scale.y = damp(g.scale.y, 0.001, 9, dt);
        g.scale.z = damp(g.scale.z, 0.001, 9, dt);
        if (g.scale.x < 0.02) g.visible = false;
      }
      if (mat) {
        mat.uTime = state.clock.elapsedTime;
        mat.uWall = wall;
      }
    }
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        select('membrane');
      }}
    >
      {Array.from({ length: POOL }).map((_, i) => (
        <group key={i} ref={(el) => (groups.current[i] = el)} visible={false}>
          <mesh>
            <sphereGeometry args={[1, 48, 48]} />
            <membraneMaterial
              ref={(el: any) => (mats.current[i] = el)}
              transparent
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
