import { Suspense, useMemo, type ReactNode } from 'react';
import type { dialogsStateData } from '../context/GlobalDialogStateContext.js';
import { IndividualDialogStateContext } from '../context/IndividualDialogStateContext.js';

/**
 * Given the current dialog state, outputs an array of `Element`s to be rendered.
 *
 * @param state - the current dialog state
 * @param suspense - whether each dialog is wrapped in a `<Suspense/>` boundary
 * @param suspenseFallback - rendered in place of a dialog while it is suspended
 */
export const useRenderDialogs = (
  state: dialogsStateData,
  suspense: boolean,
  suspenseFallback?: ReactNode,
) => {
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
          isOpen: open,
          data,
          mounted: true as const, // Dialog is always mounted when it's being rendered
          handleClose: (value: any) => resolve?.(value),
          isFocused: id === lastOpenDialog, // Focus the last dialog in the list
        };

        const contextValue = {
          ...dialogProps,
          isInsideDialogContext: true,
        };

        // This key will be unique for each open of the dialog, ensuring that the dialog always resets its internal state.
        const key = id + hash;

        // Without a boundary, suspending continues to propagate up to the
        // nearest boundary above the outlet, as it did before suspense support.
        const content = suspense ? (
          <Suspense fallback={suspenseFallback ?? null}>
            <Component {...dialogProps} />
          </Suspense>
        ) : (
          <Component {...dialogProps} />
        );

        return (
          <IndividualDialogStateContext.Provider key={key} value={contextValue}>
            {content}
          </IndividualDialogStateContext.Provider>
        );
      },
    );
  }, [state, suspense, suspenseFallback]);
};
