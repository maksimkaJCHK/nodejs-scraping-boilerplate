import { shopScraping } from './shopScraping.js';

const runShopSpider = async () => {
  await shopScraping();

  process.exit(1);
}

runShopSpider();