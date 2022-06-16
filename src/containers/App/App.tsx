import React, { ReactElement, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

import { MainLayout } from '@app/ui/MainLayout';
import { Header } from '@app/containers/Header';

const App = (): ReactElement => {
  return (
    <MainLayout
      header={<Header />}
    >
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export { App };
