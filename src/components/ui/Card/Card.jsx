import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../utils/cn';

/**
 * Componente Card reutilizable
 */
const Card = ({
  children,
  className,
  hover = true,
  animate = true,
  padding = 'md',
  ...props
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: '',
  };

  const baseClasses = cn(
    'bg-[#1c1b29] rounded-2xl shadow-lg border border-white/10',
    'backdrop-blur-sm',
    hover && 'hover:shadow-xl transition-shadow duration-300',
    paddingClasses[padding],
    className
  );

  const CardComponent = animate ? motion.div : 'div';
  const animationProps = animate ? {
    whileHover: hover ? { y: -2 } : {},
    transition: { duration: 0.2 },
  } : {};

  return (
    <CardComponent
      className={baseClasses}
      {...animationProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

export default Card;