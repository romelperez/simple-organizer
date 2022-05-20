import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserData } from '@nhost/react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

import { DataUser } from '@app/types';

const AccountPage = (): ReactElement => {
  const user = useUserData() as DataUser | null;

  if (!user) {
    return (
      <Navigate to='/signin' />
    );
  }

  return (
    <main>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Typography
          component='h1'
          variant='h2'
          sx={{
            mb: 2
          }}
        >
          Account
        </Typography>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            mb: 2
          }}
          src={user.avatarUrl}
        />
        <Typography component='p'>
          Name: <b>{user.displayName}</b>
        </Typography>
        <Typography component='p'>
          Email: <b>{user.email}</b>
        </Typography>
        <Typography component='p'>
          Account created at: <b>{user.createdAt}</b>
        </Typography>
        <Typography component='p'>
          Last updated at: <b>{user.updatedAt ?? 'No updated'}</b>
        </Typography>
      </Paper>
    </main>
  );
};

export { AccountPage };
