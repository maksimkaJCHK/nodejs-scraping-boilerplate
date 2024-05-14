import express from 'express';

import { WebSocketServer } from 'ws';

import { runAnalitics } from '../analitics/shop.js';
import { shopScraping } from '../spiders/shopScraping.js';

// Новые компоненты
import pages from './server/requests-ssr/'

const {
  mainPagePost,
  allShopsPagePost,
  mainPage,
  allShopsPage,
  cgShopPost,
  lbShopPost,
  cgShop,
  lbShop,
  newItemsPagePost,
  newItemsPage,
  newFrazePage,
  newFrazePagePost,
  pageNotFound,
  searchPagePost,
  searchPage
} = pages;

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', async (ws, req) => {
  const msg = {
    type: 'start',
    message: "Подключение к серверу успешно установлено!"
  };

  ws.send(JSON.stringify(msg));

  if (req.url === '/scraping' || req.url === '/scraping-and-analitics') {
    await shopScraping((msg) => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
  }

  if (req.url === '/analitics' || req.url === '/scraping-and-analitics') {
    await runAnalitics((msg) => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
  }

  let endMessage;

  if (req.url === '/analitics') endMessage = 'Аналитика закончилась, должны появиться новые товары!';
  if (req.url === '/scraping') endMessage = 'Скрапинг закончился, должны появиться товары!'
  if (req.url === '/scraping-and-analitics') endMessage = 'Скрапинг и аналитика закончились, стоит обновить товары и новые товары!'

  ws.send(JSON.stringify({
    type: 'end',
    message: endMessage
  }));

  ws.on('close', function close() {
    console.log('Соединение с сервером закрыто!');
  });
});

const app = express();
const port = 8000;

app.use(express.static('./src/server-react/server/public'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Главная страница
app.get('/', mainPage, (req, res, next) => {
  console.log('Загрузилась главная страница');
});

app.post('/', mainPagePost, (req, res, next) => {
  console.log('Post запрос для главной страницы');
});

// Все магазины
app.get('/all-shops/:fraze', allShopsPage, (req, res, next) => {
  console.log(`Загрузилась страница с запросами ${req.params.fraze} для интрнет-магазинов`);
});

app.post('/all-shops/:fraze', allShopsPagePost, (req, res, next) => {
  console.log(`Post запрос для фразы ${req.params.fraze} для интрнет-магазинов`);
});

// Категория по читай городу
app.get('/cg/:fraze', cgShop, (req, res, next) => {
  console.log(`Загрузилась страница с запросами ${req.params.fraze} для читай-города`);
});

app.post('/cg/:fraze', cgShopPost, (req, res, next) => {
  console.log(`Post запрос для фразы ${req.params.fraze} для читай-города`);
});

// Лабиринт
app.get('/lb/:fraze', lbShop, (req, res, next) => {
  console.log(`Загрузилась страница с запросами ${req.params.fraze} для лабиринта`);
});

app.post('/lb/:fraze', lbShopPost, (req, res, next) => {
  console.log(`Post запрос для фразы ${req.params.fraze} для лабиринта`);
});

// Новые товары
app.get('/new-items', newItemsPage, (req, res, next) => {
  console.log('Загрузилась страница с новыми товарами для магазинов');
});

app.post('/new-items', newItemsPagePost, (req, res, next) => {
  console.log('Post запрос с новыми товарами для магазинов');
});

// Новые товары по конкретным фразам
app.get('/new/:fraze', newFrazePage, (req, res, next) => {
  console.log(`Загрузилась страница с новыми запросами ${req.params.fraze} для магазинов`);
});

app.post('/new/:fraze', newFrazePagePost, (req, res, next) => {
  console.log(`Post запрос с новыми товарами по фразе ${req.params.fraze} для интернет-магазинов`);
}, (req, res, next) => {
  console.log(`Post запрос для новых товаров по фразе "${req.params.fraze}"`);
});

// Поиск
app.get('/search', searchPage, (req, res, next) => {
  console.log('Загрузилась страница поиска');
});

app.post('/search/:fraze', searchPagePost, (req, res, next) => {
  console.log(`Post запрос для страницы поиска по фразе ${req.params.fraze} для интернет-магазинов`);
});

app.use(pageNotFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.disable('etag');