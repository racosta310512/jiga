// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ id: decoded.id });
    }
  }, []);

  // Función de login
  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ id: decoded.id });
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login'; // Redirige al login
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
