import type { AsyncDialogComponent, AsyncDialogProps } from '../types.js';
import { IndividualDialogStateContext } from '../context/IndividualDialogStateContext.js';

export type StaticDialogProps<D, R> = {
  dialog: AsyncDialogComponent<D, R>;
  isOpen: boolean;
  data?: D;
  onClose: (result?: R) => void;
} & (
  | {
      isOpen: true;
      data: D;
    }
  | { isOpen: false; data?: D }
);

export const StaticDialog = <D, R>({
  dialog: Component,
  onClose,
  isOpen,
  data,
}: StaticDialogProps<D, R>) => {
  const props: AsyncDialogProps<D, R> = {
    data,
    handleClose: onClose,
    isFocused: true,
    isOpen,
  };

  const ctxValue = {
    ...props,
    isInsideDialogContext: true,
  };

  return (
    <IndividualDialogStateContext value={ctxValue}>
      <Component {...props} />
    </IndividualDialogStateContext>
  );
};
