# React Dialog Async

[![npm](https://img.shields.io/npm/v/react-dialog-async)](https://www.npmjs.com/package/react-dialog-async)
[![Types](https://img.shields.io/npm/types/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)
[![Downloads](https://img.shields.io/npm/dt/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)

React Dialog Async provides a simple hook-based API for managing dialog state in React apps.

* ✅ CSS Framework agnostic - works with any component library or CSS setup
* ✅ Lightweight with zero dependencies
* ✅ Written in Typescript
* ✅ Supports React Native

[✨ Read the docs here ✨](https://react-dialog-async.a16n.dev)

# Quick Start
This example demonstrates how to create a simple dialog that asks the user a question and logs their response to the console:
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
    const response = await questionDialog.open({
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

# Contributing
Contributions are more than welcome!

If you have a use-case that the library currently doesn't support please raise it in an issue or pull request 😄
