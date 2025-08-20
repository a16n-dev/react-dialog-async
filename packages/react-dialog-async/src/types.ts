import type { ComponentType } from 'react';

export interface AsyncDialogProps<Request = void, Response = undefined> {
  open: boolean;
  focused: boolean;
  /**
   * @deprecated - This prop will always be set to true. It will be removed in the next major version
   */
  mounted: true;
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
   * @Deprecated - use `dialog.open()` instead. Read more here: https://react-dialog-async.a16n.dev/blog/2025/08/19/deprecating-show-hide
   */
  show: DE extends undefined
    ? (data: D) => Promise<R | undefined>
    : (data?: D) => Promise<R | undefined>;
  /**
   * @Deprecated - use `dialog.close()` instead. Read more here: https://react-dialog-async.a16n.dev/blog/2025/08/19/deprecating-show-hide
   */
  hide: () => void;
  /**
   * Updates the data being passed to the dialog. This should only be called
   * when the dialog is already open, and you need to change the data on the fly
   */
  updateData: (data: D) => void;
  /**
   * opens the dialog, and passes the provided data as props to the dialog
   * component. Returns a promise that resolves when the dialog is closed.
   *
   * The promise will resolve to the value that is passed to `handleClose`
   * within the dialog component.
   */
  open: DE extends undefined
    ? (data: D) => Promise<R | undefined>
    : (data?: D) => Promise<R | undefined>;
  /**
   * Force closes the dialog. Generally avoid calling this method as it can
   * lead to poor user experience
   */
  close: () => void;
};

export type useDialogOptions<D, DE extends D | undefined> = {
  /**
   * Default data to pass to the dialog when .open() is called
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
