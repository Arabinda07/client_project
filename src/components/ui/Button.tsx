import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'motion/react';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-terracotta text-white hover:bg-terracotta-dark',
      secondary: 'bg-deep-maroon text-white hover:opacity-90',
      outline: 'border border-terracotta text-terracotta hover:bg-terracotta hover:text-white',
      ghost: 'bg-transparent text-gray-900 hover:text-terracotta',
    };

    const sizes = {
      sm: 'px-6 py-3 text-[10px] tracking-[0.2em]',
      md: 'px-8 py-4 text-xs tracking-widest',
      lg: 'px-10 py-5 text-sm tracking-widest',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center font-bold uppercase transition-colors duration-200 focus:outline-none',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
