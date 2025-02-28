import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import DialogProvider from './DialogProvider';
import { useContext, useEffect, useId } from 'react';
import DialogContext from '../DialogContext';
import { AsyncDialogProps } from '../types';

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

test('calling register() does not mount the dialog', () => {
  const InnerComponent = () => {
    const ctx = useContext(DialogContext);
    const id = useId();

    useEffect(() => {
      ctx.register(id, TestDialog);
    }, [id]);

    return null;
  };
  const result = render(
    <DialogProvider>
      <InnerComponent />
    </DialogProvider>,
  );

  expect(result.asFragment()).toMatchSnapshot();
});

test('calling register() followed by show() mounts the dialog in the DOM', () => {
  const InnerComponent = () => {
    const ctx = useContext(DialogContext);
    const id = useId();

    useEffect(() => {
      ctx.register(id, TestDialog);

      ctx.show(id, {});
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
    const id = useId();

    useEffect(() => {
      ctx.register(id, TestDialog);

      ctx.show(id, {});

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
