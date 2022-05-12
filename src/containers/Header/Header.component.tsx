import React, { ReactElement } from 'react';

import { useStore } from '@app/containers/Store';
import { HeaderStructure } from '@app/views/HeaderStructure';

const Header = (): ReactElement => {
  const user = useStore(state => state.user);

  return (
    <HeaderStructure
      isUserLoggedIn={!!user}
      user={user}
    />
  );
};

export { Header };
