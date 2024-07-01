import puppeteer from 'puppeteer';
import log from 'cllc';

import { delayF } from '../services/delay.js';

const delay = 4_000;

const runBtn = async (buttons, startCount = 0) => {
  for (let i = startCount; i < buttons.length; ++i) {
    await delayF(delay);
    const name = await buttons[i].evaluate((el) => el.textContent);

    log().info(`Нажата кнопка - "${name}"`);

    await buttons[i].click();
  }
}

const bScreen = async ({ page, path, name }) => {
  await page.screenshot({
    path: `${path}${name}.png`,
    fullPage: true
  });

  await page.pdf({
    path: `${path}${name}.pdf`,
  });
}
const hhCompanyBrowserSpider = async ({
  idCompany,
  vacancyCallback,
  resultsCallback,
  screenPath
}) => {
  const url = `https://tula.hh.ru/employer/${idCompany}?hhtmFrom=vacancy`;

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1480,1000`]
  });
  const context = await browser.createBrowserContext();

  const page1 = await context.newPage();

  await page1.setViewport({
    width: 1480,
    height: 1000,
  });

  await page1.goto(url, {
    timeout: 60_000,
    waitUntil: 'domcontentloaded'
  });

  await delayF(delay);

  const buttonsRegion = await page1.$$('[data-qa="vacancies-in-region-switch"]');

  await runBtn(buttonsRegion, 1);

  await delayF(delay);
  const buttonsJob = await page1.$$('[data-qa="vacancies-in-prof-role-switch"]');

  await runBtn(buttonsJob);
  await delayF(delay);

  const linksPage = await page1.evaluate(() => {
    const links = document.querySelectorAll('[data-qa="vacancy-serp__vacancy-title"]');
    const linksArr = [];

    links.forEach((el) => {
      linksArr.push(el.getAttribute('href'));
    });

    return linksArr;
  });

  if (screenPath) await bScreen({
    page: page1,
    path: screenPath,
    name: 'list-job'
  });

  await delayF(delay);

  const results = [];

  for (let i = 0; i < linksPage.length; i++) {
    await page1.goto(linksPage[i], {
      timeout: 60_000,
      waitUntil: 'domcontentloaded'
    });

    log().info(`Произошел переход на страницу - "${linksPage[i]}"`);

    await delayF(delay);

    const job = await page1.evaluate(() => {
      const name = document.querySelector('.vacancy-title h1')?.textContent;

      const price1 = document.querySelector('[data-qa="vacancy-salary"]')?.textContent;
      const price2 = document.querySelector('.vacancy-salary-compensation-type-gross')?.textContent;
      const price = price1 || price2;
      
      const desc1 = document.querySelector('.vacancy-branded-user-content')?.innerHTML;
      const desc2 = document.querySelector('.vacancy-description')?.innerHTML;
      const description = desc1 || desc2;

      return {
        name,
        price,
        description
      };
    })

    if (job.name) {
      const isProger = job.name.toLowerCase().indexOf('программист') !== -1;
      const isFront = job.name.toLowerCase().indexOf('front') !== -1;
      const isVerst = job.name.toLowerCase().indexOf('верстальщик') !== -1;
      const isWeb = job.name.toLowerCase().indexOf('web') !== -1;

      if (screenPath && (isProger || isFront || isVerst || isWeb)) {
        await bScreen({
          page: page1,
          path: screenPath,
          name: job.name
        });
      }

      vacancyCallback(job);
      results.push(job);
    }
  }

  resultsCallback(results);

  await browser.close();
}

export default hhCompanyBrowserSpider;