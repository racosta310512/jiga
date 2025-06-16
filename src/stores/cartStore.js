import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../config/constants';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      // Acciones
      addItem: (product) => {
        if (!product || typeof product._id !== 'string' || typeof product.price !== 'number') {
          console.warn('Producto inválido:', product);
          return;
        }

        const { items } = get();
        const existingItem = items.find(item => item._id === product._id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        set({
          items: items.filter(item => item._id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        const { items } = get();
        set({
          items: items.map(item =>
            item._id === productId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      increaseQuantity: (productId) => {
        const { items } = get();
        const item = items.find(item => item._id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity + 1);
        }
      },

      decreaseQuantity: (productId) => {
        const { items } = get();
        const item = items.find(item => item._id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity - 1);
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      setItems: (items) => {
        const validItems = items.filter(
          item => typeof item.price === 'number' && typeof item.quantity === 'number'
        );
        set({ items: validItems });
      },

      setLoading: (loading) => set({ isLoading: loading }),

      // Getters computados
      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      getItemById: (productId) => {
        const { items } = get();
        return items.find(item => item._id === productId);
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const useCart = useCartStore;
export default useCartStore;
