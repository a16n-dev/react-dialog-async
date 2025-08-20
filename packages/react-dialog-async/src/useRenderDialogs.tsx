import { dialogsStateData } from './DialogStateContext';
import React, { useMemo } from 'react';

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
      return (
        <Component
          key={id}
          open={open}
          data={data}
          mounted={true} // Dialog is always mounted when it's being rendered
          handleClose={(value) => resolve?.(value)}
          focused={id === lastOpenDialog} // Focus the last dialog in the list
        />
      );
    });
  }, [state]);
};

export default useRenderDialogs;
