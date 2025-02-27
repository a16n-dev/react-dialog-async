import type { ComponentType } from 'react';

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

export type useDialogReturn<D, R> = {
  /**
   * Shows the dialog, and passes the provided data as props to the dialog
   * component. Returns a promise that resolves when the dialog is closed.
   *
   * The resolved value is the value passed to `handleClose` in the dialog
   * component.
   */
  show: (data: D) => Promise<R | undefined>;
  /**
   * Hides the dialog
   */
  hide: () => void;
  /**
   * Updates the data being passed to the dialog. This should only be called
   * when the dialog is already open, and you need to change the data on the fly
   */
  updateData: (data: D) => void;
  /**
   * Alias for `show`
   */
  open: (data: D) => Promise<R | undefined>;
  /**
   * Alias for `hide`
   */
  close: () => void;
};
