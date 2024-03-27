import React from 'react';

import { Outlet } from "react-router-dom";

import { topNav, navParams } from '../model/nav';

import Nav from '../layout/Nav';
import Params from '../layout/Params';

const Root = () => {
  return (
    <>
      <Nav link = { topNav } />
      <Params { ...navParams } />

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root;