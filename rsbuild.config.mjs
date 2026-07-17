import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ProvidePlugin } from '@rspack/core';

const { parsed, publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

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
    define: {
      ...publicVars,
      'process.env.BASE_URL': JSON.stringify(parsed.BASE_URL || '/'),
    },
  },
  resolve: {
    alias: {
      path: 'path-browserify',
      util: 'util/',
    },
  },
  tools: {
    rspack: config => {
      config.plugins ||= [];
      config.plugins.push(new ProvidePlugin({ process: 'process/browser' }));
    },
  },
});
