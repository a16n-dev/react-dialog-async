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
* `customKey` - By default, only one instance of a dialog component is stored internally, regardless of how many places it is used with `useDialog`. If this behaviour is not desired, a `customKey` can be specified to create a new instance of the dialog component.

## Return Type
The object returned by `useDialog` has the following properties:
* `show` - A function that shows the dialog. It takes in data to make available to the dialog component, and returns a promise that resolves to data returned by the dialog
* `hide` - A function for manually closing the dialog. You don't need to call this unless you need to forcefully close the dialog
* `updateData` - A function for updating the data available to the dialog. This can be useful if you need to update the data after the dialog has been opened
* `open` - Alias for `show`
* `close` - Alias for `hide`

## Source
[Source for `useDialog` on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/src/useDialog.ts)
