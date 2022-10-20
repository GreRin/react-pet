import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes';

const App = (): any => {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
