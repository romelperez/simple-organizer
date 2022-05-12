import React, { ReactElement, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from '@app/views/Layout';
import { Header } from '@app/containers/Header';

const App = (): ReactElement => {
  return (
    <Layout
      header={<Header />}
    >
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

export { App };
