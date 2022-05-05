import React from 'react';
import { render } from 'react-dom';

import { Router } from '@app/containers/Router';

render(
  <Router />,
  document.querySelector('#root')
);
