import React from 'react';
import { useCart } from '../../stores/cartStore';
import { useAuth } from '../../stores/authStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const items = useCart(state => state.items);
  const removeItem = useCart(state => state.removeItem);
  const clearCart = useCart(state => state.clearCart);
  const increaseQuantity = useCart(state => state.increaseQuantity);
  const decreaseQuantity = useCart(state => state.decreaseQuantity);
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para continuar');
      return navigate('/login');
    }

    if (!items.length) {
      alert('Tu carrito está vacío');
      return;
    }

    try {
      console.log('Sincronizando carrito con el backend...', items);

      // Convertimos items al formato que el backend espera: { _id: productId, quantity }
      const payload = {
        items: items.map(item => ({
          _id: item._id,        // el backend espera "_id" como productId
          quantity: item.quantity,
        })),
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('✅ Carrito sincronizado con éxito:', response.data);
      navigate('/checkout');
    } catch (error) {
      console.error('❌ Error al sincronizar el carrito:', error.response?.data || error.message);
      alert('Hubo un error al sincronizar tu carrito. Intenta de nuevo.');
    }
  };

  if (!items.length) {
    return (
      <div className="p-6 text-center text-lg font-semibold text-gray-300">
        Tu carrito está vacío.
      </div>
    );
  }

  const total = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-8 text-green-400">🛒 Tu Carrito</h2>

      <div className="divide-y divide-[#2f2f44] border border-[#2e2e4d] rounded-2xl bg-[#14141f] shadow-lg">
        {items.map(item => (
          <div key={item._id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-xl border border-[#2e2e4d]"
              />
              <div>
                <p className="font-semibold text-green-300">{item.name}</p>
                <p className="text-sm text-gray-400">
                  Precio: R${item.price.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQuantity(item._id)}
                className="px-2 py-1 border border-[#3c3c5c] rounded text-gray-200 hover:bg-[#1f1f2e]"
              >
                −
              </button>
              <span className="px-3 text-green-300 font-medium">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item._id)}
                className="px-2 py-1 border border-[#3c3c5c] rounded text-gray-200 hover:bg-[#1f1f2e]"
              >
                +
              </button>
              <button
                onClick={() => removeItem(item._id)}
                className="ml-4 text-red-500 hover:text-red-600 transition"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-[#2e2e4d] pt-6 gap-4">
        <div className="text-xl font-semibold text-white-300">
          Total: <span className="text-white-400">R${total.toFixed(2)}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCheckout}
            className="bg-[#22c55e] hover:bg-green-500 text-black font-bold px-6 py-2 rounded-xl shadow-lg transition text-center"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
