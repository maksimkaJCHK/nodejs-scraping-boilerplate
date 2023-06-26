const puppeteer = require('puppeteer');
const fs = require('fs');
const { makeResultsFolder } = require('../services/makeResults.js');

const domen = 'http://localhost:8080/';

const delayF = (delay = 5000) => {
  return new Promise((resolve, reject) => {
    setInterval(() => resolve(), delay);
  });
};

const bNamePage = (url) => `${url
  .replace(/\\/gi, '_')
  .replace(/\//gi, '_')}`;

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(domen, {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });

  await page.setViewport({
    width: 1600,
    height: 1024
  });

  // Жду, когда загрузится форма авторизации
  await page.waitForSelector('#username');

  await page.type('#username', 'mylogin');
  await page.type("#password", 'myPassword')

  await page.click('#kc-login')

  // Жду когда произойдет переход на страницы

  await delayF();

  const linksPage = await page.evaluate(() => {
    const links = document.querySelectorAll('.nav-menu > a');
    const linksArr = [];

    links.forEach((el) => {
      linksArr.push(el.getAttribute('href'));
    });

    return linksArr;
  });

  const bPage = async () => {
    makeResultsFolder();

    for (let i = 0; i < linksPage.length; i++) {
      const url = linksPage[i];

      try {
        console.log('Начал открывать страницу');

        const pageUrl = await browser.newPage();

        await pageUrl.goto(domen + url.slice(1));

        await delayF();

        const body = await pageUrl.evaluate(() => {
          const app = document.querySelector('#app');

          return app.innerHTML;
        });

        console.log(body);

        require('fs').writeFileSync(`./results/${bNamePage(url)}.txt`, body);
      } catch (error) {
        console.log(error);
      }
    };

    await browser.close();
  }

  bPage();
})();