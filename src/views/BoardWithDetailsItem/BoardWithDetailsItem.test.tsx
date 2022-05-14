import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { DataBoard_WithDetails } from '@app/types';
import { BoardWithDetailsItem } from './index';

afterEach(cleanup);

test('Should render', () => {
  const boardWithDetails: DataBoard_WithDetails = {
    id: 'x',
    name: 'y',
    tasksLength: 2,
    tasksCompleted: 1,
    createdAt: '0',
    updatedAt: '0'
  };
  render(
    <BrowserRouter>
      <BoardWithDetailsItem boardWithDetails={boardWithDetails} />
    </BrowserRouter>
  );
});
