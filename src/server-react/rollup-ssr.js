import { initParamsComponents, initParamsExpress } from './rollup-configs/ssr/init-config';

const pathServer = './src/server-react/server';

const externalArr = [
  'react',
  'react-dom/server',
  '../../../spiders/shopScrapingForFraze.js',
  '../../../services/fs.js',
  '../services/fs.js',
  '../services/services.js',
];

export default [
  {
    input: `${pathServer}/requests/index.js`,
    output: {
      dir: `${pathServer}/requests-ssr/`,
      format: 'es',
      chunkFileNames() {
        return 'common.js'
      }
    },
    external: [
      ...externalArr,
      '../model/main.js',
      '../model/nav.js',
    ],
    ...initParamsComponents,
  },
  {
    input: './src/server-react/index.js',
    output: {
      file: './src/server-react/express-config-compiled.js',
      format: 'es',
      chunkFileNames() {
        return 'common.js'
      }
    },
    external: [
      ...externalArr,
      'express',
      'ws',
      'fs',
      'path',
      '../analitics/shop.js',
      '../spiders/shopScraping.js',
      '../spiders/shopScrapingForFraze.js',
      './helpers/helpers.js',
      './server/model/nav.js',
      './server/model/main.js',
      './server/model/pages.js',
      './server/pages-compiled/index.js',
    ],
    ...initParamsExpress,
  },
];