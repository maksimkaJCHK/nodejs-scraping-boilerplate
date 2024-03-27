import React from 'react';
import ItemCh from './ItemCh.jsx';
import ItemLb from './ItemLb.jsx';

import FrazeNull from './ui/FrazeNull.jsx';

const ShopList = ({
  shop,
  title,
  id,
  type = "cg",
}) => {
  const header = title ? <h3>{ title }</h3> : null;

  return (
    <div id = { id }>
      { header }

      <div>
        Всего { shop && shop.length } товаров
      </div>

      <div className="item-wrap">
        {
          shop && shop.length
            ? type === 'cg'
              ? shop.map((params, idx) => <ItemCh { ...params } key = { idx } />)
              : shop.map((params, idx) => <ItemLb { ...params } key = { idx } />)
            : <FrazeNull />
        }
      </div>
    </div>
  );
}

export default ShopList;