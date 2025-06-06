import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth() || {}; // Prevención si el AuthContext aún no está disponible
  const [cart, setCart] = useState([]);

  // Cargar carrito al iniciar sesión o si está en localStorage
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`https://jiga-store.vercel.app/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(res.data || []);
        } catch (error) {
          console.error('Error al cargar carrito del servidor:', error);
          setCart([]);
        }
      } else {
        const local = localStorage.getItem('cart');
        setCart(local ? JSON.parse(local) : []);
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  // Guardar en localStorage si no hay sesión
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  // Sincronizar carrito completo con el backend (requiere PUT /cart en backend, ya implementado arriba)
  const syncCartWithServer = async (updatedCart) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://jiga-store.vercel.app/cart`,
        { items: updatedCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Error al sincronizar carrito con el servidor:', error);
    }
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    const updatedCart = exists
      ? cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    if (isAuthenticated) syncCartWithServer(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    if (isAuthenticated) syncCartWithServer(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    if (!isAuthenticated) {
      localStorage.removeItem('cart');
    } else {
      syncCartWithServer([]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
