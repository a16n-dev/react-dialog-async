import { dialogsStateData } from './DialogStateContext';
import React, { useMemo } from 'react';

const useRenderDialogs = (state: dialogsStateData) => {
  return useMemo(() => {
    return Object.entries(state).map(
      ([id, { dialog: Component, data, open, resolve, key }]) => {
        return (
          <Component
            key={`${id}${key}`}
            open={open}
            data={data}
            mounted={true} // Dialog is always mounted when it's being rendered
            handleClose={(value) => resolve?.(value)}
          />
        );
      },
    );
  }, [state]);
};

export default useRenderDialogs;
