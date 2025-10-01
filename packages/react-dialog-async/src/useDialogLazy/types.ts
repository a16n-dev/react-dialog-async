import type { useDialogReturn } from '../useDialog/types.js';

export type useDialogLazyReturn<
  D,
  R,
  DE extends D | undefined,
> = useDialogReturn<D, R, DE> & {
  /**
   * Call this method to preload the dialog ahead of time. If you don't call this method,
   * the dialog component will be loaded the first time dialog.open() is called.
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
