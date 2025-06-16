import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore'; // ✅ CORREGIDO
import gsap from 'gsap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore(); // ✅ CORREGIDO

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://jiga-store.vercel.app/auth/login', {
        email,
        password,
      });

      console.log('Respuesta del backend:', res.data);

      const { token, user } = res.data;

      if (!token || typeof token !== 'string') {
        throw new Error('Token inválido recibido del servidor');
      }

      login(token, user); // ✅ Llama correctamente al método del store

      alert('Login realizado con éxito!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Error en el login');
    }
  };

  // Animaciones con GSAP
  useEffect(() => {
    gsap.fromTo(
      '.login-form',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleLogin}
        className="login-form bg-[#1F0037] bg-opacity-60 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-400 text-gray-900 py-3 rounded-lg shadow-md hover:bg-green-300 transition duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
