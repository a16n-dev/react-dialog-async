# React Dialog Async

[![npm](https://img.shields.io/npm/v/react-dialog-async)](https://www.npmjs.com/package/react-dialog-async)
[![Types](https://img.shields.io/npm/types/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)
[![Downloads](https://img.shields.io/npm/dt/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)

Provides a way to show a dialog using hooks.

## Features:

- Headless - works with any styling approach and any dialog component
- No direct dependencies

# Quick start

To use react-dialog-async install it via npm or yarn

```sh
# With npm
> npm i react-dialog-async

# With yarn
> yarn add react-dialog-async
```

then wrap your application in the `DialogProvider` component:

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
For a fully working example see the examples section below 
# Examples

For examples of usage with different UI frameworks such as Material UI & Bootstrap, see the [examples](https://github.com/alexn400/react-dialog-async/tree/main/examples) folder.

MIT Licensed. Copyright (c) Alexander Nicholson 2021.
