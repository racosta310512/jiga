import { useState, useCallback } from 'react';
import { API_CONFIG } from '../config/constants';
import useAuthStore from '../stores/authStore';

/**
 * Hook personalizado para manejar llamadas a la API
 * @param {string} baseUrl - URL base de la API
 * @returns {Object} - Objeto con métodos y estados de la API
 */
const useApi = (baseUrl = API_CONFIG.BASE_URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, logout } = useAuthStore();

  const request = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${baseUrl}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, success: true };
    } catch (err) {
      const errorMessage = err.message || 'Error en la conexión';
      setError(errorMessage);
      return { error: errorMessage, success: false };
    } finally {
      setLoading(false);
    }
  }, [baseUrl, token, logout]);

  const get = useCallback((endpoint, options = {}) => {
    return request(endpoint, { method: 'GET', ...options });
  }, [request]);

  const post = useCallback((endpoint, data, options = {}) => {
    return request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }, [request]);

  const put = useCallback((endpoint, data, options = {}) => {
    return request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }, [request]);

  const del = useCallback((endpoint, options = {}) => {
    return request(endpoint, { method: 'DELETE', ...options });
  }, [request]);

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del,
    request,
  };
};

export default useApi;