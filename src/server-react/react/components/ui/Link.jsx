import React from 'react';

const Link = ({ url, title, name, nameUrl, ...param }) => {
  let curPage = { className: ''};

  if (nameUrl) {
    curPage = nameUrl === name && { className: 'active', ['aria-current']: 'page' }
  }

  return (
    <a
      href = { url }
      { ...param }
      { ...curPage }
    >
      { title }
    </a>
  );
}

export default Link;