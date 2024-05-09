import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { WebSocketServer } from 'ws';
import { readJSONFileToAnalitics } from '../services/fs.js';
import { runAnalitics } from '../analitics/shop.js';
import { shopScraping } from '../spiders/shopScraping.js';
import { shopScrapingForFraze } from '../spiders/shopScrapingForFraze.js';
import { bSeo, bPage } from './helpers/helpers.js';
import { topNav, navParams } from './server/model/nav.js';
import { mainData } from './server/model/main.js';
import { newData } from './server/model/pages.js';
import Wrapper from './server/ssr-components/Wrapper.js';
import AllShopsCont from './server/ssr-components/AllShopsCont.js';
import MainCont from './server/ssr-components/MainCont.js';
import CurShopCont from './server/ssr-components/CurShopCont.js';
import PageNotFound from './server/ssr-components/PageNotFound.js';

function e(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var t = {
    exports: {}
  },
  n = {},
  r = Symbol.for("react.element"),
  l = Symbol.for("react.portal"),
  a = Symbol.for("react.fragment"),
  c = Symbol.for("react.strict_mode"),
  u = Symbol.for("react.profiler"),
  o = Symbol.for("react.provider"),
  i = Symbol.for("react.context"),
  s = Symbol.for("react.forward_ref"),
  m = Symbol.for("react.suspense"),
  f = Symbol.for("react.memo"),
  p = Symbol.for("react.lazy"),
  d = Symbol.iterator;
var E = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
  y = Object.assign,
  h = {};
function b(e, t, n) {
  this.props = e, this.context = t, this.refs = h, this.updater = n || E;
}
function v() {}
function g(e, t, n) {
  this.props = e, this.context = t, this.refs = h, this.updater = n || E;
}
b.prototype.isReactComponent = {}, b.prototype.setState = function (e, t) {
  if ("object" != typeof e && "function" != typeof e && null != e) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
}, b.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
}, v.prototype = b.prototype;
var _ = g.prototype = new v();
_.constructor = g, y(_, b.prototype), _.isPureReactComponent = !0;
var k = Array.isArray,
  S = Object.prototype.hasOwnProperty,
  N = {
    current: null
  },
  C = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function w(e, t, n) {
  var l,
    a = {},
    c = null,
    u = null;
  if (null != t) for (l in void 0 !== t.ref && (u = t.ref), void 0 !== t.key && (c = "" + t.key), t) S.call(t, l) && !C.hasOwnProperty(l) && (a[l] = t[l]);
  var o = arguments.length - 2;
  if (1 === o) a.children = n;else if (1 < o) {
    for (var i = Array(o), s = 0; s < o; s++) i[s] = arguments[s + 2];
    a.children = i;
  }
  if (e && e.defaultProps) for (l in o = e.defaultProps) void 0 === a[l] && (a[l] = o[l]);
  return {
    $$typeof: r,
    type: e,
    key: c,
    ref: u,
    props: a,
    _owner: N.current
  };
}
function R(e) {
  return "object" == typeof e && null !== e && e.$$typeof === r;
}
var $ = /\/+/g;
function j(e, t) {
  return "object" == typeof e && null !== e && null != e.key ? function (e) {
    var t = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function (e) {
      return t[e];
    });
  }("" + e.key) : t.toString(36);
}
function O(e, t, n, a, c) {
  var u = typeof e;
  "undefined" !== u && "boolean" !== u || (e = null);
  var o = !1;
  if (null === e) o = !0;else switch (u) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case r:
        case l:
          o = !0;
      }
  }
  if (o) return c = c(o = e), e = "" === a ? "." + j(o, 0) : a, k(c) ? (n = "", null != e && (n = e.replace($, "$&/") + "/"), O(c, t, n, "", function (e) {
    return e;
  })) : null != c && (R(c) && (c = function (e, t) {
    return {
      $$typeof: r,
      type: e.type,
      key: t,
      ref: e.ref,
      props: e.props,
      _owner: e._owner
    };
  }(c, n + (!c.key || o && o.key === c.key ? "" : ("" + c.key).replace($, "$&/") + "/") + e)), t.push(c)), 1;
  if (o = 0, a = "" === a ? "." : a + ":", k(e)) for (var i = 0; i < e.length; i++) {
    var s = a + j(u = e[i], i);
    o += O(u, t, n, s, c);
  } else if (s = function (e) {
    return null === e || "object" != typeof e ? null : "function" == typeof (e = d && e[d] || e["@@iterator"]) ? e : null;
  }(e), "function" == typeof s) for (e = s.call(e), i = 0; !(u = e.next()).done;) o += O(u = u.value, t, n, s = a + j(u, i++), c);else if ("object" === u) throw t = String(e), Error("Objects are not valid as a React child (found: " + ("[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function P(e, t, n) {
  if (null == e) return e;
  var r = [],
    l = 0;
  return O(e, r, "", "", function (e) {
    return t.call(n, e, l++);
  }), r;
}
function x(e) {
  if (-1 === e._status) {
    var t = e._result;
    (t = t()).then(function (t) {
      0 !== e._status && -1 !== e._status || (e._status = 1, e._result = t);
    }, function (t) {
      0 !== e._status && -1 !== e._status || (e._status = 2, e._result = t);
    }), -1 === e._status && (e._status = 0, e._result = t);
  }
  if (1 === e._status) return e._result.default;
  throw e._result;
}
var U = {
    current: null
  },
  F = {
    transition: null
  },
  I = {
    ReactCurrentDispatcher: U,
    ReactCurrentBatchConfig: F,
    ReactCurrentOwner: N
  };
n.Children = {
  map: P,
  forEach: function (e, t, n) {
    P(e, function () {
      t.apply(this, arguments);
    }, n);
  },
  count: function (e) {
    var t = 0;
    return P(e, function () {
      t++;
    }), t;
  },
  toArray: function (e) {
    return P(e, function (e) {
      return e;
    }) || [];
  },
  only: function (e) {
    if (!R(e)) throw Error("React.Children.only expected to receive a single React element child.");
    return e;
  }
}, n.Component = b, n.Fragment = a, n.Profiler = u, n.PureComponent = g, n.StrictMode = c, n.Suspense = m, n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = I, n.cloneElement = function (e, t, n) {
  if (null == e) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var l = y({}, e.props),
    a = e.key,
    c = e.ref,
    u = e._owner;
  if (null != t) {
    if (void 0 !== t.ref && (c = t.ref, u = N.current), void 0 !== t.key && (a = "" + t.key), e.type && e.type.defaultProps) var o = e.type.defaultProps;
    for (i in t) S.call(t, i) && !C.hasOwnProperty(i) && (l[i] = void 0 === t[i] && void 0 !== o ? o[i] : t[i]);
  }
  var i = arguments.length - 2;
  if (1 === i) l.children = n;else if (1 < i) {
    o = Array(i);
    for (var s = 0; s < i; s++) o[s] = arguments[s + 2];
    l.children = o;
  }
  return {
    $$typeof: r,
    type: e.type,
    key: a,
    ref: c,
    props: l,
    _owner: u
  };
}, n.createContext = function (e) {
  return (e = {
    $$typeof: i,
    _currentValue: e,
    _currentValue2: e,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
    _defaultValue: null,
    _globalName: null
  }).Provider = {
    $$typeof: o,
    _context: e
  }, e.Consumer = e;
}, n.createElement = w, n.createFactory = function (e) {
  var t = w.bind(null, e);
  return t.type = e, t;
}, n.createRef = function () {
  return {
    current: null
  };
}, n.forwardRef = function (e) {
  return {
    $$typeof: s,
    render: e
  };
}, n.isValidElement = R, n.lazy = function (e) {
  return {
    $$typeof: p,
    _payload: {
      _status: -1,
      _result: e
    },
    _init: x
  };
}, n.memo = function (e, t) {
  return {
    $$typeof: f,
    type: e,
    compare: void 0 === t ? null : t
  };
}, n.startTransition = function (e) {
  var t = F.transition;
  F.transition = {};
  try {
    e();
  } finally {
    F.transition = t;
  }
}, n.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
}, n.useCallback = function (e, t) {
  return U.current.useCallback(e, t);
}, n.useContext = function (e) {
  return U.current.useContext(e);
}, n.useDebugValue = function () {}, n.useDeferredValue = function (e) {
  return U.current.useDeferredValue(e);
}, n.useEffect = function (e, t) {
  return U.current.useEffect(e, t);
}, n.useId = function () {
  return U.current.useId();
}, n.useImperativeHandle = function (e, t, n) {
  return U.current.useImperativeHandle(e, t, n);
}, n.useInsertionEffect = function (e, t) {
  return U.current.useInsertionEffect(e, t);
}, n.useLayoutEffect = function (e, t) {
  return U.current.useLayoutEffect(e, t);
}, n.useMemo = function (e, t) {
  return U.current.useMemo(e, t);
}, n.useReducer = function (e, t, n) {
  return U.current.useReducer(e, t, n);
}, n.useRef = function (e) {
  return U.current.useRef(e);
}, n.useState = function (e) {
  return U.current.useState(e);
}, n.useSyncExternalStore = function (e, t, n) {
  return U.current.useSyncExternalStore(e, t, n);
}, n.useTransition = function () {
  return U.current.useTransition();
}, n.version = "18.2.0", t.exports = n;
var L = t.exports,
  A = e(L);
const q = e => {
    const {
      children: t,
      onClick: n,
      disabled: r
    } = e;
    return A.createElement("button", {
      disabled: r,
      className: "btn",
      onClick: n
    }, t);
  },
  H = ({
    load: e
  }) => e ? A.createElement("div", {
    className: "preload"
  }, A.createElement("div", {
    className: "loadingio-spinner-rolling-8n6pm9bs3j5"
  }, A.createElement("div", {
    className: "ldio-gggn3pkm2yo"
  }, A.createElement("div", null)))) : null,
  re = L.forwardRef(({
    value: e,
    onChange: t
  }, n) => A.createElement("input", {
    type: "text",
    value: e,
    className: "input",
    ref: n,
    onChange: t
  })),
  le = ({
    load: e,
    search: t,
    disabled: n
  }) => A.createElement("div", {
    className: "search"
  }, A.createElement(H, {
    load: e
  }), A.createElement("form", {
    className: "search-form"
  }, A.createElement(re, {
    value: t,
    onChange: e => e
  }), A.createElement(q, {
    disabled: n
  }, "Найти")));

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
  let endMessage;
  if (req.url === '/analitics') endMessage = 'Аналитика закончилась, должны появиться новые товары!';
  if (req.url === '/scraping') endMessage = 'Скрапинг закончился, должны появиться товары!';
  if (req.url === '/scraping-and-analitics') endMessage = 'Скрапинг и аналитика закончились, стоит обновить товары и новые товары!';
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
  const nameUrl = 'main';
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
    navParams: navParams,
    nameUrl: nameUrl
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
  const nameUrl = fraze;
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}"`,
    description: `Описание для страницы по запросу "${fraze}"`
  });
  const category = await bAllShopsParam(fraze);
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams,
    isLoad: false,
    nameUrl: nameUrl
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
  const nameUrl = `${fraze}-cg`;
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}" для читай-города`,
    description: `Описание для страницы по запросу "${fraze}" для читай-города`
  });
  const params = await bShopParam(fraze, 'cg');
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams,
    isLoad: false,
    nameUrl: nameUrl
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
  const nameUrl = `${fraze}-lb`;
  let page = typeLayout;
  let seo = bSeo({
    title: `Страница по запросу "${fraze}" для лабиринта`,
    description: `Описание для страницы по запросу "${fraze}" для лабиринта`
  });
  const params = await bShopParam(fraze, 'lb');
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams,
    isLoad: false,
    nameUrl: nameUrl
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
app.get('/new-items', async (req, res, next) => {
  let page = typeLayout;
  const nameUrl = 'new';
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
    navParams: navParams,
    nameUrl: nameUrl
  }, /*#__PURE__*/React.createElement(MainCont, {
    title: "\u041D\u043E\u0432\u044B\u0435 \u0442\u043E\u0432\u0430\u0440\u044B \u043F\u043E \u0432\u0441\u0435\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C",
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
app.post('/new-items', async (req, res, next) => {
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
  const nameUrl = `${fraze}-new`;
  let page = typeLayout;
  let seo = bSeo({
    title: `Новые товары по запросу "${fraze}" для интернет магазинов`,
    description: `Описание для страницы с новыми товарами по запросу "${fraze}"`
  });
  const newCategory = await bNewItems(fraze);
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams,
    isLoad: false,
    nameUrl: nameUrl
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
}, (req, res, next) => {
  console.log(`Post запрос для новых товаров по фразе "${req.params.fraze}"`);
});
app.get('/search', async (req, res, next) => {
  let page = typeLayout;
  const nameUrl = 'search';
  let seo = bSeo({
    title: 'Поиск',
    description: 'Описание для страницы поиска'
  });
  let appContent = ReactDOMServer.renderToString( /*#__PURE__*/React.createElement(Wrapper, {
    topNav: topNav,
    navParams: navParams,
    isLoad: false,
    nameUrl: nameUrl
  }, /*#__PURE__*/React.createElement(le, {
    load: false,
    search: "",
    disabled: true
  })));
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
