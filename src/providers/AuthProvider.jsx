// src/providers/AuthProvider.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { ROUTES } from '../config/constants';

/**
 * Proveedor que valida la sesión al iniciar y muestra un loader mientras tanto.
 */
const AuthProvider = ({ children }) => {
  const { checkTokenValidity, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateSession = () => {
      const isValid = checkTokenValidity();

      if (!isValid) {
        logout();
        if (location.pathname !== ROUTES.LOGIN && location.pathname !== ROUTES.REGISTER) {
          navigate(ROUTES.LOGIN);
        }
      }

      setLoading(false);
    };

    validateSession();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0e001a]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400"></div>
      </div>
    );
  }

  return children;
};

export default AuthProvider;
