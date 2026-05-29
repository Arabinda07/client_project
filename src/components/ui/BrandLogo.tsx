import React, { useState } from 'react';
import type { BrandSettings } from '../../lib/brandSettings';
import { cn } from '../../lib/utils';
import { Logo } from './Logo';

const logoUrlByPlacement = {
  header: '/images/goonjaa-logo-header.png',
  mobileMenu: '/images/goonjaa-logo-header.png',
  footer: '/images/goonjaa-logo-footer.png',
} as const;

type BrandLogoProps = {
  settings: BrandSettings;
  variant?: 'wordmark' | 'monogram' | 'full';
  placement?: 'header' | 'mobileMenu' | 'footer';
  className?: string;
  color?: string;
};

const placementClassNames: Record<NonNullable<BrandLogoProps['placement']>, string> = {
  header: 'w-[136px] max-w-[44vw] sm:w-[158px] lg:w-[184px]',
  mobileMenu: 'w-[132px] max-w-[58vw]',
  footer: 'w-[236px] max-w-full sm:w-[270px]',
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  settings,
  variant = 'wordmark',
  placement = 'header',
  className,
  color,
}) => {
  const [hasImageError, setHasImageError] = useState(false);
  const sizingClassName = placementClassNames[placement];
  const logoUrl = logoUrlByPlacement[placement];

  if (!hasImageError) {
    return (
      <img
        src={logoUrl}
        alt={`${settings.name} logo`}
        className={cn('block h-auto shrink-0 select-none object-contain', sizingClassName, className)}
        decoding="async"
        onError={() => setHasImageError(true)}
      />
    );
  }

  return <Logo variant={variant} color={color} className={cn(sizingClassName, className)} />;
};
