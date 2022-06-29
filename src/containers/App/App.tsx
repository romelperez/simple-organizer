import React, { ReactElement, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

import { MainLayout, FooterLayout, LoadingContainer } from '@app/ui';
import { Header } from '@app/containers/Header';

const App = (): ReactElement => {
  return (
    <MainLayout
      header={<Header />}
      footer={<FooterLayout />}
    >
      <Suspense
        fallback={
          <LoadingContainer>
            <LinearProgress />
          </LoadingContainer>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export { App };
