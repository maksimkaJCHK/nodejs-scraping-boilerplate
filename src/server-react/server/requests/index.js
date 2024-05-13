import fs from 'fs';

import { bSeo, bPage } from '../../helpers/helpers.js';
import { topNav, navParams } from '../model/nav.js';

import { mainPage, mainPagePost } from './mainPage.js';
import { allShopsPage, allShopsPagePost } from './allShops.js';
import { curShopPage, curShopPagePost } from './curShopPage.js';
import { newItemsPage, newItemsPagePost } from './newItems.js';
import { newFrazePage, newFrazePagePost } from './newFraze.js';
import { pageNotFound } from './pageNotFound.js';
import { searchPage, searchPagePost } from './search.js';

const typeLayout = fs.readFileSync('./src/server-react/server/views/main.html', {
  encoding: 'utf8',
});

const typeParam = {
  bSeo,
  bPage,
  topNav,
  navParams,
  typeLayout
};

const pages = {
  mainPagePost,
  allShopsPagePost,
  cgShopPost: curShopPagePost('cg'),
  lbShopPost: curShopPagePost('lb'),
  newItemsPagePost,
  newFrazePagePost,
  searchPagePost,
  searchPage: searchPage(typeParam),
  mainPage: mainPage(typeParam),
  allShopsPage: allShopsPage(typeParam),
  cgShop: curShopPage({
    ...typeParam,
    type: 'cg',
  }),
  lbShop: curShopPage({
    ...typeParam,
    type: 'lb',
  }),
  newItemsPage: newItemsPage(typeParam),
  newFrazePage: newFrazePage(typeParam),
  pageNotFound,
}

export default pages;