import React from 'react';

import Nav from './Nav';
import Params from './Params';
import Preload from '../components/ui/Preload';

const Wrapper = ({
    topNav,
    navParams,
    children,
    nameUrl,
    isLoad = true
  }) => {
  return (
    <>
      <Nav
        link = { topNav }
        nameUrl = { nameUrl }
      />
      <Params
        { ...navParams }
        nameUrl = { nameUrl }
      />

      <main>
        <Preload load = { isLoad } />

        { children }
      </main>
    </>
  )
}

export default Wrapper;