// src/store/useAuthStore.js
import { logout } from '@/services/user/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export interface User {
    id: string,
    fullName: string,
    email: string,
    role: string,
    company_id: string,
    status: string

}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    logout: () => void
}



const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            logout: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "auth-storage",
        }
    )
);

export default useAuthStore;
