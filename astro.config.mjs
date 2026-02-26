import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

function rehypeSmallImages() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'element' && node.tagName === 'img' && node.properties) {
        node.properties.sizes = '600px';
      }
      if (node.children) {
        node.children.forEach(visit);
      }
    }
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://k0bura.github.io',
  integrations: [mdx()],
  image: {
    layout: 'constrained',
  },
  markdown: {
    rehypePlugins: [rehypeSmallImages],
  },
});
