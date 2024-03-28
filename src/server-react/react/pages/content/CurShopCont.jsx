import React from 'react';

import ShopList from '../../components/ShopList';

const CurShopCont = ({ shopListParams, title }) => {
  return (
    <>
      <h1>{ title }</h1>

      <ShopList { ...shopListParams } />
    </>
  )
}

export default CurShopCont;