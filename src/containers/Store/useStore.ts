import createStore from 'zustand';
import { NhostClient } from '@nhost/nhost-js';

import { DataUser, Store } from '@app/types';

const useStore = createStore<Store>((set, get) => ({
  nhost: null as any,
  user: null,

  setup: () => {
    const nhost = new NhostClient({
      backendUrl: process.env.NHOST_BACKEND_URL as string
    });

    // DEBUG: TODO:
    (window as any).nhost = nhost;

    set({ nhost });

    nhost.auth.onAuthStateChanged(() => {
      if (nhost.auth.isAuthenticated()) {
        const user = nhost.auth.getUser() as DataUser;
        set({ user });
      } else {
        set({ user: null });
      }
    });
  },

  isAuthenticated: () => {
    return get().nhost?.auth.isAuthenticated() ?? false;
  },

  signIn: async (email, password) => {
    const { nhost } = get();
    const response = await nhost.auth.signIn({ email, password });

    if (response.error) {
      throw new Error(response.error.message);
    }
  },

  signOut: async () => {
    const { nhost } = get();
    await nhost.auth.signOut();
  }
}));

export { useStore };
