import React, { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useStore } from '@app/containers/Store';

const SignOutPage = (): ReactElement => {
  const user = useStore(state => state.user);
  const signOut = useStore(state => state.signOut);

  useEffect(() => {
    signOut().finally(null);
  }, []);

  if (user) {
    return (
      <p>Signing out...</p>
    );
  }

  return (
    <Navigate to='/signin' />
  );
};

export { SignOutPage };
