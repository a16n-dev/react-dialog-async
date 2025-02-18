---
sidebar_position: 5
---

# Typescript
React Dialog Async is written in Typescript and provides type definitions out of the box.
This lets you type-check the data being passed in and out of your dialogs.

## Typing your dialog component
Use the `AsyncDialogProps` type as the prop type for your dialog components.
It also accepts up to two generic arguments, representing the data and the result types of the dialog:

```tsx
import { AsyncDialogProps } from 'react-dialog-async';

type ConfirmationDialogProps = AsyncDialogProps<string, boolean>;

export function ConfirmationDialog({
  data, // data is of type string
  handleClose // handleClose optionally takes an argument of type boolean
}: ConfirmationDialogProps) {
  ...
}
```

### A note on data returned from dialogs
If you use the above dialog, you'll notice the result returned is of type `boolean | undefined` rather than `boolean`.

```tsx
const result = await confirmationDialog.show('Are you sure?');
```
This is because we can never be sure the dialog is closed with a result, and you should always handle this case

See the definition of [useDialog](https://github.com/a16n-dev/react-dialog-async/blob/main/src/useDialog.ts) for more details
