import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import DialogProvider from './DialogProvider/DialogProvider';

import useDialog from './useDialog';

const TestDialog = () => <div>Hello World!</div>;

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
