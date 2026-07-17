import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
  html: {
    title: 'Plataforma Digital Nacional',
  },
  plugins: [pluginReact()],
  output: {
    charset: 'utf8',
    polyfill: 'usage',
  },
  source: {
    define: publicVars,
  },
  resolve: {
    alias: {
      path: 'path-browserify',
      util: 'util/',
    },
  },
});
