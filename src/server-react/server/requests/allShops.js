import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { bAllShopsParam } from '../services/services.js';

import Wrapper from '../../react/layout/Wrapper.jsx';
import AllShopsCont from '../../react/pages/content/AllShopsCont.jsx';

export const allShopsPage = ({
  bSeo,
  bPage,
  topNav,
  navParams,
  typeLayout
}) => async (req, res, next) => {
  const fraze = req.params.fraze;
  const nameUrl = fraze;

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
      isLoad = { false }
      nameUrl = { nameUrl }
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
}

export const allShopsPagePost = async (req, res, next) => {
  const fraze = req.params.fraze;

  const category = await bAllShopsParam(fraze);

  res.contentType('application/json');
  res.status(200);
  res.send(category);

  next();
}