import React from 'react';
import { NavLink } from "react-router-dom";

const LinkRouter = ({ url, title }) => {
  return (
    <NavLink to = { url }>
      { title }
    </NavLink>
  )
}

export default LinkRouter;