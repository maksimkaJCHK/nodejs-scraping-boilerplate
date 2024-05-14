import puppeteer from 'puppeteer';

const bNamePage = (url) => `${url
  .replace(/\\/gi, '_')
  .replace(/\//gi, '_')}`;

const browserExampleSpider = async ({
  domen,
  makeResultsFolder,
  delayF,
  savePage,
  login,
  password
}) => {
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

  await page.type('#username', login);
  await page.type("#password", password)

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

        savePage({
          name: bNamePage(url),
          body
        })
      } catch (error) {
        console.log(error);
      }
    };

    await browser.close();
  }

  bPage();
};

export default browserExampleSpider;