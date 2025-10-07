import { type PropsWithChildren } from 'react';
import { expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { DialogProvider } from '../DialogProvider/DialogProvider.js';
import { DialogOutlet } from '../DialogOutlet/DialogOutlet.js';
import { useDialogLazy } from './useDialogLazy.js';

const TestWrapper = ({ children }: PropsWithChildren) => (
  <DialogProvider>
    {children}
    <DialogOutlet />
  </DialogProvider>
);

const TestDialog = () => <div>Hello World!</div>;

test('Calling preload() calls the loader function', () => {
  const loaderFn = vi.fn(async () => TestDialog);

  const { result } = renderHook(() => useDialogLazy(loaderFn), {
    wrapper: TestWrapper,
  });

  result.current.preload();

  expect(loaderFn).toHaveBeenCalledTimes(1);
});

test('Passing a dynamic import in the loader function automatically loads the default export', async () => {
  const { result } = renderHook(
    () =>
      useDialogLazy(async () => {
        return await new Promise<{ default: typeof TestDialog }>((resolve) =>
          setTimeout(() => resolve({ default: TestDialog }), 50),
        );
      }),
    {
      wrapper: TestWrapper,
    },
  );

  const openPromise = result.current.open();

  // Wait a bit for the dynamic import to resolve
  await new Promise((resolve) => setTimeout(resolve, 100));

  const dialog = document.querySelector('div');

  expect(dialog).toBeTruthy();
  expect(dialog?.textContent).toBe('Hello World!');

  await openPromise;
});
