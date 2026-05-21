import { cn } from '../../lib/utils';

export const fieldGroupClassName = 'space-y-2';

export const labelClassName = 'type-overline font-bold text-gray-700';

export const inputClassName = (className?: string) =>
  cn(
    'min-h-12 w-full rounded-[2px] border border-gray-300 bg-studio-paper px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-terracotta focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    className
  );

export const underlinedInputClassName = (className?: string) =>
  cn(
    'min-h-12 w-full rounded-[2px] border border-transparent border-b-gray-300 bg-transparent px-3 py-3 text-gray-900 transition-colors placeholder:text-gray-400 focus:border-b-terracotta focus:outline-none focus:ring-0 focus-visible:border-terracotta focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    className
  );

export const selectClassName = (className?: string) =>
  inputClassName(cn('appearance-auto disabled:cursor-not-allowed disabled:opacity-60', className));

export const textareaClassName = (className?: string) =>
  cn(inputClassName('min-h-32 resize-y'), className);

export const helperTextClassName = 'type-caption text-gray-500';

export const errorTextClassName = 'type-caption font-semibold text-terracotta-dark';

export const statusPanelClassName =
  'rounded-[2px] border border-terracotta/30 bg-warm-ivory p-4 text-terracotta-dark';
