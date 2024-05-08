import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { WebSocketServer } from 'ws';

import fs from 'fs';
import path from 'path';

import { readJSONFileToAnalitics } from '../services/fs.js';

import { runAnalitics } from '../analitics/shop.js';
import { shopScraping } from '../spiders/shopScraping.js';
import { shopScrapingForFraze } from '../spiders/shopScrapingForFraze.js';

import { bSeo, bPage } from './helpers/helpers.js';

import { topNav, navParams } from './server/model/nav.js';

import { mainData } from './server/model/main.js';
import { newData } from './server/model/pages.js';

// Компоненты React
import Wrapper from './server/ssr-components/Wrapper.js';
import AllShopsCont from './server/ssr-components/AllShopsCont.js';
import MainCont from './server/ssr-components/MainCont.js';
import CurShopCont from './server/ssr-components/CurShopCont.js';
import PageNotFound from './server/ssr-components/PageNotFound.js';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', async (ws, req) => {
  const msg = {
    type: 'start',
    message: "Подключение к серверу успешно установлено!"
  };

  ws.send(JSON.stringify(msg));

  if (req.url === '/analitics') {
    await runAnalitics((msg) => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
  }

  if (req.url === '/scraping') {
    await shopScraping((msg) => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
  }

  if (req.url === '/scraping-and-analitics') {
    await shopScraping((msg) => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));

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

const typeLayout = fs.readFileSync('./src/server-react/server/views/main.html', {
  encoding: 'utf8',
});

const bCategory = ({ fraze, cgItems, lbItems }) => {
  return {
    id: fraze,
    title: `Поисковый запрос '${fraze}'`,
    idLb: `labirint-${fraze}`,
    idCg: `cg-${fraze}`,
    shops: {
      cg: cgItems,
      lb: lbItems
    },
  };
}

// Главная страница
app.get('/', async (req, res, next) => {
  let page = typeLayout;

  let seo = bSeo({
    title: "Все запросы",
    description: 'Описание для главной страницы, тут все запросы'
  });

  const { mainLinks, catalogs } = await mainData();

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
    >
      <MainCont
        title = "Все товары по всем запросам"
        mainLinks = { mainLinks }
        catalogs = { catalogs }
      />
    </Wrapper>
  );
  
  page = bPage({
    page,
    seo,
    appContent,
    js: `window.catalogs = ${JSON.stringify(catalogs)}; window.mainLinks = ${JSON.stringify(mainLinks)}`
  });

  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}, (req, res, next) => {
  console.log('Загрузкилась главная страница');
});

app.post('/', async (req, res, next) => {
  const { mainLinks, catalogs } = await mainData();

  res.contentType('application/json');
  res.status(200);

  res.send({
    mainLinks,
    catalogs
  });

  next();
}, (req, res, next) => {
  console.log('Post запрос для главной страницы');
});

// Все магазины

const bAllShopsParam = async (fraze) => {
  const cgItems = await readJSONFileToAnalitics(`cg-shop-${fraze}`);
  const lbItems = await readJSONFileToAnalitics(`lb-shop-${fraze}`);

  return bCategory({ fraze, cgItems, lbItems });
};

app.get('/all-shops/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;

  let page = typeLayout;

  let seo = bSeo({
    title: `Страница по запросу "${fraze}"`,
    description: `Описание для страницы по запросу "${fraze}"`
  });

  const category = await bAllShopsParam(fraze);

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
    >
      <AllShopsCont
        title = {`Товары по запросу "${ fraze }" для интернет-магазинов`}
        category = { category }
      />
    </Wrapper>
  );

  page = bPage({
    page,
    seo,
    appContent,
    js: `window.category=${JSON.stringify(category)}`
  });

  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с запросами ${req.params.fraze} для интрнет-магазинов`);
});

app.post('/all-shops/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;

  const category = await bAllShopsParam(fraze);

  res.contentType('application/json');
  res.status(200);
  res.send(category);

  next();
}, (req, res, next) => {
  console.log(`Post запрос для фразы ${req.params.fraze} для интрнет-магазинов`);
});

// Категория по читай городу
const bShopParam = async (fraze, type) => {
  const path = `${type}-shop-${fraze}`
  const shop = await readJSONFileToAnalitics(path);

  const params = {
    id: fraze,
    title: `Товары для ${type === 'cg' ? 'читай-города' : 'лабиринта' } по запросу ${fraze}`,
    type,
    shop,
  };

  return params;
}

app.get('/cg/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;

  let page = typeLayout;

  let seo = bSeo({
    title: `Страница по запросу "${fraze}" для читай-города`,
    description: `Описание для страницы по запросу "${fraze}" для читай-города`
  });

  const params = await bShopParam(fraze, 'cg');

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
    >
      <CurShopCont
        title = { `Страница по запросу "${ fraze }" для читай-города` }
        shopListParams = { params }
      />
    </Wrapper>
  );

  page = bPage({
    page,
    seo,
    appContent,
    js: `window.curshop = {}; window.curshop.cg = {}; window.curshop.cg.${fraze}=${JSON.stringify(params)}`
  });

  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с запросами ${req.params.fraze} для читай-города`);
});

app.post('/cg/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const params = await bShopParam(fraze, 'cg');

  res.contentType('application/json');
  res.status(200);

  res.send(params);

  next();
}, (req, res, next) => {
  console.log(`Post запрос для фразы ${req.params.fraze} для читай-города`);
});

// Лабиринт
app.get('/lb/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;

  let page = typeLayout;

  let seo = bSeo({
    title: `Страница по запросу "${fraze}" для лабиринта`,
    description: `Описание для страницы по запросу "${fraze}" для лабиринта`
  });

  const params = await bShopParam(fraze, 'lb')

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
    >
      <CurShopCont
        title = { `Страница по запросу "${ fraze }" для лабиринта` }
        shopListParams = { params }
      />
    </Wrapper>
  );

  page = bPage({
    page,
    seo,
    appContent,
    js: `window.curshop = {}; window.curshop.lb = {}; window.curshop.lb.${fraze}=${JSON.stringify(params)}`
  });

  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с запросами ${req.params.fraze} для лабиринта`);
});

app.post('/lb/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const params = await bShopParam(fraze, 'lb');

  res.contentType('application/json');
  res.status(200);

  res.send(params);

  next();
}, (req, res, next) => {
  console.log(`Post запрос для фразы ${req.params.fraze} для лабиринта`);
});

// Новые товары
app.get('/new', async (req, res, next) => {
  let page = typeLayout;

  let seo = bSeo({
    title: "Все новые товары для магазинов",
    description: 'Все новые товары для магазинов'
  });

  const { mainLinks, catalogs } = await newData();

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
    >
      <MainCont
        title = "Все товары по всем запросам"
        mainLinks = { mainLinks }
        catalogs = { catalogs }
      />
    </Wrapper>
  );
  
  page = bPage({
    page,
    seo,
    appContent,
    js: `window.newCatalogs = ${JSON.stringify(catalogs)}; window.newMainLinks = ${JSON.stringify(mainLinks)}`
  });

  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}, (req, res, next) => {
  console.log('Загрузкилась страница с новыми товарами для магазинов');
});

app.post('/new', async (req, res, next) => {
  const { mainLinks, catalogs } = await newData();

  res.contentType('application/json');
  res.status(200);

  res.send({
    mainLinks,
    catalogs
  });

  next();
}, (req, res, next) => {
  console.log('Post запрос с новыми товарами для магазинов');
});

const bNewItems = async (fraze) => {
  const cgItem = await readJSONFileToAnalitics(`cg-${fraze}`, './results/analitics');
  const lbItem = await readJSONFileToAnalitics(`lb-${fraze}`, './results/analitics');

  return {
    id: fraze,
    title: `Новые товары по запросу '${fraze}'`,
    idLb: `labirint-${fraze}`,
    idCg: `cg-${fraze}`,
    shops: {
      cg: cgItem || [],
      lb: lbItem || []
    },
  };
};

app.get('/new/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;

  let page = typeLayout;

  let seo = bSeo({
    title: `Новые товары по запросу "${fraze}" для интернет магазинов`,
    description: `Описание для страницы с новыми товарами по запросу "${fraze}"`
  });

  const newCategory = await bNewItems(fraze);

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
    >
      <AllShopsCont
        title = {`Новые товары по запросу "${ fraze }" для интернет-магазинов`}
        category = { newCategory }
      />
    </Wrapper>
  );

  page = bPage({
    page,
    seo,
    appContent,
    js: `window.newCategory=${JSON.stringify(newCategory)}`
  });

  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с новыми запросами ${req.params.fraze} для магазинов`);
});

app.post('/new/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;

  const newCategory = await bNewItems(fraze);

  res.contentType('application/json');
  res.status(200);

  res.send(newCategory);

  next();
}, (req, res, next) => {
  console.log(`Post запрос с новыми товарами по фразе ${req.params.fraze} для интернет-магазинов`);
}, (req, res, next) => {
  console.log(`Post запрос для новых товаров по фразе "${req.params.fraze}"`);
});

app.get('/search', async (req, res, next) => {
  let page = typeLayout;

  let seo = bSeo({
    title: 'Поиск',
    description: 'Описание для страницы поиска'
  });

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
      isLoad = { true }
    ></Wrapper>
  );

  page = bPage({
    page,
    seo,
    appContent,
    js: ''
  });

  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}, (req, res, next) => {
  console.log('Загрузилась страница поиска');
});

app.post('/search/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;

  await shopScrapingForFraze(fraze);
  const category = await bAllShopsParam(fraze);

  res.contentType('application/json');
  res.status(200);

  res.send(category);

  next();
}, (req, res, next) => {
  console.log(`Post запрос для страницы поиска по фразе ${req.params.fraze} для интернет-магазинов`);
});

app.use(function(req, res, next) {
  let page = typeLayout;

  let seo = bSeo({
    title: 'Страница не найдена',
    description: 'Страница не найдена'
  });

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
      isLoad = { false }
    >
      <PageNotFound />
    </Wrapper>
  );

  page = bPage({ page, seo, appContent });
  
  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.disable('etag');