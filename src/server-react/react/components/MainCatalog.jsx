import React from 'react';
import MainShopList from './MainShopList.jsx';

const MainCatalog = ({ catalogs }) => {
  return (
    <>
      {
        catalogs.map((shopList, idx) => {
          return <MainShopList
            { ...shopList }
            key = { idx }
          />
        })
      }
    </>
  )

}

export default MainCatalog;