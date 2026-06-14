import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { getLayout, type SceneLayout } from '../../three/layout';
import { LayoutContext } from '../../three/LayoutContext';
import { PHASES } from '../../data/phases';
import { useStore } from '../../store/useStore';
import type { Mode } from '../../types';
import { Membrane } from './Membrane';
import { Nuclei } from './Nuclei';
import { Chromosomes } from './Chromosomes';
import { Spindles } from './Spindles';
import { Organelles } from './Organelles';

interface Props {
  /** when set, this scene self-drives the given mode in a loop (used by Compare) */
  forcedMode?: Mode;
}

export function CellScene({ forcedMode }: Props) {
  const layoutRef = useRef<SceneLayout>(getLayout(forcedMode ?? 'mitosis', 0, 0, false));
  const local = useRef({ index: 0, progress: 0 });

  useFrame((_, dt) => {
    const st = useStore.getState();
    if (forcedMode) {
      // self-driving loop for the comparison view
      const phases = PHASES[forcedMode];
      const cur = phases[local.current.index];
      local.current.progress += (dt * st.speed) / (cur.duration * 2.4);
      if (local.current.progress >= 1) {
        local.current.progress = 0;
        local.current.index = (local.current.index + 1) % phases.length;
      }
      layoutRef.current = getLayout(forcedMode, local.current.index, local.current.progress, st.disturb);
    } else {
      st.tick(dt);
      const s2 = useStore.getState();
      layoutRef.current = getLayout(s2.mode, s2.phaseIndex, s2.progress, s2.disturb);
    }
  }, -1);

  return (
    <LayoutContext.Provider value={layoutRef}>
      <Membrane />
      <Nuclei />
      <Spindles />
      <Chromosomes />
      <Organelles />
    </LayoutContext.Provider>
  );
}
