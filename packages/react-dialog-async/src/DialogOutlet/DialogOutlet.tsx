import { useContext, useEffect } from 'react';
import { GlobalDialogStateContext } from '../context/GlobalDialogStateContext.js';
import { useRenderDialogs } from './useRenderDialogs.js';

export const DialogOutlet = () => {
  const dialogState = useContext(GlobalDialogStateContext);

  if (!dialogState) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }

  // This tells the provider not to render dialogs itself
  useEffect(() => {
    dialogState.setIsUsingOutlet(true);

    return () => {
      dialogState.setIsUsingOutlet(false);
    };
  }, []);

  const dialogComponents = useRenderDialogs(dialogState.dialogs);

  return <>{dialogComponents}</>;
};
