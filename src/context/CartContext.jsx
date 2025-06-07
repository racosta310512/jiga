import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth() || {};
  const [cart, setCart] = useState([]);

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

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

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

  const setAndSyncCart = (updatedCart) => {
    setCart(updatedCart);
    if (isAuthenticated) {
      syncCartWithServer(updatedCart);
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    const updatedCart = exists
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setAndSyncCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setAndSyncCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    if (isAuthenticated) {
      syncCartWithServer([]);
    } else {
      localStorage.removeItem('cart');
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setAndSyncCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setAndSyncCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
