import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'

export default {
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve('src', 'index.html'),
        canvas: resolve('src', 'canvas.html'),
        dom: resolve('src', 'dom.html'),
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve('src', 'partials'),
    }),
  ],
}
