import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  duration?: number;
  amount?: number;
};

const offsetByDirection: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -20 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.75,
  amount = 0.18,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offsetByDirection[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  );
};
