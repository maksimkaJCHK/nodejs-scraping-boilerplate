const appRoot = require('app-root-path');
const express = require('express');
const { readJSONFileToAnalitics } = require('../services/fs');
const app = express();
const port = 8000;

app.use(express.static('./server/public'));

app.set('views', './server/views');
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
    title: `Запрос ${fraze}`,
    headerText: `Запрос "${fraze}"`,
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

app.use(function(req, res, next) {
  res.status(404).render('notFound');

  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})