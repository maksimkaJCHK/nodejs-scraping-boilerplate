import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import sizes from "rollup-plugin-sizes";

import { bTypePlugins } from './rollup-configs/front/initParams';

const appRoot = require('app-root-path');
const path = require('path');

const typePlugins = bTypePlugins({ minimizeCss: false });

const pathFront = `./src/server-react`;

export default {
  input: `${pathFront}/react/app.js`,
  output: {
    file: `${pathFront}/server/public/js/main.js`,
    name: 'main',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    livereload({
      watch: path.resolve(appRoot.path, 'src/server-react/react/'),
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    ...typePlugins,
    sizes(),
  ],
};