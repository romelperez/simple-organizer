import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticated, useSignOut } from '@nhost/react';
import LinearProgress from '@mui/material/LinearProgress';

const SignOutPage = (): ReactElement => {
  const isAuthenticated = useAuthenticated();
  const { signOut } = useSignOut();

  useEffect(() => {
    signOut().finally(null);
  }, []);

  if (isAuthenticated) {
    return <LinearProgress />;
  }

  return <Navigate to='/signin' />;
};

export { SignOutPage };
