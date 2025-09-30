---
title: Typescript
---

React Dialog Async is written in Typescript and provides type definitions out of the box.
This lets you type-check the data being passed in and out of your dialogs.

## Prop types for dialog components
Use the `AsyncDialogProps` type as the prop type for your dialog components.
It also accepts up to two generic arguments, representing the data and the result types of the dialog:

```tsx
import { AsyncDialogProps } from 'react-dialog-async';

type ConfirmationDialogProps = { message: string }; 

type ConfirmationDialogResult = { confirmed: boolean };

export function ConfirmationDialog({
  data, 
  handleClose 
}: AsyncDialogProps<ConfirmationDialogProps, ConfirmationDialogResult>) {
  ...
}
```

### A note on data returned from dialogs
If you use the above dialog, you'll notice the type of the result returned by `confirmationDialog.open()` includes `undefined`.

```tsx {1}
const result = await confirmationDialog.open('Are you sure?');
// result has type "{ confirmed: boolean } | undefined"
```
This is because we can never be sure the dialog is closed with a result, and you should always handle this case in your code:

```tsx
const result = await confirmationDialog.open('Are you sure?');

if(result?.confirmed) {
  // user confirmed
} else {
  // user either cancelled, or the dialog was closed without a result
}
```



