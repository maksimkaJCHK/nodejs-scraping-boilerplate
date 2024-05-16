import { lbShopSpider } from '../spiders/lbShopSpider.js';
import { cgShopSpider } from '../spiders/cgShopSpider.js';

import { makeResultsFolder } from '../services/fs.js';
import { callbackResults } from './services/shop.js';

export const shopScraping = async (callback = (f) => f) => {
  const createParamsLb = (phrase) => ({
    findFrase: phrase,
    callbackOutput: callback,
    callbackResults: callbackResults('лабиринт', 'lb')
  });

  const createParamsCg = (phrase) => ({
    findFrase: phrase,
    callbackOutput: callback,
    callbackResults: callbackResults('читай-город', 'cg')
  });

  makeResultsFolder();

  callback('Скрапинг интернет-магазина читай-город начался');

  await cgShopSpider(createParamsCg('javascript'));
  await cgShopSpider(createParamsCg('python'));
  await cgShopSpider(createParamsCg('typescript'));
  await cgShopSpider(createParamsCg('react'));
  await cgShopSpider(createParamsCg('angular'));

  callback('Скрапинг интернет-магазина лабиринт начался');

  await lbShopSpider(createParamsLb('javascript'));
  await lbShopSpider(createParamsLb('python'));
  await lbShopSpider(createParamsLb('typescript'));
  await lbShopSpider(createParamsLb('react'));
  await lbShopSpider(createParamsLb('angular'));
}