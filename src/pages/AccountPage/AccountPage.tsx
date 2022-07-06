import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserData } from '@nhost/react';
import formatDate from 'date-fns/format';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
    : 'No updates';

  return (
    <Container component='main' maxWidth='xs'>
      <Box sx={{ mb: 2 }}>
        <Typography
          component='h1'
          variant='h2'
          sx={{ mb: 2 }}
        >
          Account
        </Typography>
        <Avatar
          sx={theme => ({
            width: 80,
            height: 80,
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
          Account created: <b>{formatDate(parseServerDate(user.createdAt), 'PPpp')}</b>
        </Typography>
        <Typography>
          Last updated: <b>{updatedAt}</b>
        </Typography>
      </Box>
      <Stack direction='row' spacing={2}>
        <Button
          variant='outlined'
          title='Update account name and profile picture'
          disabled
        >
          Update Details
        </Button>
        <Button
          variant='outlined'
          title='Change account password'
          disabled
        >
          Change Password
        </Button>
      </Stack>
    </Container>
  );
};

export { AccountPage };
