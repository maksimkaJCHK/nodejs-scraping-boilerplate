import replace from '@rollup/plugin-replace';
import sizes from "rollup-plugin-sizes";
import { terser } from "rollup-plugin-terser";

import { bTypePlugins } from './rollup-configs/front/initParams';

const typePlugins = bTypePlugins({ minimizeCss: true });

const pathFront = './src/server-react';

export default {
  input: `${pathFront}/react/app.js`,
  output: {
    file: `${pathFront}/server/public/js/main.js`,
    name: 'main',
    format: 'iife'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    ...typePlugins,
    terser({
      output: {
        comments: false,
      },
      compress: {
        drop_console: true,
      },
    }),
    //sizeSnapshot(),
    sizes(),
  ],
};