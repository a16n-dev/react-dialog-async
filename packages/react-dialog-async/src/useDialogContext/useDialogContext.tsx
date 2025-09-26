import { useContext } from 'react';
import {
  IndividualDialogStateContext,
  type IndividualDialogStateContextValue,
} from './IndividualDialogStateContext.js';

export const useDialogContext = <
  D = any,
  R = any,
>(): IndividualDialogStateContextValue<D, R> => {
  return useContext(IndividualDialogStateContext);
};
