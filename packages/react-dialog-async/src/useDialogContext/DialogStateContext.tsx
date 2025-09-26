import { createContext } from 'react';
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

export type dialogStateContextState = {
  setIsUsingOutlet: (value: boolean) => void;
  dialogs: dialogsStateData;
};

export const DialogStateContext = createContext<dialogStateContextState | null>(
  null,
);
