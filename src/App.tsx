import React, { useRef } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';

const App = (): any => {
  const { token, login, logout, userId, messageData, statusData } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated, messageData, statusData }}>
        <BrowserRouter>{routes}</BrowserRouter>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
