import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LinksPage } from './components/LinksPage';
import { AuthPage } from './components/auth-form/AuthPage';
import { CreatePage } from './components/CreatePage';
import { DetailPage } from './components/DetailPage';

export const useRoutes = (isAuthenticated: any): any => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
};
