import api from './api';

/**
 * Servicio de autenticación
 */
export const authService = {
  /**
   * Iniciar sesión
   * @param {Object} credentials - Credenciales de login
   * @returns {Promise} - Respuesta de la API
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Registrar usuario
   * @param {Object} userData - Datos del usuario
   * @returns {Promise} - Respuesta de la API
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  /**
   * Obtener perfil del usuario
   * @returns {Promise} - Respuesta de la API
   */
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  /**
   * Actualizar perfil del usuario
   * @param {Object} userData - Datos a actualizar
   * @returns {Promise} - Respuesta de la API
   */
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  /**
   * Cambiar contraseña
   * @param {Object} passwordData - Datos de contraseña
   * @returns {Promise} - Respuesta de la API
   */
  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },

  /**
   * Solicitar recuperación de contraseña
   * @param {string} email - Email del usuario
   * @returns {Promise} - Respuesta de la API
   */
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  /**
   * Restablecer contraseña
   * @param {Object} resetData - Datos de restablecimiento
   * @returns {Promise} - Respuesta de la API
   */
  resetPassword: async (resetData) => {
    const response = await api.post('/auth/reset-password', resetData);
    return response.data;
  },
};