import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) return navigate('/login');

    try {
      const token = localStorage.getItem('token');

      // Paso 1: Enviar carrito al backend
      await axios.put(
        'https://jiga-store.vercel.app/cart',
        {
          items: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Paso 2: Crear orden en el backend
      const response = await axios.post(
        'https://jiga-store.vercel.app/orders',
        {
          paymentMethod: 'paypal', // o 'pix' o 'card', según lo que quieras permitir
          shippingAddress: {
            fullName: user?.name || 'Nombre no disponible',
            address: 'Dirección de prueba',
            phone: '00000000000',
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201 || response.status === 200) {
        clearCart();
        setShowSuccessModal(true);
      } else {
        alert('Ocurrió un error al finalizar el pedido.');
      }
    } catch (error) {
      console.error('Error en el checkout:', error);
      alert('Error al finalizar el pedido.');
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="p-6 text-center text-lg font-semibold text-gray-300">
        Tu carrito está vacío.
      </div>
    );
  }

  const total = cart.reduce((acc, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return acc + price * quantity;
  }, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-8 text-green-400">🛒 Tu Carrito</h2>

      <div className="divide-y divide-[#2f2f44] border border-[#2e2e4d] rounded-2xl bg-[#14141f] shadow-lg">
        {cart
          .filter(item => typeof item.price === 'number' && typeof item.quantity === 'number')
          .map((item) => (
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
                  onClick={() => removeFromCart(item._id)}
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

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#111827] rounded-2xl p-8 shadow-xl text-center w-full max-w-md border border-green-600">
            <svg
              className="mx-auto mb-4 w-16 h-16 text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <h2 className="text-2xl font-bold text-green-400 mb-2">¡Pedido realizado!</h2>
            <p className="text-gray-400 mb-6">Gracias por tu compra. Estamos procesando tu pedido.</p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/marketplace');
              }}
              className="bg-green-500 hover:bg-green-600 transition px-6 py-2 rounded-xl text-white"
            >
              Volver al Marketplace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
