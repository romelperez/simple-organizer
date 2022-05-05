import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { Layout } from './index';

afterEach(cleanup);

test('Should render', () => {
  render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
});
