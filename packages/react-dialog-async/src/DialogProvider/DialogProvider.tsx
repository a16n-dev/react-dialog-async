import React, { useEffect, useRef } from 'react';
import { PropsWithChildren, useCallback, useState } from 'react';
import DialogContext, { dialogContextState } from '../DialogContext';
import { DialogComponent } from '../types';
import DialogStateContext, { dialogsStateData } from '../DialogStateContext';
import useRenderDialogs from '../useRenderDialogs';

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
  const unmountDelayTimeoutRefs = useRef<{ [key: string]: any }>({});

  const [dialogState, setDialogState] = useState<dialogsStateData>({});
  const [usingOutlet, setUsingOutlet] = useState(false);

  /**
   * Force closes the dialog with the given id.
   */
  const hide = useCallback(
    (id: string) => {
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

          return {
            ...state,
            [id]: {
              open: false,
              dialog: state[id].dialog,
              data: state[id].data,
            },
          };
        }
        return removeKey(state, id);
      });
    },
    [setDialogState],
  );

  const show = useCallback(
    (
      id: string,
      dialog: DialogComponent<any, any>,
      data: unknown,
      unmountDelay?: number,
    ): Promise<unknown> => {
      return new Promise((resolve) => {
        if (unmountDelayTimeoutRefs.current[id] !== undefined) {
          clearTimeout(unmountDelayTimeoutRefs.current[id]);
        }

        const resolveFn = (value: any) => {
          resolve?.(value);
          hide(id);
        };

        setDialogState((state) => ({
          ...state,
          [id]: {
            dialog: dialog,
            open: true,
            data,
            resolve: resolveFn,
            unmountDelay: unmountDelay ?? defaultUnmountDelayInMs,
          },
        }));
      });
    },
    [setDialogState, hide, defaultUnmountDelayInMs],
  );

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

  const dialogComponents = useRenderDialogs(dialogState);

  useEffect(() => {
    return () => {
      Object.values(unmountDelayTimeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  const ctx: dialogContextState = {
    show,
    hide,
    updateData,
  };

  return (
    <DialogStateContext.Provider
      value={{ dialogs: dialogState, setIsUsingOutlet: setUsingOutlet }}
    >
      <DialogContext.Provider value={ctx}>
        {children}
        {!usingOutlet && dialogComponents}
      </DialogContext.Provider>
    </DialogStateContext.Provider>
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
