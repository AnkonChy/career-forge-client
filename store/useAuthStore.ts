import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect } from "react";
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
  _authVerified: boolean;
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
      _authVerified: false,

      setAuth: (user, token = null) =>
        set({
          user,
          token,
          isAuthenticated: !!user,
          isLoaded: true,
          _authVerified: true,
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
              _authVerified: true,
            });
            return true;
          }

          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoaded: true,
            _authVerified: true,
          });
          return false;
        } catch (error: any) {
          if (error?.response) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoaded: true,
              _authVerified: true,
            });
          } else {
            set({ isLoaded: true, _authVerified: true });
          }
          return false;
        }
      },

      logout: async () => {
        try {
          await axiosPublic.post("/api/auth/logout");
        } catch (error) {
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
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = false;
          state.isLoaded = false;
          state._authVerified = false;
          state.setHasHydrated(true);
        }
      },
    },
  ),
);

export async function initAuth(): Promise<void> {
  const { _authVerified, checkAuth } = useAuthStore.getState();
  if (!_authVerified) {
    await checkAuth();
  }
}

export const useAuth = () => {
  const store = useAuthStore();
  return store;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAuth();
  }, []);
  return children as React.ReactElement;
}
