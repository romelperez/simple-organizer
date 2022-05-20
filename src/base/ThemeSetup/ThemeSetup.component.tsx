import React, { ReactNode, ReactElement } from 'react';
import { Global } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  typography: {
    fontFamily: 'Jura, sans-serif',
    h1: { fontSize: '1.75rem', fontWeight: 700 },
    h2: { fontSize: '1.5rem', fontWeight: 700 },
    h3: { fontSize: '1.25rem', fontWeight: 700 },
    h4: { fontSize: '1.125rem', fontWeight: 700 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400 }
  },
  palette: {
    primary: {
      main: '#2e7d32'
    }
  }
});

interface ThemeSetupProps {
  children: ReactNode
}

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

export type { ThemeSetupProps };
export { ThemeSetup };
