import type { PropsWithChildren } from 'react';

export interface DialogProviderProps extends PropsWithChildren {
  /**
   * The default delay in milliseconds to wait before unmounting a dialog after it's closed.
   */
  defaultUnmountDelayInMs?: number;
}
