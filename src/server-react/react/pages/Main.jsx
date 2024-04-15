import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import MainCont from './content/MainCont';
import Preload from '@components/ui/Preload';

import { loadCatalog, addCatalogs, addMainLinks } from '@slices/catalogs.js';

const Main = () => {
  const {
    mainLinks,
    catalogs,
    load,
    isReloadCatalog
  } = useSelector(state => state.catalogs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.catalogs !== undefined && window.mainLinks !== undefined) {
      dispatch(addCatalogs(window.catalogs));
      dispatch(addMainLinks(window.mainLinks));
    }

    if (window.catalogs === undefined && !mainLinks.length) {
      dispatch(loadCatalog());
    }
  }, []);

  useEffect(() => {
    if (isReloadCatalog) {
      dispatch(loadCatalog());
    }
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