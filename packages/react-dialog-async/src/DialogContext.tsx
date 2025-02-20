import { createContext } from 'react';
import { DialogComponent } from './types';

export interface dialogContextState {
  register: (id: string, obj: DialogComponent<any, any>) => () => void;
  show: (dialogId: string, data: unknown) => Promise<any>;
  hide: (dialogId: string) => void;
  updateData: (dialogId: string, data: unknown) => void;
}

const DialogContext = createContext<dialogContextState>({
  register: () => () => {},
  show: async () => {},
  hide: () => {},
  updateData: () => {},
});

export default DialogContext;
