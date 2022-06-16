import React, { ReactElement } from 'react';
import Container from '@mui/material/Container';

import { MainLayoutProps } from './MainLayout.types';

const MainLayout = (props: MainLayoutProps): ReactElement => {
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

export { MainLayout };
