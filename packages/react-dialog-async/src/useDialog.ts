import { useContext, useEffect, useId, useMemo } from 'react';
import DialogContext from './DialogContext';
import { hashComponent } from './utils';
import { DialogComponent, useDialogOptions, useDialogReturn } from './types';

function useDialog<D, R, DE extends D | undefined, M extends boolean = false>(
  component: DialogComponent<D, R>,
  options: useDialogOptions<D, DE, M> = {},
): useDialogReturn<D, R, DE> {
  const id = useId();

  const key = useMemo(() => hashComponent(component), [component]);

  const ctx = useContext(DialogContext);

  useEffect(() => {
    const unregister = ctx.register(id, key, component);
    return () => {
      unregister();
    };
  }, [id]);

  const show = async (data?: D): Promise<R | undefined> => {
    return ctx.show(id, data ?? options.defaultData);
  };

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
