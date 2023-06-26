const { lbShopSpider } = require('./lbShopSpider');
const { cgShopSpider } = require('./cgShopSpider');
const { makeResultsFolder } = require('../services/makeResults.js');

const shopScriping = async () => {
  makeResultsFolder();

  await cgShopSpider('javascript');
  await cgShopSpider('python');
  await cgShopSpider('typescript');
  await cgShopSpider('react');
  await cgShopSpider('angular');

  await lbShopSpider('javascript');
  await lbShopSpider('python');
  await lbShopSpider('typescript');
  await lbShopSpider('react');
  await lbShopSpider('angular');

  process.exit(1);
}

shopScriping();