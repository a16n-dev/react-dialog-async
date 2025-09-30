// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: 'React Dialog Async',
      customCss: ['./src/styles/global.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/a16n-dev/react-dialog-async',
        },
        {
          icon: 'npm',
          label: 'NPM',
          href: 'https://www.npmjs.com/package/react-dialog-async',
        },
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Introduction', slug: 'guides/introduction' },
            { label: 'Getting Started', slug: 'guides/installation' },
            { label: 'Migrating to V3', slug: 'guides/v3-migration' },
          ],
        },
        {
          label: 'Concepts',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Animations', slug: 'concepts/animations' },
            { label: 'Performance', slug: 'concepts/performance' },
            { label: 'React Native', slug: 'concepts/react-native' },
            { label: 'Next.js / SSR', slug: 'concepts/next-js-ssr' },
            { label: 'Typescript', slug: 'concepts/typescript' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            {
              label: 'Components',
              items: [],
            },
            {
              label: 'Hooks',
              items: [],
            },
          ],
        },
      ],
    }),
    react(),
  ],
});
