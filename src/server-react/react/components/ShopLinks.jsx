import React from 'react';

import Link from './ui/Link';

const ShopLinks = ({ title, idCh, idLb }) => {
  const header = title ? <h2>{ title }</h2> : null;

  const link = (idCh || idLb)
    ? <ul>
        { idCh && <li>
            <Link
              url = {'#' + idCh}
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