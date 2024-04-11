const { lbShopSpider } = require('./lbShopSpider');
const { cgShopSpider } = require('./cgShopSpider');
const { makeResultsFolder } = require('../services/fs.js');

const shopScraping = async (callback = (f) => f) => {
  makeResultsFolder();

  await cgShopSpider('javascript', callback);
  await cgShopSpider('python', callback);
  await cgShopSpider('typescript', callback);
  await cgShopSpider('react', callback);
  await cgShopSpider('angular', callback);

  await lbShopSpider('javascript', callback);
  await lbShopSpider('python', callback);
  await lbShopSpider('typescript', callback);
  await lbShopSpider('react', callback);
  await lbShopSpider('angular', callback);

  process.exit(1);
}

exports.shopScraping = shopScraping;