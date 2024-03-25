'use strict';

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const {
  readJSONFileToAnalitics
} = require('../services/fs');
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
const Nav = require('./react/ssr-components/Nav.js');
const Params = require('./react/ssr-components/Params.js');
const MainCatalog = require('./react/ssr-components/MainCatalog.js');
const MainShopList = require('./react/ssr-components/MainShopList.js');
const ShopList = require('./react/ssr-components/ShopList.js');
const MainLinks = require('./react/ssr-components/MainLinks.js');
const app = express();
const port = 8000;
const bSeo = ({
  title,
  description
}) => {
  return `
  <title>${title}</title>
  <meta name="description" content="${description}">
`;
};
const bPage = ({
  page,
  seo,
  appContent
}) => {
  page = page.replace(/<!--seo-->/, seo);
  page = page.replace('<div id="app"></div>', `<div id="app">${appContent}</div>`);
  return page;
};
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
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    link: topNav
  }), /*#__PURE__*/React.createElement(Params, navParams), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(MainLinks, {
    title: "\u0412\u0441\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B",
    links: mainLinks
  }), /*#__PURE__*/React.createElement(MainCatalog, {
    catalogs: catalogs
  }))));
  page = bPage({
    page,
    seo,
    appContent
  });
  res.contentType('text/html');
  res.status(200);
  res.send(page);
  next();
}, (req, res, next) => {
  console.log('Загрузкилась главная страница');
});
app.get('/all-shops/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const cgItems = await readJSONFileToAnalitics(`cg-shop-${fraze}`);
  const lbItems = await readJSONFileToAnalitics(`lb-shop-${fraze}`);
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}"`,
    description: `Описание для страницы по запросу "${fraze}"`
  });
  const params = {
    id: fraze,
    title: `Поисковый запрос '${fraze}'`,
    idLb: `labirint-${fraze}`,
    idCh: `ch-${fraze}`,
    shops: {
      ch: cgItems,
      lb: lbItems
    }
  };
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    link: topNav
  }), /*#__PURE__*/React.createElement(Params, navParams), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("h1", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \"", fraze, "\" \u0434\u043B\u044F \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432"), /*#__PURE__*/React.createElement(MainShopList, params))));
  page = bPage({
    page,
    seo,
    appContent
  });
  res.contentType('text/html');
  res.status(200);
  res.send(page);
  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с запросами ${req.params.fraze} для всех магазинов`);
});
app.get('/cg/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const shop = await readJSONFileToAnalitics(`cg-shop-${fraze}`);
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}" для читай-города`,
    description: `Описание для страницы по запросу "${fraze}" для читай-города`
  });
  const params = {
    shop,
    id: fraze,
    type: "ch",
    title: `Товары для читай-города по запросу ${fraze}`
  };
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    link: topNav
  }), /*#__PURE__*/React.createElement(Params, navParams), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("h1", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \"javascript\" \u0434\u043B\u044F \u0447\u0438\u0442\u0430\u0439-\u0433\u043E\u0440\u043E\u0434\u0430"), /*#__PURE__*/React.createElement(ShopList, params))));
  page = bPage({
    page,
    seo,
    appContent
  });
  res.contentType('text/html');
  res.status(200);
  res.send(page);
  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с запросами ${req.params.fraze} для читай-города`);
});
app.get('/lb/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const shop = await readJSONFileToAnalitics(`lb-shop-${fraze}`);
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}" для лабиринта`,
    description: `Описание для страницы по запросу "${fraze}" для лабиринта`
  });
  const params = {
    shop,
    id: fraze,
    type: "lb",
    title: `Товары для лабиринта по запросу ${fraze}`
  };
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    link: topNav
  }), /*#__PURE__*/React.createElement(Params, navParams), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("h1", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \"", fraze, "\" \u0434\u043B\u044F \u043B\u0430\u0431\u0438\u0440\u0438\u043D\u0442\u0430"), /*#__PURE__*/React.createElement(ShopList, params))));
  page = bPage({
    page,
    seo,
    appContent
  });
  res.contentType('text/html');
  res.status(200);
  res.send(page);
  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с запросами ${req.params.fraze} для лабиринта`);
});
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
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    link: topNav
  }), /*#__PURE__*/React.createElement(Params, navParams), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(MainLinks, {
    title: "\u0412\u0441\u0435 \u043D\u043E\u0432\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C",
    links: mainLinks
  }), /*#__PURE__*/React.createElement(MainCatalog, {
    catalogs: catalogs
  }))));
  page = bPage({
    page,
    seo,
    appContent
  });
  res.contentType('text/html');
  res.status(200);
  res.send(page);
  next();
}, (req, res, next) => {
  console.log('Загрузкилась страница с новыми товарами для магазинов');
});
app.get('/new/:fraze', async (req, res, next) => {
  const fraze = req.params.fraze;
  const cgItem = await readJSONFileToAnalitics(`cg-${fraze}`, './results/analitics');
  const lbItem = await readJSONFileToAnalitics(`lb-${fraze}`, './results/analitics');
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}"`,
    description: `Описание для страницы по запросу "${fraze}"`
  });
  const params = {
    id: fraze,
    title: `Поисковый запрос для новых товаров '${fraze}'`,
    idLb: `labirint-${fraze}`,
    idCh: `ch-${fraze}`,
    shops: {
      ch: cgItem || [],
      lb: lbItem || []
    }
  };
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    link: topNav
  }), /*#__PURE__*/React.createElement(Params, navParams), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("h1", null, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \"javascript\" \u0434\u043B\u044F \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432"), /*#__PURE__*/React.createElement(MainShopList, params))));
  page = bPage({
    page,
    seo,
    appContent
  });
  res.contentType('text/html');
  res.status(200);
  res.send(page);
  next();
}, (req, res, next) => {
  console.log(`Загрузкилась страница с новыми запросами ${req.params.fraze} для магазинов`);
});
app.use(function (req, res, next) {
  res.status(404).render('notFound');
  next();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.disable('etag');
