/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
    <AppBar
      position='sticky'
      sx={theme => ({
        marginBottom: '2rem',
        a: {
          color: theme.palette.background.default
        }
      })}
    >
      <Toolbar>
        <div
          css={{ flex: 1 }}
        >
          <Link to='/'>
            <Typography
              component='h1'
              variant='h1'
              color={theme => theme.palette.background.default}
            >
              Simple Organizer
            </Typography>
          </Link>
        </div>
        <nav>
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
          >
            {!isLoading && !!isUserLoggedIn && (
              <Fragment>
                <Link to='/signout'>Sign Out</Link>
                <Link to='/settings'>
                  {hasAvatarURL && (
                    <Avatar
                      alt='User Profile Picture'
                      src={user?.avatarUrl}
                      sx={{
                        backgroundColor: theme => theme.palette.grey[700]
                      }}
                    />
                  )}
                  {!hasAvatarURL && user?.displayName}
                </Link>
              </Fragment>
            )}
            {!isLoading && !isUserLoggedIn && (
              <Fragment>
                <Link to='/signin'>Sign In</Link>
                <Link to='/signup'>Sign Up</Link>
              </Fragment>
            )}
          </Stack>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export type { HeaderStructureProps };
export { HeaderStructure };
