import React, { ReactElement, ReactNode } from 'react';

import { Header } from '@app/views/Header';

interface LayoutProps {
  children: ReactNode
}

const Layout = (props: LayoutProps): ReactElement => {
  const { children } = props;

  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export type { LayoutProps };
export { Layout };
