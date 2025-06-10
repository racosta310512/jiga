import React from 'react';
import { motion } from 'framer-motion';

/**
 * Componente Loading reutilizable
 */
const Loading = ({ 
  size = 'md', 
  text = 'Cargando...', 
  className = '',
  variant = 'spinner' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        {text && <span className="ml-2 text-white/80">{text}</span>}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <motion.div
        className={`border-2 border-green-500/30 border-t-green-500 rounded-full ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && <span className="text-white/80">{text}</span>}
    </div>
  );
};

export default Loading;