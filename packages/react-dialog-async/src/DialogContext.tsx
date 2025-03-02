import { createContext } from 'react';
import { DialogComponent } from './types';

export interface dialogContextState {
  /**
   * Register the dialog with the provider.
   * @param id - uniquely identifies this instance of calling useDialog()
   * @param key - identifies the dialog being used. This doesn't have to be unique.
   * @param obj - the dialog component to be registered
   */
  register: (
    id: string,
    key: string,
    obj: DialogComponent<any, any>,
  ) => () => void;
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
