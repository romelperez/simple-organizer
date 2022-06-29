/** @jsxImportSource @emotion/react */
import { jsx, useTheme } from '@emotion/react';
import { ReactElement, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import IconLogin from '@mui/icons-material/Login';
import IconLogout from '@mui/icons-material/Logout';
import IconPersonAdd from '@mui/icons-material/PersonAdd';
import IconInvertColors from '@mui/icons-material/InvertColors';

import { Logo } from '@app/ui/Logo';
import { HeaderLayoutProps } from './HeaderLayout.types';

const HeaderLayout = (props: HeaderLayoutProps): ReactElement => {
  const { isLoading, isUserLoggedIn, user, onToggleColorScheme } = props;
  const hasAvatarURL = user?.avatarUrl !== undefined && user?.avatarUrl !== '';

  const theme = useTheme();

  const btnSpacing = theme.spacing(1);
  const bgColor = theme.palette.primary.main;
  const fontColor = theme.palette.primary.contrastText;

  return (
    <AppBar
      position='sticky'
      sx={{ mb: 4, color: bgColor }}
    >
      <Toolbar>
        <div
          style={{ flex: 1 }}
        >
          <Link to='/'>
            <Typography
              component='h1'
              variant='h1'
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                color: fontColor
              }}
            >
              <Logo
                css={{
                  width: '1.1em',
                  height: '1.1em'
                }}
              />
              <span
                css={theme => ({
                  marginLeft: '0.5em',
                  [theme.breakpoints.down('sm')]: {
                    display: 'none'
                  }
                })}
              >
                Simple Organizer
              </span>
            </Typography>
          </Link>
        </div>
        <nav>
          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
          >
            <IconButton
              css={{ padding: btnSpacing, color: fontColor }}
              title='Toogle color scheme'
              onClick={onToggleColorScheme}
            >
              <IconInvertColors />
            </IconButton>

            {!isLoading && !!isUserLoggedIn && (
              <Fragment>
                <Link to='/signout' title='Sign Out'>
                  <IconButton css={{ padding: btnSpacing, color: fontColor }}>
                    <IconLogout sx={{ verticalAlign: 'middle' }} />
                  </IconButton>
                </Link>

                <Link to='/account' title='Go to account details'>
                  {hasAvatarURL && (
                    <Avatar
                      alt={user?.displayName}
                      src={user?.avatarUrl}
                      sx={{ backgroundColor: theme => theme.palette.grey[700] }}
                    />
                  )}
                  {!hasAvatarURL && user?.displayName}
                </Link>
              </Fragment>
            )}

            {!isLoading && !isUserLoggedIn && (
              <Fragment>
                <Link to='/signin' title='Sign In'>
                  <IconButton css={{ padding: btnSpacing, color: fontColor }}>
                    <IconLogin sx={{ verticalAlign: 'middle' }} />
                  </IconButton>
                </Link>

                <Link to='/signup' title='Sign Up'>
                  <IconButton css={{ padding: btnSpacing, color: fontColor }}>
                    <IconPersonAdd sx={{ verticalAlign: 'middle' }} />
                  </IconButton>
                </Link>
              </Fragment>
            )}
          </Stack>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export { HeaderLayout };
