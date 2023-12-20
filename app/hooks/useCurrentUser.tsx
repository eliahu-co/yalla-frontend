import { create } from 'zustand'

interface CurrentUserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const useCurrentUser = create<CurrentUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))

export default useCurrentUser;