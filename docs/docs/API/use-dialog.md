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

## Dialog Options
_Available from v2.1.0_

`useDialog` also optionally takes in a second argument for dialog options
```useDialogOptions```
```tsx
const myDialog = useDialog(MyDialog, {
  // Pass options here
});
```

Available options are:

* `defaultData` - Default data to pass to the dialog component. Specifying this makes passing data to `.show()` optional, but data passed to `.show()` will still override the default data.
* `dialogKey` - 


## Source
[Source for `useDialog` on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/src/useDialog.ts)
