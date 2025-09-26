import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import type { AsyncDialogComponent } from '../types.js';
import type { useDialogOptions, useDialogReturn } from './types.js';
import { DialogActionsContext } from '../DialogProvider/DialogActionsContext.js';

export function useDialog<D, R, DE extends D | undefined>(
  component: AsyncDialogComponent<D, R>,
  options?: useDialogOptions<D, DE>,
): useDialogReturn<D, R, DE> {
  const idCount = useRef(0);
  const internalId = useId();

  const id = useMemo(() => {
    if (options?.customKey !== undefined) {
      return options.customKey;
    }

    return internalId;
  }, [internalId, component, options?.customKey]);

  const ctx = useContext(DialogActionsContext);

  if (!ctx) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }

  useEffect(() => {
    return () => {
      if (options?.hideOnHookUnmount !== false) {
        ctx.hide(id);
      }
    };
  }, [id, options?.hideOnHookUnmount]);

  const show = useCallback(
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

  const hide = () => {
    return ctx.hide(id);
  };

  const updateData = (data: D) => {
    return ctx.updateData(id, data);
  };

  return {
    show,
    hide,
    updateData,
    open: show,
    close: hide,
  };
}
