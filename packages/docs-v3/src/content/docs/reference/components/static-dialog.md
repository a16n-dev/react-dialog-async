---
title: StaticDialog
---

```tsx
import { StaticDialog } from 'react-dialog-async';
```

Allows for dialogs intended to be used with `useDialog()` to instead be rendered statically in the component tree. 

This allows you to control the lifecycle of the dialog declaratively via state and callbacks, rather than imperatively via the `open()` method returned by `useDialog()`.

## Usage
```tsx 

const [open, setOpen] = React.useState(false);

return (
  <StaticDialog 
    dialog={ConfirmationDialog}
    data={{ message: "Are you sure?" }}
    isOpen={open} 
    onClose={() => setOpen(false)}
  />
);
```

## Signature
```tsx
function StaticDialog<D,R>(props: StaticDialogProps<D, R>): JSX.Element
```


## Props

| Prop      | Type                         | Default     | Description                                                                                                                     |
|-----------|------------------------------|-------------|---------------------------------------------------------------------------------------------------------------------------------|
| `dialog`  | `AsyncDialogComponent<D, R>` | -           | The dialog component to render.                                                                                                 |
| `isOpen`  | `boolean`                    | `false`     | Whether the dialog is open or closed.                                                                                           |
 | `data`    | `D`                          | `undefined` | The data to pass to the dialog component.                                                                                       |
 | `onClose` | `(result?: R) => void`       | `undefined` | Callback invoked when the dialog is closed. Receives the result passed to the `handleClose()` function in the dialog component. |

## Source

[View on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/packages/react-dialog-async/src/StaticDialog/StaticDialog.tsx)
