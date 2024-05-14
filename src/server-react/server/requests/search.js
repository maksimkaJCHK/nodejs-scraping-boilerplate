import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { bAllShopsParam } from '../services/services.js';
import { shopScrapingForFraze } from '../../../crawlers/shopScrapingForFraze.js';

import Wrapper from '../../react/layout/Wrapper.jsx';
import Search from '../../react/pages/ssr/Search.jsx';

export const searchPage = ({
  bSeo,
  bPage,
  topNav,
  navParams,
  typeLayout
}) => async (req, res, next) => {
  let page = typeLayout;
  const nameUrl = 'search';

  let seo = bSeo({
    title: 'Поиск',
    description: 'Описание для страницы поиска'
  });

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
      isLoad = { false }
      nameUrl = { nameUrl }
    >
      <Search
        load = { false }
        search = ""
        disabled = { true} />
    </Wrapper>
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
}

export const searchPagePost = async (req, res, next) => {
  const fraze = req.params.fraze;

  await shopScrapingForFraze(fraze);
  const category = await bAllShopsParam(fraze);

  res.contentType('application/json');
  res.status(200);

  res.send(category);

  next();
}