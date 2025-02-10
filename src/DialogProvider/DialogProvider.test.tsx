import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import DialogProvider from './DialogProvider';
import { useContext, useEffect } from 'react';
import DialogContext from '../DialogContext';
import { AsyncDialogProps } from '../types';

const TestDialog = ({ open }: AsyncDialogProps) => {
  if (!open) return null;

  return <div>{'Hello World!'}</div>;
};
const TestDialogWithKey = ({ open }: AsyncDialogProps) => {
  if (!open) return null;

  return <div>{'Hello World!'}</div>;
};
TestDialogWithKey.dialogKey = 'test-dialog';

// const TestDialogWithData = ({ data }: AsyncDialogProps<any, any>) => (
//   <div>Hello World!</div>
// );

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

    useEffect(() => {
      ctx.register('1', TestDialog);
    }, []);

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

    useEffect(() => {
      const id = ctx.register('1', TestDialog);

      ctx.show(id, {});
    }, []);

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

    useEffect(() => {
      const id = ctx.register('1', TestDialog);

      ctx.show(id, {});

      ctx.hide(id);
    }, []);

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

test('calling register() twice on a dialog with no key results in two dialogs being mounted', () => {
  const InnerComponent = () => {
    const ctx = useContext(DialogContext);

    useEffect(() => {
      ctx.register('1', TestDialog);
      ctx.register('2', TestDialog);

      ctx.show('1', {});
      ctx.show('2', {});
    }, []);

    return null;
  };
  const result = render(
    <DialogProvider>
      <InnerComponent />
    </DialogProvider>,
  );

  expect(result.asFragment()).toMatchSnapshot();
  expect(screen.getAllByText('Hello World!')).toHaveLength(2);
});

test('calling register() twice on a dialog with a key results in only 1 dialog being mounted', () => {
  const InnerComponent = () => {
    const ctx = useContext(DialogContext);

    useEffect(() => {
      const id1 = ctx.register('1', TestDialogWithKey);
      const id2 = ctx.register('2', TestDialogWithKey);

      ctx.show(id1, {});
      ctx.show(id2, {});
    }, []);

    return null;
  };
  const result = render(
    <DialogProvider>
      <InnerComponent />
    </DialogProvider>,
  );

  expect(result.asFragment()).toMatchSnapshot();
  expect(screen.getAllByText('Hello World!')).toHaveLength(1);
});
