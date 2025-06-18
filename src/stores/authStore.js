import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { STORAGE_KEYS } from '../config/constants';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: (token, userData) => {
        try {
          const decoded = jwtDecode(token);
          const userId = decoded.userId || decoded.id || decoded.sub;

          if (!userId) {
            throw new Error('Token inválido');
          }

          if (decoded.exp * 1000 < Date.now()) {
            throw new Error('Token expirado');
          }

          const user = { ...userData, id: userId, token };

          set({
            user,
            token,
            isAuthenticated: true,
          });

          // Guardar manualmente en localStorage por compatibilidad
          localStorage.setItem(STORAGE_KEYS.TOKEN, token);
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

          return { success: true };
        } catch (error) {
          console.error('Error en login:', error);
          get().logout();
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });

        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      },

      updateUser: (userData) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData },
          });
        }
      },

      checkTokenValidity: () => {
        const { token, logout } = get();

        if (!token) return false;

        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            logout();
            return false;
          }
          return true;
        } catch {
          logout();
          return false;
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const useAuth = useAuthStore;
export default useAuthStore;
