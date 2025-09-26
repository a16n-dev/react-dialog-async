import { createContext } from 'react';
import type { AsyncDialogProps } from '../types.js';

export interface DialogContextValue<D = any, R = any>
  extends AsyncDialogProps<D, R> {
  isInsideDialogContext: boolean;
}

const defaultDialogContextValue: DialogContextValue = {
  open: false,
  focused: false,
  mounted: true,
  handleClose: () => {},
  data: undefined,
  isInsideDialogContext: false,
};

export const IndividualDialogContext = createContext<DialogContextValue>(
  defaultDialogContextValue,
);
