import type { ComponentType } from 'react';

export interface AsyncDialogProps<Request = void, Response = undefined> {
  /**
   * Boolean indicating if the dialog is open or not
   *
   */
  isOpen: boolean;
  /**
   * Boolean indicating if this dialog is the focused dialog. Useful for applying different visual states when
   * multiple dialogs are open at once
   */
  isFocused: boolean;
  /**
   * Call this function to close the dialog
   * @param data - This value will be used to resolve the promise that was returned when opening the dialog
   */
  handleClose: (data?: Response) => void;
  /**
   * Data that was passed to the dialog when it was opened
   */
  data: Request;
}

/**
 * Represents a dialog component that can be used with `useDialog`
 */
export type AsyncDialogComponent<D, R> = ComponentType<AsyncDialogProps<D, R>>;
