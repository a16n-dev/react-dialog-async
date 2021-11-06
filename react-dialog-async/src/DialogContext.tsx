import { createContext } from "react";
import { DialogComponent } from "./types";

export interface dialogContextState {
    register: (obj: DialogComponent<any, any>) => string;
    unregister: (dialogId: string) => void;
    show: (dialogId: string, data: unknown) => Promise<any>;
    hide: (dialogId: string) => void;
    updateData: (dialogId: string, data: unknown) => void;
  }

const DialogContext = createContext<dialogContextState>({
    register: () => '',
    unregister: () => {},
    show: async () => {},
    hide: () => {},
    updateData: () => {}
  });

export default DialogContext;