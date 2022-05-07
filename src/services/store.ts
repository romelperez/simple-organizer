import createStore from 'zustand';

import { Store } from '@app/types';

const useStore = createStore<Store>((set, get) => ({
  boardsWithDetails: []
}));

export { useStore };
