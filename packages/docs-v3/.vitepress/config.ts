import { defineConfig, type DefaultTheme } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hazelDark, hazelLight } from './hazel-shiki';

const srcDir = fileURLToPath(new URL('..', import.meta.url));

/** All source Markdown files, relative to srcDir (excludes build/output dirs). */
function sourceMarkdownFiles(): string[] {
  return (fs.readdirSync(srcDir, { recursive: true }) as string[]).filter(
    (f) =>
      f.endsWith('.md') &&
      f !== 'README.md' &&
      !f.startsWith('.vitepress') &&
      !f.includes('node_modules'),
  );
}

/** Blog posts, newest first, read from the `title:` in each post's frontmatter. */
function blogSidebar(): DefaultTheme.SidebarItem[] {
  return fs
    .readdirSync(path.join(srcDir, 'blog'))
    .filter((f) => f.endsWith('.md') && f !== 'index.md')
    .sort()
    .reverse()
    .map((f) => {
      const source = fs.readFileSync(path.join(srcDir, 'blog', f), 'utf8');
      const title = source.match(/^title:\s*(.+)$/m)?.[1].trim() ?? f;
      return { text: title, link: `/blog/${f.replace(/\.md$/, '')}` };
    });
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'React Dialog Async',
  description: 'Ergonomic & performant dialog API for React & React Native',
  cleanUrls: true,
  lastUpdated: true,
  // Hazel is dark-first; the toggle still offers its light variant.
  appearance: 'dark',
  srcExclude: ['README.md'],
  sitemap: {
    hostname: 'https://react-dialog-async.a16n.dev',
  },

  markdown: {
    theme: { light: hazelLight, dark: hazelDark },
  },

  // Copy raw Markdown into the build output so each page's "For LLMs" button
  // (see theme/Layout.vue) can link to its own source, e.g. /guides/introduction.md.
  buildEnd(siteConfig) {
    for (const rel of sourceMarkdownFiles()) {
      const dest = path.join(siteConfig.outDir, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(path.join(srcDir, rel), dest);
    }
  },

  // Serve the same raw Markdown in `vitepress dev` (the build copy doesn't
  // exist yet), so the "For LLMs" link works while developing too.
  vite: {
    plugins: [
      {
        name: 'rda-raw-markdown',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url?.split('?')[0] ?? '';
            if (!url.endsWith('.md')) return next();
            // VitePress loads each page's .md as a JS module in dev. Only
            // intercept real navigations (clicking the "For LLMs" link) and
            // let Vite serve its internal module requests untouched.
            if (req.headers['sec-fetch-dest'] !== 'document') return next();
            const fp = path.join(srcDir, decodeURIComponent(url));
            if (!fp.startsWith(srcDir) || !fs.existsSync(fp)) return next();
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
            res.end(fs.readFileSync(fp));
          });
        },
      },
    ],
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#282021' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap',
      },
    ],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'React Dialog Async' }],
    [
      'meta',
      {
        name: 'og:description',
        content: 'Ergonomic & performant dialog hooks for React & React Native',
      },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guides/introduction', activeMatch: '/(guides|concepts)/' },
      { text: 'Reference', link: '/reference/hooks/use-dialog', activeMatch: '/reference/' },
      { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
    ],

    sidebar: {
      '/blog/': [
        { text: 'Blog', link: '/blog/' },
        { text: 'Posts', items: blogSidebar() },
      ],
      // One unified sidebar across the docs, so Concepts and Reference read
      // as sections of a single guide.
      '/': [
        {
          text: 'Guides',
          items: [
            { text: 'Introduction', link: '/guides/introduction' },
            { text: 'Getting Started', link: '/guides/installation' },
            { text: 'Migrating to V3', link: '/guides/v3-migration' },
          ],
        },
        {
          text: 'Concepts',
          items: [
            { text: 'Creating Dialog Components', link: '/concepts/creating-dialog-components' },
            { text: 'Typescript', link: '/concepts/typescript' },
            { text: 'Multiple Dialogs', link: '/concepts/multiple-dialogs' },
            { text: 'Animations', link: '/concepts/animations' },
            { text: 'Performance', link: '/concepts/performance' },
            { text: 'Static Dialogs', link: '/concepts/static-dialogs' },
            { text: 'React Native', link: '/concepts/react-native' },
            { text: 'Next.js / SSR', link: '/concepts/next-js-ssr' },
          ],
        },
        {
          text: 'API Reference',
          items: [
            {
              text: 'Hooks',
              items: [
                { text: 'useDialog', link: '/reference/hooks/use-dialog' },
                { text: 'useDialogLazy', link: '/reference/hooks/use-dialog-lazy' },
                { text: 'useDialogContext', link: '/reference/hooks/use-dialog-context' },
              ],
            },
            {
              text: 'Components',
              items: [
                { text: 'DialogProvider', link: '/reference/components/dialog-provider' },
                { text: 'DialogOutlet', link: '/reference/components/dialog-outlet' },
                { text: 'StaticDialog', link: '/reference/components/static-dialog' },
              ],
            },
            {
              text: 'Types',
              items: [
                { text: 'AsyncDialogProps', link: '/reference/types/async-dialog-props' },
              ],
            },
          ],
        },
      ],
    },

    outline: [2, 3],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/a16n-dev/react-dialog-async' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/react-dialog-async' },
    ],

    editLink: {
      pattern: 'https://github.com/a16n-dev/react-dialog-async/edit/main/packages/docs-v3/:path',
      text: 'Edit this page',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'React Dialog Async',
    },
  },
});
