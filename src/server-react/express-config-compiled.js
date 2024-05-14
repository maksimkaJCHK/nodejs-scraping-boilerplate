import express from 'express';
import { WebSocketServer } from 'ws';
import { runAnalitics } from '../analitics/shop.js';
import { shopScraping } from '../spiders/shopScraping.js';
import e from 'fs';
import n, { forwardRef } from 'react';
import r from 'react-dom/server';
import { readJSONFileToAnalitics } from '../services/fs.js';
import { bAllShopsParam } from './server/services/services.js';
import { shopScrapingForFraze } from '../spiders/shopScrapingForFraze.js';

const topNav = [{
  url: '/',
  title: 'Главная',
  name: 'main'
}, {
  url: '/all-shops/javascript',
  title: 'Javascript',
  name: 'javascript'
}, {
  url: '/all-shops/react',
  title: 'React',
  name: 'react'
}, {
  url: '/all-shops/python',
  title: 'Python',
  name: 'python'
}, {
  url: '/all-shops/angular',
  title: 'Angular',
  name: 'angular'
}, {
  url: '/all-shops/typescript',
  title: 'Typescript',
  name: 'typescript'
}, {
  url: '/search',
  title: 'Поиск по запросам',
  name: 'search'
}];
const cg = [{
  url: '/cg/javascript',
  title: 'Javascript',
  name: 'javascript-cg'
}, {
  url: '/cg/python',
  title: 'Python',
  name: 'python-cg'
}, {
  url: '/cg/react',
  title: 'React',
  name: 'react-cg'
}, {
  url: '/cg/angular',
  title: 'Angular',
  name: 'angular-cg'
}, {
  url: '/cg/typescript',
  title: 'Typescript',
  name: 'typescript-cg'
}];
const lb = [{
  url: '/lb/javascript',
  title: 'Javascript',
  name: 'javascript-lb'
}, {
  url: '/lb/python',
  title: 'Python',
  name: 'python-lb'
}, {
  url: '/lb/react',
  title: 'React',
  name: 'react-lb'
}, {
  url: '/lb/angular',
  title: 'Angular',
  name: 'angular-lb'
}, {
  url: '/lb/typescript',
  title: 'Typescript',
  name: 'typescript-lb'
}];
const newItem = [{
  url: '/new/javascript',
  title: 'Javascript',
  name: 'javascript-new'
}, {
  url: '/new/python',
  title: 'Python',
  name: 'python-new'
}, {
  url: '/new/react',
  title: 'React',
  name: 'react-new'
}, {
  url: '/new/angular',
  title: 'Angular',
  name: 'angular-new'
}, {
  url: '/new/typescript',
  title: 'Typescript',
  name: 'typescript-new'
}];
const navParams = {
  cg,
  lb,
  newItem
};

const mainData = async () => {
  const cgJavascript = await readJSONFileToAnalitics('cg-shop-javascript');
  const cgAngular = await readJSONFileToAnalitics('cg-shop-angular');
  const cgPythonr = await readJSONFileToAnalitics('cg-shop-python');
  const cgReact = await readJSONFileToAnalitics('cg-shop-react');
  const cgTypescript = await readJSONFileToAnalitics('cg-shop-typescript');
  const lbJavascript = await readJSONFileToAnalitics('lb-shop-javascript');
  const lbAngular = await readJSONFileToAnalitics('lb-shop-angular');
  const lbPythonr = await readJSONFileToAnalitics('lb-shop-python');
  const lbReact = await readJSONFileToAnalitics('lb-shop-react');
  const lbTypescript = await readJSONFileToAnalitics('lb-shop-typescript');
  const catalogs = [{
    id: "javascript",
    title: "Поисковый запрос 'javascript'",
    idLb: "labirint-javascript",
    idCg: 'cg-javascript',
    shops: {
      cg: cgJavascript || [],
      lb: lbJavascript || []
    }
  }, {
    id: "react",
    title: "Поисковый запрос 'react'",
    idLb: "labirint-react",
    idCg: 'cg-react',
    shops: {
      cg: cgReact || [],
      lb: lbReact || []
    }
  }, {
    id: "python",
    title: "Поисковый запрос 'python'",
    idLb: "labirint-python",
    idCg: 'cg-python',
    shops: {
      cg: cgPythonr || [],
      lb: lbPythonr || []
    }
  }, {
    id: "angular",
    title: "Поисковый запрос 'angular'",
    idLb: "labirint-angular",
    idCg: 'cg-angular',
    shops: {
      cg: cgAngular || [],
      lb: lbAngular || []
    }
  }, {
    id: "typescript",
    title: "Поисковый запрос 'typescript'",
    idLb: "labirint-typescript",
    idCg: 'cg-typescript',
    shops: {
      cg: cgTypescript || [],
      lb: lbTypescript || []
    }
  }];
  const mainLinks = [{
    title: 'Товары по запросу javascript',
    url: 'javascript'
  }, {
    title: 'Товары по запросу react',
    url: 'react'
  }, {
    title: 'Товары по запросу python',
    url: 'python'
  }, {
    title: 'Товары по запросу angular',
    url: 'angular'
  }, {
    title: 'Товары по запросу typescript',
    url: 'typescript'
  }];
  return {
    catalogs,
    mainLinks
  };
};

function o() {
  return o = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
    }
    return e;
  }, o.apply(this, arguments);
}
const p = ({
    url: e,
    title: t,
    name: a,
    nameUrl: l,
    ...r
  }) => {
    let s = {
      className: ""
    };
    return l && (s = l === a && {
      className: "active",
      "aria-current": "page"
    }), /*#__PURE__*/n.createElement("a", o({
      href: e
    }, r, s), t);
  },
  g = ({
    link: e,
    nameUrl: t
  }) => /*#__PURE__*/n.createElement("nav", null, e.map((e, a) => /*#__PURE__*/n.createElement(p, o({}, e, {
    key: a,
    nameUrl: t
  })))),
  d = e => {
    const {
      children: t,
      onClick: a,
      disabled: l
    } = e;
    return /*#__PURE__*/n.createElement("button", {
      disabled: l,
      className: "btn",
      onClick: a
    }, t);
  },
  u = ({
    cg: e,
    lb: t,
    newItem: a,
    children: l,
    isScraping: r,
    isAnalitics: s,
    nameUrl: i,
    analitics: c = e => e,
    scraping: m = e => e,
    scrapingAndAnalitics: g = e => e
  }) => /*#__PURE__*/n.createElement("section", {
    className: "params"
  }, /*#__PURE__*/n.createElement("div", {
    className: "h2"
  }, "Запросы по конкретным магазинам:"), /*#__PURE__*/n.createElement("div", {
    className: "params-nav"
  }, /*#__PURE__*/n.createElement("b", null, "Запрос для читай-города: "), e.map((e, t) => /*#__PURE__*/n.createElement(p, o({}, e, {
    key: t,
    nameUrl: i
  })))), /*#__PURE__*/n.createElement("div", {
    className: "params-nav"
  }, /*#__PURE__*/n.createElement("b", null, "Запрос для лабирита: "), t.map((e, t) => /*#__PURE__*/n.createElement(p, o({}, e, {
    key: t,
    nameUrl: i
  })))), /*#__PURE__*/n.createElement("div", {
    className: "params-nav"
  }, /*#__PURE__*/n.createElement("h2", null, "Новые товары:"), /*#__PURE__*/n.createElement("b", null, /*#__PURE__*/n.createElement(p, {
    url: "/new-items",
    title: "Новые товары по всем запросам",
    name: "new",
    nameUrl: i
  })), a.map((e, t) => /*#__PURE__*/n.createElement(p, o({}, e, {
    key: t,
    nameUrl: i
  })))), /*#__PURE__*/n.createElement("div", {
    className: "params-btn-block"
  }, /*#__PURE__*/n.createElement(d, {
    onClick: m,
    disabled: r
  }, "Скрапинг интернет-магазинов"), /*#__PURE__*/n.createElement(d, {
    onClick: c,
    disabled: s
  }, "Анализировать"), /*#__PURE__*/n.createElement(d, {
    onClick: g,
    disabled: r || s
  }, "Скрапинг интернет-магазинов и анализ"), l)),
  E = ({
    load: e
  }) => e ? /*#__PURE__*/n.createElement("div", {
    className: "preload"
  }, /*#__PURE__*/n.createElement("div", {
    className: "loadingio-spinner-rolling-8n6pm9bs3j5"
  }, /*#__PURE__*/n.createElement("div", {
    className: "ldio-gggn3pkm2yo"
  }, /*#__PURE__*/n.createElement("div", null)))) : null,
  y = ({
    topNav: e,
    navParams: t,
    children: a,
    nameUrl: l,
    isLoad: r = !0
  }) => /*#__PURE__*/n.createElement(n.Fragment, null, /*#__PURE__*/n.createElement(g, {
    link: e,
    nameUrl: l
  }), /*#__PURE__*/n.createElement(u, o({}, t, {
    nameUrl: l
  })), /*#__PURE__*/n.createElement("main", null, /*#__PURE__*/n.createElement(E, {
    load: r
  }), a)),
  b = ({
    url: e,
    picture: t,
    title: a,
    bookAuthors: l,
    description: r,
    price: s,
    publisher: i,
    yearPublishing: c,
    pages: m
  }) => {
    const o = {
      __html: r
    };
    return /*#__PURE__*/n.createElement("div", {
      className: "item"
    }, /*#__PURE__*/n.createElement("a", {
      href: e,
      className: "item-img",
      target: "_blank"
    }, t ? /*#__PURE__*/n.createElement("img", {
      src: t
    }) : "У товара нет картинки"), /*#__PURE__*/n.createElement("div", {
      className: "item-description"
    }, /*#__PURE__*/n.createElement("h3", null, /*#__PURE__*/n.createElement("a", {
      href: e,
      target: "_blank"
    }, a)), /*#__PURE__*/n.createElement("p", null, /*#__PURE__*/n.createElement("b", null, "Автор:"), " ", l.map((e, t) => /*#__PURE__*/n.createElement("span", {
      key: t
    }, e))), /*#__PURE__*/n.createElement("p", {
      dangerouslySetInnerHTML: o
    }), /*#__PURE__*/n.createElement("p", null, /*#__PURE__*/n.createElement("b", null, "Страниц:"), " ", m), /*#__PURE__*/n.createElement("p", null, /*#__PURE__*/n.createElement("b", null, "Опубликовано:"), " ", c || "-"), /*#__PURE__*/n.createElement("p", null, /*#__PURE__*/n.createElement("b", null, "Издательство:"), " ", i), /*#__PURE__*/n.createElement("p", null, /*#__PURE__*/n.createElement("b", null, "Цена:"), " ", s, " руб"), /*#__PURE__*/n.createElement("div", {
      className: "item-link"
    }, /*#__PURE__*/n.createElement("a", {
      href: e,
      target: "_blank"
    }, "Посмотреть товар"))));
  },
  v = ({
    url: e,
    picture: t,
    title: a,
    description: l,
    publisher: r,
    price: s
  }) => /*#__PURE__*/n.createElement("div", {
    className: "item"
  }, /*#__PURE__*/n.createElement("a", {
    href: e,
    className: "item-img",
    target: "_blank"
  }, t ? /*#__PURE__*/n.createElement("img", {
    src: t
  }) : "У товара нет картинки"), /*#__PURE__*/n.createElement("div", {
    className: "item-description"
  }, /*#__PURE__*/n.createElement("h3", null, /*#__PURE__*/n.createElement("a", {
    href: e,
    target: "_blank"
  }, a)), /*#__PURE__*/n.createElement("p", null, /*#__PURE__*/n.createElement("b", null, "Издательство:"), " ", r), /*#__PURE__*/n.createElement("p", null, /*#__PURE__*/n.createElement("b", null, "Цена:"), " ", s), /*#__PURE__*/n.createElement("div", {
    className: "item-link"
  }, /*#__PURE__*/n.createElement("a", {
    href: e,
    target: "_blank"
  }, "Посмотреть товар")))),
  h = ({
    text: e = "Нет товаров для отображения"
  }) => /*#__PURE__*/n.createElement("p", {
    className: "fraze-null"
  }, /*#__PURE__*/n.createElement("b", null, e)),
  w = ({
    shop: e,
    title: t,
    id: a,
    type: l = "cg"
  }) => {
    const r = t ? /*#__PURE__*/n.createElement("h3", null, t) : null;
    return /*#__PURE__*/n.createElement("div", {
      id: a
    }, r, /*#__PURE__*/n.createElement("div", null, "Всего ", e && e.length, " товаров"), /*#__PURE__*/n.createElement("div", {
      className: "item-wrap"
    }, e && e.length ? "cg" === l ? e.map((e, t) => /*#__PURE__*/n.createElement(b, o({}, e, {
      key: t
    }))) : e.map((e, t) => /*#__PURE__*/n.createElement(v, o({}, e, {
      key: t
    }))) : /*#__PURE__*/n.createElement(h, null)));
  },
  N = ({
    title: e,
    idCg: t,
    idLb: a
  }) => {
    const l = e ? /*#__PURE__*/n.createElement("h2", null, e) : null,
      r = t || a ? /*#__PURE__*/n.createElement("ul", null, t && /*#__PURE__*/n.createElement("li", null, /*#__PURE__*/n.createElement(p, {
        url: "#" + t,
        title: "Товары на читай-городе"
      })), a && /*#__PURE__*/n.createElement("li", null, /*#__PURE__*/n.createElement(p, {
        url: "#" + a,
        title: "Товары на лабиринте"
      }))) : null;
    return /*#__PURE__*/n.createElement(n.Fragment, null, l, r);
  },
  P = ({
    id: e,
    shops: t,
    title: a,
    idCg: l,
    idLb: r
  }) => /*#__PURE__*/n.createElement("div", {
    id: e
  }, /*#__PURE__*/n.createElement(N, {
    title: a,
    idCg: l,
    idLb: r
  }), /*#__PURE__*/n.createElement(w, {
    shop: t.cg,
    id: l,
    type: "cg",
    title: "Товары для читай-города"
  }), /*#__PURE__*/n.createElement(w, {
    shop: t.lb,
    id: r,
    type: "lb",
    title: "Товары для лабиринта"
  })),
  k = ({
    catalogs: e
  }) => /*#__PURE__*/n.createElement(n.Fragment, null, e.map((e, t) => /*#__PURE__*/n.createElement(P, o({}, e, {
    key: t
  })))),
  f = ({
    title: e,
    links: t
  }) => {
    const a = e ? /*#__PURE__*/n.createElement("h1", null, e) : null,
      l = t && t.length ? /*#__PURE__*/n.createElement("ul", null, t.map(({
        title: e,
        url: t
      }, a) => t && t.length ? /*#__PURE__*/n.createElement("li", {
        key: a
      }, /*#__PURE__*/n.createElement(p, {
        url: "#" + t,
        title: e || "Заголовок не определен"
      })) : null)) : null;
    return /*#__PURE__*/n.createElement(n.Fragment, null, a, l);
  },
  L = ({
    mainLinks: e,
    title: t,
    catalogs: a
  }) => /*#__PURE__*/n.createElement(n.Fragment, null, /*#__PURE__*/n.createElement(f, {
    title: t,
    links: e
  }), /*#__PURE__*/n.createElement(k, {
    catalogs: a
  })),
  $ = ({
    category: e,
    title: t
  }) => /*#__PURE__*/n.createElement(n.Fragment, null, /*#__PURE__*/n.createElement("h1", null, t), Object.keys(e).length ? /*#__PURE__*/n.createElement(P, e) : null),
  j = ({
    shopListParams: e,
    title: t
  }) => /*#__PURE__*/n.createElement(n.Fragment, null, /*#__PURE__*/n.createElement("h1", null, t), /*#__PURE__*/n.createElement(w, e)),
  S = async (e, t) => {
    const a = `${t}-shop-${e}`;
    return {
      id: e,
      title: `Товары для ${"cg" === t ? "читай-города" : "лабиринта"} по запросу ${e}`,
      type: t,
      shop: await readJSONFileToAnalitics(a)
    };
  },
  C = ({
    bSeo: e,
    bPage: t,
    topNav: a,
    navParams: l,
    typeLayout: s,
    type: i
  }) => async (c, m, o) => {
    const p = c.params.fraze,
      g = `${p}-${i}`;
    let d;
    "cg" === i && (d = "читай-города"), "lb" === i && (d = "лабиринта");
    let u = s,
      E = e({
        title: `Страница по запросу "${p}" для ${d}`,
        description: `Описание для страницы по запросу "${p}" для ${d}`
      });
    const b = await S(p, i);
    let v = r.renderToString( /*#__PURE__*/n.createElement(y, {
      topNav: a,
      navParams: l,
      isLoad: !1,
      nameUrl: g
    }, /*#__PURE__*/n.createElement(j, {
      title: `Страница по запросу "${p}" для ${d}`,
      shopListParams: b
    })));
    u = t({
      page: u,
      seo: E,
      appContent: v,
      js: `window.curshop = {}; window.curshop.${i} = {}; window.curshop.${i}.${p}=${JSON.stringify(b)}`
    }), m.contentType("text/html"), m.status(200), m.send(u), o();
  },
  T = e => async (t, a, n) => {
    const l = t.params.fraze,
      r = await S(l, e);
    a.contentType("application/json"), a.status(200), a.send(r), n();
  },
  U = async () => {
    const e = await readJSONFileToAnalitics("cg-javascript", "./results/analitics"),
      t = await readJSONFileToAnalitics("cg-angular", "./results/analitics"),
      a = await readJSONFileToAnalitics("cg-python", "./results/analitics"),
      n = await readJSONFileToAnalitics("cg-react", "./results/analitics"),
      l = await readJSONFileToAnalitics("cg-typescript", "./results/analitics"),
      r = await readJSONFileToAnalitics("lb-javascript", "./results/analitics"),
      s = await readJSONFileToAnalitics("lb-angular", "./results/analitics"),
      i = await readJSONFileToAnalitics("lb-python", "./results/analitics");
    return {
      catalogs: [{
        id: "javascript",
        title: "Новые товары по запросу 'javascript'",
        idLb: "labirint-javascript",
        idCg: "cg-javascript",
        shops: {
          cg: e || [],
          lb: r || []
        }
      }, {
        id: "react",
        title: "Новые товары по запросу 'react'",
        idLb: "labirint-react",
        idCg: "cg-react",
        shops: {
          cg: n || [],
          lb: (await readJSONFileToAnalitics("lb-react", "./results/analitics")) || []
        }
      }, {
        id: "python",
        title: "Новые товары по запросу 'python'",
        idLb: "labirint-python",
        idCg: "cg-python",
        shops: {
          cg: a || [],
          lb: i || []
        }
      }, {
        id: "angular",
        title: "Новые товары по запросу 'angular'",
        idLb: "labirint-angular",
        idCg: "cg-angular",
        shops: {
          cg: t || [],
          lb: s || []
        }
      }, {
        id: "typescript",
        title: "Новые товары по запросу 'typescript'",
        idLb: "labirint-typescript",
        idCg: "cg-typescript",
        shops: {
          cg: l || [],
          lb: (await readJSONFileToAnalitics("lb-typescript", "./results/analitics")) || []
        }
      }],
      mainLinks: [{
        title: "Новые товары по запросу javascript",
        url: "javascript"
      }, {
        title: "Новые товары по запросу react",
        url: "react"
      }, {
        title: "Новые товары по запросу python",
        url: "python"
      }, {
        title: "Новые товары по запросу angular",
        url: "angular"
      }, {
        title: "Новые товары по запросу typescript",
        url: "typescript"
      }]
    };
  },
  F = async e => ({
    id: e,
    title: `Новые товары по запросу '${e}'`,
    idLb: `labirint-${e}`,
    idCg: `cg-${e}`,
    shops: {
      cg: (await readJSONFileToAnalitics(`cg-${e}`, "./results/analitics")) || [],
      lb: (await readJSONFileToAnalitics(`lb-${e}`, "./results/analitics")) || []
    }
  }),
  x = () => /*#__PURE__*/n.createElement("div", {
    className: "pageNotFound"
  }, /*#__PURE__*/n.createElement("h1", null, "Страница не найдера!!!"), /*#__PURE__*/n.createElement("p", null, "Страница не найдена, попробуйте перейти по ссылкам выше.")),
  O = /*#__PURE__*/forwardRef(({
    value: e,
    onChange: t
  }, a) => /*#__PURE__*/n.createElement("input", {
    type: "text",
    value: e,
    className: "input",
    ref: a,
    onChange: t
  })),
  z = ({
    load: e,
    search: t,
    disabled: a
  }) => /*#__PURE__*/n.createElement("div", {
    className: "search"
  }, /*#__PURE__*/n.createElement(E, {
    load: e
  }), /*#__PURE__*/n.createElement("form", {
    className: "search-form"
  }, /*#__PURE__*/n.createElement(O, {
    value: t,
    onChange: e => e
  }), /*#__PURE__*/n.createElement(d, {
    disabled: a
  }, "Найти"))),
  _ = {
    bSeo: ({
      title: e,
      description: t
    }) => `\n  <title>${e}</title>\n  <meta name="description" content="${t}">\n`,
    bPage: ({
      page: e,
      seo: t,
      appContent: a,
      js: n = "\x3c!-- --\x3e"
    }) => e = (e = (e = e.replace(/<!--seo-->/, t)).replace(/<!-- js -->/, `<script>${n}<\/script>`)).replace('<div id="app"></div>', `<div id="app">${a}</div>`),
    topNav: topNav,
    navParams: navParams,
    typeLayout: e.readFileSync("./src/server-react/server/views/main.html", {
      encoding: "utf8"
    })
  },
  J = {
    mainPagePost: async (e, t, a) => {
      const {
        mainLinks: n,
        catalogs: l
      } = await mainData();
      t.contentType("application/json"), t.status(200), t.send({
        mainLinks: n,
        catalogs: l
      }), a();
    },
    allShopsPagePost: async (e, t, a) => {
      const n = e.params.fraze,
        l = await bAllShopsParam(n);
      t.contentType("application/json"), t.status(200), t.send(l), a();
    },
    cgShopPost: T("cg"),
    lbShopPost: T("lb"),
    newItemsPagePost: async (e, t, a) => {
      const {
        mainLinks: n,
        catalogs: l
      } = await U();
      t.contentType("application/json"), t.status(200), t.send({
        mainLinks: n,
        catalogs: l
      }), a();
    },
    newFrazePagePost: async (e, t, a) => {
      const n = e.params.fraze,
        l = await F(n);
      t.contentType("application/json"), t.status(200), t.send(l), a();
    },
    searchPagePost: async (e, t, a) => {
      const n = e.params.fraze;
      await shopScrapingForFraze(n);
      const l = await bAllShopsParam(n);
      t.contentType("application/json"), t.status(200), t.send(l), a();
    },
    searchPage: (({
      bSeo: e,
      bPage: t,
      topNav: a,
      navParams: l,
      typeLayout: s
    }) => async (i, c, m) => {
      let o = s;
      let p = e({
          title: "Поиск",
          description: "Описание для страницы поиска"
        }),
        g = r.renderToString( /*#__PURE__*/n.createElement(y, {
          topNav: a,
          navParams: l,
          isLoad: !1,
          nameUrl: "search"
        }, /*#__PURE__*/n.createElement(z, {
          load: !1,
          search: "",
          disabled: !0
        })));
      o = t({
        page: o,
        seo: p,
        appContent: g,
        js: ""
      }), c.contentType("text/html"), c.status(200), c.send(o), m();
    })(_),
    mainPage: (({
      bSeo: e,
      bPage: t,
      topNav: a,
      navParams: l,
      typeLayout: i
    }) => async (c, m, o) => {
      let p = i;
      let g = e({
        title: "Все запросы",
        description: "Описание для главной страницы, тут все запросы"
      });
      const {
        mainLinks: d,
        catalogs: u
      } = await mainData();
      let E = r.renderToString( /*#__PURE__*/n.createElement(y, {
        topNav: a,
        navParams: l,
        nameUrl: "main"
      }, /*#__PURE__*/n.createElement(L, {
        title: "Все товары по всем запросам",
        mainLinks: d,
        catalogs: u
      })));
      p = t({
        page: p,
        seo: g,
        appContent: E,
        js: `window.catalogs = ${JSON.stringify(u)}; window.mainLinks = ${JSON.stringify(d)}`
      }), m.contentType("text/html"), m.status(200), m.send(p), o();
    })(_),
    allShopsPage: (({
      bSeo: e,
      bPage: t,
      topNav: a,
      navParams: l,
      typeLayout: s
    }) => async (c, m, o) => {
      const p = c.params.fraze,
        g = p;
      let d = s,
        u = e({
          title: `Страница по запросу "${p}"`,
          description: `Описание для страницы по запросу "${p}"`
        });
      const E = await bAllShopsParam(p);
      let b = r.renderToString( /*#__PURE__*/n.createElement(y, {
        topNav: a,
        navParams: l,
        isLoad: !1,
        nameUrl: g
      }, /*#__PURE__*/n.createElement($, {
        title: `Товары по запросу "${p}" для интернет-магазинов`,
        category: E
      })));
      d = t({
        page: d,
        seo: u,
        appContent: b,
        js: `window.category=${JSON.stringify(E)}`
      }), m.contentType("text/html"), m.status(200), m.send(d), o();
    })(_),
    cgShop: C({
      ..._,
      type: "cg"
    }),
    lbShop: C({
      ..._,
      type: "lb"
    }),
    newItemsPage: (({
      bSeo: e,
      bPage: t,
      topNav: a,
      navParams: l,
      typeLayout: s
    }) => async (i, c, m) => {
      let o = s;
      let p = e({
        title: "Все новые товары для магазинов",
        description: "Все новые товары для магазинов"
      });
      const {
        mainLinks: g,
        catalogs: d
      } = await U();
      let u = r.renderToString( /*#__PURE__*/n.createElement(y, {
        topNav: a,
        navParams: l,
        nameUrl: "new"
      }, /*#__PURE__*/n.createElement(L, {
        title: "Новые товары по всем запросам",
        mainLinks: g,
        catalogs: d
      })));
      o = t({
        page: o,
        seo: p,
        appContent: u,
        js: `window.newCatalogs = ${JSON.stringify(d)}; window.newMainLinks = ${JSON.stringify(g)}`
      }), c.contentType("text/html"), c.status(200), c.send(o), m();
    })(_),
    newFrazePage: (({
      bSeo: e,
      bPage: t,
      topNav: a,
      navParams: l,
      typeLayout: s
    }) => async (i, c, m) => {
      const o = i.params.fraze,
        p = `${o}-new`;
      let g = s,
        d = e({
          title: `Новые товары по запросу "${o}" для интернет магазинов`,
          description: `Описание для страницы с новыми товарами по запросу "${o}"`
        });
      const u = await F(o);
      let E = r.renderToString( /*#__PURE__*/n.createElement(y, {
        topNav: a,
        navParams: l,
        isLoad: !1,
        nameUrl: p
      }, /*#__PURE__*/n.createElement($, {
        title: `Новые товары по запросу "${o}" для интернет-магазинов`,
        category: u
      })));
      g = t({
        page: g,
        seo: d,
        appContent: E,
        js: `window.newCategory=${JSON.stringify(u)}`
      }), c.contentType("text/html"), c.status(200), c.send(g), m();
    })(_),
    pageNotFound: ({
      bSeo: e,
      bPage: t,
      topNav: a,
      navParams: l,
      typeLayout: s
    }) => async (i, c, m) => {
      let o = s,
        p = e({
          title: "Страница не найдена",
          description: "Страница не найдена"
        }),
        g = r.renderToString( /*#__PURE__*/n.createElement(y, {
          topNav: a,
          navParams: l,
          isLoad: !1
        }, /*#__PURE__*/n.createElement(x, null)));
      o = t({
        page: o,
        seo: p,
        appContent: g
      }), c.contentType("text/html"), c.status(200), c.send(o), m();
    }
  };

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
} = J;
const wss = new WebSocketServer({
  port: 8080
});
wss.on('connection', async (ws, req) => {
  const msg = {
    type: 'start',
    message: "Подключение к серверу успешно установлено!"
  };
  ws.send(JSON.stringify(msg));
  if (req.url === '/scraping' || req.url === '/scraping-and-analitics') {
    await shopScraping(msg => ws.send(JSON.stringify({
      type: 'msg',
      message: msg
    })));
  }
  if (req.url === '/analitics' || req.url === '/scraping-and-analitics') {
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
