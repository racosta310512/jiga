import React, { forwardRef } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Componente Input reutilizable
 */
const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  className,
  containerClassName,
  ...props
}, ref) => {
  const inputClasses = cn(
    'w-full px-4 py-2 bg-transparent border rounded-lg transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent',
    'placeholder:text-gray-400',
    error 
      ? 'border-red-500 focus:ring-red-400' 
      : 'border-white/30 hover:border-white/50',
    className
  );

  return (
    <div className={cn('space-y-1', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-400">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;