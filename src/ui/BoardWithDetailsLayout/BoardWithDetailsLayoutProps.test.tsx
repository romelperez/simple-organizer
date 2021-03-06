import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { DataBoard_WithDetails } from '@app/types';
import { BoardWithDetailsLayout } from './index';

afterEach(cleanup);

test('Should render', () => {
  const boardWithDetails: DataBoard_WithDetails = {
    id: 'x',
    name: 'y',
    createdAt: '2022-01-01T00:00:00.000000+00:00',
    updatedAt: '2022-01-01T00:00:00.000000+00:00',
    tasks_aggregate: {
      aggregate: {
        count: 0
      }
    }
  };
  render(
    <ThemeProvider theme={createTheme()}>
      <BrowserRouter>
        <BoardWithDetailsLayout boardWithDetails={boardWithDetails} />
      </BrowserRouter>
    </ThemeProvider>
  );
});
