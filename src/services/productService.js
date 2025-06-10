import api from './api';

/**
 * Servicio de productos
 */
export const productService = {
  /**
   * Obtener todos los productos
   * @param {Object} params - Parámetros de consulta
   * @returns {Promise} - Lista de productos
   */
  getAll: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  /**
   * Obtener producto por ID
   * @param {string} id - ID del producto
   * @returns {Promise} - Producto
   */
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  /**
   * Crear producto (Admin)
   * @param {Object} productData - Datos del producto
   * @returns {Promise} - Producto creado
   */
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  /**
   * Actualizar producto (Admin)
   * @param {string} id - ID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise} - Producto actualizado
   */
  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  /**
   * Eliminar producto (Admin)
   * @param {string} id - ID del producto
   * @returns {Promise} - Respuesta de la API
   */
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  /**
   * Buscar productos
   * @param {string} query - Término de búsqueda
   * @param {Object} filters - Filtros adicionales
   * @returns {Promise} - Lista de productos
   */
  search: async (query, filters = {}) => {
    const response = await api.get('/products/search', {
      params: { q: query, ...filters },
    });
    return response.data;
  },

  /**
   * Obtener productos por categoría
   * @param {string} category - Categoría
   * @returns {Promise} - Lista de productos
   */
  getByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },
};

// Mantener compatibilidad con el código existente
export const getAllProducts = productService.getAll;
export const getProductById = productService.getById;