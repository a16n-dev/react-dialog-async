import { createContext } from 'react';
import { AsyncDialogComponent } from '../types';

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

const DialogStateContext = createContext<dialogStateContextState | null>(null);

export default DialogStateContext;
