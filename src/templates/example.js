import puppeteer from 'puppeteer';
import log from 'cllc';

import { delayF } from '../services/delay.js';

const typePuppeteerSpider = async ({
  startPage,
  itemCallback = (x) => x,
  resultsCallback = (x) => x,
  delay = 2_000
}) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1880,1024`]
  });

  const context = await browser.createBrowserContext();
  const page1 = await browser.newPage();

  await page1.setViewport({
    width: 1880,
    height: 1024,
  });


  await page1.goto(startPage, {
    timeout: 60_000,
    waitUntil: 'domcontentloaded'
  });

  const content = await page1.content();
  console.log(content);
  await page1.locator('[name="loginInterlabs"]').fill('login');
  await page1.locator('[name="passwordInterlabs"]').fill('elda');
  await page1.locator('.btn').click();
  //await browser.close();
}

typePuppeteerSpider({ startPage: 'https://example-domen.com/logon.html' });
export default typePuppeteerSpider;