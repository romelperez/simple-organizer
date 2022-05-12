import React from 'react';
import { createRoot } from 'react-dom/client';

import { Store } from '@app/containers/Store';
import { Router } from '@app/containers/Router';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <Store>
    <Router />
  </Store>
);
