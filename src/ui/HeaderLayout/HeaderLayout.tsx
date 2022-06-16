/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { ReactElement, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { Logo } from '@app/ui/Logo';
import { HeaderLayoutProps } from './HeaderLayout.types';

const HeaderLayout = (props: HeaderLayoutProps): ReactElement => {
  const { isLoading, isUserLoggedIn, user } = props;
  const hasAvatarURL = user?.avatarUrl !== undefined && user?.avatarUrl !== '';

  return (
    <AppBar
      position='sticky'
      sx={theme => ({
        mb: 4,
        a: {
          fontWeight: theme.typography.h1.fontWeight,
          color: theme.palette.background.default
        }
      })}
    >
      <Toolbar>
        <div
          style={{ flex: 1 }}
        >
          <Link to='/'>
            <Typography
              component='h1'
              variant='h1'
              sx={theme => ({
                display: 'inline-flex',
                alignItems: 'center',
                color: theme.palette.background.default,
                svg: {
                  marginRight: '0.5rem'
                }
              })}
            >
              <Logo
                css={{
                  width: '1em',
                  height: '1em'
                }}
              />
              <span>Simple Organizer</span>
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
                <Link to='/signout' title='Sign Out'>Sign Out</Link>
                <Link to='/account' title='Go to account details'>
                  {hasAvatarURL && (
                    <Avatar
                      alt={user?.displayName}
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
                <Link to='/signin' title='Sign In'>Sign In</Link>
                <Link to='/signup' title='Sign Up'>Sign Up</Link>
              </Fragment>
            )}
          </Stack>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export { HeaderLayout };
