import type { ComponentType } from 'react';

export interface AsyncDialogProps<Request = void, Response = undefined> {
  open: boolean;
  mounted: boolean;
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

export type useDialogReturn<D, R, DE extends D | undefined> = {
  /**
   * Shows the dialog, and passes the provided data as props to the dialog
   * component. Returns a promise that resolves when the dialog is closed.
   *
   * The resolved value is the value passed to `handleClose` in the dialog
   * component.
   */
  show: DE extends undefined
    ? (data: D) => Promise<R | undefined>
    : (data?: D) => Promise<R | undefined>;
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
  open: DE extends undefined
    ? (data: D) => Promise<R | undefined>
    : () => Promise<R | undefined>;
  /**
   * Alias for `hide`
   */
  close: () => void;
};

export type useDialogOptions<D, DE extends D | undefined> = {
  /**
   * Default data to pass to the dialog when .show() is called
   */
  defaultData?: DE;
  /**
   * A custom key to register this dialog against
   */
  customKey?: string;
  /**
   * If specified, the dialog will remain mounted for this many milliseconds.
   * Useful for allowing a close animation to play before unmounting the dialog.
   */
  unmountDelayInMs?: number;
  /**
   * By default, the dialog will be hidden if the hook is unmounted. Set this to
   * false if you want the dialog to remain open even when the hook is unmounted.
   * @default true
   */
  hideOnHookUnmount?: boolean;
};

export type useDialogStateReturn = {
  /**
   * Information about all currently open dialogs
   */
  openDialogs: Array<{
    dialog: DialogComponent<any, any>;
    id: string;
    data: any;
    open: boolean;
  }>;
};
