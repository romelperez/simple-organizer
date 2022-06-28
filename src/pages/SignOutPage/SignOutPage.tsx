import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticated, useSignOut } from '@nhost/react';

const SignOutPage = (): ReactElement => {
  const isAuthenticated = useAuthenticated();
  const { signOut } = useSignOut();

  useEffect(() => {
    signOut().finally(null);
  }, []);

  if (isAuthenticated) {
    return (
      <p>Signing out...</p>
    );
  }

  return (
    <Navigate to='/signin' />
  );
};

export { SignOutPage };
