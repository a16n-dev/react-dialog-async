// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      plugins: [
        starlightBlog({
          navigation: 'header-start',
          authors: {
            a16n: {
              name: 'Alex Nicholson',
              title: 'Maintainer',
              url: 'https://a16n.dev',
            },
          },
        }),
        starlightThemeRapide(),
      ],
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
            {
              label: 'Creating Dialog Components',
              slug: 'concepts/creating-dialog-components',
            },
            { label: 'Typescript', slug: 'concepts/typescript' },
            { label: 'Multiple Dialogs', slug: 'concepts/multiple-dialogs' },
            { label: 'Animations', slug: 'concepts/animations' },
            { label: 'Performance', slug: 'concepts/performance' },
            { label: 'Static Dialogs', slug: 'concepts/static-dialogs' },
            { label: 'React Native', slug: 'concepts/react-native' },
            { label: 'Next.js / SSR', slug: 'concepts/next-js-ssr' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            {
              label: 'Hooks',
              items: [
                { label: 'useDialog', slug: 'reference/hooks/use-dialog' },
                {
                  label: 'useDialogLazy',
                  slug: 'reference/hooks/use-dialog-lazy',
                },
                {
                  label: 'useDialogContext',
                  slug: 'reference/hooks/use-dialog-context',
                },
              ],
            },
            {
              label: 'Components',
              items: [
                {
                  label: 'DialogProvider',
                  slug: 'reference/components/dialog-provider',
                },
                {
                  label: 'DialogOutlet',
                  slug: 'reference/components/dialog-outlet',
                },
                {
                  label: 'StaticDialog',
                  slug: 'reference/components/static-dialog',
                },
              ],
            },
            {
              label: 'Types',
              items: [
                {
                  label: 'AsyncDialogProps',
                  slug: 'reference/types/async-dialog-props',
                },
              ],
            },
          ],
        },
      ],
    }),
    react(),
  ],
});
