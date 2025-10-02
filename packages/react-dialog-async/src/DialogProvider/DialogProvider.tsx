import { useContext, useEffect, useMemo, useRef } from 'react';
import { useCallback, useState } from 'react';
import type { DialogProviderProps } from './types.js';
import type { AsyncDialogComponent } from '../types.js';
import { useRenderDialogs } from '../DialogOutlet/useRenderDialogs.js';
import {
  GlobalDialogStateContext,
  type dialogsStateData,
} from '../context/GlobalDialogStateContext.js';
import {
  DialogActionsContext,
  type DialogActionsContextValue,
} from '../context/DialogActionsContext.js';

export const DialogProvider = ({
  defaultUnmountDelayInMs = 300,
  children,
}: DialogProviderProps) => {
  // This ref tracks timers for unmount dialogs after they're closed
  const unmountDelayTimeoutRefs = useRef<{ [key: string]: any }>({});

  const [dialogState, setDialogState] = useState<dialogsStateData>({});
  const [usingOutlet, setUsingOutlet] = useState(false);

  /**
   * Force closes the dialog with the given id.
   */
  const hide = useCallback((id: string, data?: any) => {
    setDialogState((state) => {
      if (!state[id]) return state;

      if (!state[id].open) return state; // don't do anything if the dialog is already closed

      state[id].resolve?.(data);

      if (state[id].unmountDelay) {
        if (unmountDelayTimeoutRefs.current[id] !== undefined) {
          clearTimeout(unmountDelayTimeoutRefs.current[id]);
        }

        unmountDelayTimeoutRefs.current[id] = setTimeout(() => {
          setDialogState((state2) => removeKey(state2, id));
        }, state[id].unmountDelay);

        return {
          ...state,
          [id]: {
            ...state[id],
            open: false,
            resolve: undefined,
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
      dialog: AsyncDialogComponent<any, any>,
      data: unknown,
      unmountDelay?: number,
    ): Promise<unknown> => {
      return new Promise((resolve) => {
        if (unmountDelayTimeoutRefs.current[id] !== undefined) {
          clearTimeout(unmountDelayTimeoutRefs.current[id]);
        }

        function resolveFn() {
          setDialogState((state) => {
            if (!state[id]) return state;

            if (state[id].unmountDelay) {
              if (unmountDelayTimeoutRefs.current[id] !== undefined) {
                clearTimeout(unmountDelayTimeoutRefs.current[id]);
              }

              unmountDelayTimeoutRefs.current[id] = setTimeout(() => {
                setDialogState((state2) => removeKey(state2, id));
              }, state[id].unmountDelay);

              return {
                ...state,
                [id]: {
                  ...state[id],
                  open: false,
                  resolve: undefined,
                },
              };
            }
            return removeKey(state, id);
          });
        }

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
              resolve: (value: any) => {
                resolve?.(value);
                resolveFn();
              },
              unmountDelay: unmountDelay ?? defaultUnmountDelayInMs,
            },
          };
        });
      });
    },
    [defaultUnmountDelayInMs],
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
  const ctx: DialogActionsContextValue = useMemo(
    () => ({
      show,
      hide,
      updateData,
    }),
    [show, hide, updateData],
  );

  return (
    <GlobalDialogStateContext.Provider
      value={{ dialogs: dialogState, setIsUsingOutlet: setUsingOutlet }}
    >
      <DialogActionsContext.Provider value={ctx}>
        {children}
        {!usingOutlet && <InternalDialogOutlet />}
      </DialogActionsContext.Provider>
    </GlobalDialogStateContext.Provider>
  );
};

function removeKey<
  S extends string | number | symbol,
  T extends Record<S, unknown>,
>(data: T, key: S): Omit<T, S> {
  const { [key]: _, ...rest } = data;
  return rest;
}

const InternalDialogOutlet = () => {
  const dialogState = useContext(GlobalDialogStateContext);

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
