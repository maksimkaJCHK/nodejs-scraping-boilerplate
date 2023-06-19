const log = require('cllc')();
const fs = require('fs');

const { lbShopSpider } = require('./lbShopSpider');
const { cgShopSpider } = require('./cgShopSpider');

const shopScriping = async () => {
  fs.mkdir('./results', err => {
    if (err) {
      log.warn('Не удалось создать папку results');
      log.warn(`${err}`);
    }

    if (!err) log.info('Папка results успешно создана');
  });

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