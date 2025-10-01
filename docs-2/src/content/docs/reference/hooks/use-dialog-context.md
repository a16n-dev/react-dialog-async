---
title: useDialogContext
---

```tsx
import { useDialogContext } from 'react-dialog-async';
```

This hook is intended to be called within a dialog component that is rendered via `useDialog()`. It provides access to the same set of props that are passed to the dialog component. 

This allows for building reusable components such as a `<Dialog/>` component that can read `isOpen` from context rather than requiring it to be passed down as a prop.

## Usage
```tsx 
const MyDialog = (props: AsyncDialogProps) => {
  
  // dialogContext exposes all of the same props as AsyncDialogProps
  const dialogContext = useDialogContext();
  
  return ...
}
```

## Signature
```tsx
function useDialogContext<D,R>(): IndividualDialogStateContextValue<D, R>
```

## Parameters

None

## Returns

### `IndividualDialogStateContextValue`

Extends [`AsyncDialogProps`](/reference/types/async-dialog-props)
| Property     | Type                                   | Description                                                                                                                                |
|--------------|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `isInsideDialogContext`| `boolean` | If `true`, this indicates the hook is being called inside of a dialog rendered with `useDialog()` |

## Source

[View on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/packages/react-dialog-async/src/useDialogContext/useDialogContext.tsx)
