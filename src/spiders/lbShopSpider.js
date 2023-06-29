const log = require('cllc')();
const needle = require('needle');
const tress = require('tress');
const cheerio = require('cheerio');

const { renameFileForAnalitics, makeFolder, makeFile } = require('../services/fs');

const { delayF } = require('../services/delay');

const lbShopSpider = async (findFrase) => {
  let isFinish = false;
  const domen = 'https://www.labirint.ru';

  let page = 1;
  let count = 0;

  const delay = -1000;
  const forBuildUrl = `https://www.labirint.ru/search/${findFrase}/`;
  const results = [];

  const q = tress((url, callback) => {
    const options = {};

    needle.get(url, options, (err, res) => {
      if (res.statusCode === 404) {
        log.error('Такой страницы нет - ' + url);
      } else {
        options.cookies = res.cookies;

        if (err || res.statusCode !== 200) {
          log.e((err || res.statusCode) + ' - ' + url);
    
          return callback(true);
        }

        const $ = cheerio.load(res.body);

        // Собираю информацию с товаров
        if ($('.genres-carousel__item').length) {
          $('.genres-carousel__item').each(function() {
            count += 1;

            const imgBlock = $(this).find('.cover');

            const urlPage = imgBlock.attr('href');
            const picture = imgBlock.find('img').attr('data-src');
            const price = $(this).find('.price .price-val').text().trim();
            const priceOld = $(this).find('.price-old').text().trim();
            const title = $(this).find('.product-title').text().trim();
            const publisher = $(this).find('.product-pubhouse__pubhouse').text().trim();

            results.push({
              page,
              count,
              url: domen + urlPage,
              picture,
              price,
              priceOld,
              title,
              publisher,
            });
          });
        }

        // Перехожу на следующую страницу
        if ($('.pagination-next__text').attr('href')) {
          page += 1;
          log.info('Страница - ', page);

          q.push(forBuildUrl + $('.pagination-next__text').attr('href'));
        }
      }

      callback();
    });
  }, delay);

  q.success = function(data) {
    log.info(this);
    log.info('Все прошло нормально - ', data);
  }
  
  q.retry = function(){
    q.pause();
    log.i('Paused on:', this);
  
    setTimeout(function(){
      q.resume();
      log.i('Resumed');
    }, 300000);
  }
  
  q.drain = () => {
    isFinish = true;

    log.info('__________________________________');
    log.info('Парсинг закончился');
    log.info(`Всего найдено ${results.length} товара, по запросу ${findFrase}`);

    // Вполне возможно, я лабиринт буду отдельно парсить, к примеру если на читай городе сменят API
    makeFolder('./results/shop-result');

    const path = './results/shop-result/';
    const name = `lb-shop-${findFrase}`;
    const extension = '.json';

    renameFileForAnalitics({
      path,
      name,
      extension,
      callback() {
        makeFile(path + name + extension, JSON.stringify(results, null, 2));
      }
    });
  };

  q.push(forBuildUrl + `?stype=0&page=${page}`);

  while (!isFinish) {
    await delayF();
  }
}

exports.lbShopSpider = lbShopSpider;