import React from 'react';

import MainCatalog from '../../components/MainCatalog';
import MainLinks from '../../components/MainLinks';

const MainCont = ({ mainLinks, title, catalogs }) => {
  return (
    <>
      <MainLinks
        title = { title }
        links = { mainLinks } 
      />
      <MainCatalog catalogs = { catalogs } />
    </>
  )
}

export default MainCont;