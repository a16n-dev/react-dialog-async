---
title: DialogProvider
---

```tsx
import { DialogProvider } from 'react-dialog-async';
```

Wraps your application to provide dialog context. The provider manages dialog state.

## Usage
```tsx 
<DialogProvider>
  <App />
</DialogProvider>
```

## Signature
```tsx
function DialogProvider(props: DialogProviderProps): JSX.Element
```


## Props

| Prop | Type                                            | Default | Description |
|-|-|---------|-----------|
| `children` | `React.ReactNode` | -       | Children |
| `defaultUnmountDelayInMs` | `number` | `500`   | Default delay in milliseconds to wait before unmounting a dialog after it is closed |

## Source

[View on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/packages/react-dialog-async/src/DialogProvider/DialogProvider.tsx)
