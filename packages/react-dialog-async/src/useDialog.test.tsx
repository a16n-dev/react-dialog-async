import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import DialogProvider from './DialogProvider/DialogProvider';

import useDialog from './useDialog';
import { AsyncDialogProps } from './types';
import { useEffect } from 'react';

const TestDialog = () => <div>Hello World!</div>;
const TestDialogWithData = ({ data }: AsyncDialogProps<string>) => (
  <div>{data}</div>
);

test('can be called without error', () => {
  const TestComponent = () => {
    useDialog(TestDialog);

    return null;
  };
  const result = render(
    <DialogProvider>
      <TestComponent />
    </DialogProvider>,
  );

  expect(result.asFragment()).toMatchSnapshot();
});

test('data is used when default data is not provided', () => {
  const message = Date.now().toString(16);
  const TestComponent = () => {
    const testDialog = useDialog(TestDialogWithData);

    useEffect(() => {
      testDialog.show(message);
    }, []);

    return null;
  };

  render(
    <DialogProvider>
      <TestComponent />
    </DialogProvider>,
  );

  expect(screen.getByText(message)).toBeDefined();
});

test('default data is used when data is not provided', () => {
  const message = Date.now().toString(16);
  const TestComponent = () => {
    const testDialog = useDialog(TestDialogWithData, {
      defaultData: message,
    });

    useEffect(() => {
      testDialog.show();
    }, []);

    return null;
  };

  render(
    <DialogProvider>
      <TestComponent />
    </DialogProvider>,
  );

  expect(screen.getByText(message)).toBeDefined();
});

test('default data is overridden when data is provided', () => {
  const message = Date.now().toString(16);
  const TestComponent = () => {
    const testDialog = useDialog(TestDialogWithData, {
      defaultData: message,
    });

    useEffect(() => {
      testDialog.show('Hello World!');
    }, []);

    return null;
  };

  render(
    <DialogProvider>
      <TestComponent />
    </DialogProvider>,
  );

  expect(screen.queryByText(message)).toBeNull();
});
