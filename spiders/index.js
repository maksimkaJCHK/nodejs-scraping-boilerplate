const log = require('cllc')();
const needle = require('needle');
const tress = require('tress');
const cheerio = require('cheerio');
const fs = require('fs');

const URL = 'https://khazin.ru/articles/';
const options = {};
const delay = -1000;

let results = [];
let count = 0;
let page = 0;

const buildPost = (html) => {
  return html
    .replace(/&/gi, "&amp;")
    .replace(/</gi, "&lt;")
    .replace(/>/gi, "&gt;")
    .replace(/"/gi, "&quot;")
    .replace(/'/gi, "&#039;");
};

const bNamePage = (url) => {
  const bUrl = url.replace('https://khazin.ru/', '');

  return `${bUrl
    .replace(/\\/gi, '')
    .replace(/\//gi, '')}`;
}

fs.mkdir('./results', err => {
  if (err) {
    log.warn('Не удалось создать папку results');
    log.warn(`${err}`);
  }

  if (!err) log.info('Папка results успешно создана');
});

fs.mkdir('./results/hazin_results', err => {
  if (err) {
    log.warn('Не удалось создать папку hazin_results');
    log.warn(`${err}`);
  }

  if (!err) log.info('Папка hazin_results успешно создана');
});

const q = tress((url, callback) => {
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
  
      // Формирую статью
      if ($('.post-content').html()) {
        count += 1;
        log.info(count);

        results.push({
          page,
          number: count,
          url: url,
          header: $('h1').text(),
          post: buildPost($('.post-content').html())
        });

        require('fs').writeFileSync(`./results/hazin_results/${page}_${count}_${bNamePage(url)}`, $('.post-content').html());
      };
  
      // Собираю ссылки на странице
      $('.posts .post .post__thumbnail>a').each(function() {
        const urlNews = $(this).attr('href');
  
        q.push(urlNews);
      });
  
      // Перехожу на следующую страницу
      if ($('.next.page-numbers').attr('href')) {
        page += 1;
        log.info('Страница - ', page);

        q.push($('.next.page-numbers').attr('href'));
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
  console.log('__________________');
  log.info('Парсинг закончился');

  require('fs').writeFileSync('./results/data.json', JSON.stringify(results, null, 2));
};

q.push(URL);