import { useCallback, useContext, useEffect, useId, useMemo } from 'react';
import DialogContext from './DialogContext';
import { hashComponent } from './utils';
import { DialogComponent, useDialogOptions, useDialogReturn } from './types';

function useDialog<D, R, DE extends D | undefined>(
  component: DialogComponent<D, R>,
  options?: useDialogOptions<D, DE>,
): useDialogReturn<D, R, DE> {
  const id = useId();

  const key = useMemo(
    () => options?.customKey ?? hashComponent(component),
    [component, options?.customKey],
  );

  const ctx = useContext(DialogContext);

  if (!ctx) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }

  useEffect(() => {
    return () => {
      ctx.hide(id);
    };
  }, [id]);

  const show = useCallback(
    async (data?: D): Promise<R | undefined> => {
      return ctx.show(
        id,
        component,
        data ?? options?.defaultData,
        options?.unmountDelayInMs,
      );
    },
    [key, component, options?.defaultData, options?.unmountDelayInMs],
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
