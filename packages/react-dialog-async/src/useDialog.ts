import { useCallback, useContext, useEffect, useId, useMemo } from 'react';
import DialogContext from './DialogContext';
import { DialogComponent, useDialogOptions, useDialogReturn } from './types';

function useDialog<D, R, DE extends D | undefined>(
  component: DialogComponent<D, R>,
  options?: useDialogOptions<D, DE>,
): useDialogReturn<D, R, DE> {
  const internalId = useId();

  const id = useMemo(
    () => options?.customKey ?? internalId,
    [internalId, options?.customKey],
  );

  const ctx = useContext(DialogContext);

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

export default useDialog;
