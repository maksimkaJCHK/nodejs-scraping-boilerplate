import React, { useEffect } from 'react';

import useTypeParams from '@hooks/useTypeParams.js';

import MainCont from './content/MainCont';
import Preload from '@components/ui/Preload';

import { loadCatalog, stopLoad } from '@slices/catalogs.js';

const Main = () => {
  const { dispatch, useSelector } = useTypeParams();

  const {
    mainLinks,
    catalogs,
    load,
    isReloadCatalog
  } = useSelector(state => state.catalogs);

  useEffect(() => {
    if (window.catalogs !== undefined && window.mainLinks !== undefined) {
      dispatch(stopLoad());
    }

    if (window.catalogs === undefined && !mainLinks.length) {
      dispatch(loadCatalog());
    }
  }, []);

  useEffect(() => {
    if (isReloadCatalog) dispatch(loadCatalog());
  }, [isReloadCatalog]);

  return (
    <>
      <Preload load = { load } />

      <MainCont
        title = "Все товары по всем запросам"
        mainLinks = { mainLinks }
        catalogs = { catalogs }
      />
    </>
  )
}

export default Main;