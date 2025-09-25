import { act, type PropsWithChildren } from 'react';
import { expect, test } from 'vitest';
import { render, renderHook, screen } from '@testing-library/react';
import { useEffect } from 'react';
import DialogProvider from '../DialogProvider/DialogProvider.js';
import DialogOutlet from '../DialogOutlet/DialogOutlet.js';
import type { AsyncDialogProps } from '../types.js';
import useDialog from './useDialog.js';

const TestWrapper = ({ children }: PropsWithChildren) => (
  <DialogProvider>
    {children}
    <DialogOutlet />
  </DialogProvider>
);

const TestDialog = () => <div>Hello World!</div>;
const TestDialogWithData = ({
  data,
  handleClose,
}: AsyncDialogProps<string>) => (
  <div>
    <button data-testid={'close-btn'} onClick={() => handleClose()}></button>
    {data}
  </div>
);

test('can be called without error', () => {
  const TestComponent = () => {
    useDialog(TestDialog);

    return null;
  };
  const result = render(
    <TestWrapper>
      <TestComponent />
    </TestWrapper>,
  );

  expect(result.asFragment()).toMatchSnapshot();
});

test('data is used when default data is not provided', () => {
  const message = Date.now().toString(16);
  const TestComponent = () => {
    const testDialog = useDialog(TestDialogWithData);

    useEffect(() => {
      testDialog.open(message);
    }, []);

    return null;
  };

  render(
    <TestWrapper>
      <TestComponent />
    </TestWrapper>,
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
      testDialog.open();
    }, []);

    return null;
  };

  render(
    <TestWrapper>
      <TestComponent />
    </TestWrapper>,
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
      testDialog.open('Hello World!');
    }, []);

    return null;
  };

  render(
    <TestWrapper>
      <TestComponent />
    </TestWrapper>,
  );

  expect(screen.queryByText(message)).toBeNull();
});

test('unmount delay does not delay the promise being resolved', async () => {
  const result = renderHook(
    () =>
      useDialog(TestDialog, {
        unmountDelayInMs: 100,
      }),
    {
      wrapper: TestWrapper,
    },
  );

  let value = false;
  let promise: Promise<void> | undefined;

  act(() => {
    promise = result.result.current.open().then(() => {
      value = true;
    });

    result.result.current.close();
  });

  await promise;

  expect(value).toBe(true);
});

test('unmount delay results in the dialog remaining mounted after being closed', async () => {
  const message = Date.now().toString(16);
  const TestComponent = () => {
    const testDialog = useDialog(TestDialogWithData, {
      unmountDelayInMs: 1000,
    });

    useEffect(() => {
      testDialog.open('Hello World!');
    }, []);

    return null;
  };

  render(
    <TestWrapper>
      <TestComponent />
    </TestWrapper>,
  );

  act(() => {
    screen.getByTestId('close-btn').click();
  });

  expect(screen.queryByText(message)).toBeDefined();
});

test('consumer does not rerender when dialog is opened', async () => {
  // Track the number of renders
  let renderCount = 0;

  const TestComponent = () => {
    renderCount++;
    const testDialog = useDialog(TestDialog);

    return <button onClick={() => testDialog.open()}>Open dialog</button>;
  };

  render(
    <TestWrapper>
      <TestComponent />
    </TestWrapper>,
  );

  // Press the button to open the dialog
  await act(async () => {
    screen.getByText('Open dialog').click();
  });

  // Expect only the initial render
  expect(renderCount).toBe(1);
});
