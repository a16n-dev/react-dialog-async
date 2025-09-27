---
title: React Native
---

React Dialog Async supports React Native out of the box with no additional configuration, as it does not have any dependency on `react-dom`. 

## Portal behaviour
One of the main challenges with creating custom dialogs in React Native is the lack of an equivalent to `createPortal` from `react-dom`. React Dialog Async solves this in most cases with the `<DialogOutlet/>` component, as it can be placed outside of your main app component, allowing dialogs to be rendered above all other content.

## Example

See the [Expo example](../examples/expo) for a working example with React Native and Expo.
