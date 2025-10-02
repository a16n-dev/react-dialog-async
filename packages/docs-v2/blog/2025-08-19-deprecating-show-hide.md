---
title: Deprecating show/hide in favour of open/close
description: Notice for a breaking change in the next major release
tags: [Other]
---

As of the next major release (3.0.0), the `show()` and `hide()` methods of `useDialog()` will be deprecated in favour of `open()` and `close()`. There is currently no set date for this release, but we wanted to give you a heads up so you can migrate ahead of time
<!-- truncate -->

## Why?
The naming of "show" and "hide" imply that the dialog always exists, and is just being shown and hidden. This is misleading, and doesn't accurately reflect how the library works. Dialogs are created and destroyed every time they're opened, ensuring that they have clean state to prevent issues with stale state that arise especially when using forms or other stateful components within dialogs.

## What do I need to do?

Nothing, yet. There is no set date for the next major release, and it will likely be some number of months away. That being said, you can start migrating your code now, as the new methods are already available in the current version of the library and follow the exact same API & implementation as the old methods.

```tsx
const myDialog = useDialog(MyDialog);

// Replace this
await myDialog.show(...);
await myDialog.hide();

// With this
await myDialog.open(...);
await myDialog.close();
```

---

Feedback or ideas? We'd love to hear them! Open an issue over on [GitHub](https://github.com/a16n-dev/react-dialog-async/issues).

