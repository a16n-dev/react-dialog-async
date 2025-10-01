---
title: AsyncDialogProps
---

```tsx
import { AsyncDialogProps } from 'react-dialog-async';
```

Prop types for dialog components used with React Dialog Async.

## Signature
```tsx
interface AsyncDialogProps<Request = void, Response = undefined> {
  isOpen: boolean;
  isFocused: boolean;
  handleClose: (data?: Response) => void;
  data: Request;
}
```

| Property      | Type                        | Description                                                                                              |
|---------------|-----------------------------|----------------------------------------------------------------------------------------------------------|
| `isOpen`      | `boolean`                   | Indicates whether the dialog is currently open                                                           |
| `isFocused`   | `boolean`                   | Indicates whether the dialog is the top-most dialog                                                      |
| `handleClose` | `(data?: Response) => void` | Function to close the dialog. Optionally accepts data of type `Response` to be passed back to the caller |

## Source

[View on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/packages/react-dialog-async/src/types.ts)
