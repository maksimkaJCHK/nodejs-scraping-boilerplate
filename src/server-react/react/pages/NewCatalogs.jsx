import React, { useEffect } from 'react';

import useTypeParams from '@hooks/useTypeParams.js';

import MainCont from './content/MainCont';
import Preload from '@components/ui/Preload';

import {
  loadCatalog,
  stopLoad
} from '@slices/new-catalogs.js';

const Main = () => {
  const { dispatch, useSelector } = useTypeParams();

  const {
    mainLinks,
    catalogs,
    load,
    isReloadNewCatalog
  } = useSelector(state => state.newCatalogs);

  useEffect(() => {
    if (window.newCatalogs !== undefined && window.newMainLinks !== undefined) {
      dispatch(stopLoad());
    }

    if (window.newCatalogs === undefined && !mainLinks.length) {
      dispatch(loadCatalog());
    }
  }, []);

  useEffect(() => {
    if (isReloadNewCatalog) {
      dispatch(loadCatalog());
    }
  }, [isReloadNewCatalog]);

  return (
    <>
      <Preload load = { load } />

      <MainCont
        title = "Новые товары по всем запросам"
        mainLinks = { mainLinks }
        catalogs = { catalogs }
      />
    </>
  )
}

export default Main;