import { useContext } from 'react';
import {
  IndividualDialogStateContext,
  type IndividualDialogStateContextValue,
} from '../context/IndividualDialogStateContext.js';

export const useDialogContext = <
  D = any,
  R = any,
>(): IndividualDialogStateContextValue<D, R> => {
  return useContext(IndividualDialogStateContext);
};
