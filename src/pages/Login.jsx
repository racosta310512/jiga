import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://jiga-backend.vercel.app/api/login', {
        email,
        password,
      });

      const { token } = res.data;
      localStorage.setItem('token', token);
      alert('Login realizado com sucesso!');
      navigate('/'); // Redirige al inicio o a un dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form onSubmit={handleLogin} className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
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
          Entrar
        </button>
      </form>
    </div>
  );
}
