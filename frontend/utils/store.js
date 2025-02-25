// utils/store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user) => set({ user, isAuthenticated: !!user }),
            clearUser: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-store', // Name for localStorage key
            //getStorage: () => localStorage, // Store in localStorage
            getStorage: () => sessionStorage, // Use sessionStorage instead of localStorage
        }
    )
);

export default useAuthStore;
