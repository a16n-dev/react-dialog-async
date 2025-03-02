---
sidebar_position: 2
---

# DialogProvider
```tsx
import { DialogProvider } from 'react-dialog-async';
```
Provides a react context for rendering dialogs. The dialogs themselves will also be rendered as children of this component.

## Usage
```tsx
<DialogProvider>
  {...}
</DialogProvider>
```

## Props

| Name                      | Type              | Default value | Description                                          |
|---------------------------|-------------------|---------------|------------------------------------------------------|
| `children`                | `React.ReactNode` |               |                                                      |
| `defaultUnmountDelayInMs` | `number?`         |               | Sets a default for the unmount delay for all dialogs |

## Source
[Source for `DialogProvider` on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/src/DialogProvider/DialogProvider.tsx)
