/* eslint-disable @typescript-eslint/promise-function-async */

import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { App } from '@app/containers/App';
import { RouteUserPrivate } from '@app/tools/RouteUserPrivate';
import { RouteUserPublicOnly } from '@app/tools/RouteUserPublicOnly';

const HomePage = React.lazy(() => import('@app/pages/HomePage').then(c => ({ default: c.HomePage })));
const BoardPage = React.lazy(() => import('@app/pages/BoardPage').then(c => ({ default: c.BoardPage })));
const SignUpPage = React.lazy(() => import('@app/pages/SignUpPage').then(c => ({ default: c.SignUpPage })));
const SignInPage = React.lazy(() => import('@app/pages/SignInPage').then(c => ({ default: c.SignInPage })));
const SignOutPage = React.lazy(() => import('@app/pages/SignOutPage').then(c => ({ default: c.SignOutPage })));
const AccountPage = React.lazy(() => import('@app/pages/AccountPage').then(c => ({ default: c.AccountPage })));

const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<RouteUserPrivate element={<HomePage />} />} />
          <Route path='boards'>
            <Route path=':boardId' element={<RouteUserPrivate element={<BoardPage />} />} />
          </Route>
          <Route path='signup' element={<RouteUserPublicOnly element={<SignUpPage />} />} />
          <Route path='signin' element={<RouteUserPublicOnly element={<SignInPage />} />} />
          <Route path='signout' element={<SignOutPage />} />
          <Route path='account' element={<RouteUserPrivate element={<AccountPage />} />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
