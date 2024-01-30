import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //setting base path for production build
  //https://vitejs.dev/config/shared-options.html 
  base: '/vue/',
  // root: path.resolve(__dirname, 'src'),
  css: {
    devSourcemap: true,
  },
})
