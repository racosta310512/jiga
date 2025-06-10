// Definiciones de tipos para mejor documentación del código

/**
 * @typedef {Object} User
 * @property {string} id - ID único del usuario
 * @property {string} name - Nombre del usuario
 * @property {string} email - Email del usuario
 * @property {string} [token] - Token de autenticación
 */

/**
 * @typedef {Object} Product
 * @property {string} _id - ID único del producto
 * @property {string} name - Nombre del producto
 * @property {number} price - Precio del producto
 * @property {string} image - URL de la imagen principal
 * @property {string} category - Categoría del producto
 * @property {string} [description] - Descripción del producto
 * @property {string[]} [gallery] - Galería de imágenes adicionales
 * @property {string[]} [specs] - Especificaciones técnicas
 */

/**
 * @typedef {Object} CartItem
 * @property {string} _id - ID del producto
 * @property {string} name - Nombre del producto
 * @property {number} price - Precio del producto
 * @property {string} image - URL de la imagen
 * @property {number} quantity - Cantidad en el carrito
 * @property {string} category - Categoría del producto
 */

/**
 * @typedef {Object} Order
 * @property {string} _id - ID de la orden
 * @property {string} userId - ID del usuario
 * @property {CartItem[]} items - Items de la orden
 * @property {number} total - Total de la orden
 * @property {string} status - Estado de la orden
 * @property {Object} shippingAddress - Dirección de envío
 * @property {string} paymentMethod - Método de pago
 * @property {Date} createdAt - Fecha de creación
 */

export {};