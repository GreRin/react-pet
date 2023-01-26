import React from 'react';
import './SharedLayout.scss';
import { Outlet } from 'react-router-dom';
import NavMenu from './nav-component/Nav';

const SharedLayout = (): any => {
  return (
    <div className="position-relative w-100 h-100">
      <NavMenu />
      <div className="outlet-body">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;
