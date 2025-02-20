---
sidebar_position: 1
---

# UseDialog
```tsx
import { useDialog } from 'react-dialog-async';
```
A hook that takes in a dialog component and then returns methods for interacting with the dialog.

## Usage
```tsx
const exampleDialog = useDialog(ExampleDialog);

const onClick = async () => {
  await exampleDialog.show();
}
```

## Source
[Source for `useDialog` on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/src/useDialog.ts)
