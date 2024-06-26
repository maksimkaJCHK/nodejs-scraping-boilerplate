import React, { useEffect, useState } from 'react';

import useTypeParams from '@hooks/useTypeParams.js';

import AllShopsCont from './content/AllShopsCont';
import Preload from '@components/ui/Preload';

import { loadCurCategory, stopLoad } from '@slices/catalogs.js';

const Main = () => {
  const { dispatch, useSelector, fraze } = useTypeParams();

  const [ category, setCategory ] = useState(window.category || {});

  const {
    timeLoad,
    catalogs,
    load,
    isReloadCatalog
  } = useSelector(state => state.catalogs);

  useEffect(() => {
    const isCategory = window.category !== undefined;

    if (isCategory) {
      dispatch(stopLoad());

      window.category = undefined;
    }

    if (!isCategory) {
      const category = catalogs.find(({ id }) => id === fraze);

      if (category && category.idLb && category.idCg) {
        setCategory(category);
      }

      if (!category || (category && !(category.idLb && category.idCg))) {
        dispatch(loadCurCategory(fraze));
      }
    }
  }, [fraze]);

  useEffect(() => {
    if (timeLoad) {
      const idx = catalogs.findIndex(({ id }) => id === fraze);

      if (idx !== -1) {
        setCategory(catalogs[idx]);
      };
    }
  }, [timeLoad]);

  useEffect(() => {
    if (isReloadCatalog) dispatch(loadCurCategory(fraze));
  }, [isReloadCatalog]);

  return (
    <>
      <Preload load = { load } />

      <AllShopsCont
        title = {`Товары по запросу "${ fraze }" для интернет-магазинов`}
        category = { category }
      />
    </>
  )
}

export default Main;