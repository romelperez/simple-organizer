import React, { ReactElement } from 'react';
import { useUserData, useAuthenticationStatus } from '@nhost/react';

import { DataUser } from '@app/types';
import { HeaderStructure } from '@app/ui/HeaderStructure';

const Header = (): ReactElement => {
  const { isLoading } = useAuthenticationStatus();
  const user = useUserData() as DataUser | null;

  return (
    <HeaderStructure
      isLoading={isLoading}
      isUserLoggedIn={!!user}
      user={user}
    />
  );
};

export { Header };
