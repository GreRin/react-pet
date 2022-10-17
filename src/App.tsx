import React from 'react';
import './App.scss';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = (): any => {
  const routes = useRoutes(false);
  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
