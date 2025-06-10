/**
 * Utilidades de validación
 */

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida una contraseña
 * @param {string} password - Contraseña a validar
 * @param {Object} options - Opciones de validación
 * @returns {Object} - Resultado de la validación
 */
export const validatePassword = (password, options = {}) => {
  const {
    minLength = 6,
    requireUppercase = false,
    requireLowercase = false,
    requireNumbers = false,
    requireSpecialChars = false,
  } = options;

  const errors = [];

  if (password.length < minLength) {
    errors.push(`Debe tener al menos ${minLength} caracteres`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una letra mayúscula');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una letra minúscula');
  }

  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Debe contener al menos un número');
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Debe contener al menos un carácter especial');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Valida un número de teléfono brasileño
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - True si es válido
 */
export const validateBrazilianPhone = (phone) => {
  const phoneRegex = /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Valida un CPF brasileño
 * @param {string} cpf - CPF a validar
 * @returns {boolean} - True si es válido
 */
export const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  
  return remainder === parseInt(cpf.charAt(10));
};