# React Dialog Async

[![npm](https://img.shields.io/npm/v/react-dialog-async)](https://www.npmjs.com/package/react-dialog-async)
[![Types](https://img.shields.io/npm/types/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)
[![Downloads](https://img.shields.io/npm/dt/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)

A simple, more flexible approach to managing Dialogs in React using hooks.

- 📦 Framework agnostic - integrates seamlessly with any component library or styling approach
- ☁ No direct dependencies
- 📜 Written in TypeScript

## Table of Contents
* Docs
* [Installation](#installation)
* [Quick Start](#quick-start)
* Examples


Ready to jump in? See the [examples](https://github.com/alexn400/react-dialog-async/tree/main/examples) or read on for a quick start guide 

# Installation

```sh
# With npm
> npm i react-dialog-async

# With yarn
> yarn add react-dialog-async
```

# Quick Start
Start by wrapping your application in the `DialogProvider` component:

```js
// src/index.js
...
import { DialogProvider } from "react-dialog-async";

ReactDOM.render(
  <React.StrictMode>
    <DialogProvider>
      <App />
    </DialogProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

Next define a dialog component:

```js
// src/components/MyDialog.jsx

export default MyDialog = ({ open, handleClose }) => {
  <Dialog open={open} onClose={() => handleClose(false)}>
    <p>This is a dialog</p>
  </Dialog>;
};
```

lastly use the `useDialog` hook to show the dialog:
```js
// src/App.jsx
...
import { useDialog } from "react-dialog-async";
import MyDialog from "components/MyDialog";

const App = () => {
  const myDialog = useDialog(MyDialog);

  const handleClick = async () => {
    await myDialog.show();
  };

  return (
    <div>
      <h1>react-dialog-async</h1>
      <button onClick={handleClick}>
        Open Dialog
      </button>
    </div>
  );
};
```
For fully working examples, see the examples section below 
# Examples

For examples of usage with different UI frameworks such as Material UI & Bootstrap, see the [examples](https://github.com/alexn400/react-dialog-async/tree/main/examples) folder.

# Usage with Typescript
To define a dialog component with typescript use the `AsyncDialogProps` type. It is a generic type that accepts 2 parameters, the first specifies the type of the data passed to the `data` prop and the second specifies the type of the data returned by the dialog via the `handleClose` function.

The below example demonstrates a simple dialog that gets the user to enter their name with a custom prompt

```tsx
...
import { AsyncDialogProps } from "react-dialog-async";


const InputDialog = ({ open, handleClose, data }: AsyncDialogProps<string, string>) => {

  const [value, setValue] = useState("");

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>{data.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {data}
        </DialogContentText>
        <Input value={value} onChange={e => setValue(e.target.value)}>
      </DialogContent>
        <Button onClick={() => handleClose(value)} autoFocus>
          Submit
        </Button>
    </Dialog>
  );
  ```
# Contributing

Contributions are more than welcome!

If you have a use-case that the library currently doesn't support please raise it in an issue or pull request 😄
