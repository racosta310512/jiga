import api from './api';

/**
 * Servicio del carrito
 */
export const cartService = {
  /**
   * Obtener carrito del usuario
   * @returns {Promise} - Carrito del usuario
   */
  get: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  /**
   * Actualizar carrito completo
   * @param {Array} items - Items del carrito
   * @returns {Promise} - Carrito actualizado
   */
  update: async (items) => {
    const response = await api.put('/cart', { items });
    return response.data;
  },

  /**
   * Agregar item al carrito
   * @param {Object} item - Item a agregar
   * @returns {Promise} - Carrito actualizado
   */
  addItem: async (item) => {
    const response = await api.post('/cart/items', item);
    return response.data;
  },

  /**
   * Actualizar cantidad de un item
   * @param {string} productId - ID del producto
   * @param {number} quantity - Nueva cantidad
   * @returns {Promise} - Carrito actualizado
   */
  updateItem: async (productId, quantity) => {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return response.data;
  },

  /**
   * Remover item del carrito
   * @param {string} productId - ID del producto
   * @returns {Promise} - Carrito actualizado
   */
  removeItem: async (productId) => {
    const response = await api.delete(`/cart/items/${productId}`);
    return response.data;
  },

  /**
   * Limpiar carrito
   * @returns {Promise} - Respuesta de la API
   */
  clear: async () => {
    const response = await api.delete('/cart');
    return response.data;
  },

  /**
   * Sincronizar carrito local con el servidor
   * @param {Array} localItems - Items del carrito local
   * @returns {Promise} - Carrito sincronizado
   */
  sync: async (localItems) => {
    const response = await api.post('/cart/sync', { items: localItems });
    return response.data;
  },
};