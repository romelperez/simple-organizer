import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { DataUser } from '@app/types';

interface HeaderStructureProps {
  isUserLoggedIn?: boolean
  user?: DataUser | null
}

const HeaderStructure = (props: HeaderStructureProps): ReactElement => {
  const { isUserLoggedIn, user } = props;

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
          {!!isUserLoggedIn && (
            <>
              <li><Link to='/signout'>Sign Out</Link></li>
              <li>
                <Link to='/settings'>
                  <img
                    style={{
                      display: 'inline-block',
                      width: 30,
                      height: 30
                    }}
                    alt='User Profile Picture'
                    src={user?.avatarUrl ?? 'EMPTY'}
                  />
                  Settings
                </Link>
              </li>
            </>
          )}
          {!isUserLoggedIn && (
            <>
              <li><Link to='/signin'>Sign In</Link></li>
              <li><Link to='/signup'>Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export type { HeaderStructureProps };
export { HeaderStructure };
