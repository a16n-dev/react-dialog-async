import { createContext } from 'react';
import { DialogComponent } from './types';

export type dialogsStateData = Record<
  string,
  {
    key: string;
    dialog: DialogComponent<any, any>;
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
