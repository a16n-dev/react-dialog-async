import { dialogsStateData } from './DialogStateContext';
import React, { useMemo } from 'react';
import IndividualDialogContext from './IndividualDialogContext';

const useRenderDialogs = (state: dialogsStateData) => {
  return useMemo(() => {
    const entries = Object.entries(state);

    // Figure out which dialog has focus.
    // This isn't super efficient, but should be fine given that having more than 2-3 open dialogs would be very unusual
    let lastOpenDialog: string;
    entries.forEach(([id, { open }]) => {
      if (open) lastOpenDialog = id;
    });

    return entries.map(([id, { dialog: Component, data, open, resolve }]) => {
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

      return (
        <IndividualDialogContext.Provider key={id} value={contextValue}>
          <Component {...dialogProps} />
        </IndividualDialogContext.Provider>
      );
    });
  }, [state]);
};

export default useRenderDialogs;
