---
title: Migrating to V3
---

# Migrating to V3

Introducing React Dialog Async V3! This new major version includes an improved API, new features for more flexible use,
and much more polished documentation. There are also a number of breaking changes, outlined below.

## Breaking Changes

### `show` and `hide` methods removed from `useDialog()`

The methods returned by `useDialog()` have changed. `show` and `hide` were deprecated in `2.4.0`, and have been removed in `3.0.0` in favour of `open` and `close`.

```tsx
const myDialog = useDialog(MyDialog);

await myDialog.show(...); // [!code --]
await myDialog.open(...); // [!code ++]

await myDialog.hide(); // [!code --]
await myDialog.close(); // [!code ++]
```

### Updated Options for `useDialog()`

* `customKey` has been removed. This option was not used internally, and was a legacy option from early versions of the library.

* `hideOnHookUnmount` has been renamed to `persistOnUnmount`. This should be more intuitive, as setting this option to `true` will persist the dialog when the hook unmounts.

```tsx
const myDialog = useDialog(MyDialog, {
  customKey: 'my-dialog', // [!code --]

  hideOnHookUnmount: false // [!code --]
  persistOnUnmount: true // [!code ++]
});
```

### `<DialogOutlet/>` is now required

In previous versions of the library, `<DialogOutlet/>` was optional, and if it was not required, dialogs would be rendered as children of the `<DialogProvider/>`.

In V3, this is not longer the case, and `<DialogOutlet/>` is now required for dialogs to render. If one is not found, an error will be thrown when attempting to open a dialog.

```tsx
<DialogProvider>
  <App />
  <DialogOutlet /> // [!code ++]
</DialogProvider>
```

### `mounted` prop removed from dialog components
The `mounted` prop passed to dialog components has been removed. This prop was always set to `true`, which made it effectively useless.

```tsx
export const MyDialog = ({ mounted }: AsyncDialogProps) => { // [!code --]
export const MyDialog = ({ }: AsyncDialogProps) => { // [!code ++]
// ...
}
```

### `open` and `focused` props renamed to `isOpen` and `isFocused`
The `open` and `focused` props passed to dialog components have been renamed to `isOpen` and `isFocused` respectively. This is to make it more clear that these props are booleans, and to differentiate them from the `open()` method returned by `useDialog()`.

```tsx
export const MyDialog = ({ open, focused }: AsyncDialogProps) => { // [!code --]
export const MyDialog = ({ isOpen, isFocused }: AsyncDialogProps) => { // [!code ++]
// ...
}
```

### defaultUnmountDelayInMs now defaults to 300ms

The `defaultUnmountDelayInMs` option for `<DialogProvider/>` now defaults to `300`. This is to provide a better out-of-the-box experience, as most dialogs will have some form of exit animation.

If you want to retain the previous behaviour, explicitly set this option to `0`.

```tsx
<DialogProvider
  defaultUnmountDelayInMs={0} // [!code ++]
/>
```
