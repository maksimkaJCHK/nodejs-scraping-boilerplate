import * as cheerio from 'cheerio';
import log from 'cllc';

const companyItemSpider = async ({
  url,
  page,
  settings,
  itemCallback = (x) => x
}) => {
  try {
    log().info(`Переход на страницу - ${url}`);

    await page.goto(url, settings.gotoParam);

    const $ = cheerio.load(await page.content());
    // Для примера
    const head = $('.h1-portfol').text();
    const desc1 = $('.news-page-content__img').text();
    const desc2 = $('.news-page-content').html();
    const description = desc1 || desc2;

    itemCallback({
      head: head || '',
      description
    });
  } catch (error) {
    log().error('Что-то пошло не так');

    if (error.message) log().error(error.message);
    if (!error.message) log().error(error);
  }
}

export default companyItemSpider;