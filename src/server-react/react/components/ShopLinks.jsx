import React from 'react';

import Link from './ui/Link';

const ShopLinks = ({ title, idCg, idLb }) => {
  const header = title ? <h2>{ title }</h2> : null;

  const link = (idCg || idLb)
    ? <ul>
        { idCg && <li>
            <Link
              url = {'#' + idCg}
              title = "Товары на читай-городе"
            />
          </li> }
        { idLb && <li>
            <Link
              url = {'#' + idLb}
              title = "Товары на лабиринте"
            />
          </li> }
      </ul>
    : null;

  return (
    <>
      { header }
      { link }
    </>
  );
}

export default ShopLinks;