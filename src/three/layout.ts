import { PHASES } from '../data/phases';
import type { Mode } from '../types';

export type Vec3 = [number, number, number];

export interface ChromatidTarget {
  id: string;
  color: string;
  len: number;
  pos: Vec3;
  /** colour of the recombinant tip (crossing-over), if any */
  recomb?: string;
  highlightPair: number; // homolog pair index (0 or 1) for legend/highlighting
}

export interface CellTarget {
  id: string;
  x: number;
  y: number;
  r: number;
  /** horizontal scale to fake elongation */
  sx: number;
}

export interface NucleusTarget {
  id: string;
  x: number;
  y: number;
  r: number;
}

export interface SpindleTarget {
  id: string;
  /** the two poles of this spindle */
  poleA: Vec3;
  poleB: Vec3;
}

export interface SceneLayout {
  cells: CellTarget[];
  nuclei: NucleusTarget[];
  chromatids: ChromatidTarget[];
  spindles: SpindleTarget[];
  /** organelles fade out during division and back in at the end */
  organelleOpacity: number;
  /** suggested camera distance for framing */
  camDist: number;
}

// ---- chromosome catalogue (2n = 4): two homolog pairs ----
const CHROM = {
  c0: { color: '#ff5d8f', len: 0.95, pair: 0 }, // pair P, maternal
  c1: { color: '#ff9ab3', len: 0.95, pair: 0 }, // pair P, paternal
  c2: { color: '#5fa8ff', len: 0.7, pair: 1 }, // pair Q, maternal
  c3: { color: '#9ecbff', len: 0.7, pair: 1 }, // pair Q, paternal
} as const;
type ChromId = keyof typeof CHROM;

/** Stable list of every chromatid id the scene can render, with its style. */
export const ALL_CHROMATIDS: { id: string; color: string; len: number; pair: number }[] = (
  ['c0', 'c1', 'c2', 'c3'] as ChromId[]
).flatMap((c) =>
  ['a', 'b'].map((s) => ({ id: `${c}${s}`, color: CHROM[c].color, len: CHROM[c].len, pair: CHROM[c].pair }))
);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

export function phaseId(mode: Mode, index: number): string {
  return PHASES[mode][index].id;
}

function ct(
  id: string,
  chrom: ChromId,
  pos: Vec3,
  recomb?: string
): ChromatidTarget {
  return { id, color: CHROM[chrom].color, len: CHROM[chrom].len, pos, recomb, highlightPair: CHROM[chrom].pair };
}

// scatter offsets used in prophase
const SCATTER: Record<ChromId, Vec3> = {
  c0: [-0.55, 0.45, 0.25],
  c1: [0.5, 0.6, -0.2],
  c2: [0.6, -0.45, 0.35],
  c3: [-0.45, -0.55, -0.3],
};

const PLATE_Y: Record<ChromId, number> = { c0: 1.0, c1: 0.35, c2: -0.35, c3: -1.0 };

const POLE = 1.7;
const GAP = 0.14; // sister separation on the plate

// ============ MITOSIS ============
function mitosisLayout(id: string, p: number, disturb: boolean): SceneLayout {
  const chromatids: ChromatidTarget[] = [];
  const cells: CellTarget[] = [];
  const nuclei: NucleusTarget[] = [];
  const spindles: SpindleTarget[] = [];
  let organelleOpacity = 1;
  let camDist = 8.5;

  const ids: ChromId[] = ['c0', 'c1', 'c2', 'c3'];

  const oneCell = (sx = 1): CellTarget => ({ id: 'm', x: 0, y: 0, r: 2.2, sx });

  if (id === 'interphase') {
    cells.push(oneCell());
    nuclei.push({ id: 'n', x: 0, y: 0, r: 1.15 });
    // chromatin shown by Nucleus component; no condensed chromosomes
  } else if (id === 'prophase') {
    cells.push(oneCell());
    nuclei.push({ id: 'n', x: 0, y: 0, r: 1.2 });
    organelleOpacity = 0.8;
    for (const c of ids) {
      const s = SCATTER[c];
      chromatids.push(ct(`${c}a`, c, [s[0] - GAP, s[1], s[2]]));
      chromatids.push(ct(`${c}b`, c, [s[0] + GAP, s[1], s[2]]));
    }
  } else if (id === 'prometaphase') {
    cells.push(oneCell());
    organelleOpacity = 0.5;
    spindles.push({ id: 's', poleA: [-POLE - 0.4, 0, 0], poleB: [POLE + 0.4, 0, 0] });
    for (const c of ids) {
      const s = SCATTER[c];
      const x = lerp(s[0], 0, p);
      const y = lerp(s[1], PLATE_Y[c], p);
      const z = lerp(s[2], 0, p);
      chromatids.push(ct(`${c}a`, c, [x - GAP, y, z]));
      chromatids.push(ct(`${c}b`, c, [x + GAP, y, z]));
    }
  } else if (id === 'metaphase') {
    cells.push(oneCell());
    organelleOpacity = 0.4;
    spindles.push({ id: 's', poleA: [-POLE - 0.4, 0, 0], poleB: [POLE + 0.4, 0, 0] });
    for (const c of ids) {
      chromatids.push(ct(`${c}a`, c, [-GAP, PLATE_Y[c], 0]));
      chromatids.push(ct(`${c}b`, c, [GAP, PLATE_Y[c], 0]));
    }
  } else if (id === 'anaphase') {
    cells.push(oneCell(1 + 0.3 * p));
    organelleOpacity = 0.4;
    spindles.push({ id: 's', poleA: [-POLE - 0.4, 0, 0], poleB: [POLE + 0.4, 0, 0] });
    for (const c of ids) {
      const y = PLATE_Y[c] * (1 - 0.35 * p);
      const ax = lerp(-GAP, -POLE, p);
      // nondisjunction: c2's sister b joins the LEFT pole instead of right
      const bTargetLeft = disturb && c === 'c2';
      const bx = bTargetLeft ? lerp(GAP, -POLE + 0.25, p) : lerp(GAP, POLE, p);
      chromatids.push(ct(`${c}a`, c, [ax, y, 0]));
      chromatids.push(ct(`${c}b`, c, [bx, y, 0]));
    }
  } else if (id === 'telophase') {
    cells.push(oneCell(1.35));
    organelleOpacity = 0.6;
    nuclei.push({ id: 'nL', x: -1.45, y: 0, r: 1.0 });
    nuclei.push({ id: 'nR', x: 1.45, y: 0, r: 1.0 });
    placeMitosisPoles(chromatids, -1.45, 1.45, disturb);
  } else if (id === 'cytokinesis') {
    organelleOpacity = lerp(0.7, 1, p);
    const cx = lerp(0.0, 1.5, p);
    const r = lerp(2.0, 1.55, p);
    cells.push({ id: 'L', x: -cx, y: 0, r, sx: 1 });
    cells.push({ id: 'R', x: cx, y: 0, r, sx: 1 });
    nuclei.push({ id: 'nL', x: -cx, y: 0, r: lerp(1.1, 0.95, p) });
    nuclei.push({ id: 'nR', x: cx, y: 0, r: lerp(1.1, 0.95, p) });
    placeMitosisPoles(chromatids, -cx, cx, disturb);
  }

  return { cells, nuclei, chromatids, spindles, organelleOpacity, camDist };
}

function placeMitosisPoles(out: ChromatidTarget[], lx: number, rx: number, disturb: boolean) {
  const ids: ChromId[] = ['c0', 'c1', 'c2', 'c3'];
  const ys = [0.65, 0.22, -0.22, -0.65];
  ids.forEach((c, i) => {
    out.push(ct(`${c}a`, c, [lx + (i % 2 ? 0.18 : -0.18), ys[i], 0]));
    const bLeft = disturb && c === 'c2';
    const bx = bLeft ? lx : rx;
    out.push(ct(`${c}b`, c, [bx + (i % 2 ? -0.18 : 0.18), ys[i], 0]));
  });
}

// ============ MEIOSIS ============
function meiosisLayout(id: string, p: number, disturb: boolean): SceneLayout {
  const chromatids: ChromatidTarget[] = [];
  const cells: CellTarget[] = [];
  const nuclei: NucleusTarget[] = [];
  const spindles: SpindleTarget[] = [];
  let organelleOpacity = 1;
  const camDist = id === 'metaphase2' || id === 'anaphase2' || id === 'telophase2' ? 12 : 9;

  const big = (sx = 1): CellTarget => ({ id: 'm', x: 0, y: 0, r: 2.4, sx });

  if (id === 'interphase') {
    cells.push(big());
    nuclei.push({ id: 'n', x: 0, y: 0, r: 1.2 });
  } else if (id === 'prophase1') {
    cells.push(big());
    nuclei.push({ id: 'n', x: 0, y: 0, r: 1.3 });
    organelleOpacity = 0.7;
    // bivalent P at upper-left, bivalent Q at lower-right
    bivalent(chromatids, 'c0', 'c1', -0.5, 0.45, 0.2, true);
    bivalent(chromatids, 'c2', 'c3', 0.5, -0.45, -0.2, true);
  } else if (id === 'metaphase1') {
    cells.push(big());
    organelleOpacity = 0.4;
    spindles.push({ id: 's', poleA: [-POLE - 0.5, 0, 0], poleB: [POLE + 0.5, 0, 0] });
    // bivalents on plate; independent assortment -> Q flipped
    bivalentPlate(chromatids, 'c0', 'c1', 0.75, false);
    bivalentPlate(chromatids, 'c2', 'c3', -0.75, true);
  } else if (id === 'anaphase1') {
    cells.push(big(1 + 0.45 * p));
    organelleOpacity = 0.4;
    spindles.push({ id: 's', poleA: [-POLE - 0.5, 0, 0], poleB: [POLE + 0.5, 0, 0] });
    // left pole: c0, c3 ; right pole: c1, c2  (whole chromosomes, sisters together)
    // disturb: homolog pair P fails to separate -> both c0,c1 go left
    homologToPole(chromatids, 'c0', 0.75, -1, p);
    homologToPole(chromatids, 'c1', 0.75, disturb ? -1 : 1, p);
    homologToPole(chromatids, 'c2', -0.75, 1, p);
    homologToPole(chromatids, 'c3', -0.75, -1, p);
  } else if (id === 'telophase1') {
    cells.push({ id: 'L', x: -1.6, y: 0, r: 1.7, sx: 1 });
    cells.push({ id: 'R', x: 1.6, y: 0, r: 1.7, sx: 1 });
    organelleOpacity = 0.5;
    nuclei.push({ id: 'nL', x: -1.6, y: 0, r: 1.0 });
    nuclei.push({ id: 'nR', x: 1.6, y: 0, r: 1.0 });
    // L cell: c0,c3 ; R cell: c1,c2 (or disturb moves c1 to L)
    haploidCell(chromatids, -1.6, ['c0', 'c3']);
    haploidCell(chromatids, 1.6, disturb ? ['c2'] : ['c1', 'c2'], disturb ? ['c1'] : []);
  } else if (id === 'metaphase2' || id === 'anaphase2') {
    const ana = id === 'anaphase2';
    cells.push({ id: 'L', x: -1.8, y: 0, r: 1.7, sx: 1 });
    cells.push({ id: 'R', x: 1.8, y: 0, r: 1.7, sx: 1 });
    organelleOpacity = 0.35;
    spindles.push({ id: 'sL', poleA: [-1.8 - 1.0, 0, 0], poleB: [-1.8 + 1.0, 0, 0] });
    spindles.push({ id: 'sR', poleA: [1.8 - 1.0, 0, 0], poleB: [1.8 + 1.0, 0, 0] });
    meiosisIICell(chromatids, -1.8, ['c0', 'c3'], ana ? p : 0);
    meiosisIICell(chromatids, 1.8, ['c1', 'c2'], ana ? p : 0);
  } else if (id === 'telophase2') {
    organelleOpacity = lerp(0.5, 0.9, p);
    const xs = [-2.8, -0.85, 0.85, 2.8];
    const r = lerp(1.5, 1.15, p);
    xs.forEach((x, i) => {
      cells.push({ id: `q${i}`, x, y: 0, r, sx: 1 });
      nuclei.push({ id: `qn${i}`, x, y: 0, r: 0.75 });
    });
    // distribute chromatids to 4 cells
    finalCell(chromatids, -2.8, ['c0a', 'c3a']);
    finalCell(chromatids, -0.85, ['c0b', 'c3b']);
    finalCell(chromatids, 0.85, ['c1a', 'c2a']);
    finalCell(chromatids, 2.8, ['c1b', 'c2b']);
  }

  return { cells, nuclei, chromatids, spindles, organelleOpacity, camDist };
}

// a paired bivalent scattered in the nucleus (prophase I)
function bivalent(out: ChromatidTarget[], a: ChromId, b: ChromId, cx: number, cy: number, cz: number, recomb: boolean) {
  // homolog a on the left, homolog b on the right; sisters very close
  out.push(ct(`${a}a`, a, [cx - 0.2 - 0.05, cy, cz]));
  out.push(ct(`${a}b`, a, [cx - 0.2 + 0.05, cy, cz], recomb ? CHROM[b].color : undefined));
  out.push(ct(`${b}a`, b, [cx + 0.2 - 0.05, cy, cz], recomb ? CHROM[a].color : undefined));
  out.push(ct(`${b}b`, b, [cx + 0.2 + 0.05, cy, cz]));
}

// bivalent aligned on the metaphase-I plate (homologs offset along X so they separate L/R)
function bivalentPlate(out: ChromatidTarget[], a: ChromId, b: ChromId, y: number, flip: boolean) {
  const aSide = flip ? 0.24 : -0.24; // a goes to this side
  const bSide = -aSide;
  out.push(ct(`${a}a`, a, [aSide - 0.06, y, 0]));
  out.push(ct(`${a}b`, a, [aSide + 0.06, y, 0], CHROM[b].color));
  out.push(ct(`${b}a`, b, [bSide - 0.06, y, 0], CHROM[a].color));
  out.push(ct(`${b}b`, b, [bSide + 0.06, y, 0]));
}

// move a whole chromosome (both sisters together) to a pole during anaphase I
function homologToPole(out: ChromatidTarget[], c: ChromId, plateY: number, dir: number, p: number) {
  const x = lerp(0.24 * dir, POLE * dir, p);
  const y = plateY * (1 - 0.4 * p);
  out.push(ct(`${c}a`, c, [x - 0.06, y, 0]));
  out.push(ct(`${c}b`, c, [x + 0.06, y, 0]));
}

// a haploid cell after meiosis I: chromosomes (sisters together) spread vertically
function haploidCell(out: ChromatidTarget[], cx: number, chroms: ChromId[], extra: ChromId[] = []) {
  const all = [...chroms, ...extra];
  const ys = all.length > 1 ? [0.45, -0.45] : [0];
  all.forEach((c, i) => {
    const y = ys[i] ?? 0;
    out.push(ct(`${c}a`, c, [cx - 0.06, y, 0]));
    out.push(ct(`${c}b`, c, [cx + 0.06, y, 0]));
  });
}

// meiosis II: in a cell, sisters separate left/right (ana = progress)
function meiosisIICell(out: ChromatidTarget[], cx: number, chroms: ChromId[], ana: number) {
  const ys = [0.5, -0.5];
  chroms.forEach((c, i) => {
    const y = ys[i] * (1 - 0.35 * ana);
    const ax = cx + lerp(-0.12, -1.0, ana);
    const bx = cx + lerp(0.12, 1.0, ana);
    out.push(ct(`${c}a`, c, [ax, y, 0]));
    out.push(ct(`${c}b`, c, [bx, y, 0]));
  });
}

// final haploid cell (telophase II): place the listed chromatids by id
function finalCell(out: ChromatidTarget[], cx: number, ids: string[]) {
  const ys = [0.35, -0.35];
  ids.forEach((cid, i) => {
    const c = cid.slice(0, 2) as ChromId;
    out.push(ct(cid, c, [cx, ys[i] ?? 0, 0]));
  });
}

export function getLayout(mode: Mode, index: number, progress: number, disturb: boolean): SceneLayout {
  const id = phaseId(mode, index);
  const p = clamp01(progress);
  return mode === 'mitosis' ? mitosisLayout(id, p, disturb) : meiosisLayout(id, p, disturb);
}
