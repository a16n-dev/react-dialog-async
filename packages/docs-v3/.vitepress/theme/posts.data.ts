import { createContentLoader } from 'vitepress';

export interface Post {
  title: string;
  description?: string;
  url: string;
  date: string;
}

declare const data: Post[];
export { data };

// Every blog post, newest first, for the listing on /blog/.
export default createContentLoader('blog/*.md', {
  transform(raw): Post[] {
    return raw
      .filter((page) => page.frontmatter.date)
      .map((page) => ({
        title: page.frontmatter.title,
        description: page.frontmatter.description,
        url: page.url,
        date: new Date(page.frontmatter.date).toISOString().slice(0, 10),
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
  },
});

