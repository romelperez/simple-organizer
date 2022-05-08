import React, { ReactElement, ReactNode, useMemo } from 'react';
import { NhostClient } from '@nhost/nhost-js';

import { StoreContext } from './StoreContext';

interface StoreProviderProps {
  children: ReactNode
}

const StoreProvider = (props: StoreProviderProps): ReactElement => {
  const { children } = props;

  const store = useMemo(() => {
    const nhost = new NhostClient({
      backendUrl: process.env.NHOST_BACKEND_URL as string
    });

    return { nhost };
  }, []);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export type { StoreProviderProps };
export { StoreProvider };
