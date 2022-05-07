import React, { ReactElement, Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = (): ReactElement => {
  return (
    <div>
      <header
        style={{
          marginBottom: 20,
          borderBottom: '1px solid black'
        }}
      >
        <Link to='/'>
          <h1>Simple Organizer</h1>
        </Link>
      </header>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export { Layout };
