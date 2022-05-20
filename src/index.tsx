import React from 'react';
import { createRoot } from 'react-dom/client';

import { ThemeSetup } from '@app/base/ThemeSetup';
import { Store } from '@app/containers/Store';
import { Router } from '@app/containers/Router';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <ThemeSetup>
    <Store>
      <Router />
    </Store>
  </ThemeSetup>
);
