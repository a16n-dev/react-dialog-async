import { createContext, useContext } from 'react';
import { AsyncDialogProps } from '../types';

interface DialogContextValue<D = any, R = any> extends AsyncDialogProps<D, R> {
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

const IndividualDialogContext = createContext<DialogContextValue>(
  defaultDialogContextValue,
);

export const useDialogContext = <D = any, R = any>(): DialogContextValue<
  D,
  R
> => {
  return useContext(IndividualDialogContext);
};

export default IndividualDialogContext;
