import { initParamsComponents, initParamsExpress } from './rollup-configs/init-config';

export default [
  {
    input: [
      './src/server-react/react/layout/Nav.jsx',
      './src/server-react/react/layout/Params.jsx',
      './src/server-react/react/components/ShopLinks.jsx',
      './src/server-react/react/components/MainLinks.jsx',
      './src/server-react/react/components/ItemCh.jsx',
      './src/server-react/react/components/ItemLb.jsx',
      './src/server-react/react/components/ShopList.jsx',
      './src/server-react/react/components/MainShopList.jsx',
      './src/server-react/react/components/MainCatalog.jsx',
    ],
    output: {
      dir: `./src/server-react/react/ssr-components/`,
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