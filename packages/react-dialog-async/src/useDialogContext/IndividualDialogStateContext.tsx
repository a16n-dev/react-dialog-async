import { createContext } from 'react';
import type { AsyncDialogProps } from '../types.js';

export interface IndividualDialogStateContextValue<D = any, R = any>
  extends AsyncDialogProps<D, R> {
  isInsideDialogContext: boolean;
}

const defaultDialogContextValue: IndividualDialogStateContextValue = {
  open: false,
  focused: false,
  mounted: true,
  handleClose: () => {},
  data: undefined,
  isInsideDialogContext: false,
};

export const IndividualDialogStateContext =
  createContext<IndividualDialogStateContextValue>(defaultDialogContextValue);
