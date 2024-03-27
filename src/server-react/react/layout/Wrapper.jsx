import React from 'react';

import Nav from './Nav';
import Params from './Params';
import Preload from '../components/ui/Preload';

const Wrapper = ({ topNav, navParams, children, isLoad = true }) => {
  return (
    <>
      <Nav link = { topNav } />
      <Params { ...navParams } />

      <main>
        <Preload load = { isLoad } />
        { children }
      </main>
    </>
  )
}

export default Wrapper;