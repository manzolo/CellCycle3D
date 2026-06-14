import type { Mode, PhaseInfo } from '../types';

// Scientific content follows standard university references
// (Alberts, Molecular Biology of the Cell; Campbell Biology).

const MITOSIS: PhaseInfo[] = [
  {
    id: 'interphase',
    name: { it: 'Interfase', en: 'Interphase' },
    duration: 1.2,
    summary: {
      it: 'La cellula cresce e duplica il proprio DNA. La cromatina è decondensata e il nucleo è ben definito con uno o più nucleoli.',
      en: 'The cell grows and replicates its DNA. Chromatin is decondensed and the nucleus is well defined with one or more nucleoli.',
    },
    events: [
      { it: 'Fasi G1, S e G2', en: 'G1, S and G2 sub-phases' },
      { it: 'Replicazione del DNA (fase S)', en: 'DNA replication (S phase)' },
      { it: 'Duplicazione del centrosoma', en: 'Centrosome duplication' },
    ],
    importance: {
      it: 'Prepara la cellula alla divisione: ogni cromosoma viene duplicato in due cromatidi fratelli uniti dal centromero.',
      en: 'Prepares the cell for division: each chromosome is duplicated into two sister chromatids joined at the centromere.',
    },
    pitfalls: {
      it: 'L’interfase non fa parte della mitosi vera e propria, ma del ciclo cellulare. Non è una "fase di riposo".',
      en: 'Interphase is part of the cell cycle, not of mitosis itself. It is not a "resting phase".',
    },
  },
  {
    id: 'prophase',
    name: { it: 'Profase', en: 'Prophase' },
    duration: 1,
    summary: {
      it: 'La cromatina si condensa in cromosomi visibili. I centrosomi migrano ai poli opposti e iniziano a organizzare il fuso mitotico.',
      en: 'Chromatin condenses into visible chromosomes. The centrosomes migrate to opposite poles and begin to organise the mitotic spindle.',
    },
    events: [
      { it: 'Condensazione dei cromosomi', en: 'Chromosome condensation' },
      { it: 'Migrazione dei centrosomi ai poli', en: 'Centrosomes migrate to the poles' },
      { it: 'Scomparsa del nucleolo', en: 'Nucleolus disappears' },
    ],
    importance: {
      it: 'La condensazione protegge il DNA e ne permette il movimento ordinato evitando rotture.',
      en: 'Condensation protects DNA and allows ordered movement while avoiding breakage.',
    },
  },
  {
    id: 'prometaphase',
    name: { it: 'Prometafase', en: 'Prometaphase' },
    duration: 0.9,
    summary: {
      it: 'L’involucro nucleare si frammenta. I microtubuli del fuso si attaccano ai cinetocori dei cromosomi.',
      en: 'The nuclear envelope breaks down. Spindle microtubules attach to the kinetochores of the chromosomes.',
    },
    events: [
      { it: 'Disgregazione dell’involucro nucleare', en: 'Nuclear envelope breakdown' },
      { it: 'Attacco dei microtubuli ai cinetocori', en: 'Microtubules attach to kinetochores' },
      { it: 'Movimenti oscillatori dei cromosomi', en: 'Oscillatory chromosome movements' },
    ],
    importance: {
      it: 'L’attacco bipolare corretto è verificato dal checkpoint del fuso (SAC) prima di procedere.',
      en: 'Correct bipolar attachment is verified by the spindle assembly checkpoint (SAC) before proceeding.',
    },
  },
  {
    id: 'metaphase',
    name: { it: 'Metafase', en: 'Metaphase' },
    duration: 1,
    summary: {
      it: 'I cromosomi si allineano sulla piastra metafasica (equatore della cellula), ciascuno attaccato a entrambi i poli.',
      en: 'Chromosomes line up on the metaphase plate (cell equator), each attached to both poles.',
    },
    events: [
      { it: 'Allineamento sulla piastra metafasica', en: 'Alignment on the metaphase plate' },
      { it: 'Tensione bipolare sui cinetocori', en: 'Bipolar tension on kinetochores' },
      { it: 'Checkpoint del fuso (SAC) soddisfatto', en: 'Spindle checkpoint (SAC) satisfied' },
    ],
    importance: {
      it: 'L’allineamento garantisce che ogni cellula figlia riceva una copia di ciascun cromosoma.',
      en: 'Alignment ensures each daughter cell receives one copy of each chromosome.',
    },
    pitfalls: {
      it: 'I cromosomi non si allineano "a caso": la tensione e il SAC bloccano l’anafase finché tutti sono attaccati correttamente.',
      en: 'Chromosomes do not align "randomly": tension and the SAC block anaphase until all are correctly attached.',
    },
  },
  {
    id: 'anaphase',
    name: { it: 'Anafase', en: 'Anaphase' },
    duration: 1,
    summary: {
      it: 'I cromatidi fratelli si separano e migrano verso i poli opposti, trainati dall’accorciamento dei microtubuli cinetocorici.',
      en: 'Sister chromatids separate and move to opposite poles, pulled by the shortening of kinetochore microtubules.',
    },
    events: [
      { it: 'Separazione dei cromatidi fratelli (coesina tagliata)', en: 'Sister chromatid separation (cohesin cleaved)' },
      { it: 'Migrazione ai poli (anafase A)', en: 'Poleward migration (anaphase A)' },
      { it: 'Allungamento del fuso (anafase B)', en: 'Spindle elongation (anaphase B)' },
    ],
    importance: {
      it: 'La separazione equa è il momento in cui si garantisce la corretta distribuzione del materiale genetico.',
      en: 'Equal separation is the moment that guarantees correct distribution of the genetic material.',
    },
    pitfalls: {
      it: 'Una mancata separazione (nondisgiunzione) porta a cellule figlie con numero anomalo di cromosomi (aneuploidia).',
      en: 'Failure to separate (nondisjunction) leads to daughter cells with an abnormal chromosome number (aneuploidy).',
    },
  },
  {
    id: 'telophase',
    name: { it: 'Telofase', en: 'Telophase' },
    duration: 0.9,
    summary: {
      it: 'Si riformano due involucri nucleari attorno ai cromosomi ai poli, che iniziano a decondensarsi. Riappare il nucleolo.',
      en: 'Two nuclear envelopes reform around the chromosomes at the poles, which begin to decondense. The nucleolus reappears.',
    },
    events: [
      { it: 'Riformazione degli involucri nucleari', en: 'Nuclear envelopes reform' },
      { it: 'Decondensazione dei cromosomi', en: 'Chromosome decondensation' },
      { it: 'Disassemblaggio del fuso', en: 'Spindle disassembly' },
    ],
    importance: {
      it: 'Ripristina due nuclei funzionali, ciascuno geneticamente identico a quello della cellula madre.',
      en: 'Restores two functional nuclei, each genetically identical to the parent cell.',
    },
  },
  {
    id: 'cytokinesis',
    name: { it: 'Citocinesi', en: 'Cytokinesis' },
    duration: 1,
    summary: {
      it: 'Il citoplasma si divide. Nelle cellule animali un anello contrattile forma un solco di clivaggio; nelle vegetali si forma la piastra cellulare.',
      en: 'The cytoplasm divides. In animal cells a contractile ring forms a cleavage furrow; in plant cells a cell plate forms.',
    },
    events: [
      { it: 'Anello contrattile di actina/miosina (animali)', en: 'Actin/myosin contractile ring (animals)' },
      { it: 'Formazione della piastra cellulare (vegetali)', en: 'Cell plate formation (plants)' },
      { it: 'Due cellule figlie diploidi (2n)', en: 'Two diploid (2n) daughter cells' },
    ],
    importance: {
      it: 'Completa la divisione producendo due cellule figlie geneticamente identiche alla madre.',
      en: 'Completes division producing two daughter cells genetically identical to the parent.',
    },
  },
];

const MEIOSIS: PhaseInfo[] = [
  {
    id: 'interphase',
    name: { it: 'Interfase', en: 'Interphase' },
    group: { it: 'Premeiotica', en: 'Pre-meiotic' },
    duration: 1.1,
    summary: {
      it: 'Come nella mitosi, il DNA viene replicato. La cellula diploide (2n) entra nella meiosi con cromosomi formati da due cromatidi fratelli.',
      en: 'As in mitosis, DNA is replicated. The diploid (2n) cell enters meiosis with chromosomes made of two sister chromatids.',
    },
    events: [
      { it: 'Replicazione del DNA (fase S)', en: 'DNA replication (S phase)' },
      { it: 'Duplicazione del centrosoma', en: 'Centrosome duplication' },
    ],
    importance: {
      it: 'Una sola replicazione del DNA è seguita da due divisioni: questo dimezza il numero cromosomico.',
      en: 'A single round of DNA replication is followed by two divisions: this halves the chromosome number.',
    },
  },
  {
    id: 'prophase1',
    name: { it: 'Profase I', en: 'Prophase I' },
    group: { it: 'Meiosi I', en: 'Meiosis I' },
    duration: 1.4,
    summary: {
      it: 'I cromosomi omologhi si appaiano (sinapsi) formando bivalenti. Avviene il crossing-over: scambio di segmenti tra cromatidi non fratelli ai chiasmi.',
      en: 'Homologous chromosomes pair up (synapsis) forming bivalents. Crossing-over occurs: exchange of segments between non-sister chromatids at chiasmata.',
    },
    events: [
      { it: 'Sinapsi e formazione del complesso sinaptonemale', en: 'Synapsis and synaptonemal complex formation' },
      { it: 'Crossing-over ai chiasmi', en: 'Crossing-over at chiasmata' },
      { it: 'Sotto-stadi: leptotene, zigotene, pachitene, diplotene, diacinesi', en: 'Sub-stages: leptotene, zygotene, pachytene, diplotene, diakinesis' },
    ],
    importance: {
      it: 'Il crossing-over genera ricombinazione genetica: è una fonte primaria di variabilità.',
      en: 'Crossing-over generates genetic recombination: a primary source of variability.',
    },
    pitfalls: {
      it: 'Il crossing-over avviene tra cromatidi NON fratelli di cromosomi omologhi, non tra cromatidi fratelli.',
      en: 'Crossing-over occurs between NON-sister chromatids of homologous chromosomes, not between sister chromatids.',
    },
  },
  {
    id: 'metaphase1',
    name: { it: 'Metafase I', en: 'Metaphase I' },
    group: { it: 'Meiosi I', en: 'Meiosis I' },
    duration: 1,
    summary: {
      it: 'I bivalenti (coppie di omologhi) si allineano sulla piastra metafasica. L’orientamento di ogni coppia è casuale (assortimento indipendente).',
      en: 'Bivalents (homolog pairs) align on the metaphase plate. The orientation of each pair is random (independent assortment).',
    },
    events: [
      { it: 'Allineamento dei bivalenti', en: 'Alignment of bivalents' },
      { it: 'Assortimento indipendente degli omologhi', en: 'Independent assortment of homologs' },
    ],
    importance: {
      it: 'L’assortimento indipendente moltiplica le combinazioni genetiche possibili (2^n).',
      en: 'Independent assortment multiplies the possible genetic combinations (2^n).',
    },
    pitfalls: {
      it: 'A differenza della mitosi, qui si allineano COPPIE di omologhi, non singoli cromosomi.',
      en: 'Unlike mitosis, here PAIRS of homologs align, not single chromosomes.',
    },
  },
  {
    id: 'anaphase1',
    name: { it: 'Anafase I', en: 'Anaphase I' },
    group: { it: 'Meiosi I', en: 'Meiosis I' },
    duration: 1,
    summary: {
      it: 'I cromosomi omologhi si separano e migrano ai poli opposti. I cromatidi fratelli restano uniti.',
      en: 'Homologous chromosomes separate and move to opposite poles. Sister chromatids remain joined.',
    },
    events: [
      { it: 'Separazione degli omologhi (riduzione a n)', en: 'Separation of homologs (reduction to n)' },
      { it: 'I cromatidi fratelli rimangono uniti', en: 'Sister chromatids stay together' },
    ],
    importance: {
      it: 'È la divisione riduzionale: il numero di cromosomi passa da diploide (2n) ad aploide (n).',
      en: 'This is the reductional division: chromosome number goes from diploid (2n) to haploid (n).',
    },
    pitfalls: {
      it: 'Nondisgiunzione in anafase I → gameti con un cromosoma omologo in più o in meno (es. trisomie).',
      en: 'Nondisjunction in anaphase I → gametes with an extra or missing homolog (e.g. trisomies).',
    },
  },
  {
    id: 'telophase1',
    name: { it: 'Telofase I e Citocinesi', en: 'Telophase I & Cytokinesis' },
    group: { it: 'Meiosi I', en: 'Meiosis I' },
    duration: 0.9,
    summary: {
      it: 'Si formano due cellule aploidi, ciascuna con cromosomi ancora costituiti da due cromatidi fratelli. Spesso segue una breve interfase senza replicazione (intercinesi).',
      en: 'Two haploid cells form, each with chromosomes still made of two sister chromatids. A short interphase with no replication (interkinesis) often follows.',
    },
    events: [
      { it: 'Due cellule aploidi (n)', en: 'Two haploid (n) cells' },
      { it: 'Intercinesi (nessuna replicazione del DNA)', en: 'Interkinesis (no DNA replication)' },
    ],
    importance: {
      it: 'Le cellule figlie sono aploidi ma ogni cromosoma ha ancora due cromatidi, da separare in Meiosi II.',
      en: 'Daughter cells are haploid but each chromosome still has two chromatids, to be separated in Meiosis II.',
    },
  },
  {
    id: 'metaphase2',
    name: { it: 'Metafase II', en: 'Metaphase II' },
    group: { it: 'Meiosi II', en: 'Meiosis II' },
    duration: 1,
    summary: {
      it: 'In ciascuna cellula aploide i cromosomi si allineano singolarmente sulla piastra metafasica, come in una mitosi.',
      en: 'In each haploid cell the chromosomes align individually on the metaphase plate, as in mitosis.',
    },
    events: [
      { it: 'Allineamento dei singoli cromosomi', en: 'Alignment of individual chromosomes' },
      { it: 'Nuovo fuso in ciascuna cellula', en: 'New spindle in each cell' },
    ],
    importance: {
      it: 'Prepara la separazione dei cromatidi fratelli, simile alla metafase mitotica.',
      en: 'Sets up sister-chromatid separation, similar to mitotic metaphase.',
    },
  },
  {
    id: 'anaphase2',
    name: { it: 'Anafase II', en: 'Anaphase II' },
    group: { it: 'Meiosi II', en: 'Meiosis II' },
    duration: 1,
    summary: {
      it: 'I cromatidi fratelli finalmente si separano e migrano ai poli opposti in ciascuna cellula.',
      en: 'Sister chromatids finally separate and migrate to opposite poles in each cell.',
    },
    events: [
      { it: 'Separazione dei cromatidi fratelli', en: 'Sister chromatid separation' },
      { it: 'Equazionale (come la mitosi)', en: 'Equational division (like mitosis)' },
    ],
    importance: {
      it: 'È la divisione equazionale: separa i cromatidi mantenendo il numero aploide.',
      en: 'This is the equational division: it separates chromatids while keeping the haploid number.',
    },
  },
  {
    id: 'telophase2',
    name: { it: 'Telofase II e Citocinesi', en: 'Telophase II & Cytokinesis' },
    group: { it: 'Meiosi II', en: 'Meiosis II' },
    duration: 1,
    summary: {
      it: 'Si formano quattro cellule figlie aploidi (n), geneticamente diverse tra loro e dalla cellula madre.',
      en: 'Four haploid (n) daughter cells form, genetically different from each other and from the parent cell.',
    },
    events: [
      { it: 'Quattro gameti aploidi (n)', en: 'Four haploid (n) gametes' },
      { it: 'Riformazione dei nuclei', en: 'Nuclei reform' },
      { it: 'Variabilità genetica unica', en: 'Unique genetic variability' },
    ],
    importance: {
      it: 'Produce gameti: la fecondazione ne ricombinerà due ripristinando la diploidia.',
      en: 'Produces gametes: fertilisation will recombine two of them restoring diploidy.',
    },
  },
];

export const PHASES: Record<Mode, PhaseInfo[]> = {
  mitosis: MITOSIS,
  meiosis: MEIOSIS,
};
