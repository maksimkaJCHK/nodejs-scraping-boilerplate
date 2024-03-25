import React from 'react';

const ItemLb = ({
  url,
  picture,
  title,
  description,
  publisher,
  price,
}) => {
  return (
    <div className="item">
      <a
        href = { url }
        className = "item-img"
        target = "_blank"
      >
        {
          picture ? <img src = { picture } /> : 'У товара нет картинки'
        }
      </a>
      <div className="item-description">
        <h3>
          <a
            href = { url }
            target="_blank"
          >
            { title }
          </a>
        </h3>
        <p>
          <b>Издательство:</b> { publisher }
        </p>
        <p>
          <b>Цена:</b> { price }
        </p>
        <div className="item-link">
          <a
            href = { url }
            target="_blank"
          >
            Посмотреть товар
          </a>
        </div>
      </div>
    </div>
  );
}

export default ItemLb;