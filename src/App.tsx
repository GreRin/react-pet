import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { useRoutes } from './routes';
import { Provider } from 'react-redux';
import { store } from './store';
import { toast, ToastContainer } from 'react-toastify';

const App = (): any => {
  const { token, login, logout, userId, messageData, statusData } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    if (statusData === 200 || statusData === 201) {
      toast.success(messageData, { position: 'bottom-right' });
    } else {
      toast.error(messageData, { position: 'bottom-right' });
    }
  });

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated, messageData, statusData }}>
        <BrowserRouter>{routes}</BrowserRouter>
      </AuthContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
};

export default App;
