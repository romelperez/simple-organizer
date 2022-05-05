import React from 'react';
import { createRoot } from 'react-dom/client';

import { Router } from '@app/containers/Router';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(<Router />);
