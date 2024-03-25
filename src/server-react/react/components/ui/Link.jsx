import React from 'react';

const Link = ({ url, title }) => {
  return <a href={ url }>{ title }</a>;
}

export default Link;