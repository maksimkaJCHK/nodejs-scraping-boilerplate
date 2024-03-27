import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addShopInCatalogs, loadCurShop } from '@slices/catalogs';

import ShopList from '@components/ShopList'
import Preload from '@components/ui/Preload';

const CurShop = ({ nameShop }) => {
  const { timeLoad, catalogs, load } = useSelector(state => state.catalogs);
  const dispatch = useDispatch();

  const { fraze } = useParams();

  const [shopListParams, changeShopListParams] = useState({});
 
  useEffect(() => {
    let isCurShop = false;

    if (window.curshop && window.curshop[nameShop]) {
      isCurShop = window?.curshop[nameShop][fraze] !== undefined;
    }

    if (isCurShop) {
      dispatch(addShopInCatalogs(window.curshop[nameShop][fraze]));

      window.curshop[nameShop][fraze] = undefined;
    }

    if (!isCurShop) {
      const fIdx = catalogs.findIndex(({ id }) => id === fraze);

      if (fIdx !== -1) {
        const params = {
          shop: catalogs[fIdx]['shops'][nameShop],
          id: fraze,
          type: nameShop,
          title: `Товары для ${ (nameShop === 'cg') ? 'читай-города' : 'лабиринта'} по запросу ${fraze}`
        }

        changeShopListParams(params);
      }

      if (fIdx === -1) {
        dispatch(loadCurShop({ fraze, type: nameShop }));
      }
    }
  }, [ nameShop, fraze, timeLoad ]);

  return (
    <>
      <Preload load = { load } />

      <h1>Страница по запросу "{ fraze }" для { nameShop === 'cg'
        ? 'читай-города'
        : 'лабиринта'
      }</h1>

      <ShopList { ...shopListParams } />
    </>
  )
}

export default CurShop;