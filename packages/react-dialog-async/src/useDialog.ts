import { useContext, useEffect, useId, useMemo } from 'react';
import DialogContext from './DialogContext';
import { DialogComponent, useDialogReturn } from './types';
import { hashComponent } from './utils';

const useDialog = <D, R>(
  component: DialogComponent<D, R>,
): useDialogReturn<D, R> => {
  const id = useId();

  const key = useMemo(() => hashComponent(component), [component]);

  const ctx = useContext(DialogContext);

  useEffect(() => {
    const unregister = ctx.register(id, key, component);
    return () => {
      unregister();
    };
  }, [id]);

  const show = async (data: D): Promise<R | undefined> => {
    return ctx.show(id, data);
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
};

export default useDialog;
