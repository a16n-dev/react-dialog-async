import type { AsyncDialogComponent } from '../types.js';
import type { useDialogReturn } from '../useDialog/types.js';

/**
 * Loads a dialog component, either directly or as the default export of a
 * module (i.e. the result of a dynamic `import()`).
 */
export type DialogComponentLoader<D, R> = () => Promise<
  AsyncDialogComponent<D, R> | { default: AsyncDialogComponent<D, R> }
>;

export type useDialogLazyReturn<
  D,
  R,
  DE extends D | undefined,
> = useDialogReturn<D, R, DE> & {
  /**
   * Call this method to preload the dialog ahead of time. If you don't call this method,
   * the dialog component will be loaded the first time dialog.open() is called.
   *
   * When suspense is enabled, preloading warms the module cache so that the
   * dialog resolves without ever showing the suspense fallback.
   *
   * Example usage:
   * ```tsx
   * const myDialog = useDialogLazy(() => import('./MyDialog'));
   *
   * return (
   *   <button
   *     onMouseOver={() => myDialog.preload()}
   *     onClick={() => myDialog.open()}
   *   >
   *     Open Dialog
   *   </button>
   * );
   * ```
   */
  preload: () => Promise<void>;
};
