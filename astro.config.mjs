import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://zyang91.github.io/the-unplanned-show/
// Override SITE and BASE for a custom domain (see README, Deployment).
const site = process.env.SITE ?? 'https://zyang91.github.io';
const base = process.env.BASE ?? '/the-unplanned-show';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
