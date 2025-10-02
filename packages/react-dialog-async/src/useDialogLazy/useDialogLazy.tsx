import { useCallback, useContext, useEffect, useId, useRef } from 'react';
import type { AsyncDialogComponent } from '../types.js';
import type { useDialogOptions } from '../useDialog/types.js';
import { DialogActionsContext } from '../context/DialogActionsContext.js';
import type { useDialogLazyReturn } from './types.js';

export function useDialogLazy<D, R, DE extends D | undefined>(
  componentLoader: () => Promise<AsyncDialogComponent<D, R>>,
  options?: useDialogOptions<D, DE>,
): useDialogLazyReturn<D, R, DE> {
  const id = useId();
  const idCount = useRef(0);
  const componentRef = useRef<AsyncDialogComponent<D, R> | null>(null);

  const ctx = useContext(DialogActionsContext);

  if (!ctx) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }

  useEffect(() => {
    if (ctx.lazyLoaderFn) {
      // Call the lazy loader function with a callback to load the component
      void ctx.lazyLoaderFn(async () => {
        if (!componentRef.current) {
          componentRef.current = await componentLoader();
        }
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      if (options?.persistOnUnmount !== true) {
        ctx.hide(id);
      }
    };
  }, [id, options?.persistOnUnmount]);

  const open = useCallback(
    async (data?: D): Promise<R | undefined> => {
      if (!componentRef.current) {
        componentRef.current = await componentLoader();
      }

      return ctx.show(
        id,
        idCount.current++,
        componentRef.current,
        data ?? options?.defaultData,
        options?.unmountDelayInMs,
      );
    },
    [id, options?.defaultData, options?.unmountDelayInMs],
  );

  const close = () => {
    return ctx.hide(id);
  };

  const updateData = (data: D) => {
    return ctx.updateData(id, data);
  };

  const preload = async () => {
    if (!componentRef.current) {
      componentRef.current = await componentLoader();
    }
  };

  return {
    preload,
    updateData,
    open,
    close,
  };
}

export default useDialogLazy;
