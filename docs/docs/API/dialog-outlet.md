---
sidebar_position: 2
---

# DialogOutlet
```tsx
import { DialogOutlet } from 'react-dialog-async';
```
Using a DialogOutlet allows you to render your dialogs in a different place in the component tree. This is most useful to ensure that dialogs are wrapped with all of the necessary context providers. If you don't provide a `DialogOutlet`, dialogs will be rendered as direct children of the `DialogProvider`.

:::note
Starting from version `2.2.0` we always recommend using a `DialogOutlet`. It is not compulsory to preserve backwards compatibility, but it is recommended for new projects.
:::

## Usage
```tsx
<DialogProvider>
  {...}
  <DialogOutlet/>
</DialogProvider>
```

## Source
[Source for `DialogOutlet` on GitHub](https://github.com/a16n-dev/react-dialog-async/tree/main/packages/react-dialog-async/src/DialogOutlet.tsx)
