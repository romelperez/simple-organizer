import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserData } from '@nhost/react';

import { DataUser } from '@app/types';

const SettingsPage = (): ReactElement => {
  const user = useUserData() as DataUser | null;

  if (!user) {
    return (
      <Navigate to='/signin' />
    );
  }

  return (
    <main>
      <img
        style={{
          width: 100,
          height: 100
        }}
        src={user.avatarUrl}
      />
      <p>Name: <b>{user.displayName}</b></p>
      <p>Email: <b>{user.email}</b></p>
      <p>Account created at: <b>{user.createdAt}</b></p>
      <p>Last updated at: <b>{user.updatedAt ?? 'No updated'}</b></p>
    </main>
  );
};

export { SettingsPage };
