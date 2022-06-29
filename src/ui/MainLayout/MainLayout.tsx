import React, { ReactElement } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { MainLayoutProps } from './MainLayout.types';

const MainLayout = (props: MainLayoutProps): ReactElement => {
  const { header, footer, children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      {header}
      <Container sx={{ flex: 1, mb: 4 }} maxWidth='sm'>
        {children}
      </Container>
      {footer}
    </Box>
  );
};

export { MainLayout };
