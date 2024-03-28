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
      format: 'cjs',
      // chunkFileNames() {
      //   return 'common.js'
      // }
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
      format: 'cjs',
      chunkFileNames() {
        return 'common.js'
      }
    },
    ...initParamsExpress,
  },
];