import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import MainCont from './content/MainCont';
import Preload from '@components/ui/Preload';

import {
  loadCatalog,
  addCatalogs,
  addMainLinks,

} from '@slices/new-catalogs.js';

const Main = () => {
  const {
    mainLinks,
    catalogs,
    load,
    isReloadNewCatalog
  } = useSelector(state => state.newCatalogs);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.newCatalogs !== undefined && window.newMainLinks !== undefined) {
      dispatch(addCatalogs(window.newCatalogs));
      dispatch(addMainLinks(window.newMainLinks));
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