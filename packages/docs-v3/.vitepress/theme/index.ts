import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './hazel.css';

// Extend the default theme with a "For LLMs" link injected above each doc,
// plus a date/author byline on blog posts.
export default {
  ...DefaultTheme,
  Layout,
};
