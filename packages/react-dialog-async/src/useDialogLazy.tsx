import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import { DialogComponent, useDialogOptions, useDialogReturn } from './types';
import DialogContext from './DialogContext';

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

function useDialogLazy<D, R, DE extends D | undefined>(
  componentLoader: () => Promise<DialogComponent<D, R>>,
  options?: useDialogOptions<D, DE>,
): useDialogLazyReturn<D, R, DE> {
  const internalId = useId();
  let idCount = useRef(0);
  const componentRef = useRef<DialogComponent<D, R> | null>(null);

  const id = useMemo(() => {
    if (options?.customKey !== undefined) {
      return options.customKey;
    }

    return internalId;
  }, [internalId, options?.customKey]);

  const ctx = useContext(DialogContext);

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

  const show = useCallback(
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

  const hide = () => {
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
    show,
    hide,
    preload,
    updateData,
    open: show,
    close: hide,
  };
}

export default useDialogLazy;
