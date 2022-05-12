import React, { ReactElement, ReactNode, useRef } from 'react';
import type { NhostClient as NhostClientType } from '@nhost/nhost-js';
import { NhostClient, NhostReactProvider } from '@nhost/react';

interface StoreProps {
  children: ReactNode
}

const Store = (props: StoreProps): ReactElement => {
  const { children } = props;

  const nhostRef = useRef<NhostClientType>(null as any);

  if (nhostRef.current === null) {
    nhostRef.current = new NhostClient({
      backendUrl: process.env.NHOST_BACKEND_URL as string
    });
  }

  return (
    <NhostReactProvider nhost={nhostRef.current}>
      {children}
    </NhostReactProvider>
  );
};

export type { StoreProps };
export { Store };
