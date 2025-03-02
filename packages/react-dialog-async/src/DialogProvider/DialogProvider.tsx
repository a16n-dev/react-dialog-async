import React, { useEffect, useRef } from 'react';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import DialogContext, { dialogContextState } from '../DialogContext';
import { DialogComponent } from '../types';
import { hashComponent } from '../utils';

interface DialogProviderProps extends PropsWithChildren {
  /**
   * The default delay in milliseconds to wait before unmounting a dialog after it's closed.
   */
  defaultUnmountDelayInMs?: number;
}

const DialogProvider = ({
  defaultUnmountDelayInMs,
  children,
}: DialogProviderProps) => {
  // maps keys to components
  const [dialogs, setDialogs] = useState<{
    dialogs: Record<string, DialogComponent<unknown, unknown>>;
    lookup: Record<string, string>;
    idsCount: Record<string, number>;
  }>({ dialogs: {}, lookup: {}, idsCount: {} });

  const unmountDelayTimeoutRefs = useRef<{ [key: string]: any }>({});

  const [dialogState, setDialogState] = useState<
    Record<
      string,
      {
        data: unknown;
        open: boolean;
        resolve?: (value: unknown) => void;
        unmountDelay?: number;
      }
    >
  >({});

  const register = useCallback(
    (
      id: string,
      key: string,
      Component: DialogComponent<unknown, unknown>,
    ): (() => void) => {
      if (
        dialogs.dialogs[key] !== undefined &&
        hashComponent(dialogs.dialogs[key]) !== hashComponent(Component)
      ) {
        throw new Error(
          `Attempted to register ${Component} against key ${key}, but a different component (${dialogs.dialogs[key]}) is already registered against that key. If you're assigning a key manually, make sure it's unique.`,
        );
      }
      setDialogs((dialogs) => ({
        dialogs: { ...dialogs.dialogs, [key]: Component },
        lookup: { ...dialogs.lookup, [id]: key },
        idsCount: {
          ...dialogs.idsCount,
          [key]: (dialogs.idsCount[key] || 0) + 1,
        },
      }));

      return () => {
        setDialogs((dialogs) => {
          const newCount = dialogs.idsCount[key] - 1;

          if (newCount === 0) {
            return {
              dialogs: removeKey(dialogs.dialogs, key),
              lookup: removeKey(dialogs.lookup, id),
              idsCount: removeKey(dialogs.idsCount, key),
            };
          }

          return {
            dialogs: dialogs.dialogs,
            lookup: removeKey(dialogs.lookup, id),
            idsCount: {
              ...dialogs.idsCount,
              [key]: newCount,
            },
          };
        });

        setDialogState((state) => {
          if (state[id]) {
            state[id].resolve?.(undefined);
            return removeKey(state, id);
          }
          return state;
        });
      };
    },
    [setDialogs, setDialogState],
  );

  const show = useCallback(
    (id: string, data: unknown, unmountDelay?: number): Promise<unknown> => {
      return new Promise((resolve) => {
        setDialogState((state) => ({
          ...state,
          [id]: {
            open: true,
            data,
            resolve,
            unmountDelay: unmountDelay ?? defaultUnmountDelayInMs,
          },
        }));
      });
    },
    [setDialogState, defaultUnmountDelayInMs],
  );

  /**
   * Force closes the dialog with the given id.
   */
  const hide = (id: string): void => {
    setDialogState((state) => {
      if (!state[id]) return state;

      if (!state[id].open) return state; // don't do anything if the dialog is already closed

      state[id].resolve?.(undefined);

      if (state[id].unmountDelay) {
        if (unmountDelayTimeoutRefs.current[id] !== undefined) {
          clearTimeout(unmountDelayTimeoutRefs.current[id]);
        }

        // start the delay
        unmountDelayTimeoutRefs.current[id] = setTimeout(() => {
          setDialogState((state) => removeKey(state, id));
        }, state[id].unmountDelay);

        return { ...state, [id]: { open: false, data: state[id].data } };
      }
      return removeKey(state, id);
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
    return Object.entries(dialogState).map(([id, { data, open, resolve }]) => {
      const Component = dialogs.dialogs[dialogs.lookup[id]];

      return (
        <Component
          key={id}
          open={open}
          data={data}
          handleClose={(value) => {
            resolve?.(value);
            hide(id);
          }}
        />
      );
    });
  }, [dialogState]);

  useEffect(() => {
    return () => {
      Object.values(unmountDelayTimeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

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
