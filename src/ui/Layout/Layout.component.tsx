import React, { ReactElement, ReactNode } from 'react';
import Container from '@mui/material/Container';

interface LayoutProps {
  header?: ReactNode
  children?: ReactNode
}

const Layout = (props: LayoutProps): ReactElement => {
  const { header, children } = props;

  return (
    <div>
      {header}
      <Container sx={{ mb: 2 }} maxWidth='sm'>
        {children}
      </Container>
    </div>
  );
};

export type { LayoutProps };
export { Layout };
