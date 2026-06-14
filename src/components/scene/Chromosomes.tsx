import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ALL_CHROMATIDS } from '../../three/layout';
import { useLayoutRef } from '../../three/LayoutContext';
import { useStore } from '../../store/useStore';

const damp = THREE.MathUtils.damp;

export function Chromosomes() {
  const layoutRef = useLayoutRef();
  const groups = useRef<Record<string, THREE.Group>>({});
  const bands = useRef<Record<string, THREE.Mesh>>({});
  const select = useStore((s) => s.select);

  const styles = useMemo(() => ALL_CHROMATIDS, []);

  useFrame((_, dt) => {
    const layout = layoutRef.current;
    const selected = useStore.getState().selected;
    const hl = selected === 'chromosomes';
    const byId = new Map(layout.chromatids.map((c) => [c.id, c]));

    for (const s of styles) {
      const g = groups.current[s.id];
      if (!g) continue;
      const target = byId.get(s.id);
      if (target) {
        g.position.x = damp(g.position.x, target.pos[0], 8, dt);
        g.position.y = damp(g.position.y, target.pos[1], 8, dt);
        g.position.z = damp(g.position.z, target.pos[2], 8, dt);
        const scale = damp(g.scale.x, 1, 10, dt);
        g.scale.setScalar(scale);
        g.visible = true;
        const band = bands.current[s.id];
        if (band) band.visible = !!target.recomb;
      } else {
        // not present in this phase: shrink away
        const scale = damp(g.scale.x, 0.001, 10, dt);
        g.scale.setScalar(scale);
        if (scale < 0.02) g.visible = false;
      }
      // highlight emissive pulse
      const arm = g.children[0] as THREE.Mesh;
      const mat = arm.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = damp(mat.emissiveIntensity, hl ? 1.4 : 0.35, 8, dt);
    }
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        select('chromosomes');
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {styles.map((s) => {
        const recombColor = s.id.endsWith('b') ? '#ff9ab3' : '#9ecbff'; // band uses the partner family
        return (
          <group
            key={s.id}
            ref={(el) => el && (groups.current[s.id] = el)}
            scale={0.001}
            visible={false}
          >
            {/* chromatid arm */}
            <mesh>
              <capsuleGeometry args={[0.085, s.len, 6, 12]} />
              <meshStandardMaterial
                color={s.color}
                emissive={s.color}
                emissiveIntensity={0.35}
                roughness={0.4}
                metalness={0.1}
              />
            </mesh>
            {/* centromere */}
            <mesh>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial color="#ffffff" emissive="#cfe3ff" emissiveIntensity={0.3} roughness={0.6} />
            </mesh>
            {/* recombinant tip (crossing-over) */}
            <mesh
              ref={(el) => el && (bands.current[s.id] = el)}
              position={[0, s.len * 0.42, 0]}
              visible={false}
            >
              <capsuleGeometry args={[0.092, s.len * 0.28, 4, 8]} />
              <meshStandardMaterial color={recombColor} emissive={recombColor} emissiveIntensity={0.6} roughness={0.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
