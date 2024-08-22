import { PropsWithChildren, useMemo, useRef, useState } from 'react';
import DialogContext, { dialogContextState } from '../DialogContext';
import { DialogComponent, dialogStateItem } from '../types';

const DialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogs, setDialogs] = useState<{
    dialogs: Record<string, dialogStateItem>;
    keyCounter: Record<string, number>;
  }>({ dialogs: {}, keyCounter: {} });
  const id = useRef(0);

  const dialogComponents = useMemo(() => {
    return Object.entries(dialogs.dialogs).map(
      ([id, { resolve, Component, isOpen, data }]) => {
        if (!resolve) return;

        return (
          <Component
            key={id}
            open={isOpen}
            handleClose={(value: unknown) => {
              ctx.hide(id);
              resolve(value);
            }}
            data={data}
          />
        );
      },
    );
  }, [dialogs]);

  /**
   * Registers a new dialog component and returns the assigned id of that dialog
   * @param Component The component to use
   * @returns the id of the dialog
   */
  const register = (Component: DialogComponent<unknown, unknown>): string => {
    const dialog: dialogStateItem = {
      Component,
      isOpen: false,
    };

    let componentId: string;

    // if the component defines a dialog key, use it as the key here, otherwise just use a numeric ID
    if (Component.dialogKey) {
      componentId = Component.dialogKey;
    } else {
      componentId = String(id.current);
      id.current++;
    }

    setDialogs((d) => ({
      dialogs: {
        ...d.dialogs,
        [componentId]: dialog,
      },
      keyCounter: {
        ...d.keyCounter,
        [componentId]: d.keyCounter[componentId]
          ? d.keyCounter[componentId] + 1
          : 1,
      },
    }));
    return componentId;
  };

  /**
   * Removes a registered dialog given its id
   * @param dialogId the id of the dialog
   */
  const unregister = (dialogId: string): void => {
    setDialogs(
      ({
        dialogs: { [dialogId]: targetDialog, ...remainingDialogs },
        keyCounter: { [dialogId]: targetCounter, ...remainingCounters },
      }) => {
        // only remove it if it's the last instance of the dialog
        if (targetCounter && targetCounter > 1) {
          // if there are multiple instances of the dialog, just decrement the counter
          return {
            dialogs: { [dialogId]: targetDialog, ...remainingDialogs },
            keyCounter: { [dialogId]: targetCounter - 1, ...remainingCounters },
          };
        } else {
          // otherwise remove both the dialog and the counter
          return {
            dialogs: remainingDialogs,
            keyCounter: remainingCounters,
          };
        }
      },
    );
  };

  /**
   * Show the dialog with the given id, and optionally pass in some data. If the dialog is already open, this will just update the data
   * @param dialogId the id of the dialog
   * @param data data to pass to the dialog component
   */
  const show = (dialogId: string, data: unknown): Promise<unknown> => {
    return new Promise((resolve) => {
      setDialogs((d) => ({
        ...d,
        dialogs: {
          ...d.dialogs,
          [dialogId]: { ...d.dialogs[dialogId], data, isOpen: true, resolve },
        },
      }));
    });
  };

  /**
   * Force closes the dialog with the given id
   * @param dialogId the id of the dialog
   */
  const hide = (dialogId: string): void => {
    setDialogs((d) => ({
      ...d,
      dialogs: {
        ...d.dialogs,
        [dialogId]: { ...d.dialogs[dialogId], isOpen: false },
      },
    }));
  };

  /**
   * Updates the data of the given dialog
   * @param dialogId the id of the dialog to update
   * @param data the new data to pass to the dialog
   */
  const updateData = (dialogId: string, data: unknown): void => {
    setDialogs((d) => ({ ...d, [dialogId]: { ...d[dialogId], data } }));
  };

  const ctx: dialogContextState = {
    register,
    unregister,
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
