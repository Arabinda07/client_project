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
      primary: 'bg-terracotta text-warm-ivory shadow-[inset_0_1px_0_rgba(253,251,245,0.18)] hover:bg-terracotta-dark',
      secondary: 'bg-deep-maroon text-warm-ivory shadow-[inset_0_1px_0_rgba(253,251,245,0.14)] hover:bg-gray-900',
      outline: 'border border-terracotta/70 text-deep-maroon hover:bg-terracotta hover:text-warm-ivory hover:border-terracotta',
      ghost: 'bg-transparent text-gray-900 hover:text-terracotta',
    };

    const sizes = {
      sm: 'min-h-11 px-5 py-2.5 type-overline text-[0.625rem]',
      md: 'min-h-12 px-8 py-3.5 type-overline',
      lg: 'min-h-14 px-10 py-4 type-overline',
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-[2px] transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-warm-ivory disabled:cursor-not-allowed disabled:opacity-60',
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
