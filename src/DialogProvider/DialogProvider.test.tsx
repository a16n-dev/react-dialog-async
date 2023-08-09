import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import DialogProvider from './DialogProvider';
import { useContext, useEffect } from 'react';
import DialogContext from '../DialogContext';

const TestDialog = () => <div>{'Hello World!'}</div>;

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
      ctx.register(TestDialog);
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
      const id = ctx.register(TestDialog);

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
