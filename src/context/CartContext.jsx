import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth() || {};
  const [cart, setCart] = useState([]);

  // Cargar carrito desde backend o localStorage
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;

          const res = await axios.get('https://jiga-store.vercel.app/cart', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const validCart = (res.data || []).filter(
            item => typeof item.price === 'number' && typeof item.quantity === 'number'
          );

          setCart(validCart);
        } catch (error) {
          console.error('Error al cargar carrito del servidor:', error);
          setCart([]);
        }
      } else {
        const local = localStorage.getItem('cart');
        const parsed = local ? JSON.parse(local) : [];
        const validLocalCart = parsed.filter(
          item => typeof item.price === 'number' && typeof item.quantity === 'number'
        );
        setCart(validLocalCart);
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  // Guardar en localStorage si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isAuthenticated]);

  // Sincroniza con el backend si el usuario está autenticado
  const syncCartWithServer = async (updatedCart) => {
    if (!isAuthenticated || !user?.id) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'https://jiga-store.vercel.app/cart',
        { items: updatedCart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Error al sincronizar carrito con el servidor:', error);
    }
  };

  const setAndSyncCart = (updatedCart) => {
    setCart(updatedCart);
    if (isAuthenticated && user?.id) {
      syncCartWithServer(updatedCart);
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const addToCart = (product) => {
    if (!product || typeof product._id !== 'string' || typeof product.price !== 'number') {
      console.warn('Producto inválido al agregar al carrito:', product);
      return;
    }

    const exists = cart.find(item => item._id === product._id);
    const updatedCart = exists
      ? cart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setAndSyncCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setAndSyncCart(updatedCart);
  };

  const clearCart = async () => {
    if (isAuthenticated && user?.id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('https://jiga-store.vercel.app/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setCart([]);
      } catch (error) {
        console.error('Error al vaciar el carrito:', error);
      }
    } else {
      localStorage.removeItem('cart');
      setCart([]);
    }
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item._id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setAndSyncCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map(item =>
        item._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);
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
