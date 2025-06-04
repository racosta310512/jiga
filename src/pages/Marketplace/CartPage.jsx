import React from 'react';
import {useCart} from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'https://jiga-store.vercel.app/orders',
        {
          userId: user.id,
          items: cart,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert('Pedido realizado com sucesso!');
        clearCart(); // Limpia carrito local
        navigate('/marketplace'); // Redirecciona si deseas
      } else {
        alert('Ocorreu um erro ao finalizar o pedido.');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Erro ao finalizar o pedido.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 text-center text-lg font-semibold text-gray-700">
        Seu carrinho está vazio.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Seu Carrinho</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500">Qtd: {item.quantity}</p>
              <p className="text-green-600 font-bold">R${item.price}</p>
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default CartPage;
