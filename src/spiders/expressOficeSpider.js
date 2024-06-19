import log from 'cllc';
import needle from 'needle';
import tress from 'tress';
import cheerio from 'cheerio';

const expressOfice = ({ URL, delay } = {
  URL: 'https://tula.hh.ru/search/vacancy?from=employerPage&employer_id=909573&hhtmFrom=employer',
  delay: -700
}) => {
  const options = {
    cookies: {}
  };

  let results = [];

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

        const isVacancy = $('.vacancy-title').length;

        if (isVacancy) {
          const name = $('.vacancy-title').find('h1').text();
          const price = $('[data-qa="vacancy-salary"]').text();
          const description = $('.vacancy-branded-user-content').html();

          results.push({
            name,
            price,
            description
          })
        }

        $('main .vacancy-search-item__card').each(function() {
          const urlVacancy = $(this).find('h2').find('.bloko-link').attr('href');

          if (urlVacancy.indexOf('vacancy/') !== -1) q.push(urlVacancy);
        })
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
    }, 300_000);
  }

  q.drain = () => {
    console.log(results);
  };

  q.push(URL);
}

expressOfice();
//export default expressOfice;