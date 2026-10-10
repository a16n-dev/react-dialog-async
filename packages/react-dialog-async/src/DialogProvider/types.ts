import type { PropsWithChildren, ReactNode } from 'react';

export interface DialogProviderProps extends PropsWithChildren {
  /**
   * The default delay in milliseconds to wait before unmounting a dialog after it's closed.
   * @default 300
   */
  defaultUnmountDelayInMs?: number;
  /**
   * Renders every dialog inside its own `<Suspense/>` boundary, so a dialog
   * that suspends - because it lazily loads its component, or reads data with
   * `use()` - shows `suspenseFallback` in place of itself, rather than the
   * fallback of a boundary further up the tree.
   *
   * This also changes `useDialogLazy` to load its component through
   * `React.lazy`, meaning `open()` no longer waits for the component to be
   * fetched before the dialog is shown.
   *
   * @default true if `suspenseFallback` is set, otherwise false
   */
  suspense?: boolean;
  /**
   * Rendered in place of a dialog while that dialog is suspended. Setting this
   * enables `suspense`.
   *
   * The fallback renders inside the dialog's context, so it can call
   * `useDialogContext()`.
   */
  suspenseFallback?: ReactNode;
}
