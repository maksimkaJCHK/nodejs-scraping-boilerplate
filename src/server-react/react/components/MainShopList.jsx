import React from 'react';
import ShopList from './ShopList.jsx';
import ShopLinks from './ShopLinks.jsx';

const MainShopList = ({ id, shops, title, idCg, idLb }) => {
  return (
    <div id = { id }>
      <ShopLinks
        title = { title }
        idCg = { idCg }
        idLb = { idLb }
      />

      <ShopList
        shop = { shops.cg }
        id = { idCg }
        type = "cg"
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