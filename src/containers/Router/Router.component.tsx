/* eslint-disable @typescript-eslint/promise-function-async */

import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { App } from '@app/containers/App';

const HomePage = React.lazy(() => import('@app/containers/HomePage').then(c => ({ default: c.HomePage })));
const BoardPage = React.lazy(() => import('@app/containers/BoardPage').then(c => ({ default: c.BoardPage })));
const SignUpPage = React.lazy(() => import('@app/containers/SignUpPage').then(c => ({ default: c.SignUpPage })));
const SignInPage = React.lazy(() => import('@app/containers/SignInPage').then(c => ({ default: c.SignInPage })));
const SignOutPage = React.lazy(() => import('@app/containers/SignOutPage').then(c => ({ default: c.SignOutPage })));
const SettingsPage = React.lazy(() => import('@app/containers/SettingsPage').then(c => ({ default: c.SettingsPage })));

const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='boards'>
            <Route path=':boardId' element={<BoardPage />} />
          </Route>
          <Route path='signup' element={<SignUpPage />} />
          <Route path='signin' element={<SignInPage />} />
          <Route path='signout' element={<SignOutPage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
