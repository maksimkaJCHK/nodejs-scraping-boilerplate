import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Wrapper from '../../react/layout/Wrapper.jsx';
import PageNotFound from '../../react/pages/PageNotFound.jsx';

export const pageNotFound = ({
  bSeo,
  bPage,
  topNav,
  navParams,
  typeLayout
}) => async (req, res, next) => {
  let page = typeLayout;

  let seo = bSeo({
    title: 'Страница не найдена',
    description: 'Страница не найдена'
  });

  let appContent = ReactDOMServer.renderToString(
    <Wrapper
      topNav = { topNav }
      navParams = { navParams }
      isLoad = { false }
    >
      <PageNotFound />
    </Wrapper>
  );

  page = bPage({ page, seo, appContent });
  
  res.contentType('text/html');
  res.status(200);

  res.send(page);

  next();
}