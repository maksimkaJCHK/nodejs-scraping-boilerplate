const puppeteer = require('puppeteer');
const log = require('cllc')();
const needle = require('needle');
const { renameFileForAnalitics, makeFile, makeFolder } = require('../services/fs');

const { delayF } = require('../services/delay');

const headersCg = {};

const nullLine = () => {
  console.log('____________________________________________________________');
  console.log('');
}

const writeToken = async (domen) => {
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

  headersCg['Authorization'] = siteCookies[fIndex].value.replace('%20', ' ');

  await browser.close();
}

const cgShopSpider = async (findFrase) => {
  const domen = 'https://www.chitai-gorod.ru/';
  const imgCgShopDomen = 'https://cdn.img-gorod.ru/310x500/';

  if (!Object.keys(headersCg).length) await writeToken(domen);

  const books = [];
  let pageCount = 1;
  let isStop = false;

  while (!isStop) {
    const javascriptUrl = `https://web-gate.chitai-gorod.ru/api/v2/search/product?phrase=${findFrase}&products%5Bpage%5D=${pageCount}&products%5Bper-page%5D=1000&sort=relevance`;

    let totalPages = null;

    await needle('get', javascriptUrl, { headers: headersCg })
      .then((res) => {
        if (res.statusCode === 404) {
          log.e('Такой страницы нет - ' + url);
        } else {
          totalPages = res.body.data.relationships.products.meta.pagination.total_pages;

          res.body.included.forEach((el) => {
            if (el.attributes) {
              const { authors, description, title, id, url, picture, yearPublishing, pages, price, publisher } = el.attributes
              const bookAuthors = [];

              // Мне приходят пустые объекты вместе с реальными книгами, если подумать, то если нет id-ка и url-а, то и книги скорее всего тоже нет
              if (id && url) {
                const bPicture = picture ? imgCgShopDomen + picture : null;

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
                  picture: bPicture,
                  publish: yearPublishing,
                  publisher: publisher && publisher.title,
                });
              }
            }
          });
        }
      })
      .catch((err) => {
        if (err || res.statusCode !== 200) {
          log.e((err || res.statusCode) + ' - ' + javascriptUrl);
        }
      });
    
    if (totalPages == pageCount) isStop = true;
    pageCount += 1;

    await delayF(1000);
  }

  nullLine();

  makeFolder('./results/shop-result');

  const path = './results/shop-result/';
  const name = `cg-shop-${findFrase}`;
  const extension = '.json';

  log.info(`Всего найдено - ${books.length} книги по запросу ${findFrase}`);

  renameFileForAnalitics({
    path,
    name,
    extension,
    callback() {
      makeFile(path + name + extension, JSON.stringify(books, null, 4));
    }
  });

  nullLine();
};

exports.cgShopSpider = cgShopSpider;