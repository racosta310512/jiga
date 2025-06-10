import api from './api';

/**
 * Servicio de órdenes
 */
export const orderService = {
  /**
   * Crear nueva orden
   * @param {Object} orderData - Datos de la orden
   * @returns {Promise} - Orden creada
   */
  create: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  /**
   * Obtener órdenes del usuario
   * @param {Object} params - Parámetros de consulta
   * @returns {Promise} - Lista de órdenes
   */
  getAll: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  /**
   * Obtener orden por ID
   * @param {string} id - ID de la orden
   * @returns {Promise} - Orden
   */
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  /**
   * Actualizar estado de la orden
   * @param {string} id - ID de la orden
   * @param {string} status - Nuevo estado
   * @returns {Promise} - Orden actualizada
   */
  updateStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  /**
   * Cancelar orden
   * @param {string} id - ID de la orden
   * @returns {Promise} - Orden cancelada
   */
  cancel: async (id) => {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },
};