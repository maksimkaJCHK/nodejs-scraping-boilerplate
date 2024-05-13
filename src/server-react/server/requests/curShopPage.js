import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Wrapper from '../../react/layout/Wrapper.jsx';
import CurShopCont from '../../react/pages/content/CurShopCont.jsx';

import { readJSONFileToAnalitics } from '../../../services/fs.js';

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

export const curShopPage = ({
  bSeo,
  bPage,
  topNav,
  navParams,
  typeLayout,
  type
}) => async (req, res, next) => {
  const fraze = req.params.fraze;
  const nameUrl = `${fraze}-${type}`;
  let shop;

  if (type === 'cg') shop = 'читай-города';
  if (type === 'lb') shop = 'лабиринта';

  let page = typeLayout;

  let seo = bSeo({
    title: `Страница по запросу "${fraze}" для ${shop}`,
    description: `Описание для страницы по запросу "${fraze}" для ${shop}`
  });

  const params = await bShopParam(fraze, type);

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
      isLoad = { false }
      nameUrl = { nameUrl }
    >
      <CurShopCont
        title = { `Страница по запросу "${ fraze }" для ${shop}` }
        shopListParams = { params }
      />
    </Wrapper>
  );

  page = bPage({
    page,
    seo,
    appContent,
    js: `window.curshop = {}; window.curshop.${type} = {}; window.curshop.${type}.${fraze}=${JSON.stringify(params)}`
  });

  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}

export const curShopPagePost = (type) => async (req, res, next) => {
  const fraze = req.params.fraze;
  const params = await bShopParam(fraze, type);

  res.contentType('application/json');
  res.status(200);

  res.send(params);

  next();
}