import React, { ReactElement } from 'react';
import { useUserData, useAuthenticationStatus } from '@nhost/react';

import { DataUser } from '@app/types';
import { HeaderLayout } from '@app/ui/HeaderLayout';

const Header = (): ReactElement => {
  const { isLoading } = useAuthenticationStatus();
  const user = useUserData() as DataUser | null;

  return (
    <HeaderLayout
      isLoading={isLoading}
      isUserLoggedIn={!!user}
      user={user}
    />
  );
};

export { Header };
