const log = require('cllc')();
const needle = require('needle');
const tress = require('tress');
const cheerio = require('cheerio');

const { makeResultsFolder, makeFolder, makeFile } = require('../services/fs.js');
const { delayF } = require('../services/delay');
const { bType } = require('../services/types');

const URL = 'http://localhost:8080/';
const options = {};
const delay = -1000;

makeResultsFolder();

makeFolder('./results/documents');

const bUrl = (url) => {
  const lStr = url.lastIndexOf('/');
  const fStr = url.lastIndexOf('/', url.length - 2);

  return url.slice(fStr + 1, lStr);
}

const downloadDocs = async (url, path, nameDoc) => {
  await needle('get', url, options, (err, res) => {
    const typeDoc = bType(res.headers['content-type']);

    if (res.statusCode === 404) {
      log.error('Такой страницы нет - ' + url);
    } else {
      makeFile(`${path}/${nameDoc}.${typeDoc}`, res.body);
    }
  })
};

const scrapDoc = async (docUrl) => {
  let isWork = true;

  const docPage = tress((url, callback) => {
     needle('get', url, options, async (err, res) => {
      if (res.statusCode === 404) {
        log.error('Такой страницы нет - ' + url);
      } else {
        options.cookies = res.cookies;
  
        if (err || res.statusCode !== 200) {
          log.e((err || res.statusCode) + ' - ' + url);
    
          return callback(true);
        }

        const $ = cheerio.load(res.body);
  
        // Собираю ссылки на странице
        const text = $('#content p').html();
        const bPath = `./results/documents/${bUrl(url)}`;

        makeFolder(bPath);
        makeFile(bPath + '/info.txt', text);

        const lenLink = $('.list-gallery.static.css li > a').length;

        for (let count = 0; count < lenLink; count++) {
          const docUrl = $('.list-gallery.static.css li > a').eq(count).attr('href');
          console.log(docUrl, count);

          downloadDocs(docUrl, bPath, count + 1);
          await delayF(3000);
        }
      }

      callback();
    });
  }, delay);

  docPage.success = function(data) {
    log.info(this);
    log.info('Все прошло нормально - ', data);

    isWork = false;
  }

  docPage.retry = function(){
    q.pause();
    //log.i('Paused on:', this);
  
    setTimeout(function(){
      q.resume();
      log.i('Resumed');
    }, 300000);
  }

  docPage.drain = () => {
    console.log('__________________');
    log.info('Парсинг документов на странице закончился');
  };

  docPage.push(docUrl);

  while (isWork) {
    await delayF(1000);
  }
}

const raisePage = tress((url, callback) => {
  needle.get(url, options, async (err, res) => {
    if (res.statusCode === 404) {
      log.error('Такой страницы нет - ' + url);
    } else {
      options.cookies = res.cookies;

      if (err || res.statusCode !== 200) {
        log.e((err || res.statusCode) + ' - ' + url);
  
        return callback(true);
      }

      const $ = cheerio.load(res.body);

      // Собираю ссылки на странице
      const link = $('.list-gallery figure > a');

      for (let count = 0; count < link.length; count++) {
        const docUrl = $('.list-gallery figure > a').eq(count).attr('href');
        await scrapDoc(docUrl);
      }

      process.exit(1);
    }

    callback();
  });
}, delay);

raisePage.success = function(data) {
  log.info(this);
  log.info('Все прошло нормально - ', data);
}

raisePage.retry = function(){
  q.pause();
  //log.i('Paused on:', this);

  setTimeout(function(){
    q.resume();
    log.i('Resumed');
  }, 300000);
}

raisePage.drain = () => {
  console.log('__________________');
  log.info('Парсинг закончился');
};

raisePage.push(URL);