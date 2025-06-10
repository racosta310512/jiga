import { create } from 'zustand';

const useUIStore = create((set) => ({
  // Estados de UI
  isMobileMenuOpen: false,
  isLoading: false,
  notifications: [],
  modals: {
    isQuoteFormOpen: false,
    isChatOpen: false,
  },

  // Acciones para menú móvil
  toggleMobileMenu: () => set((state) => ({ 
    isMobileMenuOpen: !state.isMobileMenuOpen 
  })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Acciones para loading
  setLoading: (loading) => set({ isLoading: loading }),

  // Acciones para notificaciones
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, {
      id: Date.now(),
      type: 'info',
      duration: 5000,
      ...notification,
    }],
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id),
  })),

  clearNotifications: () => set({ notifications: [] }),

  // Acciones para modales
  openModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: true },
  })),

  closeModal: (modalName) => set((state) => ({
    modals: { ...state.modals, [modalName]: false },
  })),

  closeAllModals: () => set((state) => ({
    modals: Object.keys(state.modals).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {}),
  })),
}));

export default useUIStore;