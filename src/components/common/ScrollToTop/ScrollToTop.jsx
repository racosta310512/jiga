import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente para scroll automático al cambiar de ruta
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;