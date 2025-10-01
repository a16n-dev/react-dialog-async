---
title: useDialog
---

```tsx
import { useDialog } from 'react-dialog-async';
```

This hook is used to manage an instance of the given dialog component. It returns methods to open & close the dialog.

It must be called within a `<DialogProvider/>`. 

## Usage
```tsx 
const myDialog = useDialog(MyDialog, {
  // pass options here
});

const handleClick = async () => {
  const result = await myDialog.open({
    // pass data to dialog here 
  });

  if (result) {
    // handle the result from the dialog
  }
}
```

## Signature
```tsx
function useDialog<D, R, DE extends D | undefined>(
  component: AsyncDialogComponent<D, R>,
  options?: useDialogOptions<D, DE>,
): useDialogReturn<D, R, DE>
```

## Parameters

| Parameter   | Type                                            | Default | Description                          |
|-------------|-------------------------------------------------|---------|--------------------------------------|
| `component` | [`AsyncDialogComponent`](#asyncdialogcomponent) | -       | The dialog component to be rendered. |
| `options`   | [`useDialogOptions`](#usedialogoptions)         | `{}`    | Optional configuration options.      |

### `AsyncDialogComponent`
A React component that accepts props of type `AsyncDialogProps`. See [`AsyncDialogProps`](/reference/types/async-dialog-props) for details.


### `useDialogOptions`

| Property           | Type      | Default | Description                                                                                                                    |
|--------------------|-----------|---------|--------------------------------------------------------------------------------------------------------------------------------|
| `defaultData`      | `DE`      | -       | Default data to be passed to the dialog when opened without data                                                               |
| `unmountDelayInMs` | `number`  | -       | When the dialog is closed, it will wait this long until it is unmounted. Setting this overrides any globally configured values |
| `persistOnUnmount` | `boolean` | `false` | If `true`, the dialog will not be closed when the hook unmounts                                                                |

## Returns

### `useDialogReturn`
| Property     | Type                                   | Description                                                                                                                                |
|--------------|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `open`       | `(data: D) => Promise<R \| undefined>` | Opens the dialog, and passes the provided data as props to the dialog component. Returns a promise that resolves when the dialog is closed |
| `close`      | `() => void`                           | Force closes the dialog                                                                                                                    |
| `updateData` | `(data: D) => void`                    | Updates the data passed to the dialog component.                                                                                           |

## Source

[View on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/packages/react-dialog-async/src/useDialog/useDialog.tsx)
