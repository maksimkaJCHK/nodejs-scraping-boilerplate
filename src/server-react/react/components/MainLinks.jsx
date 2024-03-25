import React from 'react';

import Link from './ui/Link';

const MainLinks = ({ title, links }) => {
  const header = title ? <h1>{ title }</h1> : null;

  const link = links && links.length
    ? <ul>
        {
          links.map(({ title, url }) => {
            {
              return url && url.length 
                ? <li>
                    <Link
                      url={'#' + url}
                      title={title || 'Заголовок не определен'}
                    />
                  </li>
                : null
            }
          })
        }
      </ul>
    : null;

  return (
    <>
      { header }
      { link }
    </>
  );
}

export default MainLinks;