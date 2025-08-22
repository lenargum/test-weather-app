import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { compression } from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    vue(),
    // Generate gzip compressed files
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    // Generate brotli compressed files (better compression)
    compression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  // Configure base path for GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/zvonok-weather/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    // Enable minification (default is 'esbuild' which is faster than 'terser')
    minify: 'esbuild',
    // Target modern browsers for better optimization
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['vue']
        }
      }
    },
    // Compress assets
    assetsInlineLimit: 4096 // Inline assets smaller than 4kb
  },
  // Enable compression in preview/production
  server: {
    // Development server settings
    hmr: true
  }
})