const appRoot = require('app-root-path');
const express = require('express');
const { readJSONFileToAnalitics } = require('../services/fs');
const app = express();
const port = 8000;

app.use(express.static('./server/public'));

app.set('views', './server/views')
app.set('view engine', 'pug')

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
    title: 'Главная страница',
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
})

app.get('/javascript', async (req, res, next) => {
  const cgJavascript = await readJSONFileToAnalitics('cg-shop-javascript');
  const lbJavascript = await readJSONFileToAnalitics('lb-shop-javascript');

  res.render('javascript', {
    title: 'Главная страница',
    shops: {
      cgJavascript,
      lbJavascript,
    }
  });

  next();
}, (req, res, next) => {
  console.log('Загрузкилась страница javascript');
})

app.get('/python', async (req, res, next) => {
  const cgPythonr = await readJSONFileToAnalitics('cg-shop-python');
  const lbPythonr = await readJSONFileToAnalitics('lb-shop-python');

  res.render('python', {
    title: 'Python',
    shops: {
      cgPythonr,
      lbPythonr,
    }
  });

  next();
}, (req, res, next) => {
  console.log('Загрузкилась страница python');
})

app.get('/react', async (req, res, next) => {
  const cgReact = await readJSONFileToAnalitics('cg-shop-react');
  const lbReact = await readJSONFileToAnalitics('lb-shop-react');

  res.render('react', {
    title: 'React',
    shops: {
      cgReact,
      lbReact,
    }
  });

  next();
}, (req, res, next) => {
  console.log('Загрузкилась страница react');
})

app.get('/typescript', async (req, res, next) => {
  const cgTypescript= await readJSONFileToAnalitics('cg-shop-typescript');
  const lbTypescript= await readJSONFileToAnalitics('lb-shop-typescript');

  res.render('typescript', {
    title: 'Typescript',
    shops: {
      cgTypescript,
      lbTypescript,
    }
  });

  next();
}, (req, res, next) => {
  console.log('Загрузкилась страница typescript');
})

app.get('/angular', async (req, res, next) => {
  const cgAngular = await readJSONFileToAnalitics('cg-shop-angular');
  const lbAngular = await readJSONFileToAnalitics('lb-shop-angular');

  res.render('angular', {
    title: 'Angular',
    shops: {
      cgAngular,
      lbAngular,
    }
  });

  next();
}, (req, res, next) => {
  console.log('Загрузкилась страница angular');
})

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');

  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})