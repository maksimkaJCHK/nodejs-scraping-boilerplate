import log from 'cllc';
import needle from 'needle';
import tress from 'tress';
import * as cheerio from 'cheerio';

// Это не  всегда нужно
const domen = 'https://example-domen.com/';

const typeSpider = ({
  startUrl,
  itemCallback = (x) => x,
  resultsCallback = (x) => x,
  delay = -700
}) => {
  const options = {
    cookies: {},
    headers: {},
    follow_max: 5
  };

  let results = [];

  // Типовые идентификаторы
  const nextPage = '.pextPage';
  const listLink = '.listLink';
  const curContId = '.cont';

  const q = tress((url, callback) => {
    let item = {};

    needle.get(url, options, (err, res) => {
      if (res.statusCode === 404) {
        log().error('Такой страницы нет - ' + url);
      } else {
        options.cookies = res.cookies;
        options.headers = res.headers;
        item = {}

        if (err || res.statusCode !== 200) {
          log().e((err || res.statusCode) + ' - ' + url);

          return callback(true);
        }

        const $ = cheerio.load(res.body);

        if ($(curContId).length) {
          // Тут я собираю текущие данные с конкретной страницы
          item = {}

          results.push(item);
        }

        $(listLink).each(function() {
          const url = $(this).attr('href');

          q.push(url);
        });

        // Домен не всегда нужен, может он уже есть в ссылке
        if ($(nextPage).attr('href')) {
          log().info('Произошел переход на следующую страницу');

          q.push(domen + $(nextPage).attr('href'));
        }
      }

      callback(null, item);
    });
  }, delay);

  // Для конкретного элемента, если мне к примеру нужно записать его в базу данных или еще что сделать
  q.success = function(data) {
    log().info(this);
    log().info('Все прошло нормально!');

    itemCallback(data);
  }

  // Пауза/возобновление, если вдруг сайт стал недоступен, или меня заблокировали за активность
  q.retry = function(){
    q.pause();

    log().i('Скрапинг остановился: ', this);

    setTimeout(function(){
      q.resume();

      log().i('Скрапинг возобновлен');
    }, 300_000);
  }

  // Если нужно передать итоговый результат
  q.drain = () => resultsCallback(results);

  q.push(startUrl);
}

export default typeSpider;