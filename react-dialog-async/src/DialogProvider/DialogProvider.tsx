import { PropsWithChildren, useMemo, useRef, useState } from 'react';
import DialogContext, { dialogContextState } from '../DialogContext';
import { DialogComponent } from '../types';

interface dialogStateItem {
  /**
   * The dialog component to render
   */
  component: DialogComponent<unknown, unknown>;
  /**
   * Represents if the dialog is currently visible
   */
  isOpen: boolean;
  /**
   * The data that should be passed to the dialog
   */
  data?: unknown;
  /**
   * The function that should be called when the dialog is closed
   */
  resolve?: (value: unknown) => void;
}

const DialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogs, setDialogs] = useState<{ [key: string]: dialogStateItem }>(
    {},
  );
  const id = useRef(0);

  const dialogComponents = useMemo(() => {
    return Object.entries(dialogs).map(([id, dialog]) => {
      const resolve = dialog.resolve;

      if (!resolve) return;
      const Component = dialog.component;
      const onClose = (value: unknown) => {
        ctx.hide(id);
        resolve(value);
      };
      return (
        <Component
          key={id}
          open={dialog.isOpen}
          handleClose={onClose}
          data={dialog.data}
        />
      );
    });
  }, [dialogs]);

  /**
   * Registers a new dialog component and returns the assigned id of that dialog
   * @param component The component to use
   * @returns the id of the dialog
   */
  const register = (component: DialogComponent<unknown, unknown>): string => {
    const dialog: dialogStateItem = {
      component,
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
