import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { MainLayout } from './index';

afterEach(cleanup);

test('Should render', () => {
  render(
    <ThemeProvider theme={createTheme()}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
});
