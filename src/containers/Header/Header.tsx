import React, { ReactElement } from 'react';
import { useUserData, useAuthenticationStatus } from '@nhost/react';
import { useAtom } from 'jotai';

import { DataUser } from '@app/types';
import { colorSchemeAtom } from '@app/atoms';
import { HeaderLayout } from '@app/ui/HeaderLayout';

const Header = (): ReactElement => {
  const { isLoading } = useAuthenticationStatus();
  const user = useUserData() as DataUser | null;
  const [colorScheme, setColorScheme] = useAtom(colorSchemeAtom);

  const onToggleColorScheme = (): void => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };

  return (
    <HeaderLayout
      isLoading={isLoading}
      isUserLoggedIn={!!user}
      user={user}
      onToggleColorScheme={onToggleColorScheme}
    />
  );
};

export { Header };
