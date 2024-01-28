import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
  html: {
    title: 'Plataforma Digital Nacional',
  },
  plugins: [pluginReact(), pluginNodePolyfill()],
  output: {
    charset: 'utf8',
    polyfill: 'usage',
  },
  source: {
    define: publicVars,
  },
});
