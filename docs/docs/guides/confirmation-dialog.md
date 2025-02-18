---
sidebar_position: 3
---

# Creating a confirmation dialog
Create a confirmation dialog that prompts the user to confirm an action.

:::info
React Dialog Async does not provide a `Modal` component.
You will need to use a modal from a component library or write your own.

See the [Examples](/category/examples) section for more details.
:::


Define the `ConfirmationDialog` component:
```tsx title="components/ConfirmationDialog.tsx"
import { AsyncDialogProps } from 'react-dialog-async';
import { Modal, ModalTitle, ModalFooter } from '@components/Modal';

export function ConfirmationDialog({ open, handleClose, data }: AsyncDialogProps<string, boolean>) {
  return (
    <Modal open={open} onClose={() => handleClose()}>
      <ModalTitle>{data}</ModalTitle>
      <ModalFooter>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => handleClose(true)}>Confirm</Button>
      </ModalFooter>
    </Modal>
  );
}
```

Then use the `useDialog` hook to show the dialog:
```tsx title="components/Page.tsx"
import { useDialog } from 'react-dialog-async';
import { ConfirmationDialog } from './ConfirmationDialog';

export function Page() {
  const confirmationDialog = useDialog(ConfirmationDialog);
  
  const handleClick = async () => {
    const response = await confirmationDialog.show('Are you sure?');
    
    if(response === undefined) {
      console.log('Userclosed the dialog')
    } 
    
    if(response) {
      console.log('User pressed yes')
    } else {
      console.log('User pressed no ')
    }
  };
  
  return (
    <Button onClick={handleClick}>Ask for confirmation</Button>
  );
}
```
