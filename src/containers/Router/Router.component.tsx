/* eslint-disable @typescript-eslint/promise-function-async */

import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { App } from '@app/containers/App';

const Home = React.lazy(() => import('@app/pages/Home').then(c => ({ default: c.Home })));
const Board = React.lazy(() => import('@app/pages/Board').then(c => ({ default: c.Board })));
const SignUp = React.lazy(() => import('@app/pages/SignUp').then(c => ({ default: c.SignUp })));
const SignIn = React.lazy(() => import('@app/pages/SignIn').then(c => ({ default: c.SignIn })));
const SignOut = React.lazy(() => import('@app/pages/SignOut').then(c => ({ default: c.SignOut })));
const Settings = React.lazy(() => import('@app/pages/Settings').then(c => ({ default: c.Settings })));

const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='boards'>
            <Route path=':boardId' element={<Board />} />
          </Route>
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signout' element={<SignOut />} />
          <Route path='settings' element={<Settings />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
