// @ts-check
import { defineConfig } from 'astro/config';
import customTheme from './code-theme.json';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: customTheme,
    }
  },
  site: 'https://saskapult.github.io',
});
