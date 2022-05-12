import React, { ReactElement, ReactNode, Fragment, useEffect } from 'react';

import { useStore } from './useStore';

interface StoreProviderProps {
  children: ReactNode
}

const StoreProvider = (props: StoreProviderProps): ReactElement => {
  const { children } = props;

  const nhost = useStore(state => state.nhost);
  const setup = useStore(state => state.setup);

  useEffect(() => {
    setup();
  }, []);

  if (!nhost) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export type { StoreProviderProps };
export { StoreProvider };
