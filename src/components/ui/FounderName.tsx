import React from 'react';
import { brand } from '../../lib/brand';
import { cn } from '../../lib/utils';

export const FounderName = ({ className }: { className?: string }) => (
  <span
    title={brand.ownerName}
    className={cn('font-serif display-accent display-italic text-[1.08em] text-terracotta-dark', className)}
  >
    {brand.ownerDisplayName}
  </span>
);
