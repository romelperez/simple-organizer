import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Layout } from '@app/views/Layout';
import { Home } from '@app/pages/Home';
import { Board } from '@app/pages/Board';

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
