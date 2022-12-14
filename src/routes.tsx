import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LinksPage } from './components/links-component/LinksPage';
import { AuthPage } from './components/auth-form/AuthPage';
import { FavouritesPage } from './components/favourites/FavouritesPage';
import { DetailPage } from './components/detail-page/DetailPage';
import SharedLayout from './components/SharedLayout';
import Home from './components/home-page/HomePage';
import { PdfPage } from './components/pdf-page/PdfPage';
import { ErrorPage } from './components/ErrorPage';

export const useRoutes = (isAuthenticated: any): any => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/pdf" element={<PdfPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/redirect" element={<Navigate to="/" />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/redirect" element={<Navigate to="/" />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
