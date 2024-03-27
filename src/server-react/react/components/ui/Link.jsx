import React from 'react';

const Link = ({ url, title, ...param }) => {
  return <a href={ url } { ...param }>{ title }</a>;
}

export default Link;