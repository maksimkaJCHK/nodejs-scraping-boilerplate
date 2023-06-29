const express = require('express');
const asyncHandler = require('express-async-handler')

const { readJSONFileToAnalitics } = require('../services/fs');
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

app.get('/', async (req, res, next) => {
  const cgJavascript = await readJSONFileToAnalitics('cg-shop-javascript');
  const cgAngular = await readJSONFileToAnalitics('cg-shop-angular');
  const cgPythonr = await readJSONFileToAnalitics('cg-shop-python');
  const cgReact = await readJSONFileToAnalitics('cg-shop-react');
  const cgTypescript= await readJSONFileToAnalitics('cg-shop-typescript');

  const lbJavascript = await readJSONFileToAnalitics('lb-shop-javascript');
  const lbAngular = await readJSONFileToAnalitics('lb-shop-angular');
  const lbPythonr = await readJSONFileToAnalitics('lb-shop-python');
  const lbReact = await readJSONFileToAnalitics('lb-shop-react');
  const lbTypescript= await readJSONFileToAnalitics('lb-shop-typescript');

  res.render('index', {
    title: 'Все запросы',
    headerText: 'Все запросы',
    type: 'all',
    shops: {
      cgJavascript,
      cgAngular,
      cgPythonr,
      cgReact,
      cgTypescript,
      lbJavascript,
      lbAngular,
      lbPythonr,
      lbReact,
      lbTypescript,
    }
  });

  next();
}, (req, res, next) => {
  console.log('Загрузкилась главная страница');
});

app.get('/all-shops/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const cgItems = await readJSONFileToAnalitics(`cg-shop-${fraze}`);
  const lbItems = await readJSONFileToAnalitics(`lb-shop-${fraze}`);

  res.render('allShop', {
    title: `Страница по запросу "${fraze}" для интернет магазинов`,
    headerText: `Страница по запросу "${fraze}" для интернет магазинов`,
    fraze,
    type: 'all',
    shops: {
      cgItems,
      lbItems,
    }
  });

  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница ${req.params.fraze}`);
});

app.get('/cg/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const shop = await readJSONFileToAnalitics(`cg-shop-${fraze}`);

  res.render('currentShop', {
    title: `Запрос ${fraze} для сайта читай-город`,
    headerText: `Запрос "${fraze}" для сайта читай-город`,
    fraze,
    type: 'cg',
    nameShop: 'cg',
    shop,
  });

  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница ${req.params.fraze} для читай-города`);
});

app.get('/lb/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const shop = await readJSONFileToAnalitics(`lb-shop-${fraze}`);

  res.render('currentShop', {
    title: `Запрос ${fraze} для сайта лабиринт`,
    headerText: `Запрос "${fraze}" для сайта лабиринт`,
    fraze,
    type: 'lb',
    nameShop: 'lb',
    shop,
  });

  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница ${req.params.fraze} для лабиринта`);
});

app.get('/new', async (req, res, next) => {
  const cgJavascript = await readJSONFileToAnalitics('cg-javascript', './results/analitics');
  const cgAngular = await readJSONFileToAnalitics('cg-angular', './results/analitics');
  const cgPythonr = await readJSONFileToAnalitics('cg-python', './results/analitics');
  const cgReact = await readJSONFileToAnalitics('cg-react', './results/analitics');
  const cgTypescript= await readJSONFileToAnalitics('cg-typescript', './results/analitics');

  const lbJavascript = await readJSONFileToAnalitics('lb-javascript', './results/analitics');
  const lbAngular = await readJSONFileToAnalitics('lb-angular', './results/analitics');
  const lbPythonr = await readJSONFileToAnalitics('lb-python', './results/analitics');
  const lbReact = await readJSONFileToAnalitics('lb-react', './results/analitics');
  const lbTypescript= await readJSONFileToAnalitics('lb-typescript', './results/analitics');

  res.render('new', {
    title: 'Новые товары',
    headerText: 'Новые товары',
    type: 'new',
    shops: {
      cgJavascript,
      cgAngular,
      cgPythonr,
      cgReact,
      cgTypescript,
      lbJavascript,
      lbAngular,
      lbPythonr,
      lbReact,
      lbTypescript,
    }
  });

  next();
}, (req, res, next) => {
  console.log('Загрузкилась страница с новыми товарами');
});

app.get('/new/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;

  const cgItem = await readJSONFileToAnalitics(`cg-${fraze}`, './results/analitics');
  const lbItem = await readJSONFileToAnalitics(`lb-${fraze}`, './results/analitics');

  res.render('newCurrent', {
    title: `Новые товары для фразы ${fraze}`,
    headerText: `Новые товары для фразы ${fraze}`,
    type: 'new',
    fraze,
    shops: {
      cgItem,
      lbItem,
    }
  });

  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с новыми товарами по запросу ${req.params.fraze}`);
});

app.use(function(req, res, next) {
  res.status(404).render('notFound');

  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.disable('etag');