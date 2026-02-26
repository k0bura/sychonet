import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://k0bura.github.io',
  integrations: [mdx()],
});
