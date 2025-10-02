---
sidebar_position: 1
---

# Next.js Support

React Dialog Async has support for Next.js out of the box. 

`<DialogProvider/>` is marked with `'use client'`. Simply add it to your `app/layout.tsx` file and you're good to go:

```jsx title="app/layout.jsx"
import { DialogProvider } from 'react-dialog-async';

export default function Layout({ children }) {
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
```
