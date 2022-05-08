import { createContext } from 'react';

import { Store } from '@app/types';

const StoreContext = createContext<Store>(null as any);

export { StoreContext };
