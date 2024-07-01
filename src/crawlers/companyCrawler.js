import log from 'cllc';
import companySpider from '../spiders/companySpider.js';

const startPage = 'https://www.interlabs.ru/news_page_1.htm';

const itemCallback = (item) => {
  log().info(item);
}

const resultsCallback = (results) => {
  log().info(`Всего найдено ${results.length} элементов!`);
}

const typeCrawler = async ({
  startPage,
  delay = 2000
}) => {
  await companySpider({
    startPage,
    itemCallback,
    resultsCallback,
    delay
  })
}

typeCrawler({ startPage })