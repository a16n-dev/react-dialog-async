---
title: DialogOutlet
---

```tsx
import { DialogOutlet } from 'react-dialog-async';
```

Outlet component where dialogs opened with `useDialog()` will be rendered. Must be used within a `<DialogProvider/>`.

## Usage
```tsx 
<DialogProvider>
  <App />
  <DialogOutlet/>
</DialogProvider>
```

## Signature
```tsx
function DialogOutlet(): JSX.Element
```

## Props

This component does not accept any props.

## Source

[View on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/packages/react-dialog-async/src/DialogOutlet/DialogOutlet.tsx)
