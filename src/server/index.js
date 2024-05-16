import express from 'express';

import mainReq from './requests/main.js';
import allShopsReq from './requests/allShops.js';
import cgShopReq from './requests/cgShop.js';
import lbShopReq from './requests/lbShop.js';
import newReq from './requests/new.js';
import newShopReq from './requests/newShop.js';

const app = express();
const port = 8000;

app.use(express.static('./src/server/public'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.set('views', './src/server/views');
app.set('view engine', 'pug');

app.get('/', mainReq, (req, res, next) => {
  console.log('Загрузилась главная страница');
});

app.get('/all-shops/:fraze', allShopsReq, (req, res, next) => {
  console.log(`Загрузилась страница ${req.params.fraze}`);
});

app.get('/cg/:fraze', cgShopReq, (req, res, next) => {
  console.log(`Загрузилась страница ${req.params.fraze} для читай-города`);
});

app.get('/lb/:fraze', lbShopReq, (req, res, next) => {
  console.log(`Загрузилась страница ${req.params.fraze} для лабиринта`);
});

app.get('/new', newReq, (req, res, next) => {
  console.log('Загрузилась страница с новыми товарами');
});

app.get('/new/:fraze', newShopReq, (req, res, next) => {
  console.log(`Загрузилась страница с новыми товарами по запросу ${req.params.fraze}`);
});

app.use(function(req, res, next) {
  res.status(404).render('notFound');

  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.disable('etag');