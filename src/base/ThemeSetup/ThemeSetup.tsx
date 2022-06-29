import React, { ReactElement } from 'react';
import { Global } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeSetupProps } from './ThemeSetup.types';

const theme = createTheme({
  typography: {
    fontFamily: 'Jura, sans-serif',
    fontWeightBold: '700',
    fontWeightMedium: '700',
    fontWeightRegular: '400',
    fontWeightLight: '400',
    h1: { fontSize: '1.5rem', fontWeight: 700 },
    h2: { fontSize: '1.25rem', fontWeight: 700 },
    h3: { fontSize: '1.125rem', fontWeight: 700 },
    h4: { fontSize: '1rem', fontWeight: 700 },
    body1: { fontSize: '1', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400 }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32'
    },
    secondary: {
      main: '#6e2e7d'
    }
  }
});

const ThemeSetup = (props: ThemeSetupProps): ReactElement => {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Global styles={{
        a: {
          textDecoration: 'none'
        }
      }} />
      {children}
    </ThemeProvider>
  );
};

export { ThemeSetup };
