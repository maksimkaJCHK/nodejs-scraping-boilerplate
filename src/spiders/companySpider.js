import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import log from 'cllc';

import companyItemSpider from './companyItemSpider.js';
import { delayF } from '../services/delay.js';

const settings = {
  viewPort: {
    width: 1880,
    height: 1024,
  },
  launch: {
    headless: false,
    args: [`--window-size=1880,1024`]
  },
  gotoParam: {
    timeout: 60_000,
    waitUntil: 'domcontentloaded'
  }
};

const companySpider = async ({
  startPage,
  itemCallback = (x) => x,
  resultsCallback = (x) => x,
  delay
}) => {
  const domen = 'https://www.interlabs.ru/';
  const listLink = '.news-page__item > a';
  const nextPage = '.page-nav__arrow[title="Следующая страница"]';

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
    const $ = cheerio.load(await page1.content());

    let pageLinks = [];

    $(listLink).each(function() {
      const url = $(this).attr('href');

      if (url) pageLinks.push(url);
    });

    let nextPageUrl = $(nextPage).attr('href');
    nextPageUrl = nextPageUrl ? domen + nextPageUrl : nextPageUrl;

    for (let i = 0; i < pageLinks.length; i++) {
      await companyItemSpider({
        url: pageLinks[i],
        page: page2,
        settings,
        itemCallback(item) {
          itemCallback(item);
          results.push(item);
        }
      })

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

export default companySpider;