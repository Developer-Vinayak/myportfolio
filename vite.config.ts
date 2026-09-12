import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: 'blog/blog.html',
        post1: 'blog/posts/how-i-built-my-portfolio.html',
        post2: 'blog/posts/how-i-learned-backend.html',
      },
    },
  },
});