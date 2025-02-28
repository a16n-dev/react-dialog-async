import React from 'react';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import DialogContext, { dialogContextState } from '../DialogContext';
import { DialogComponent } from '../types';

interface DialogProviderProps extends PropsWithChildren {}

const DialogProvider = ({ children }: DialogProviderProps) => {
  const [dialogs, setDialogs] = useState<
    Record<string, DialogComponent<unknown, unknown>>
  >({});

  const [dialogState, setDialogState] = useState<
    Record<
      string,
      {
        data: unknown;
        resolve: (value: unknown) => void;
      }
    >
  >({});

  const register = useCallback(
    (
      id: string,
      Component: DialogComponent<unknown, unknown>,
    ): (() => void) => {
      console.log('registering', id);
      setDialogs((dialogs) => ({ ...dialogs, [id]: Component }));

      return () => {
        setDialogs((dialogs) => removeKey(dialogs, id));

        setDialogState((state) => {
          if (state[id]) {
            state[id].resolve(undefined);
            return removeKey(state, id);
          }
          return state;
        });
      };
    },
    [setDialogs, setDialogState],
  );

  const show = useCallback(
    (id: string, data: unknown): Promise<unknown> => {
      return new Promise((resolve) => {
        setDialogState((state) => ({
          ...state,
          [id]: { data, resolve },
        }));
      });
    },
    [setDialogState],
  );

  /**
   * Force closes the dialog with the given id. This only works if this same
   */
  const hide = (id: string): void => {
    setDialogState((state) => {
      if (state[id]) {
        state[id].resolve(undefined);
        return removeKey(state, id);
      }
      return state;
    });
  };

  /**
   * Updates the data of the given dialog
   */
  const updateData = useCallback(
    (id: string, data: unknown): void => {
      setDialogState((state) => {
        if (state[id]) {
          return {
            ...state,
            [id]: { ...state[id], data },
          };
        }
        return state;
      });
    },
    [setDialogState],
  );

  const dialogComponents = useMemo(() => {
    return Object.entries(dialogState).map(([id, { data, resolve }]) => {
      const Component = dialogs[id];

      return (
        <Component
          key={id}
          open
          data={data}
          handleClose={(value) => {
            resolve(value);
            hide(id);
          }}
        />
      );
    });
  }, [dialogState]);

  const ctx: dialogContextState = {
    register,
    show,
    hide,
    updateData,
  };

  return (
    <DialogContext.Provider value={ctx}>
      {children}
      {dialogComponents}
    </DialogContext.Provider>
  );
};

export default DialogProvider;

function removeKey<
  S extends string | number | symbol,
  T extends Record<S, unknown>,
>(data: T, key: S): Omit<T, S> {
  const { [key]: _, ...rest } = data;
  return rest;
}
