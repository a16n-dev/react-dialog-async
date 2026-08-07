import { type PropsWithChildren, Suspense, act, useEffect, use } from 'react';
import { expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

// Required for React to flush the re-render that happens when a suspended
// dialog's promise resolves.
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

import { DialogProvider } from './DialogProvider/DialogProvider.js';
import { DialogOutlet } from './DialogOutlet/DialogOutlet.js';
import { useDialog } from './useDialog/useDialog.js';
import { useDialogLazy } from './useDialogLazy/useDialogLazy.js';

const LoadedDialog = () => <div>Hello World!</div>;

/**
 * A dialog that suspends until the given promise resolves.
 */
const SuspendingDialog = ({ data }: { data: Promise<string> }) => (
  <div>{use(data)}</div>
);

const deferred = () => {
  let resolve!: (value: string) => void;
  const promise = new Promise<string>((r) => (resolve = r));
  return { promise, resolve };
};

const openOnMount = (useDialogResult: { open: (data?: any) => unknown }) => {
  useEffect(() => {
    void useDialogResult.open();
  }, []);
  return null;
};

test('a suspending dialog renders the provider fallback, then the dialog', async () => {
  const { promise, resolve } = deferred();

  const TestComponent = () => {
    const dialog = useDialog(SuspendingDialog, { defaultData: promise });
    return openOnMount(dialog);
  };

  await act(async () => {
    render(
      <DialogProvider suspenseFallback={<div>Loading...</div>}>
        <TestComponent />
        <DialogOutlet />
      </DialogProvider>,
    );
  });

  expect(screen.getByText('Loading...')).toBeTruthy();

  await act(async () => {
    resolve('Hello World!');
    await promise;
  });

  expect(screen.getByText('Hello World!')).toBeTruthy();
});

test('useDialogLazy shows the fallback while the component loads', async () => {
  const { promise, resolve } = deferred();

  const TestComponent = () => {
    const dialog = useDialogLazy(async () => {
      await promise;
      return { default: LoadedDialog };
    });
    return openOnMount(dialog);
  };

  render(
    <DialogProvider suspenseFallback={<div>Loading...</div>}>
      <TestComponent />
      <DialogOutlet />
    </DialogProvider>,
  );

  // The dialog is shown immediately, rather than only once the chunk has loaded
  await waitFor(() => expect(screen.getByText('Loading...')).toBeTruthy());

  resolve('');

  await waitFor(() => expect(screen.getByText('Hello World!')).toBeTruthy());
});

test('useDialogLazy still awaits the component when suspense is disabled', async () => {
  const { promise, resolve } = deferred();

  const TestComponent = () => {
    const dialog = useDialogLazy(async () => {
      await promise;
      return { default: LoadedDialog };
    });
    return openOnMount(dialog);
  };

  render(
    <DialogProvider>
      <TestComponent />
      <DialogOutlet />
    </DialogProvider>,
  );

  expect(screen.queryByText('Hello World!')).toBeNull();

  resolve('');

  await waitFor(() => expect(screen.getByText('Hello World!')).toBeTruthy());
});

const NoSuspenseWrapper = ({ children }: PropsWithChildren) => (
  <DialogProvider>
    {children}
    <DialogOutlet />
  </DialogProvider>
);

test('dialogs are not wrapped in a boundary unless suspense is configured', async () => {
  const TestComponent = () => {
    const dialog = useDialog(LoadedDialog);
    return openOnMount(dialog);
  };

  const { asFragment } = render(
    <NoSuspenseWrapper>
      <TestComponent />
    </NoSuspenseWrapper>,
  );

  await waitFor(() => expect(screen.getByText('Hello World!')).toBeTruthy());
  expect(asFragment()).toMatchSnapshot();
});

test('without suspense, a suspending dialog propagates to the boundary above the outlet', async () => {
  const { promise, resolve } = deferred();

  const TestComponent = () => {
    const dialog = useDialog(SuspendingDialog, { defaultData: promise });
    return openOnMount(dialog);
  };

  await act(async () => {
    render(
      <Suspense fallback={<div>Outer fallback</div>}>
        <NoSuspenseWrapper>
          <TestComponent />
        </NoSuspenseWrapper>
      </Suspense>,
    );
  });

  expect(screen.getByText('Outer fallback')).toBeTruthy();

  await act(async () => {
    resolve('Hello World!');
    await promise;
  });

  expect(screen.getByText('Hello World!')).toBeTruthy();
});

test('suspense can be enabled without configuring a fallback', async () => {
  const { promise, resolve } = deferred();

  const TestComponent = () => {
    const dialog = useDialog(SuspendingDialog, { defaultData: promise });
    return openOnMount(dialog);
  };

  await act(async () => {
    render(
      <Suspense fallback={<div>Outer fallback</div>}>
        <DialogProvider suspense>
          <TestComponent />
          <DialogOutlet />
        </DialogProvider>
      </Suspense>,
    );
  });

  // The dialog renders nothing while suspended, rather than suspending the
  // boundary above the outlet
  expect(screen.queryByText('Outer fallback')).toBeNull();

  await act(async () => {
    resolve('Hello World!');
    await promise;
  });

  expect(screen.getByText('Hello World!')).toBeTruthy();
});
