import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import AllShopsCont from './content/AllShopsCont';
import Preload from '@components/ui/Preload';

import { loadCurCategory, addCategoryInCatalogs } from '@slices/catalogs.js';

const Main = () => {
  const [ category, setCategory ] = useState({});

  const { timeLoad, catalogs, load } = useSelector(state => state.catalogs);
  const dispatch = useDispatch();

  const { fraze } = useParams();

  useEffect(() => {
    const isCategory = window.category !== undefined;

    if (isCategory) {
      dispatch(addCategoryInCatalogs(window.category));

      window.category = undefined;
    }

    if (!isCategory) {
      const category = catalogs.find(({ id }) => id === fraze);

      if (category && category.idLb && category.idCg) {
        setCategory(category);
      }

      if (category && !(category.idLb && category.idCg)) {
        dispatch(loadCurCategory(fraze));
      }

      if (!category) {
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