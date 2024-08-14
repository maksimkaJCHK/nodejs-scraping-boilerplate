import log from 'cllc';
import needle from 'needle';
import tress from 'tress';
import * as cheerio from 'cheerio';

import { delayF } from '../services/delay.js';

export const lbShopSpider = async ({
  findFrase,
  callbackOutput = (f) => f,
  callbackResults = (f) => f
}) => {
  let isFinish = false;
  const domen = 'https://www.labirint.ru';

  let page = 1;
  let count = 0;

  const delay = -1000;
  const forBuildUrl = `https://www.labirint.ru/search/${findFrase}/`;
  const results = [];

  const q = tress((url, callback) => {
    const options = {
      cookies: {}
    };

    needle.get(url, options, (err, res) => {
      if (res.statusCode === 404) {
        const msg = 'Такой страницы нет - ' + url;

        log().error(msg);
        callbackOutput(msg, 'error');
      } else {
        options.cookies = res.cookies;

        if (err || res.statusCode !== 200) {
          log().e((err || res.statusCode) + ' - ' + url);
    
          return callback(true);
        }

        const $ = cheerio.load(res.body);

        // Собираю информацию с товаров
        if ($('.product-card').length) {
          $('.product-card').each(function() {
            count += 1;

            const imgBlock = $(this).find('.product-card__img');

            const urlPage = imgBlock.attr('href');
            const picture = imgBlock.find('img').attr('data-src');
            const price = $(this).find('.product-card__price-current').text().trim();
            const title = $(this).find('.product-card__name').text().trim();
            const publisher = $(this).find('.product-card__info').text().trim();
            const author = $(this).find('.product-card__author').text().trim();

            const priceOld = $(this).find('.product-card__price-val-old').text()
              .replace(/\n/gi, '')
              .replace(/( ){2,}/gi, ' ')
              .trim();

            results.push({
              page,
              count,
              url: domen + urlPage,
              picture,
              price,
              priceOld,
              title,
              publisher,
              author,
            });
          });
        }

        // Перехожу на следующую страницу
        if ($('.pagination-next__text').attr('href')) {
          page += 1;
          const msg = `Страница - ${page} для запроса ${findFrase} для интеренет-магазина лабиринт.`;

          log().info(msg);
          callbackOutput(msg);
          q.push(forBuildUrl + $('.pagination-next__text').attr('href'));
        }
      }

      callback();
    });
  }, delay);

  q.success = function(data) {
    log().info(this);
    log().info('Все прошло нормально - ', data);
  }

  q.retry = function(){
    q.pause();
    log().i('Paused on:', this);
  
    setTimeout(function(){
      q.resume();
      log().i('Resumed');
    }, 300000);
  }

  q.drain = () => {
    isFinish = true;

    callbackResults(findFrase, results, callbackOutput);
  };

  q.push(forBuildUrl + `?stype=0&page=${page}`);

  while (!isFinish) {
    await delayF();
  }
}