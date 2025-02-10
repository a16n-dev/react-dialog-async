import { useContext, useEffect, useId } from 'react';
import DialogContext from './DialogContext';
import { DialogComponent } from './types';

const useDialog = <D, R>(component: DialogComponent<D, R>) => {
  const id = useId();

  const ctx = useContext(DialogContext);

  useEffect(() => {
    ctx.register(id, component);
    return () => {
      ctx.unregister(id);
    };
  }, []);

  const show = async (data: D): Promise<R | undefined> => {
    return ctx.show(id, data);
  };

  const hide = () => {
    return ctx.hide(id);
  };

  return {
    show,
    hide,
  };
};

export default useDialog;
