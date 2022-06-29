import React, { ReactElement } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { MainLayoutProps } from './MainLayout.types';

const MainLayout = (props: MainLayoutProps): ReactElement => {
  const { header, children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {header}
      <Container sx={{ flex: 1, mb: 4 }} maxWidth='sm'>
        {children}
      </Container>
    </Box>
  );
};

export { MainLayout };
