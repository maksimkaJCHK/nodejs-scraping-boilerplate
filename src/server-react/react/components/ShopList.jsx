import React from 'react';
import ItemCh from './ItemCh.jsx';
import ItemLb from './ItemLb.jsx';

import FrazeNull from './ui/FrazeNull.jsx';

const ShopList = ({
  shop,
  title,
  id,
  type = "ch",
}) => {
  const header = title ? <h3>{ title }</h3> : null;

  return (
    <div id = { id }>
      { header }

      <div>
        Всего { shop.length } товаров
      </div>

      <div className="item-wrap">
        {
          shop.length
            ? type === 'ch'
              ? shop.map((params) => <ItemCh { ...params } />)
              : shop.map((params) => <ItemLb { ...params } />)
            : <FrazeNull />
        }
      </div>
    </div>
  );
}

export default ShopList;