import React from 'react';
import { Outlet } from 'react-router-dom';
import NavMenu from './nav-component/Nav';

const SharedLayout = (): any => {
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
};

export default SharedLayout;
