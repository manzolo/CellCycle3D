import { createContext, useContext } from 'react';
import type { MutableRefObject } from 'react';
import type { SceneLayout } from './layout';

export type LayoutRef = MutableRefObject<SceneLayout>;

export const LayoutContext = createContext<LayoutRef | null>(null);

export function useLayoutRef(): LayoutRef {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error('useLayoutRef must be used inside <CellScene>');
  return ctx;
}
