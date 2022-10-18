import React from 'react';
import './App.scss';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const App = (): any => {
  const routes = useRoutes(false);
  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
