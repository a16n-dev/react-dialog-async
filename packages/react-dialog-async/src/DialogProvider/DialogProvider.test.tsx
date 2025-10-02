import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useContext, useEffect, useId } from 'react';
import type { AsyncDialogProps } from '../types.js';
import { DialogActionsContext } from '../context/DialogActionsContext.js';
import { DialogProvider } from './DialogProvider.js';

function valueNotNull<T>(v: T | null): asserts v {
  if (!v) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }
}

const TestDialog = ({ isOpen }: AsyncDialogProps) => {
  if (!isOpen) return null;

  return <div>{'Hello World!'}</div>;
};

test('renders without error', () => {
  const result = render(<DialogProvider />);

  expect(result.asFragment()).toMatchSnapshot();
});

test('renders children', () => {
  render(<DialogProvider>Hello world!</DialogProvider>);

  expect(screen.findByText('Hello world!')).toBeDefined();
});

test('calling show() mounts the dialog in the DOM', () => {
  const InnerComponent = () => {
    const ctx = useContext(DialogActionsContext);
    valueNotNull(ctx);
    const id = useId();

    useEffect(() => {
      ctx.show(id, 0, TestDialog, {});
    }, [id]);

    return null;
  };
  const result = render(
    <DialogProvider>
      <InnerComponent />
    </DialogProvider>,
  );

  expect(result.asFragment()).toMatchSnapshot();
  expect(screen.getByText('Hello World!')).toBeDefined();
});

test('calling show() followed by hide() unmounts the dialog in the DOM', () => {
  const InnerComponent = () => {
    const ctx = useContext(DialogActionsContext);
    valueNotNull(ctx);
    const id = useId();

    useEffect(() => {
      ctx.show(id, 0, TestDialog, {});

      ctx.hide(id);
    }, [id]);

    return null;
  };
  const result = render(
    <DialogProvider>
      <InnerComponent />
    </DialogProvider>,
  );

  expect(result.asFragment()).toMatchSnapshot();
  expect(screen.queryByText('Hello World!')).toBeNull();
});
