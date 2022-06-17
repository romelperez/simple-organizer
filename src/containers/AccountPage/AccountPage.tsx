import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserData } from '@nhost/react';
import formatDate from 'date-fns/format';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import { DataUser } from '@app/types';
import { parseServerDate } from '@app/tools/date';

const AccountPage = (): ReactElement => {
  const user = useUserData() as DataUser | null;

  if (!user) {
    return (
      <Navigate to='/signin' />
    );
  }

  const updatedAt = user.updatedAt
    ? formatDate(parseServerDate(user.updatedAt), 'PPpp')
    : 'No updated';

  return (
    <main>
      <Typography
        component='h1'
        variant='h2'
        sx={{ mb: 2 }}
      >
        Account
      </Typography>
      <Avatar
        sx={theme => ({
          width: 120,
          height: 120,
          mb: 2,
          backgroundColor: theme.palette.grey[700]
        })}
        src={user.avatarUrl}
      />
      <Typography>
        Name: <b>{user.displayName}</b>
      </Typography>
      <Typography>
        Email: <b>{user.email}</b>
      </Typography>
      <Typography>
        Account created at: <b>{formatDate(parseServerDate(user.createdAt), 'PPpp')}</b>
      </Typography>
      <Typography>
        Last updated at: <b>{updatedAt}</b>
      </Typography>
    </main>
  );
};

export { AccountPage };
