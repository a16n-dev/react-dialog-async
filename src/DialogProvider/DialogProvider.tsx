import { PropsWithChildren, useMemo, useRef, useState } from 'react';
import DialogContext, { dialogContextState } from '../DialogContext';
import { DialogComponent, dialogStateItem } from '../types';

const DialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogs, setDialogs] = useState<{ [key: string]: dialogStateItem }>(
    {},
  );
  const id = useRef(0);

  const dialogComponents = useMemo(() => {
    return Object.entries(dialogs).map(
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

    const componentId = id.current;
    id.current++;

    setDialogs((d) => ({ ...d, [componentId]: dialog }));
    return String(componentId);
  };

  /**
   * Removes a registered dialog given its id
   * @param dialogId the id of the dialog
   */
  const unregister = (dialogId: string): void => {
    setDialogs(({ [dialogId]: _, ...d }) => d);
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
        [dialogId]: { ...d[dialogId], data, isOpen: true, resolve },
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
      [dialogId]: { ...d[dialogId], isOpen: false },
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
