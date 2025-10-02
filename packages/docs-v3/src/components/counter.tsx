import { useRef, useState } from 'react';
import { DialogProvider } from 'react-dialog-async';
import { Button } from './ui/button';
import '../styles/global.css';

function Example() {
  const renderCount = useRef(0);
  const [open, setOpen] = useState(false);

  // Increment on every render
  renderCount.current += 1;

  return (
    <div>
      <Button>Hello does this work...</Button>
    </div>
  );
}

export const ExampleWithoutPackage = () => (
  <DialogProvider>
    <Example />
  </DialogProvider>
);
