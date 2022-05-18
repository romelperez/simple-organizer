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
    createdAt: '2022-01-01T00:00:00.000000+00:00',
    updatedAt: '2022-01-01T00:00:00.000000+00:00',
    tasks_aggregate: {
      aggregate: {
        count: 0
      }
    }
  };
  render(
    <BrowserRouter>
      <BoardWithDetailsItem boardWithDetails={boardWithDetails} />
    </BrowserRouter>
  );
});
