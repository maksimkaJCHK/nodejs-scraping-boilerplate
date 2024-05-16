import { lbShopSpider } from '../spiders/lbShopSpider.js';
import { cgShopSpider } from '../spiders/cgShopSpider.js';

import { makeResultsFolder } from '../services/fs.js';
import { callbackResults } from './services/shop.js';

export const shopScrapingForFraze = async (findFrase, callback = (f) => f) => {
  callback(`Начало поиска по фразе ${findFrase}`);
  makeResultsFolder();

  callback(`Скрапинг интернет-магазина читай-город для фразы ${findFrase} начался`);
  await cgShopSpider({
    findFrase,
    callbackResults: callbackResults('читай-город', 'cg'),
  });

  callback(`Скрапинг интернет-магазина лабиринт для фразы ${findFrase} начался`);
  await lbShopSpider({
    findFrase,
    callbackResults: callbackResults('лабиринт', 'lb'),
  });

  callback(`Поиск по фразе ${findFrase} закончился`);
}