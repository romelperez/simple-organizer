import React, { ReactNode, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticationStatus } from '@nhost/react';

interface RouteUserPrivateProps {
  element: ReactNode
}

const RouteUserPrivate = (props: RouteUserPrivateProps): ReactElement => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' />;
  }

  return <>{props.element}</>;
};

export type { RouteUserPrivateProps };
export { RouteUserPrivate };