// vite.config.js
// Vite configuration file for the project

import { defineConfig } from 'vite'; // Import Vite's config helper
import react from '@vitejs/plugin-react'; // React plugin for Vite
import mdx from '@mdx-js/rollup'; // MDX plugin to support .mdx files

// Export the Vite configuration
export default defineConfig({
  base: '/', // Custom domain uses root path
  plugins: [
    react(), // Enables React fast refresh and JSX support
    mdx(),   // Allows importing and using MDX files as components
  ],
  server: {
    port: 3000,        // Dev server will try to use port 3000
    strictPort: true,  // If port 3000 is taken, Vite will fail instead of picking another port
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep the largest framework and integration packages in stable chunks.
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('@emailjs/browser')) {
            return 'email';
          }

          if (id.includes('@mdx-js/react')) {
            return 'mdx';
          }

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router-dom/')
          ) {
            return 'vendor';
          }

          return undefined;
        }
      }
    },
    // Enable compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      }
    }
  }
});
