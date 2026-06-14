import type { Lang } from '../types';

type Dict = Record<string, { it: string; en: string }>;

const UI: Dict = {
  title: { it: 'CellCycle 3D', en: 'CellCycle 3D' },
  subtitle: { it: 'Simulatore di divisione cellulare', en: 'Cell division simulator' },

  mitosis: { it: 'Mitosi', en: 'Mitosis' },
  meiosis: { it: 'Meiosi', en: 'Meiosis' },
  compare: { it: 'Confronto', en: 'Compare' },

  animal: { it: 'Animale', en: 'Animal' },
  plant: { it: 'Vegetale', en: 'Plant' },

  school: { it: 'Liceo', en: 'High school' },
  university: { it: 'Università', en: 'University' },

  play: { it: 'Play', en: 'Play' },
  pause: { it: 'Pausa', en: 'Pause' },
  prev: { it: 'Indietro', en: 'Previous' },
  next: { it: 'Avanti', en: 'Next' },
  restart: { it: 'Riavvia', en: 'Restart' },
  speed: { it: 'Velocità', en: 'Speed' },

  phase: { it: 'Fase', en: 'Phase' },
  showDetails: { it: 'Dettagli', en: 'Details' },
  hideDetails: { it: 'Riduci', en: 'Collapse' },
  whatHappens: { it: 'Cosa succede', en: 'What happens' },
  keyEvents: { it: 'Eventi chiave', en: 'Key events' },
  importance: { it: 'Importanza biologica', en: 'Biological importance' },
  pitfalls: { it: 'Errori comuni', en: 'Common mistakes' },

  structure: { it: 'Struttura selezionata', en: 'Selected structure' },
  clickHint: { it: 'Clicca su una struttura per i dettagli', en: 'Click a structure for details' },
  close: { it: 'Chiudi', en: 'Close' },

  cellType: { it: 'Tipo di cellula', en: 'Cell type' },
  level: { it: 'Livello', en: 'Level' },
  language: { it: 'Lingua', en: 'Language' },
  settings: { it: 'Impostazioni', en: 'Settings' },

  disturb: { it: 'Simula errore (nondisgiunzione)', en: 'Simulate error (nondisjunction)' },
  disturbOn: { it: 'Errore attivo', en: 'Error active' },
  disturbHint: {
    it: 'Quando attivo, in anafase una coppia non si separa correttamente: cellule figlie aneuploidi.',
    en: 'When active, one pair fails to separate at anaphase: aneuploid daughter cells.',
  },

  legend: { it: 'Legenda', en: 'Legend' },
  controls3d: { it: 'Trascina per ruotare · rotella per zoom', en: 'Drag to rotate · scroll to zoom' },
  guide: { it: 'Guida', en: 'Guide' },

  result: { it: 'Risultato', en: 'Result' },
  mitosisResult: { it: '2 cellule figlie diploidi identiche', en: '2 identical diploid daughter cells' },
  meiosisResult: { it: '4 cellule figlie aploidi variabili', en: '4 variable haploid daughter cells' },
};

export function t(key: keyof typeof UI | string, lang: Lang): string {
  const entry = UI[key];
  return entry ? entry[lang] : key;
}
