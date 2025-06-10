import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../../stores/authStore';
import { ROUTES } from '../../../config/constants';

/**
 * Componente para rutas privadas
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} />;
};

export default PrivateRoute;