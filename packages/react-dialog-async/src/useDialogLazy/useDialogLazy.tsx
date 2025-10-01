import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import type { useDialogLazyReturn } from './types.js';
import type { AsyncDialogComponent } from '../types.js';
import type { useDialogOptions } from '../useDialog/types.js';
import { DialogActionsContext } from '../context/DialogActionsContext.js';

export function useDialogLazy<D, R, DE extends D | undefined>(
  componentLoader: () => Promise<AsyncDialogComponent<D, R>>,
  options?: useDialogOptions<D, DE>,
): useDialogLazyReturn<D, R, DE> {
  const internalId = useId();
  let idCount = useRef(0);
  const componentRef = useRef<AsyncDialogComponent<D, R> | null>(null);

  const id = useMemo(() => {
    if (options?.customKey !== undefined) {
      return options.customKey;
    }

    return internalId;
  }, [internalId, options?.customKey]);

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
      if (options?.hideOnHookUnmount !== false) {
        ctx.hide(id);
      }
    };
  }, [id, options?.hideOnHookUnmount]);

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
