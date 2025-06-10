import { clsx } from 'clsx';

/**
 * Utility function para combinar clases de CSS
 * @param {...any} inputs - Clases a combinar
 * @returns {string} - String de clases combinadas
 */
export function cn(...inputs) {
  return clsx(inputs);
}