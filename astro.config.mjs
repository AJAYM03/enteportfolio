import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ajaymukund.pages.dev',
  output: 'static',
  build: {
    format: 'directory'
  }
});
