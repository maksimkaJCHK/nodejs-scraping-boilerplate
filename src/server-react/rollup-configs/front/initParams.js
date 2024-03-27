import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import url from 'postcss-url';
import alias from '@rollup/plugin-alias';
import autoprefixer from 'autoprefixer';

const appRoot = require('app-root-path');
const path = require('path');

export const bTypePlugins = ({ minimizeCss = true }) => {
  return [
    alias({
      entries: [
        {
          find: '@styles',
          replacement: path.resolve(appRoot.path, 'src/server-react/react/styles'), 
        },
        {
          find: '@api',
          replacement: path.resolve(appRoot.path, 'src/server-react/react/api'), 
        },
        {
          find: '@components',
          replacement: path.resolve(appRoot.path, 'src/server-react/react/components'), 
        },
        {
          find: '@slices',
          replacement: path.resolve(appRoot.path, 'src/server-react/react/store/slices'), 
        },
        {
          find: '@pages',
          replacement: path.resolve(appRoot.path, 'src/server-react/react/pages'), 
        },
        {
          find: '../components/ui/Link',
          replacement: path.resolve(appRoot.path, 'src/server-react/react/components/ui/LinkRouter'), 
        },
      ]
    }),
    resolve({
      extensions: ['.js', '.jsx'],
      browser: true,
    }),
    postcss({
      extract: true,
      extract: 'css/main.css',
      minimize: minimizeCss,
      plugins: [
        autoprefixer(),
        url({
          url: "inline",
          maxSize: 10,
          fallback: "copy",
        }),
      ],
    }),
    babel({
      babelHelpers: 'bundled',
      presets: [
        "@babel/preset-react",
      ],
      plugins: [],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        [
          "@babel/preset-env",
          {
            "debug": false,
            "useBuiltIns": "entry",
            "modules": false,
            "corejs": 3,
            "targets": {
              "chrome": "58",
              "ie": "11"
            }
          }
        ],
      ]
    })
  ]
}