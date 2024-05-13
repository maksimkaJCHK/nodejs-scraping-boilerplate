import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { newData } from '../model/pages.js';

import Wrapper from '../../react/layout/Wrapper.jsx';
import MainCont from '../../react/pages/content/MainCont.jsx';

export const newItemsPage = ({
  bSeo,
  bPage,
  topNav,
  navParams,
  typeLayout
}) => async (req, res, next) => {
  let page = typeLayout;
  const nameUrl = 'new';

  let seo = bSeo({
    title: "Все новые товары для магазинов",
    description: 'Все новые товары для магазинов'
  });

  const { mainLinks, catalogs } = await newData();

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
      nameUrl = { nameUrl }
    >
      <MainCont
        title = "Новые товары по всем запросам"
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
}

export const newItemsPagePost = async (req, res, next) => {
  const { mainLinks, catalogs } = await newData();

  res.contentType('application/json');
  res.status(200);

  res.send({
    mainLinks,
    catalogs
  });

  next();
}