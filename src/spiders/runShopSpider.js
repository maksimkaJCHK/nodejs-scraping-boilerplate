const { shopScraping } = require('./shopScraping');

const runShopSpider = async () => {
  await shopScraping();

  process.exit(1);
}

runShopSpider();