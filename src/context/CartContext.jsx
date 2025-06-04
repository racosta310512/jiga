import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth() || {}; // Prevención si el AuthContext aún no está disponible
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`https://jiga-store.vercel.app/cart/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(res.data.items || []);
        } catch (error) {
          console.error('Erro ao carregar carrinho do servidor:', error);
          setCart([]);
        }
      } else {
        const local = localStorage.getItem('cart');
        setCart(local ? JSON.parse(local) : []);
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  const syncCartWithServer = async (updatedCart) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://jiga-store.vercel.app/cart/${user.id}`,
        { items: updatedCart },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error('Erro ao sincronizar carrinho com servidor:', error);
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
