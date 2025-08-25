import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import DialogProvider from './DialogProvider';
import { useContext, useEffect, useId } from 'react';
import DialogContext, { dialogContextState } from '../DialogContext';
import { AsyncDialogProps } from '../types';

function ctxNotNull(ctx: dialogContextState | null): asserts ctx {
  if (!ctx) {
    throw new Error(
      'Dialog context not found. You likely forgot to wrap your app in a <DialogProvider/> (https://react-dialog-async.a16n.dev/installation)',
    );
  }
}

const TestDialog = ({ open }: AsyncDialogProps) => {
  if (!open) return null;

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

test('calling  show() mounts the dialog in the DOM', () => {
  const InnerComponent = () => {
    const ctx = useContext(DialogContext);
    ctxNotNull(ctx);
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

test('calling register() followed by show() followed by hide() unmounts the dialog in the DOM', () => {
  const InnerComponent = () => {
    const ctx = useContext(DialogContext);
    ctxNotNull(ctx);
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
