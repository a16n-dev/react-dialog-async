import { useMemo } from 'react';
import type { dialogsStateData } from '../useDialogContext/DialogStateContext.js';
import { IndividualDialogContext } from '../useDialogContext/IndividualDialogContext.js';

/**
 * Given the current dialog state, outputs an array of `Element`s to be rendered.
 */
export const useRenderDialogs = (state: dialogsStateData) => {
  return useMemo(() => {
    const entries = Object.entries(state);

    // Figure out which dialog has focus.
    // This isn't super efficient, but should be fine given that having more than 2-3 open dialogs would be very unusual
    let lastOpenDialog: string;
    entries.forEach(([id, { open }]) => {
      if (open) lastOpenDialog = id;
    });

    return entries.map(
      ([id, { dialog: Component, data, hash, open, resolve }]) => {
        const dialogProps = {
          open,
          data,
          mounted: true as const, // Dialog is always mounted when it's being rendered
          handleClose: (value: any) => resolve?.(value),
          focused: id === lastOpenDialog, // Focus the last dialog in the list
        };

        const contextValue = {
          ...dialogProps,
          isInsideDialogContext: true,
        };

        // This key will be unique for each open of the dialog, ensuring that the dialog always resets its internal state.
        const key = id + hash;

        return (
          <IndividualDialogContext.Provider key={key} value={contextValue}>
            <Component {...dialogProps} />
          </IndividualDialogContext.Provider>
        );
      },
    );
  }, [state]);
};
