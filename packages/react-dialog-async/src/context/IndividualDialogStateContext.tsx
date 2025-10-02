import { createContext } from 'react';
import type { AsyncDialogProps } from '../types.js';

export interface IndividualDialogStateContextValue<D = any, R = any>
  extends AsyncDialogProps<D, R> {
  isInsideDialogContext: boolean;
}

const defaultDialogContextValue: IndividualDialogStateContextValue = {
  isOpen: false,
  isFocused: false,
  handleClose: () => {},
  data: undefined,
  isInsideDialogContext: false,
};

export const IndividualDialogStateContext =
  createContext<IndividualDialogStateContextValue>(defaultDialogContextValue);
