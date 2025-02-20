---
sidebar_position: 1
---

# Creating your first dialog
Create your first dialog and show it using the `useDialog` hook.

:::info
React Dialog Async does not provide a `Modal` component.
You will need to use a modal from a component library or write your own.

See the [Examples](/category/examples) section for more details.
:::


Define the `SimpleDialog` component:
```tsx title="components/AlertDialog.tsx"
import { AsyncDialogProps } from 'react-dialog-async';
import { Modal, ModalTitle, ModalContent } from '@components/Modal';

export function SimpleDialog({ open, handleClose }: AsyncDialogProps) {
  return (
    <Modal open={open} onClose={() => handleClose()}>
      <ModalTitle>Hello world!</ModalTitle>
    </Modal>
  );
}
```

Then use the `useDialog` hook to show the dialog. By awaiting the call to `show()`,
we can run code after the dialog is closed.
```tsx title="components/Page.tsx"
import { useDialog } from 'react-dialog-async';
import { SimpleDialog } from './SimpleDialog';

export function Page() {
  const simpleDialog = useDialog(SimpleDialog);
  
  const handleClick = async () => {
    await simpleDialog.show();
    
    // This code will run after the dialog is closed
    console.log('User closed the dialog');
  };
  
  return (
    <Button onClick={handleClick}>
      Show the dialog
    </Button>
  );
}
```

