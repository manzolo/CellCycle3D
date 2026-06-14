export type Mode = 'mitosis' | 'meiosis';
export type CellType = 'animal' | 'plant';
export type Level = 'school' | 'university';
export type Lang = 'it' | 'en';

export interface LocalizedText {
  it: string;
  en: string;
}

export interface PhaseInfo {
  /** stable id, also used as i18n / animation key */
  id: string;
  /** display name */
  name: LocalizedText;
  /** short subtitle, e.g. "Meiosi I" */
  group?: LocalizedText;
  /** one-paragraph "what happens" */
  summary: LocalizedText;
  /** bullet list of key events */
  events: LocalizedText[];
  /** biological importance / notes (university level adds depth) */
  importance: LocalizedText;
  /** common mistakes / errors */
  pitfalls?: LocalizedText;
  /** relative duration weight used to time the auto-play animation */
  duration: number;
}

/** Identifiers for clickable structures in the 3D scene. */
export type StructureId =
  | 'membrane'
  | 'nucleus'
  | 'nucleolus'
  | 'chromosomes'
  | 'spindle'
  | 'centrosome'
  | 'golgi'
  | 'mitochondria'
  | 'cellplate';
