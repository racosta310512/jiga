import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await axios.post('https://jiga-store.vercel.app/auth/register', {
        name,
        email,
        password,
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar conta');
    }
  };

  useEffect(() => {
    gsap.fromTo(
      '.register-form',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleRegister}
        className="register-form bg-[#1F0037] bg-opacity-60 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Criar Conta</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 bg-transparent border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
          required
        />

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
          Criar Conta
        </button>
      </form>
    </div>
  );
}

