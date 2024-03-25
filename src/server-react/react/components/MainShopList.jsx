import React from 'react';
import ShopList from './ShopList.jsx';
import ShopLinks from './ShopLinks.jsx';

const MainShopList = ({ id, shops, title, idCh, idLb }) => {
  return (
    <div id = { id }>
      <ShopLinks
        title = { title }
        idCh = { idCh }
        idLb = { idLb }
      />

      <ShopList
        shop = { shops.ch }
        id = { idCh }
        type = "ch"
        title = "Товары для читай-города"
      />

      <ShopList
        shop = { shops.lb }
        id = { idLb }
        type = "lb"
        title = "Товары для лабиринта"
      />
    </div>
  );
}

export default MainShopList;