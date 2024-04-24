const { lbShopSpider } = require('./lbShopSpider');
const { cgShopSpider } = require('./cgShopSpider');
const { makeResultsFolder } = require('../services/fs.js');

const shopScrapingForFraze = async (fraze, callback = (f) => f) => {
  callback(`Начало поиска по фразе ${callback}`);
  makeResultsFolder();

  callback(`Скрапинг интернет-магазина читай-город для фразы ${fraze} начался`);
  await cgShopSpider(fraze, callback);
  callback(`Скрапинг интернет-магазина лабиринт для фразы ${fraze} начался`);
  await lbShopSpider(fraze, callback);

  callback(`Поиск по фразе ${callback} закончился`);
}

exports.shopScrapingForFraze = shopScrapingForFraze;