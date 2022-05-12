import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

import { HeaderStructure } from './index';

afterEach(cleanup);

test('Should render', () => {
  render(
    <BrowserRouter>
      <HeaderStructure />
    </BrowserRouter>
  );
});
