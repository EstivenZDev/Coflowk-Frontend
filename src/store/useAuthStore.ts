// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  company_id: string;
  status: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setUser: (user: User | null) => void;
  logOut: () => void;
  setHasHydrated: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      logOut: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    }
  )
);

export default useAuthStore;
