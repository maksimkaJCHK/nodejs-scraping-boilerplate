import React from 'react';

const ItemCh = ({
  url,
  picture,
  title,
  bookAuthors,
  description,
  price,
  publisher,
  yearPublishing,
  pages,
}) => {
  const markup = { __html: description };

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
          <b>Автор:</b> { bookAuthors.map((author) => <>{ author }</>) }
        </p>
        <p dangerouslySetInnerHTML = { markup }></p>
        <p>
          <b>Страниц:</b> { pages }
        </p>
        <p>
          <b>Опубликовано:</b> { yearPublishing || '-'}
        </p>
        <p>
          <b>Издательство:</b> { publisher }
        </p>
        <p>
          <b>Цена:</b> { price } руб
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

export default ItemCh;