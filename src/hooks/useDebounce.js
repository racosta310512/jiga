import { useState, useEffect } from 'react';

/**
 * Hook para debounce de valores
 * @param {*} value - Valor a debounce
 * @param {number} delay - Delay en milisegundos
 * @returns {*} - Valor debounced
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;