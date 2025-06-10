import { useState, useEffect } from 'react';

/**
 * Hook para obtener la posición del scroll
 */
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

export default useScrollPosition;