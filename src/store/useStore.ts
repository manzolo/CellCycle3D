import { create } from 'zustand';
import { PHASES } from '../data/phases';
import type { CellType, Lang, Level, Mode, StructureId } from '../types';

interface State {
  mode: Mode;
  cellType: CellType;
  level: Level;
  lang: Lang;
  compare: boolean;

  phaseIndex: number;
  /** progress within the current phase, 0..1 */
  progress: number;
  playing: boolean;
  speed: number;

  selected: StructureId | null;
  disturb: boolean;

  setMode: (m: Mode) => void;
  setCellType: (c: CellType) => void;
  setLevel: (l: Level) => void;
  setLang: (l: Lang) => void;
  toggleCompare: () => void;

  setPhase: (i: number) => void;
  next: () => void;
  prev: () => void;
  restart: () => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setSpeed: (s: number) => void;
  /** advance the continuous animation clock; called from the render loop */
  tick: (dt: number) => void;

  select: (s: StructureId | null) => void;
  toggleDisturb: () => void;
}

function phaseCount(mode: Mode) {
  return PHASES[mode].length;
}

export const useStore = create<State>((set, get) => ({
  mode: 'mitosis',
  cellType: 'animal',
  level: 'school',
  lang: 'it',
  compare: false,

  phaseIndex: 0,
  progress: 0,
  playing: false,
  speed: 1,

  selected: null,
  disturb: false,

  setMode: (mode) => set({ mode, phaseIndex: 0, progress: 0, playing: false, selected: null }),
  setCellType: (cellType) => set({ cellType }),
  setLevel: (level) => set({ level }),
  setLang: (lang) => set({ lang }),
  toggleCompare: () => set((s) => ({ compare: !s.compare, playing: false })),

  setPhase: (i) => {
    const max = phaseCount(get().mode) - 1;
    set({ phaseIndex: Math.max(0, Math.min(max, i)), progress: 0 });
  },
  next: () => {
    const { phaseIndex, mode } = get();
    const max = phaseCount(mode) - 1;
    if (phaseIndex < max) set({ phaseIndex: phaseIndex + 1, progress: 0 });
  },
  prev: () => {
    const { phaseIndex } = get();
    if (phaseIndex > 0) set({ phaseIndex: phaseIndex - 1, progress: 0 });
  },
  restart: () => set({ phaseIndex: 0, progress: 0, playing: false }),
  play: () => set({ playing: true }),
  pause: () => set({ playing: false }),
  togglePlay: () => set((s) => ({ playing: !s.playing })),
  setSpeed: (speed) => set({ speed }),

  tick: (dt) => {
    const { playing, progress, phaseIndex, mode, speed } = get();
    if (!playing) return;
    const phase = PHASES[mode][phaseIndex];
    const inc = (dt * speed) / (phase.duration * 2.4); // base ~2.4s per unit duration
    const np = progress + inc;
    if (np >= 1) {
      const max = phaseCount(mode) - 1;
      if (phaseIndex < max) {
        set({ phaseIndex: phaseIndex + 1, progress: 0 });
      } else {
        set({ progress: 1, playing: false });
      }
    } else {
      set({ progress: np });
    }
  },

  select: (selected) => set({ selected }),
  toggleDisturb: () => set((s) => ({ disturb: !s.disturb })),
}));
