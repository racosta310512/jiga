// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Al iniciar, carga datos del localStorage si existen
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const decoded = jwtDecode(token);
        const parsedUser = JSON.parse(userData);
        setUser({ ...parsedUser, id: decoded.userId }); // Corrige el nombre del campo
      } catch (err) {
        console.error("Token inválido o datos corruptos:", err);
        logout(); // Borra todo si hay error
      }
    }
  }, []);

  // Guardar usuario al hacer login
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    const decoded = jwtDecode(token);
    setUser({ ...userData, id: decoded.userId });
  };

  // Cerrar sesión (ahora espera navigate como argumento)
  const logout = (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (navigate) navigate('/login'); // Redirige usando React Router
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
