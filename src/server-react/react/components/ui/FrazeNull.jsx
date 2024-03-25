import React from 'react';

const FrazeNull = ({ text = "Нет товаров для отображения" }) => {
  return (
    <p className="fraze-null">
      <b>{ text }</b>
    </p>
  );
}

export default FrazeNull;