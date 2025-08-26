import { createContext } from 'react';
import { AsyncDialogComponent } from '../types';

export interface dialogContextState {
  show: (
    dialogId: string,
    hash: number,
    dialog: AsyncDialogComponent<any, any>,
    data: unknown,
    unmountDelay?: number,
  ) => Promise<any>;
  hide: (dialogId: string, data?: any) => void;
  updateData: (dialogId: string, data: unknown) => void;
}

const DialogContext = createContext<dialogContextState | null>(null);

export default DialogContext;
