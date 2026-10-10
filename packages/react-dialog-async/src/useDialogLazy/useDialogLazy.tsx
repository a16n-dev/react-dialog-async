import { lazy, useCallback, useContext, useEffect, useId, useRef } from 'react';
import type { AsyncDialogComponent } from '../types.js';
import type { useDialogOptions } from '../useDialog/types.js';
import { DialogActionsContext } from '../context/DialogActionsContext.js';
import type { DialogComponentLoader, useDialogLazyReturn } from './types.js';

/**
 * Normalises the result of a loader function, which may either return the
 * component directly, or a module with the component as its default export.
 */
const unwrapLoaderResult = <D, R>(
  loaderResult: Awaited<ReturnType<DialogComponentLoader<D, R>>>,
): AsyncDialogComponent<D, R> =>
  'default' in loaderResult ? loaderResult.default : loaderResult;

export function useDialogLazy<D, R, DE extends D | undefined>(
  componentLoader: DialogComponentLoader<D, R>,
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

  const { suspense } = ctx;

  /**
   * In suspense mode the component is loaded by React while rendering, rather
   * than being awaited before the dialog is shown. Created lazily so that the
   * loader is never invoked for dialogs that are never opened.
   */
  const lazyComponentRef = useRef<AsyncDialogComponent<D, R> | null>(null);
  const getLazyComponent = () => {
    lazyComponentRef.current ??= lazy(async () => ({
      default: unwrapLoaderResult(await componentLoader()),
    })) as unknown as AsyncDialogComponent<D, R>;

    return lazyComponentRef.current;
  };

  useEffect(() => {
    if (ctx.lazyLoaderFn) {
      // Call the lazy loader function with a callback to load the component
      void ctx.lazyLoaderFn(async () => {
        if (!componentRef.current) {
          componentRef.current = unwrapLoaderResult(await componentLoader());
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
      // In suspense mode the dialog is shown immediately, and React renders the
      // configured fallback until the component has finished loading.
      if (!suspense && !componentRef.current) {
        componentRef.current = unwrapLoaderResult(await componentLoader());
      }

      return ctx.show(
        id,
        idCount.current++,
        suspense ? getLazyComponent() : componentRef.current!,
        data ?? options?.defaultData,
        options?.unmountDelayInMs,
      );
    },
    [id, suspense, options?.defaultData, options?.unmountDelayInMs],
  );

  const close = () => {
    return ctx.hide(id);
  };

  const updateData = (data: D) => {
    return ctx.updateData(id, data);
  };

  const preload = async () => {
    if (!componentRef.current) {
      componentRef.current = unwrapLoaderResult(await componentLoader());
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
