import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

const buttonVariants = {
  primary: 'bg-green-500 hover:bg-green-600 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  outline: 'border border-green-500 text-green-500 hover:bg-green-500 hover:text-white',
  ghost: 'text-green-500 hover:bg-green-500/10',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

/**
 * Componente Button reutilizable
 * @param {Object} props - Props del componente
 * @param {string} props.variant - Variante del botón
 * @param {string} props.size - Tamaño del botón
 * @param {boolean} props.disabled - Si está deshabilitado
 * @param {boolean} props.loading - Si está cargando
 * @param {boolean} props.animate - Si debe animarse
 * @param {string} props.className - Clases adicionales
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {Function} props.onClick - Función onClick
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  animate = true,
  className,
  children,
  onClick,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const classes = cn(
    baseClasses,
    buttonVariants[variant],
    buttonSizes[size],
    className
  );

  const ButtonComponent = animate ? motion.button : 'button';
  const animationProps = animate ? {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap: { scale: disabled ? 1 : 0.98 },
    transition: { duration: 0.2 },
  } : {};

  return (
    <ButtonComponent
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...animationProps}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </ButtonComponent>
  );
};

export default Button;