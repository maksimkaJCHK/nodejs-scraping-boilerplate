import { initParamsComponents, initParamsExpress } from './rollup-configs/ssr/init-config';

const pathServer = './src/server-react/server';
const pathFront = './src/server-react/react';

export default [
  {
    input: [
      `${pathFront}/pages/PageNotFound.jsx`,
      `${pathFront}/layout/Wrapper.jsx`,
      `${pathFront}/pages/content/AllShopsCont.jsx`,
      `${pathFront}/pages/content/CurShopCont.jsx`,
      `${pathFront}/pages/content/MainCont.jsx`,
    ],
    output: {
      dir: `${pathServer}/ssr-components/`,
      format: 'es',
      chunkFileNames() {
        return "[name].js";
      },
      manualChunks(id) {
        const common = id.includes('react') || id.includes('Link') || id.includes('FrazeNull');

        if (common) {
          return 'common';
        }
      } 
    },
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
      'express',
      'react',
      'react-dom/server',
      'ws',
      'fs',
      'path',
      '../services/fs.js',
      '../analitics/shop.js',
      '../spiders/shopScraping.js',
      '../spiders/shopScrapingForFraze.js',
      './helpers/helpers.js',
      './server/model/nav.js',
      './server/model/main.js',
      './server/model/pages.js',
      './server/ssr-components/Wrapper.js',
      './server/ssr-components/AllShopsCont.js',
      './server/ssr-components/MainCont.js',
      './server/ssr-components/CurShopCont.js',
      './server/ssr-components/PageNotFound.js'
    ],
    ...initParamsExpress,
  },
];