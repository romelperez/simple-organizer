import { DataUser } from '@app/types';
import { useStore } from '@app/containers/Store';

const useUser = (): DataUser | null => {
  return useStore(state => state.user);
};

export { useUser };
