import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import MainCatalog from '@components/MainCatalog';
import MainLinks from '@components/MainLinks';
import Preload from '@components/ui/Preload';

import { loadCatalog, addCatalogs, addMainLinks } from '@slices/catalogs.js';

const Main = () => {
  const { mainLinks, catalogs, load } = useSelector(state => state.catalogs);
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

  return (
    <>
      <Preload load = { load } />

      <MainLinks
        title = "Все запросы"
        links = { mainLinks } 
      />
      <MainCatalog catalogs = { catalogs } />
    </>
  )
}

export default Main;