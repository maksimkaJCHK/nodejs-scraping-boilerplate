import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { mainData } from '../model/main.js';

import Wrapper from '../../react/layout/Wrapper.jsx';
import MainCont from '../../react/pages/content/MainCont.jsx';

export const mainPage = ({
  bSeo,
  bPage,
  topNav,
  navParams,
  typeLayout
}) => async (req, res, next) => {
  let page = typeLayout;
  const nameUrl = 'main';

  let seo = bSeo({
    title: "Все запросы",
    description: 'Описание для главной страницы, тут все запросы'
  });

  const { mainLinks, catalogs } = await mainData();

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
      nameUrl = { nameUrl }
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
}

export const mainPagePost = async (req, res, next) => {
  const { mainLinks, catalogs } = await mainData();

  res.contentType('application/json');
  res.status(200);

  res.send({
    mainLinks,
    catalogs
  });

  next();
}