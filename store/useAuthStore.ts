import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";
import { axiosPublic } from "@/app/hooks/useAxiosPublic";

export interface User {
  id?: number | string;
  email: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoaded: boolean;
  _hasHydrated: boolean;
  setAuth: (user: User, token?: string | null) => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setHasHydrated: (state: boolean) => void;
  checkAuth: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoaded: false,
      _hasHydrated: false,

      setAuth: (user, token = null) =>
        set({
          user,
          token,
          isAuthenticated: !!user,
          isLoaded: true,
        }),

      setToken: (token) =>
        set((state) => ({
          token,
          isAuthenticated: !!state.user || !!token,
        })),

      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: !!user,
        })),

      setHasHydrated: (state) =>
        set({
          _hasHydrated: state,
        }),

      checkAuth: async () => {
        try {
          const res = await axiosPublic.get("/api/auth/me");
          const userData =
            res.data?.user ||
            res.data?.data?.user ||
            res.data?.data ||
            res.data;

          if (userData && (userData.email || userData.id)) {
            set({
              user: userData,
              isAuthenticated: true,
              isLoaded: true,
            });
            return true;
          }
          return false;
        } catch (error: any) {
          // Only clear auth if server explicitly returns 401 Unauthorized (session expired)
          if (error?.response?.status === 401) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoaded: true,
            });
          }
          return false;
        }
      },

      logout: async () => {
        try {
          await axiosPublic.post("/api/auth/logout");
        } catch (error) {
          // Ignore network errors during logout
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoaded: true,
          });
        }
      },
    }),
    {
      name: "career-forge-auth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const useAuth = () => {
  const store = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Background session verification
    store.checkAuth();
  }, []);

  return {
    ...store,
    isLoaded: mounted,
  };
};
