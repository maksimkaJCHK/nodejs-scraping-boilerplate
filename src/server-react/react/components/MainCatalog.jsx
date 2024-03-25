import React from 'react';
import MainShopList from './MainShopList.jsx';

const MainCatalog = ({ catalogs }) => {
  return (
    <>
      {
        catalogs.map((shopList) => {
          return <MainShopList
            { ...shopList }
            key = { shopList.id }
          />
        })
      }
    </>
  )

}

export default MainCatalog;