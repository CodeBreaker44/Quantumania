import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({ // defineConfig is a function that returns an object literal that is used to configure Vite
  plugins: [react()], // plugins is an array of plugins to use
  root: path.resolve(__dirname, 'src'), // root is the directory to load the project from
  build: { // build is an object that configures the build step of Vite
    rollupOptions: { // rollupOptions is an object that configures Rollup (the bundler Vite uses under the hood)
      input: { // input is an object that configures the entry points for Rollup (the bundler Vite uses under the hood) to use when building the project
        main: path.resolve(__dirname,'src', 'index.html'), // include the html file for the entry point
        encryption: path.resolve(__dirname,'src', 'encryption.html'), // include the html file for the entry point
      },
    },
  },
  resolve: { // resolve is an object that configures how Vite resolves modules and loads assets
    alias: { // alias is an object that configures aliases for modules
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: { // server is an object that configures the built-in development server that Vite provides for the project during development mode (when running npm run dev)
    port: 8080,
    hot: true
  }
});
