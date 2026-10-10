import { createContext, type ReactNode } from 'react';
import type { AsyncDialogComponent } from '../types.js';

export type dialogsStateData = Record<
  string,
  {
    dialog: AsyncDialogComponent<any, any>;
    hash: number;
    data: unknown;
    open: boolean;
    resolve?: (value?: unknown) => void;
    unmountDelay?: number;
  }
>;

export type GlobalDialogStateContextValue = {
  setIsUsingOutlet: (value: boolean) => void;
  dialogs: dialogsStateData;
  /**
   * Rendered in place of a dialog while it is suspended, as configured on the
   * `<DialogProvider/>`.
   */
  suspenseFallback?: ReactNode;
  /**
   * Whether dialogs are rendered inside a `<Suspense/>` boundary, as configured
   * on the `<DialogProvider/>`.
   */
  suspense: boolean;
};

export const GlobalDialogStateContext =
  createContext<GlobalDialogStateContextValue | null>(null);
