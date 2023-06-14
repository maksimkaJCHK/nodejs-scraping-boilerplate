const puppeteer = require('puppeteer');
const log = require('cllc')();
const needle = require('needle');
const cheerio = require('cheerio');
const fs = require('fs');

const domen = 'https://www.chitai-gorod.ru/';
const imgDomen = 'https://cdn.img-gorod.ru/310x500/';

const javascriptUrl = 'https://web-gate.chitai-gorod.ru/api/v2/search/product?phrase=javascript&filters%5Bphrase%5D=javascript&products%5Bpage%5D=1&products%5Bper-page%5D=1000&sort=relevance';

const options = {};

const delayF = (delay = 5000) => {
  return new Promise((resolve, reject) => {
    setInterval(() => resolve(), delay);
  });
};

const bookFunc = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(domen, {
    timeout: 60000,
    waitUntil: 'domcontentloaded'
  });

  await page.setViewport({
    width: 1600,
    height: 1024
  });

  await delayF();

  const siteCookies = await page.cookies();
  const fIndex = siteCookies.findIndex((el) => el.name = 'access-token' && el.value.indexOf('Bearer') !== -1);

  const headers = {};
  headers['Authorization'] = siteCookies[fIndex].value.replace('%20', ' ');

  await browser.close();

  const books = [];

  await needle('get', javascriptUrl, { headers: headers })
    .then((res) => {
      options.cookies = res.cookies;

      if (res.statusCode === 404) {
        log.e('Такой страницы нет - ' + url);
      } else {
        res.body.included.forEach((el) => {
          if (el.attributes) {
            const { authors, description, title, id, url, picture, yearPublishing, pages, price } = el.attributes
            const bookAuthors = [];
    
            if (authors) {
              authors.forEach((author) => {
                const firstName = author.firstName;
                const middleName = author.middleName;
                const lastName = author.lastName;
    
                bookAuthors.push(`${firstName} ${middleName} ${lastName}`)
              });
            }
    
            books.push({
              id,
              bookAuthors,
              title,
              description,
              pages,
              yearPublishing,
              price,
              url: domen + url,
              picture: imgDomen + picture,
              publish: yearPublishing,
            });
          }
        });
    
        fs.mkdir('./shop-result', err => {
          if (err) console.log(`Не удалось создать папку - ${err}`);
      
          if (!err) console.log('Папка shop-result успешно создана');
        });
    
        fs.writeFileSync('./shop-result/shop.json', JSON.stringify(books, null, 4));

        console.log(`Всего найдено - ${books.length} книг`);

        process.exit(1);
      }
    })
    .catch((err) => {
      if (err || res.statusCode !== 200) {
        log.e((err || res.statusCode) + ' - ' + javascriptUrl);
      }
    });
};

bookFunc();
