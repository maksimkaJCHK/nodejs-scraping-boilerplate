import typepSpider from '../spiders/typeSpider.js';
import log from 'cllc';

const startUrl = 'https://example-url.com/example/';

const itemCallback = (item) => {
  log().info(item);
}

const resultsCallback = (resilts) => {
  log().info(`Всего найдено ${resilts.length} элементов!`);
}

const typeCrawler = ({
  startUrl,
  delay = -700
}) => {
  typepSpider({
    startUrl,
    itemCallback,
    resultsCallback,
    delay,
  })
}

typeCrawler({ startUrl });