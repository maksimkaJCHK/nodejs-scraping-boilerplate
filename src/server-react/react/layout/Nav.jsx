import React from 'react';
import Link from '../components/ui/Link';

import './_nav.scss';

const Nav = ({ link, nameUrl }) => {
  return (
    <nav>
      {
        link.map((item, idx) => {
          return <Link
            { ...item }
            key = { idx }
            nameUrl = { nameUrl }
          />
        })
      }
    </nav>
  )
}

export default Nav;