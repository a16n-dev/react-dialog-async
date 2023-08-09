import { ComponentType } from 'react';

export interface AsyncDialogProps<Request = void, Response = undefined> {
  open: boolean;
  handleClose: (data?: Response) => void;
  data: Request;
}

/**
 * Represents a dialog component that can be used with `useDialog`
 */
export type DialogComponent<D, R> = ComponentType<AsyncDialogProps<D, R>>;

/**
 * Used internally to store all info relating to a single dialog
 */
export interface dialogStateItem {
  /**
   * The dialog component to render
   */
  Component: DialogComponent<unknown, unknown>;
  /**
   * Represents if the dialog is currently visible
   */
  isOpen: boolean;
  /**
   * The data that should be passed to the dialog
   */
  data?: unknown;
  /**
   * The function that should be called when the dialog is closed
   */
  resolve?: (value: unknown) => void;
}
