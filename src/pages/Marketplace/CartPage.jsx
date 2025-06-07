import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
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
        clearCart();
        navigate('/marketplace');
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
      <div className="p-6 text-center text-lg font-semibold text-gray-300">
        Seu carrinho está vazio.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
        Seu Carrinho
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="bg-[#1c1b29] p-4 rounded-xl shadow hover:shadow-lg transition-all flex flex-col"
          >
            <div className="w-full aspect-square mb-3 rounded-lg overflow-hidden bg-[#2a2940] flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-500">Sin imagen</span>
              )}
            </div>

            <h3 className="text-base font-semibold mb-1">{item.name}</h3>
            <p className="text-green-400 font-bold mb-2">R${item.price}</p>

            {/* Control de cantidad */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => {
                  if (item.quantity > 1) {
                    decreaseQuantity(item._id);
                  } else {
                    removeFromCart(item._id);
                  }
                }}
                className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                -
              </button>
              <span className="text-sm font-semibold">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item._id)}
                className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="mt-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-8 py-3 rounded-xl shadow hover:bg-green-700 transition text-lg"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>
  );
};

export default CartPage;

