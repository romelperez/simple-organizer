import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Header = (): ReactElement => {
  return (
    <header
      style={{
        marginBottom: 20,
        borderBottom: '1px solid black'
      }}
    >
      <Link to='/'>
        <h1>Simple Organizer</h1>
      </Link>
      <nav>
        <ul>
          <li><Link to='/signup'>Sign Up</Link></li>
          <li><Link to='/signin'>Sign In</Link></li>
          <li><Link to='/signout'>Sign Out</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
