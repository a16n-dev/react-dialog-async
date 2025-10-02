import { useCallback, useContext, useEffect, useId, useRef } from 'react';
import type { AsyncDialogComponent } from '../types.js';
import type { useDialogOptions, useDialogReturn } from './types.js';
import { DialogActionsContext } from '../context/DialogActionsContext.js';

/**
 * @category Hooks
 */
export function useDialog<D, R, DE extends D | undefined>(
  component: AsyncDialogComponent<D, R>,
  options?: useDialogOptions<D, DE>,
): useDialogReturn<D, R, DE> {
  const idCount = useRef(0);
  const id = useId();

  const ctx = useContext(DialogActionsContext);

  if (!ctx) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }

  useEffect(() => {
    return () => {
      if (options?.persistOnUnmount !== true) {
        ctx.hide(id);
      }
    };
  }, [id, options?.persistOnUnmount]);

  const open = useCallback(
    async (data?: D): Promise<R | undefined> => {
      return ctx.show(
        id,
        idCount.current++,
        component,
        data ?? options?.defaultData,
        options?.unmountDelayInMs,
      );
    },
    [id, component, options?.defaultData, options?.unmountDelayInMs],
  );

  const close = () => {
    return ctx.hide(id);
  };

  const updateData = (data: D) => {
    return ctx.updateData(id, data);
  };

  return {
    updateData,
    open,
    close,
  };
}
