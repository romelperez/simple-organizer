/* eslint-disable @typescript-eslint/promise-function-async */

import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '@app/views/Layout';

const Home = React.lazy(() => import('@app/pages/Home').then(c => ({ default: c.Home })));
const Board = React.lazy(() => import('@app/pages/Board').then(c => ({ default: c.Board })));

const Router = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='boards'>
            <Route index element={<Navigate to='/' replace />} />
            <Route path=':boardId' element={<Board />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
