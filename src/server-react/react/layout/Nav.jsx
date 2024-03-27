import React from 'react';
import Link from '../components/ui/Link';

import './_nav.scss';

const Nav = ({ link }) => {
  return (
    <nav>
      {
        link.map((item, idx) => {
          return <Link
            { ...item }
            key = { idx }
          />
        })
      }
    </nav>
  )
}

export default Nav;