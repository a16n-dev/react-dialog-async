---
title: useDialog
---

```tsx
import { useDialogLazy } from 'react-dialog-async';
```

Similar to `useDialog`, but allows the dialog component to be loaded asynchronously. This is useful for code-splitting and reducing the initial bundle size.

It must be called within a `<DialogProvider/>`. 

## Usage
```tsx 

```

## Signature
```tsx

```

## Parameters

| Parameter         | Type                                        | Default | Description                             |
|-------------------|---------------------------------------------|---------|-----------------------------------------|
| `componentLoader` | `() => Promise<AsyncDialogComponent<D, R>>` | -       | A function to load the dialog component |
| `options`         | [`useDialogOptions`](#usedialogoptions)     | `{}`    | Optional configuration options.         |

### `AsyncDialogComponent`
A React component that accepts props of type `AsyncDialogProps`. See [`AsyncDialogProps`](/reference/types/async-dialog-props) for details.

### `useDialogOptions`

See [`useDialogOptions`](/reference/hooks/use-dialog#usedialogoptions) for details.

## Returns

### `useDialogLazyReturn`
Extends [`useDialogReturn`](/reference/hooks/use-dialog#usedialogreturn)

| Property  | Type                  | Description                                                                           |
|-----------|-----------------------|---------------------------------------------------------------------------------------|
| `preload` | `() => Promise<void>` | Preloads the dialog, so that it will be immediately available when `open()` is called |

## Source

[View on GitHub](https://github.com/a16n-dev/react-dialog-async/blob/main/packages/react-dialog-async/src/useDialogLazy/useDialogLazy.tsx)
