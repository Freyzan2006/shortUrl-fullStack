import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
      '@componentsUX': path.resolve(__dirname, './src/components/ux'),
      '@componentsUI': path.resolve(__dirname, './src/components/ui'), 
      '@componentsL': path.resolve(__dirname, './src/components/layout'),
      "@css": path.resolve(__dirname, "./src/styles")

    },
  },

})
