// src/context/AuthContext.jsx
import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const decoded = jwtDecode(token);
        const parsedUser = JSON.parse(userData);
        const userId = decoded.userId || decoded.id || decoded.sub; // Flexibilidad en el campo
        if (!userId) throw new Error("No se pudo extraer userId del token.");
        setUser({ ...parsedUser, id: userId });
      } catch (err) {
        console.error("Token inválido o datos corruptos:", err);
        logout(); // Limpia si hay error
      }
    }
  }, []);

  const login = (token, userData) => {
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.id || decoded.sub;
      if (!userId) throw new Error("Token inválido");
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser({ ...userData, id: userId });
    } catch (err) {
      console.error("Login fallido:", err);
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (navigate) navigate('/login');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
