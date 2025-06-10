import React from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollPosition from '../../../hooks/useScrollPosition';

/**
 * Componente BackToTop optimizado
 */
const BackToTop = () => {
  const scrollY = useScrollPosition();
  const isVisible = scrollY > 300;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-green-500 hover:bg-green-300 shadow-lg transition z-50"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;