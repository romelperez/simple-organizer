import React, { ReactElement } from 'react';
import { useUserData } from '@nhost/react';

import { DataUser } from '@app/types';
import { HeaderStructure } from '@app/views/HeaderStructure';

const Header = (): ReactElement => {
  const user = useUserData() as DataUser | null;

  return (
    <HeaderStructure
      isUserLoggedIn={!!user}
      user={user}
    />
  );
};

export { Header };
