import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticated, useSignOut } from '@nhost/react';
import { useSWRConfig } from 'swr';
import LinearProgress from '@mui/material/LinearProgress';

import { getSelectBoardsWithDetailsKey } from '@app/api';

const SignOutPage = (): ReactElement => {
  const isAuthenticated = useAuthenticated();
  const { signOut } = useSignOut();
  const swr = useSWRConfig();

  useEffect(() => {
    signOut()
      // Clean list of boards so if the user re-signs-in, the list re-loaded.
      .then(async () => await swr.mutate(getSelectBoardsWithDetailsKey(), null))
      .finally(null);
  }, []);

  if (isAuthenticated) {
    return <LinearProgress />;
  }

  return <Navigate to='/signin' />;
};

export { SignOutPage };
