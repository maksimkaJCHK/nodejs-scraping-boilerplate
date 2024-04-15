import React from 'react';

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { setIsReloadCatalog } from '@slices/catalogs';
import { setIsReloadNewCatalog } from '@slices/new-catalogs';

import { topNav, navParams } from '../model/nav';

import Nav from '../layout/Nav';
import Params from '../layout/Params';
import Button from '../components/ui/Button';

const Root = () => {
  const { isReloadCatalogBtn } = useSelector(state => state.catalogs);
  const { isReloadNewCatalogBtn } = useSelector(state => state.newCatalogs);
  const dispatch = useDispatch();

  return (
    <>
      <Nav link = { topNav } />

      <Params { ...navParams } >
        { isReloadCatalogBtn
          ? <Button onClick = { () => dispatch(setIsReloadCatalog())}>
              Обновить товары
            </Button>
          : null
        }
        {
          isReloadNewCatalogBtn
            ? <Button onClick = { () => dispatch(setIsReloadNewCatalog())}>
                Обновить новые товары
              </Button>
            : null
        }
      </Params>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root;