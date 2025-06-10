/**
 * Utilidades para formateo de datos
 */

/**
 * Formatea un precio en formato de moneda
 * @param {number} price - Precio a formatear
 * @param {string} currency - Moneda (default: 'BRL')
 * @returns {string} - Precio formateado
 */
export const formatPrice = (price, currency = 'BRL') => {
  if (typeof price !== 'number') return 'R$ 0,00';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

/**
 * Formatea una fecha
 * @param {Date|string} date - Fecha a formatear
 * @param {Object} options - Opciones de formato
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('pt-BR', {
    ...defaultOptions,
    ...options,
  }).format(new Date(date));
};

/**
 * Trunca un texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} length - Longitud máxima
 * @returns {string} - Texto truncado
 */
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} str - String a capitalizar
 * @returns {string} - String capitalizado
 */
export const capitalizeWords = (str) => {
  return str.replace(/\w\S*/g, (txt) =>
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};