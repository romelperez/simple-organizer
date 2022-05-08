import { useContext } from 'react';

import { Store } from '@app/types';
import { StoreContext } from './StoreContext';

const useStore = (): Store => {
  return useContext(StoreContext);
};

export { useStore };
