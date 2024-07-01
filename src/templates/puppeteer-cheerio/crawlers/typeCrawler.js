import log from 'cllc';
import typeSpider from '../spiders/typeSpider.js';

const startPage = 'https://example-page.com';

const itemCallback = (item) => {
  log().info(item);
}

const resultsCallback = (results) => {
  log().info(`Всего найдено ${results.length} элементов!`);
}

const typeCrawler = async ({
  startPage,
  delay = 1000
}) => {
  await typeSpider({
    startPage,
    itemCallback,
    resultsCallback,
    delay
  })
}

typeCrawler({ startPage })