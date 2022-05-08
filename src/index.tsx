import React from 'react';
import { createRoot } from 'react-dom/client';

import { Router } from '@app/containers/Router';
import { StoreProvider } from '@app/containers/StoreProvider';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <StoreProvider>
    <Router />
  </StoreProvider>
);
