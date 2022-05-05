import React, { ReactElement } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = (): ReactElement => {
  return (
    <div>
      <header>
        <Link to='/'>
          <h1>Simple Organizer</h1>
        </Link>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export { Layout };
