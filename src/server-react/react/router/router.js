import React from 'react';

import { createBrowserRouter } from "react-router-dom";

import Root from '../layout/Root';
import PageNotFound from '../layout/PageNotFound';
// Конкретные страницы
import Main from '../pages/Main';
import AllShops from '../pages/AllShops';
import CurShop from '../pages/CurShop';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/all-shops/:fraze",
        element: <AllShops />,
      },
      {
        path: "/cg/:fraze",
        element: <CurShop nameShop = "cg" />,
      },
      {
        path: "/lb/:fraze",
        element: <CurShop nameShop = "lb" />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;