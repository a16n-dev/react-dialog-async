---
title: Blog
---

<script setup>
import { data as posts } from '../.vitepress/theme/posts.data';
</script>

# Blog

Release notes and announcements for React Dialog Async.

<div class="blog-list">
  <a v-for="post of posts" :key="post.url" class="blog-card" :href="post.url">
    <time :datetime="post.date">{{ post.date }}</time>
    <h2>{{ post.title }}</h2>
    <p v-if="post.description">{{ post.description }}</p>
  </a>
</div>

<style>
.blog-list {
  display: grid;
  gap: 12px;
  margin-top: 24px;
}
.vp-doc a.blog-card {
  display: block;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: border-color 0.2s;
}
.vp-doc a.blog-card:hover {
  border-color: var(--vp-c-brand-1);
}
.blog-card time {
  font-size: 13px;
  color: var(--vp-c-text-3);
}
.vp-doc .blog-card h2 {
  margin: 4px 0 0;
  padding: 0;
  border: 0;
  font-size: 18px;
}
.vp-doc .blog-card p {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
}
</style>
