import { createContext } from 'react';
import type { AsyncDialogComponent } from '../types.js';

export interface DialogActionsContextValue {
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

export const DialogActionsContext =
  createContext<DialogActionsContextValue | null>(null);
