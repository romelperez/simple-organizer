import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { BoardWithDetailsItem } from './index';

afterEach(cleanup);

test('Should render', () => {
  const boardWithDetails = {
    id: 'x',
    name: 'y',
    tasksLength: 2,
    tasksCompleted: 1,
    createdAt: 'z'
  };
  render(
    <BrowserRouter>
      <BoardWithDetailsItem boardWithDetails={boardWithDetails} />
    </BrowserRouter>
  );
});
