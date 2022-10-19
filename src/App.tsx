import React from 'react';
import './App.scss';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/auth.hook';

const App = (): any => {
  const { token, login, logout, userId } = useAuth();
  const routes = useRoutes(false);
  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
