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
  _authVerified: boolean; // tracks if server has confirmed session this page load
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
          _authVerified: true, // login = verified by definition
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

          // Server responded but returned no valid user — clear auth
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
            // Server replied with any error status (401, 403, 500…) → session invalid
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoaded: true,
              _authVerified: true,
            });
          } else {
            // Pure network error (no internet) — don't wipe auth, just unblock UI
            set({ isLoaded: true, _authVerified: true });
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
      // isAuthenticated & _authVerified are NOT persisted.
      // Every new page load must re-verify the session with the server.
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // After hydration, treat session as unverified.
          // AuthProvider at root level will call checkAuth() once.
          state.isAuthenticated = false;
          state.isLoaded = false;
          state._authVerified = false;
          state.setHasHydrated(true);
        }
      },
    },
  ),
);

/**
 * Call this ONCE from your root layout/provider.
 * It checks the session with the server and updates the store.
 * Subsequent calls are no-ops if already verified this page load.
 */
export async function initAuth(): Promise<void> {
  const { _authVerified, checkAuth } = useAuthStore.getState();
  if (!_authVerified) {
    await checkAuth();
  }
}

/**
 * useAuth — reads auth state from the store.
 * Does NOT trigger its own server request.
 * Pair this with <AuthProvider> at the root to ensure session is verified.
 */
export const useAuth = () => {
  const store = useAuthStore();
  return store;
};

/**
 * AuthProvider — mount this ONCE at the root (e.g. in app/layout.tsx).
 * It calls initAuth() on mount to verify the session with the server.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAuth();
  }, []);
  return children as React.ReactElement;
}
