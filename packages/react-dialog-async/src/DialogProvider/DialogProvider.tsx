'use client';

import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import DialogContext, { dialogContextState } from '../DialogContext';
import { DialogComponent } from '../types';
import { produce } from 'immer';

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
        setDialogs((dialogs) =>
          produce(dialogs, (draft) => {
            delete draft[id];
          }),
        );

        setDialogState((state) =>
          produce(state, (draft) => {
            if (draft[id]) {
              draft[id].resolve(undefined);
              delete draft[id];
            }
          }),
        );
      };
    },
    [setDialogs, setDialogState],
  );

  const show = useCallback(
    (id: string, data: unknown): Promise<unknown> => {
      return new Promise((resolve) => {
        setDialogState((state) =>
          produce(state, (draft) => {
            draft[id] = { data, resolve };
          }),
        );
      });
    },
    [setDialogState],
  );

  /**
   * Force closes the dialog with the given id. This only works if this same
   */
  const hide = (id: string): void => {
    setDialogState((state) =>
      produce(state, (draft) => {
        if (draft[id]) {
          draft[id].resolve(undefined);
          delete draft[id];
        }
      }),
    );
  };

  /**
   * Updates the data of the given dialog
   */
  const updateData = useCallback(
    (id: string, data: unknown): void => {
      setDialogState((state) =>
        produce(state, (draft) => {
          if (draft[id]) {
            draft[id].data = data;
          }
        }),
      );
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
