import React from 'react';
import Link from '../components/ui/Link';

const Nav = ({ link }) => {
  return (
    <nav>
      {
        link.map(({ url, title }) => {
          return <Link url = { url } title = { title } />
        })
      }
    </nav>
  )
}

export default Nav;