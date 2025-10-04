# React Dialog Async

[![npm](https://img.shields.io/npm/v/react-dialog-async)](https://www.npmjs.com/package/react-dialog-async)
[![Types](https://img.shields.io/npm/types/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)
[![Downloads](https://img.shields.io/npm/dt/react-dialog-async.svg)](https://www.npmjs.com/package/react-dialog-async)

> V3 has been released! Check out the [blog post](https://react-dialog-async.a16n.dev/blog/2025-10-04-release-3-0-0/) and [migration guide](https://react-dialog-async.a16n.dev/guides/v3-migration/) for details

React Dialog Async provides a hook-based API for managing dialog state in React apps, with a focus on performance and developer ergonomics.

[✨ Read the docs here ✨](https://react-dialog-async.a16n.dev)

# Installation

Install the package into your project:
```bash
pnpm add react-dialog-async
```

## Why use React Dialog Async?

Here's an example of how you might use it to show a confirmation dialog in response to a user action:

```tsx
import { useDialog } from 'react-dialog-async';

const DeleteItemButton = () => {
  const dialog = useDialog(ConfirmationDialog);

  const handleDelete = async () => {
     const result = await dialog.open({
       message: "Are you sure you want to delete this item?"
     });

     if(result?.confirmed) {
       deleteItem();
     }
  }

  return (
    <Button onClick={handleDelete}>
      Delete item
    </Button>
  );
}
```


# Contributing
Contributions are more than welcome!

If you have a use-case that the library currently doesn't support please raise it in an issue or pull request 😄
