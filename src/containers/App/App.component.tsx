import React, { ReactElement, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const App = (): ReactElement => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Outlet />
    </Suspense>
  );
};

export { App };
