import React from 'react';
import { Outlet } from 'react-router-dom';
import NavMenu from './Nav';

const SharedLayout = (): any => {
  return (
    <>
      <NavMenu />
      <Outlet />
    </>
  );
};

export default SharedLayout;
