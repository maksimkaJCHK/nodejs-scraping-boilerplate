import log from 'cllc';
import needle from 'needle';
import tress from 'tress';
import cheerio from 'cheerio';

const hhCompanySpider = ({
  idCompany,
  vacancyCallback = (x) => x,
  resultsCallback = (x) => x,
  delay = -700
}) => {
  const options = {
    cookies: {}
  };

  let results = [];

  const q = tress((url, callback) => {
    needle.get(url, options, (err, res) => {
      let job = {};

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

          job = {
            name,
            price,
            description
          };

          results.push(job);
        }

        $('main .vacancy-search-item__card').each(function() {
          const urlVacancy = $(this).find('h2').find('.bloko-link').attr('href');

          if (urlVacancy.indexOf('vacancy/') !== -1) q.push(urlVacancy);

          if (urlVacancy.indexOf('vacancy/') === -1) {
            const name = $(this).find('h2').text();
            const price = '';
            const description = '';

            job = {
              name,
              price,
              description
            };

            results.push(job);
          };
        })
      }

      callback(null, job);
    });
  }, delay);

  q.success = function(data) {
    const txt = data.name || '';

    log().info(this);
    log().info('Все прошло нормально - ', txt);

    vacancyCallback(data);
  }

  q.retry = function(){
    q.pause();

    log().i('Скрапинг остановился: ', this);

    setTimeout(function(){
      q.resume();

      log().i('Скрапинг возобновлен');
    }, 300_000);
  }

  q.drain = () => resultsCallback(results);

  q.push(`https://tula.hh.ru/search/vacancy?from=employerPage&employer_id=${idCompany}&hhtmFrom=employer`);
}

export default hhCompanySpider;