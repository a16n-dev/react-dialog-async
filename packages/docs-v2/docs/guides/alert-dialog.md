---
sidebar_position: 2
---

# Creating an alert dialog
Create a simple alert dialog that displays a message to the user.

:::info
React Dialog Async does not provide a `Modal` component.
You will need to use a modal from a component library or write your own.

See the [Examples](/category/examples) section for more details.
:::


Define the `AlertDialog` component:
```tsx title="components/AlertDialog.tsx"
import { AsyncDialogProps } from 'react-dialog-async';
import { Modal, ModalTitle, ModalContent } from '@components/Modal';

interface AlertDialogProps {
  title: string;
  message: string;
}

export function AlertDialog({ open, handleClose, data }: AsyncDialogProps<AlertDialogProps>) {
  return (
    <Modal open={open} onClose={() => handleClose()}>
      <ModalTitle>{data.title}</ModalTitle>
      <ModalContent>{data.message}</ModalContent>
    </Modal>
  );
}
```

Then use the `useDialog` hook to show the dialog.
```tsx title="components/Page.tsx"
import { useDialog } from 'react-dialog-async';
import { AlertDialog } from './AlertDialog';

export function Page() {
  const alertDialog = useDialog(AlertDialog);
  
  const handleClick = async () => {
    // Data will be passed to props.data in the dialog
    await alertDialog.open({ 
      title: 'Alert', 
      message: 'Hello, world!' 
    });
  };
  
  return (
    <Button onClick={handleClick}>Trigger Alert</Button>
  );
}
```
