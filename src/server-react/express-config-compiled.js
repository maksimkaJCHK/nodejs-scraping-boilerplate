'use strict';

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const {
  WebSocketServer
} = require(`ws`);
const fs = require('fs');
const path = require('path');
const {
  readJSONFileToAnalitics
} = require('../services/fs');
const {
  runAnalitics
} = require('../analitics/shop');
const {
  shopScraping
} = require('../spiders/shopScraping');
const {
  bSeo,
  bPage
} = require('./helpers/helpers.js');
const {
  topNav,
  navParams
} = require('./server/model/nav.js');
const {
  mainData
} = require('./server/model/main.js');
const {
  newData
} = require('./server/model/pages.js');

// Компоненты React
const Wrapper = require('./server/ssr-components/Wrapper.js');
const AllShopsCont = require('./server/ssr-components/AllShopsCont.js');
const MainCont = require('./server/ssr-components/MainCont.js');
const CurShopCont = require('./server/ssr-components/CurShopCont.js');
const PageNotFound = require('./server/ssr-components/PageNotFound.js');
const wss = new WebSocketServer({
  port: 8080
});
wss.on('connection', async (ws, req) => {
  const msg = {
    type: 'start',
    message: "Подключение к серверу успешно установлено!"
  };
  ws.send(JSON.stringify(msg));
  if (req.url === '/analitics') {
    await runAnalitics(msg => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
  }
  if (req.url === '/scraping') {
    await shopScraping(msg => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
  }
  if (req.url === '/scraping-and-analitics') {
    await shopScraping(msg => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
    await runAnalitics(msg => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
  }
  ws.send(JSON.stringify({
    type: 'end',
    message: 'Скрапинг закончился закончилась, должны появиться новые товары!'
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
const typeLayout = fs.readFileSync(path.resolve(__dirname, './server/views/main.html'), {
  encoding: 'utf8'
});
const bCategory = ({
  fraze,
  cgItems,
  lbItems
}) => {
  return {
    id: fraze,
    title: `Поисковый запрос '${fraze}'`,
    idLb: `labirint-${fraze}`,
    idCg: `cg-${fraze}`,
    shops: {
      cg: cgItems,
      lb: lbItems
    }
  };
};

// Главная страница
app.get('/', async (req, res, next) => {
  let page = typeLayout;
  let seo = bSeo({
    title: "Все запросы",
    description: 'Описание для главной страницы, тут все запросы'
  });
  const {
    mainLinks,
    catalogs
  } = await mainData();
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams
  }, /*#__PURE__*/React.createElement(MainCont, {
    title: "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u043F\u043E \u0432\u0441\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C",
    mainLinks: mainLinks,
    catalogs: catalogs
  })));
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
  const {
    mainLinks,
    catalogs
  } = await mainData();
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

const bAllShopsParam = async fraze => {
  const cgItems = await readJSONFileToAnalitics(`cg-shop-${fraze}`);
  const lbItems = await readJSONFileToAnalitics(`lb-shop-${fraze}`);
  return bCategory({
    fraze,
    cgItems,
    lbItems
  });
};
app.get('/all-shops/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}"`,
    description: `Описание для страницы по запросу "${fraze}"`
  });
  const category = await bAllShopsParam(fraze);
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams
  }, /*#__PURE__*/React.createElement(AllShopsCont, {
    title: `Товары по запросу "${fraze}" для интернет-магазинов`,
    category: category
  })));
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
  const path = `${type}-shop-${fraze}`;
  const shop = await readJSONFileToAnalitics(path);
  const params = {
    id: fraze,
    title: `Товары для ${type === 'cg' ? 'читай-города' : 'лабиринта'} по запросу ${fraze}`,
    type,
    shop
  };
  return params;
};
app.get('/cg/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}" для читай-города`,
    description: `Описание для страницы по запросу "${fraze}" для читай-города`
  });
  const params = await bShopParam(fraze, 'cg');
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams
  }, /*#__PURE__*/React.createElement(CurShopCont, {
    title: `Страница по запросу "${fraze}" для читай-города`,
    shopListParams: params
  })));
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
  const params = bShopParam(fraze, 'lb');
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams
  }, /*#__PURE__*/React.createElement(CurShopCont, {
    title: `Страница по запросу "${fraze}" для лабиринта`,
    shopListParams: params
  })));
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
  const {
    mainLinks,
    catalogs
  } = await newData();
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams
  }, /*#__PURE__*/React.createElement(MainCont, {
    title: "\u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u043F\u043E \u0432\u0441\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C",
    mainLinks: mainLinks,
    catalogs: catalogs
  })));
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
  const {
    mainLinks,
    catalogs
  } = await newData();
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
const bNewItems = async fraze => {
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
    }
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
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams
  }, /*#__PURE__*/React.createElement(AllShopsCont, {
    title: `Новые товары по запросу "${fraze}" для интернет-магазинов`,
    category: newCategory
  })));
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
});
app.use(function (req, res, next) {
  let page = typeLayout;
  let seo = bSeo({
    title: 'Страница не найдена',
    description: 'Страница не найдена'
  });
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams,
    isLoad: false
  }, /*#__PURE__*/React.createElement(PageNotFound, null)));
  page = bPage({
    page,
    seo,
    appContent
  });
  res.contentType('text/html');
  res.status(200);
  res.send(page);
  next();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.disable('etag');
