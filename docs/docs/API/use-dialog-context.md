---
sidebar_position: 3
---

# useDialogContext
```tsx
import { useDialogContext } from 'react-dialog-async';
```
A hook that can be called from within a dialog component to access that dialog's state.

:::note
Calling `useDialogContext` outside of a dialog component **will not throw an error**. This is an intentional design decision to allow for more flexible components. Instead check the value of `isInsideDialogContext` to determine if the hook is being called within a dialog.
:::
