import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Router } from './index';

afterEach(cleanup);

test('Should render', () => {
  render(<Router />);
});
