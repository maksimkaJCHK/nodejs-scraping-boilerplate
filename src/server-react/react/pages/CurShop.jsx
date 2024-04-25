import React, { useState, useEffect } from 'react';

import useTypeParams from '@hooks/useTypeParams.js';

import { addShopInCatalogs, loadCurShop } from '@slices/catalogs';

import CurShopCont from './content/CurShopCont';
import Preload from '@components/ui/Preload';

const CurShop = ({ nameShop }) => {
  const { dispatch, useSelector, fraze } = useTypeParams();

  const {
    timeLoad,
    catalogs,
    load,
    isReloadCatalog
  } = useSelector(state => state.catalogs);

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
        const noGetReq = (nameShop === 'lb' && catalogs[fIdx].idLb) || (nameShop === 'cg' && catalogs[fIdx].idCg);

        if (noGetReq) {
          const params = {
            shop: catalogs[fIdx]['shops'][nameShop],
            id: fraze,
            type: nameShop,
            title: `Товары для ${ (nameShop === 'cg') ? 'читай-города' : 'лабиринта'} по запросу ${fraze}`
          }
  
          changeShopListParams(params);
        }

        if (!noGetReq) {
          dispatch(loadCurShop({
            type: nameShop,
            fraze,
          }));
        }
      }

      if (fIdx === -1) {
        dispatch(loadCurShop({
          type: nameShop,
          fraze,
        }));
      }
    }
  }, [ nameShop, fraze, timeLoad ]);

  useEffect(() => {
    if (isReloadCatalog) {
      dispatch(loadCurShop({
        type: nameShop,
        fraze,
      }));
    }
  }, [isReloadCatalog]);

  return (
    <>
      <Preload load = { load } />

      <CurShopCont
        title = { `Страница по запросу "${ fraze }" для ${ nameShop === 'cg' ? "читай-города" : "лабиринта" }` }
        shopListParams = { shopListParams }
      />
    </>
  )
}

export default CurShop;