import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { readJSONFileToAnalitics } from '../../../services/fs.js';

import Wrapper from '../../react/layout/Wrapper.jsx';
import AllShopsCont from '../../react/pages/content/AllShopsCont.jsx';

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

export const newFrazePage = ({
  bSeo,
  bPage,
  topNav,
  navParams,
  typeLayout
}) => async (req, res, next) => {
  const fraze = req.params.fraze;
  const nameUrl = `${fraze}-new`;

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
      isLoad = { false }
      nameUrl = { nameUrl }
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
}

export const newFrazePagePost = async (req, res, next) => {
  const fraze = req.params.fraze;

  const newCategory = await bNewItems(fraze);

  res.contentType('application/json');
  res.status(200);

  res.send(newCategory);

  next();
}