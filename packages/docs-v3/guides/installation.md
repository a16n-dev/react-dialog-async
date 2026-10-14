---
title: Getting Started
---

# Getting Started

## 1. Install the package

Install the package using your package manager of choice.

::: code-group

```sh [npm]
npm install react-dialog-async
```

```sh [pnpm]
pnpm add react-dialog-async
```

```sh [yarn]
yarn add react-dialog-async
```

```sh [bun]
bun add react-dialog-async
```

:::

## 2. Add the provider

Wrap your app with `<DialogProvider/>`.

::: code-group

```tsx [Layout.tsx]
import { DialogProvider } from 'react-dialog-async';

const Layout = () => {
  return (
    <DialogProvider> // [!code ++]
      <App />
    </DialogProvider> // [!code ++]
  );
}
```

:::

## 3. Add an outlet

Add a `<DialogOutlet/>` to your component tree. This is where dialogs will be rendered, so it should be nested inside all providers.

::: code-group

```tsx [Layout.tsx]
import { DialogProvider, DialogOutlet } from 'react-dialog-async';

const Layout = () => {
  return (
    <DialogProvider>
      <App />
      <DialogOutlet/> // [!code ++]
    </DialogProvider>
  );
}
```

:::

## 4. Create a dialog

Create a dialog component, and start using it in your app with the `useDialog()` hook.

::: code-group

```tsx [MyDialog.tsx]
import { AsyncDialogProps } from 'react-dialog-async';
import { Dialog } from '...'; // Import dialog from UI library of your choice

export const MyDialog = ({ isOpen, handleClose }: AsyncDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={() => handleClose()}>
      <p>{'Hello world!'}</p>
      <button onClick={() => handleClose()}>Ok</button>
    </Dialog>
  );
}
```

```tsx [Page.tsx]
import { useDialog } from 'react-dialog-async';
import { MyDialog } from './MyDialog';

export const Page = () => {
  const myDialog = useDialog(MyDialog);

  return (
    <button onClick={() => myDialog.open()}>Open dialog</button>
  );
}
```

:::

::: tip
Check out the examples section for working examples with different frameworks and libraries.
:::
