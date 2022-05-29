import React, { ReactElement, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

import { Layout } from '@app/ui/Layout';
import { Header } from '@app/containers/Header';

const App = (): ReactElement => {
  return (
    <Layout
      header={<Header />}
    >
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export { App };
