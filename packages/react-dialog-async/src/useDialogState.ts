import { useContext, useMemo } from 'react';
import { useDialogStateReturn } from './types';
import DialogStateContext from './DialogStateContext';

function useDialogState(): useDialogStateReturn {
  const dialogState = useContext(DialogStateContext);

  if (!dialogState) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }

  return useMemo(() => {
    return {
      openDialogs: Object.entries(dialogState.dialogs).map(([k, v]) => ({
        id: k,
        dialog: v.dialog,
        data: v.data,
        open: v.open,
      })),
    };
  }, [dialogState.dialogs]);
}

export default useDialogState;
