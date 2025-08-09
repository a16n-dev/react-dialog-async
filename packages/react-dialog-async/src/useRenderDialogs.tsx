import { dialogsStateData } from './DialogStateContext';
import React, { useMemo } from 'react';

const useRenderDialogs = (state: dialogsStateData) => {
  return useMemo(() => {
    const entries = Object.entries(state);

    return entries.map(
      ([id, { dialog: Component, data, open, resolve }], index) => {
        return (
          <Component
            key={id}
            open={open}
            data={data}
            mounted={true} // Dialog is always mounted when it's being rendered
            handleClose={(value) => resolve?.(value)}
            focused={index === entries.length - 1} // Focus the last dialog in the list
          />
        );
      },
    );
  }, [state]);
};

export default useRenderDialogs;
