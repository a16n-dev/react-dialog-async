import { useContext } from 'react';
import {
  type DialogContextValue,
  IndividualDialogContext,
} from './IndividualDialogContext.js';

export const useDialogContext = <D = any, R = any>(): DialogContextValue<
  D,
  R
> => {
  return useContext(IndividualDialogContext);
};
