import log from 'cllc';
import needle from 'needle';
import tress from 'tress';
import cheerio from 'cheerio';

const buildPost = (html) => {
  return html
    .replace(/&/gi, "&amp;")
    .replace(/</gi, "&lt;")
    .replace(/>/gi, "&gt;")
    .replace(/"/gi, "&quot;")
    .replace(/'/gi, "&#039;");
};

const khazinSpider = ({
  URL,
  saveArticle,
  resultsCallback,
  delay = -1000
}) => {
  const options = {
    cookies: {}
  };

  let results = [];
  let count = 0;
  let page = 0;

  const q = tress((url, callback) => {
    needle.get(url, options, (err, res) => {
      if (res.statusCode === 404) {
        log().error('Такой страницы нет - ' + url);
      } else {
        options.cookies = res.cookies;

        if (err || res.statusCode !== 200) {
          log().e((err || res.statusCode) + ' - ' + url);

          return callback(true);
        }
    
        const $ = cheerio.load(res.body);
    
        // Формирую статью
        if ($('.post-content').html()) {
          count += 1;
          log().info(count);

          results.push({
            page,
            number: count,
            url: url,
            header: $('h1').text(),
            post: buildPost($('.post-content').html())
          });

          saveArticle({
            page,
            count,
            url,
            content: $('.post-content').html()
          });
        };

        // Собираю ссылки на странице
        $('.posts .post .post__thumbnail>a').each(function() {
          const urlNews = $(this).attr('href');

          q.push(urlNews);
        });

        // Перехожу на следующую страницу
        if ($('.next.page-numbers').attr('href')) {
          page += 1;
          log().info('Страница - ', page);

          q.push($('.next.page-numbers').attr('href'));
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

  q.drain = () => resultsCallback(results);

  q.push(URL);
}

export default khazinSpider;