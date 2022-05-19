import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { DataUser } from '@app/types';

interface HeaderStructureProps {
  isLoading?: boolean
  isUserLoggedIn?: boolean
  user?: DataUser | null
}

const HeaderStructure = (props: HeaderStructureProps): ReactElement => {
  const { isLoading, isUserLoggedIn, user } = props;
  const hasAvatarURL = user?.avatarUrl !== undefined && user?.avatarUrl !== '';

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
          {!isLoading && !!isUserLoggedIn && (
            <>
              <li><Link to='/signout'>Sign Out</Link></li>
              <li>
                <Link to='/settings'>
                  {hasAvatarURL && (
                    <img
                      style={{
                        display: 'inline-block',
                        width: 30,
                        height: 30
                      }}
                      alt='User Profile Picture'
                      src={user?.avatarUrl}
                    />
                  )}
                  {!hasAvatarURL && (
                    <span>{user?.displayName}</span>
                  )}
                </Link>
              </li>
            </>
          )}
          {!isLoading && !isUserLoggedIn && (
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
