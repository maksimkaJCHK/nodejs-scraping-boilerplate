import React from 'react';

import { createBrowserRouter } from "react-router-dom";

import Root from '@layout/Root';
import PageNotFound from '@pages/PageNotFound';
// Конкретные страницы
import Main from '@pages/Main';
import AllShops from '@pages/AllShops';
import CurShop from '@pages/CurShop';
import NewCatalogs from '@pages/NewCatalogs';
import NewAllShops from "@pages/NewAllShops.jsx";
import Search from "@pages/Search.jsx";

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
        path: "/new",
        element: <NewCatalogs />,
      },
      {
        path: "/new/:fraze",
        element: <NewAllShops />,
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;