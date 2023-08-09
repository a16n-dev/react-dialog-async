# React Dialog Async

[![npm](https://img.shields.io/npm/v/react-dialog-async)](https://www.npmjs.com/package/react-dialog-async)
[![Types](https://img.shields.io/npm/types/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)
[![Downloads](https://img.shields.io/npm/dt/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)

A simple, promise-based approach to managing Dialogs in React.

- 📦 Framework agnostic *- works with any component library or styling approach*
- ☁ Lightweight *- No dependencies*
- 📜 Written in TypeScript *- Fully typed*

## Table of Contents
* [Installation](#installation)
* [Quick Start](#quick-start)
* [Usage with Typescript](#typescript)
* [Examples](https://github.com/alexn400/react-dialog-async/tree/main/examples)

# Installation

```sh
# With npm
> npm i react-dialog-async

# With yarn
> yarn add react-dialog-async
```

# Quick Start
This example demonstrates how to create a simple dialog that asks the user a question and logs their response to the console
```js
// 1. Wrap your app with DialogProvider
<DialogProvider>
  <App />
</DialogProvider>

// 2. Create a dialog component
const QuestionDialog = ({ data, open, handleClose }) => {
  if (!open) return null; // Don't render if the dialog is closed

  return (
    <div className={'dialog'}>
        <p>{data.question}</p>
        <button onClick={() => handleClose("No")}>No</button>
        <button onClick={() => handleClose("Yes")}>Yes</button>
    </div>
  )
};

// 3. Use the useDialog hook to show the dialog
const App = () => {
  const questionDialog = useDialog(QuestionDialog);

  const handleClick = async () => {
    const response = await questionDialog.show({
      // pass data to the dialog 
      question: "Do you like apples?" 
    }); 
    
    console.log(response) // Will be either "Yes" or "No"
  };

  return (
      <button onClick={handleClick}>
        Ask me a question
      </button>
  );
};
```


For examples of usage with different UI frameworks such as Material UI & Bootstrap, see the [examples](https://github.com/alexn400/react-dialog-async/tree/main/examples) folder.

# Typescript
Use the `AsyncDialogProps` type to define types for the data being passed into the dialog, as well as the value returned by the dialog.
```tsx
import { AsyncDialogProps } from "react-dialog-async";

type QuestionDialogData = {
  question: string;
}

type QuestionDialogResponse = "Yes" | "No";

const QuestionDialog = ({
  data,       
  open,       
  handleClose 
}: AsyncDialogProps<QuestionDialogData, QuestionDialogResponse>) => {
  if (!open) return null; 

  return (
    <div className={'dialog'}>
      <p>{data.question}</p>
      <button onClick={() => handleClose("No")}>No</button>
      <button onClick={() => handleClose("Yes")}>Yes</button>
    </div>
  )
};

const App = () => {
  const questionDialog = useDialog(QuestionDialog);

  const handleClick = async () => {
    // .show() now expects QuestionDialogData
    const response = await questionDialog.show({
      question: "Do you like apples?" 
    });
    
    // NOTE: response is of type QuestionDialogResponse | undefined
    // it may be undefined if the dialog was force closed, or if no argument was passed to handleClose()
    if(response !== undefined) {
      console.log(response) 
    }
  };

  return (
    <button onClick={handleClick}>
      Ask me a question
    </button>
  );
};
```
# Contributing
Contributions are more than welcome!
If you have a use-case that the library currently doesn't support please raise it in an issue or pull request 😄
