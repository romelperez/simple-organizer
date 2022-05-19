import React, { ReactNode, ReactElement, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticationStatus } from '@nhost/react';

interface RouteUserPublicOnlyProps {
  element: ReactNode
}

const RouteUserPublicOnly = (props: RouteUserPublicOnlyProps): ReactElement => {
  const { isLoading, isAuthenticated } = useAuthenticationStatus();

  if (isLoading) {
    return <Fragment></Fragment>;
  }

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return <>{props.element}</>;
};

export type { RouteUserPublicOnlyProps };
export { RouteUserPublicOnly };
