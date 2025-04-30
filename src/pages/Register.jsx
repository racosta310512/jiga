import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://jiga-backend.vercel.app/api/register', {
        name,
        email,
        password,
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar conta');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form onSubmit={handleRegister} className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded"
          required
        />
        <button type="submit" className="w-full bg-purple-700 text-white py-3 rounded hover:bg-purple-800 transition">
          Criar Conta
        </button>
      </form>
    </div>
  );
}
