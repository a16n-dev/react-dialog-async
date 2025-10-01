---
title: Next.js/SSR Support
---

React Dialog Async has support for Next.js out of the box. 

`<DialogProvider/>` is marked with the `'use client'` directive. Simply add it to your `app/layout.tsx` file and you're good to go:

```jsx title="app/layout.jsx"
import { DialogProvider } from 'react-dialog-async';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <DialogProvider>
          {children}
        </DialogProvider>
      </body>
    </html>
  )
}

export default Layout
```

## Server-side Rendering
You should generally not need to worry about server-side rendering of dialogs, as `dialog.open()` should only be called within a `useEffect` or event handler, which do not run on the server.
