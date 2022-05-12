import React, { ReactElement, ReactNode } from 'react';

interface LayoutProps {
  header?: ReactNode
  children?: ReactNode
}

const Layout = (props: LayoutProps): ReactElement => {
  const { header, children } = props;

  return (
    <div>
      {header}
      <div>
        {children}
      </div>
    </div>
  );
};

export type { LayoutProps };
export { Layout };
