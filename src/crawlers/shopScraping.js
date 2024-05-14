import { lbShopSpider } from '../spiders/lbShopSpider.js';
import { cgShopSpider } from '../spiders/cgShopSpider.js';
import { makeResultsFolder } from '../services/fs.js';

export const shopScraping = async (callback = (f) => f) => {
  makeResultsFolder();

  callback('Скрапинг интернет-магазина читай-город начался');

  await cgShopSpider('javascript', callback);
  await cgShopSpider('python', callback);
  await cgShopSpider('typescript', callback);
  await cgShopSpider('react', callback);
  await cgShopSpider('angular', callback);

  callback('Скрапинг интернет-магазина лабиринт начался');

  await lbShopSpider('javascript', callback);
  await lbShopSpider('python', callback);
  await lbShopSpider('typescript', callback);
  await lbShopSpider('react', callback);
  await lbShopSpider('angular', callback);
}