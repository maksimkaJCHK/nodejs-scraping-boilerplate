import puppeteer from 'puppeteer';
import log from 'cllc';

import itemSpider from './itemSpider.js';
import { delayF } from '../../../services/delay.js';
import { settings } from './settings.js';

const typeSpider = async ({
  startPage,
  itemCallback = (x) => x,
  resultsCallback = (x) => x,
  delay
}) => {
  const domen = 'https://example-domen.com/';
  const listLink = '.listLinks';
  const nextPage = '.nextPage';

  let isScraping = true;
  const results = [];

  const browser = await puppeteer.launch(settings.launch);

  const context = await browser.createBrowserContext();
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.setViewport(settings.viewPort);
  await page2.setViewport(settings.viewPort);

  await page1.goto(startPage, settings.gotoParam);

  while (isScraping) {
    const contentParse = await page1.evaluate((listLink, domen, nextPage) => {
      const results = [];

      const links = document.querySelectorAll(listLink);

      links.forEach((el) => {
        results.push(el.getAttribute('href'));
      });

      const nextPageUrl = document.querySelector(nextPage);
      let bLinks = null;
      
      if (nextPageUrl) bLinks = domen + nextPageUrl.getAttribute('href');

      return [results, bLinks];
    }, listLink, domen, nextPage);

    const [items, nextPageUrl] = contentParse;

    for (let i = 0; i < items.length; i++) {
      await itemSpider({
        url: items[i],
        page: page2,
        itemCallback(item) {
          itemCallback(item);
          results.push(item);
        }
      });

      await delayF(delay);
    }

    if (nextPageUrl) {
      log().info(`Переход на страницу - ${nextPageUrl}`);

      await page1.goto(nextPageUrl, settings.gotoParam);
    }

    if (!nextPageUrl) isScraping = false;
  }

  resultsCallback(results);
  await browser.close();
}

export default typeSpider;