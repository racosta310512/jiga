import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaPaypal, FaCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    address: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    paypalEmail: '',
    pixKey: '',
  });

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    if (!user) return alert('Debes iniciar sesión para continuar');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          paymentMethod,
          shippingAddress: {
            fullName: customerInfo.fullName,
            address: customerInfo.address,
            phone: customerInfo.phone,
          },
          items: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          total: parseFloat(total),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert('✅ Pedido realizado con éxito');
      clearCart();
    } catch (error) {
      console.error(error);
      alert('❌ Hubo un error al procesar el pedido');
    }
  };

  return (
    <div className="bg-[#111827] min-h-screen text-[#d1d5db] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[#1a1a2e] p-8 rounded-2xl shadow-lg border border-[#2e2e4d]">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#22c55e] mb-6"
        >
          Confirmar pedido
        </motion.h1>

        {/* Datos del cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="fullName"
            placeholder="Nombre completo"
            value={customerInfo.fullName}
            onChange={handleInputChange}
            className="bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={customerInfo.phone}
            onChange={handleInputChange}
            className="bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={customerInfo.address}
            onChange={handleInputChange}
            className="md:col-span-2 bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
          />
        </div>

        {/* Lista de productos */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 mb-8">
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b border-[#2e2e4d] py-3">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-[#9ca3af]">Cantidad: {item.quantity}</p>
              </div>
              <p className="text-[#22c55e] font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Método de pago */}
        <h3 className="text-lg font-semibold mb-2">Método de pago</h3>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
              paymentMethod === 'paypal'
                ? 'bg-[#22c55e] text-black'
                : 'bg-[#111827] border-[#2e2e4d] text-[#d1d5db] hover:border-[#22c55e]'
            }`}
          >
            <FaPaypal className="text-xl" />
            PayPal
          </button>
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
              paymentMethod === 'card'
                ? 'bg-[#22c55e] text-black'
                : 'bg-[#111827] border-[#2e2e4d] text-[#d1d5db] hover:border-[#22c55e]'
            }`}
          >
            <FaCreditCard className="text-xl" />
            Tarjeta de crédito
          </button>
          <button
            onClick={() => setPaymentMethod('pix')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
              paymentMethod === 'pix'
                ? 'bg-[#22c55e] text-black'
                : 'bg-[#111827] border-[#2e2e4d] text-[#d1d5db] hover:border-[#22c55e]'
            }`}
          >
            <FaMoneyCheckAlt className="text-xl" />
            Pix
          </button>
        </div>

        {/* Campos dinámicos según método */}
        {paymentMethod === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="cardNumber"
              placeholder="Número de tarjeta"
              value={customerInfo.cardNumber}
              onChange={handleInputChange}
              className="bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
            />
            <input
              type="text"
              name="cardName"
              placeholder="Nombre del titular"
              value={customerInfo.cardName}
              onChange={handleInputChange}
              className="bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
            />
            <input
              type="text"
              name="expiryMonth"
              placeholder="Mes"
              value={customerInfo.expiryMonth}
              onChange={handleInputChange}
              className="bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
            />
            <input
              type="text"
              name="expiryYear"
              placeholder="Año"
              value={customerInfo.expiryYear}
              onChange={handleInputChange}
              className="bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={customerInfo.cvv}
              onChange={handleInputChange}
              className="md:col-span-2 bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
            />
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <input
            type="email"
            name="paypalEmail"
            placeholder="Correo de PayPal"
            value={customerInfo.paypalEmail}
            onChange={handleInputChange}
            className="w-full mb-6 bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
          />
        )}

        {paymentMethod === 'pix' && (
          <input
            type="text"
            name="pixKey"
            placeholder="Clave PIX"
            value={customerInfo.pixKey}
            onChange={handleInputChange}
            className="w-full mb-6 bg-[#111827] border border-[#2e2e4d] rounded-xl px-4 py-2 text-white placeholder-[#9ca3af]"
          />
        )}

        {/* Total y confirmar */}
        <div className="text-right border-t pt-4 border-[#2e2e4d]">
          <p className="text-xl font-semibold">
            Total: <span className="text-[#22c55e]">${total}</span>
          </p>
          <button
            onClick={handleConfirm}
            disabled={!paymentMethod || !customerInfo.fullName || !customerInfo.address || !customerInfo.phone}
            className="mt-4 bg-[#22c55e] hover:bg-green-500 text-black font-bold py-3 px-6 rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
