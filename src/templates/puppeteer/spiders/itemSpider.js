import log from 'cllc';
import { settings } from './settings.js';

const itemSpider = async ({
  url,
  page,
  itemCallback = (x) => x
}) => {
  try {
    log().info(`Переход на страницу - ${url}`);

    await page.goto(url, settings.gotoParam);

    const item = await page.evaluate(() => {
      // Для примера
      const head = document.querySelector('.h1-portfol')?.textContent;
      const desc1 = document.querySelector('.news-page-content__img')?.textContent;
      const desc2 = document.querySelector('.news-page-content')?.innerHTML;
      const description = desc1 || desc2;

      return {
        head: head || '',
        description
      }
    });

    itemCallback(item);
  } catch (error) {
    log().error('Что-то пошло не так');

    if (error.message) log().error(error.message);
    if (!error.message) log().error(error);
  }
}

export default itemSpider;