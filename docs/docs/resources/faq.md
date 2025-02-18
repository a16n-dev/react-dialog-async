# FAQs

## Q: Where can I get a dialog component?
Check out some popular UI libraries such as [shadcn](https://ui.shadcn.com/docs/components/dialog) or [MUI](https://mui.com/material-ui/react-dialog/).

## Q: Can I use react-dialog-async with React Native?
Yep, see [more info here](./react-native-support).

## Q: Do I have to use my dialog component with `useDialog`?
No, you can still use your dialogs like regular components. Just make sure to pass in the required props:
```tsx
return (
  <MyDialog open={...} handleClose={...} data={...} />
)
```

