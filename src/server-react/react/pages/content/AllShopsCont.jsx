import React from 'react';

import MainShopList from '../../components/MainShopList';

const AllShopsCont = ({ category, title }) => {
  return (
    <>
      <h1>{ title }</h1>

      {
        Object.keys(category).length
          ? <MainShopList { ...category } />
          : null
      }
    </>
  )
}

export default AllShopsCont;