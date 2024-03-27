import React from 'react';

import './_frazeNull.scss';

const FrazeNull = ({ text = "Нет товаров для отображения" }) => {
  return (
    <p className="fraze-null">
      <b>{ text }</b>
    </p>
  );
}

export default FrazeNull;