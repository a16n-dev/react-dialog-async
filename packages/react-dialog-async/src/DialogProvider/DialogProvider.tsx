import React, { useContext, useEffect, useMemo, useRef } from 'react';
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
  /**
   * If provided, this function will be called when useDialogLazy is mounted.
   * This lets you call the preload function at some point before the lazy component is required
   * Consult the docs for some sensible functions to provide here for different environments
   */
  lazyLoaderFn?: (preload: () => Promise<void>) => Promise<void>;
}

const DialogProvider = ({
  defaultUnmountDelayInMs,
  lazyLoaderFn,
  children,
}: DialogProviderProps) => {
  // This ref tracks timers for unmount dialogs after they're closed
  const unmountDelayTimeoutRefs = useRef<{ [key: string]: any }>({});

  const [dialogState, setDialogState] = useState<dialogsStateData>({});
  const [usingOutlet, setUsingOutlet] = useState(false);

  /**
   * Force closes the dialog with the given id.
   */
  const hide = useCallback((id: string) => {
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
  }, []);

  const show = useCallback(
    (
      id: string,
      hash: number,
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

        setDialogState((state) => {
          if (state[id]?.open) {
            resolve(undefined);
            return state;
          }

          return {
            ...state,
            [id]: {
              dialog: dialog,
              open: true,
              hash,
              data,
              resolve: resolveFn,
              unmountDelay: unmountDelay ?? defaultUnmountDelayInMs,
            },
          };
        });
      });
    },
    [hide, defaultUnmountDelayInMs],
  );

  /**
   * Updates the data of the given dialog
   */
  const updateData = useCallback((id: string, data: unknown): void => {
    setDialogState((state) => {
      if (state[id]) {
        return {
          ...state,
          [id]: { ...state[id], data },
        };
      }
      return state;
    });
  }, []);

  useEffect(() => {
    return () => {
      Object.values(unmountDelayTimeoutRefs.current).forEach(clearTimeout);
    };
  }, []);

  /**
   * To prevent unnecessary re-renders, be careful to ensure that this state has
   * no transitive dependencies to `dialogState`
   */
  const ctx: dialogContextState = useMemo(
    () => ({
      show,
      hide,
      updateData,
      lazyLoaderFn,
    }),
    [show, hide, updateData],
  );

  return (
    <DialogStateContext.Provider
      value={{ dialogs: dialogState, setIsUsingOutlet: setUsingOutlet }}
    >
      <DialogContext.Provider value={ctx}>
        {children}
        {!usingOutlet && <InternalDialogOutlet />}
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

const InternalDialogOutlet = () => {
  const dialogState = useContext(DialogStateContext);

  if (!dialogState) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }

  const dialogComponents = useRenderDialogs(dialogState.dialogs);

  if (process.env.NODE_ENV !== 'production' && dialogComponents.length > 0) {
    console.warn(
      'Rendering a dialog without a <DialogOutlet/>. Please include a <DialogOutlet/> as a child of <DialogProvider/> to ensure dialogs are rendered within the correct contexts - this will be required in the next major version of react-dialog-async. See https://react-dialog-async.a16n.dev/API/dialog-outlet for more details. This warning is only present in development',
    );
  }

  return <>{dialogComponents}</>;
};
