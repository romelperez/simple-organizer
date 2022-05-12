import React, { ReactElement, ReactNode, Fragment, useEffect } from 'react';

import { useStore } from './useStore';

interface StoreProps {
  children: ReactNode
}

const Store = (props: StoreProps): ReactElement => {
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

export type { StoreProps };
export { Store };
