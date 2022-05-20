import React from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Store } from '@app/containers/Store';
import { Router } from '@app/containers/Router';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

const theme = createTheme({
  typography: {
    fontFamily: 'Jura, sans-serif',
    h1: { fontSize: '1.75rem', fontWeight: 700 },
    h2: { fontSize: '1.5rem', fontWeight: 700 },
    h3: { fontSize: '1.25rem', fontWeight: 700 },
    h4: { fontSize: '1.125rem', fontWeight: 700 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400 }
  }
});

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline enableColorScheme />
    <Global styles={{
      a: {
        textDecoration: 'none'
      }
    }} />
    <Store>
      <Router />
    </Store>
  </ThemeProvider>
);
