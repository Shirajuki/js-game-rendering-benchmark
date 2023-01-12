import fs from 'fs';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

const input = {};
fs.readdirSync('src').forEach((file) => {
  if (file.endsWith('.html')) {
    if (file === 'index.html') return;
    input[file.split('.')[0]] = resolve('src', file);
  }
});

export default {
  root: 'src',
  base:
    process.env.NODE_ENV === 'development'
      ? './'
      : '/js-game-rendering-benchmark/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve('src', 'index.html'),
        ...input,
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve('src', 'partials'),
    }),
  ],
};
