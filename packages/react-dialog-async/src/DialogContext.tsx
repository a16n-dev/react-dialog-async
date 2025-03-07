import { createContext } from 'react';
import { DialogComponent } from './types';

export interface dialogContextState {
  show: (
    dialogId: string,
    dialog: DialogComponent<any, any>,
    data: unknown,
    unmountDelay?: number,
  ) => Promise<any>;
  hide: (dialogId: string) => void;
  updateData: (dialogId: string, data: unknown) => void;
}

const DialogContext = createContext<dialogContextState | null>(null);

export default DialogContext;
