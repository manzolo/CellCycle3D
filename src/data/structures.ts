import type { LocalizedText, StructureId } from '../types';

export interface StructureInfo {
  name: LocalizedText;
  description: LocalizedText;
  color: string;
}

export const STRUCTURES: Record<StructureId, StructureInfo> = {
  membrane: {
    name: { it: 'Membrana cellulare', en: 'Cell membrane' },
    description: {
      it: 'Doppio strato fosfolipidico che delimita la cellula e regola gli scambi con l’esterno. Nelle cellule vegetali è racchiusa da una parete cellulare rigida.',
      en: 'Phospholipid bilayer that bounds the cell and regulates exchange with the environment. In plant cells it is enclosed by a rigid cell wall.',
    },
    color: '#4cc9f0',
  },
  nucleus: {
    name: { it: 'Nucleo', en: 'Nucleus' },
    description: {
      it: 'Contiene il DNA organizzato in cromatina. Delimitato dall’involucro nucleare, scompare durante la prometafase e si riforma in telofase.',
      en: 'Contains DNA organised as chromatin. Bounded by the nuclear envelope, it disappears during prometaphase and reforms in telophase.',
    },
    color: '#7b8cff',
  },
  nucleolus: {
    name: { it: 'Nucleolo', en: 'Nucleolus' },
    description: {
      it: 'Regione densa del nucleo dove si assemblano i ribosomi. Scompare in profase e riappare in telofase.',
      en: 'Dense region of the nucleus where ribosomes are assembled. Disappears in prophase and reappears in telophase.',
    },
    color: '#b388ff',
  },
  chromosomes: {
    name: { it: 'Cromosomi', en: 'Chromosomes' },
    description: {
      it: 'DNA altamente condensato. Dopo la replicazione ogni cromosoma ha due cromatidi fratelli uniti dal centromero. Le coppie omologhe sono colorate in modo coordinato.',
      en: 'Highly condensed DNA. After replication each chromosome has two sister chromatids joined at the centromere. Homologous pairs are colour-matched.',
    },
    color: '#ff5d8f',
  },
  spindle: {
    name: { it: 'Fuso mitotico', en: 'Mitotic spindle' },
    description: {
      it: 'Struttura di microtubuli che muove i cromosomi. Comprende microtubuli cinetocorici, polari e astrali.',
      en: 'Microtubule structure that moves chromosomes. Includes kinetochore, polar and astral microtubules.',
    },
    color: '#8de8c3',
  },
  centrosome: {
    name: { it: 'Centrosoma', en: 'Centrosome' },
    description: {
      it: 'Centro organizzatore dei microtubuli (MTOC). Nelle cellule animali contiene una coppia di centrioli e nuclea il fuso ai poli.',
      en: 'Microtubule-organising centre (MTOC). In animal cells it contains a pair of centrioles and nucleates the spindle at the poles.',
    },
    color: '#ffd166',
  },
  golgi: {
    name: { it: 'Apparato di Golgi', en: 'Golgi apparatus' },
    description: {
      it: 'Sistema di cisterne che modifica, smista e impacchetta proteine e lipidi. Fornisce vescicole per la piastra cellulare nelle piante.',
      en: 'Stack of cisternae that modifies, sorts and packages proteins and lipids. Supplies vesicles for the cell plate in plants.',
    },
    color: '#f4a261',
  },
  mitochondria: {
    name: { it: 'Mitocondri', en: 'Mitochondria' },
    description: {
      it: 'Sede della respirazione cellulare e della produzione di ATP. Forniscono l’energia necessaria alla divisione.',
      en: 'Site of cellular respiration and ATP production. They supply the energy needed for division.',
    },
    color: '#ef6f6c',
  },
  cellplate: {
    name: { it: 'Piastra cellulare', en: 'Cell plate' },
    description: {
      it: 'Nelle cellule vegetali, nuova parete che si forma al centro durante la citocinesi a partire da vescicole del Golgi.',
      en: 'In plant cells, the new wall that forms at the centre during cytokinesis from Golgi vesicles.',
    },
    color: '#a7d8a0',
  },
};
