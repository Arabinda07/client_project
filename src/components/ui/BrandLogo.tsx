import React, { useState } from 'react';
import type { BrandSettings } from '../../lib/brandSettings';
import { cn } from '../../lib/utils';
import { Logo } from './Logo';

const logoAssetByPlacement = {
  header: {
    webp: '/images/goonjaa-logo-header.webp',
    png: '/images/goonjaa-logo-header.png',
  },
  mobileMenu: {
    webp: '/images/goonjaa-logo-header.webp',
    png: '/images/goonjaa-logo-header.png',
  },
  footer: {
    webp: '/images/goonjaa-logo-footer.webp',
    png: '/images/goonjaa-logo-footer.png',
  },
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
  const logoAsset = logoAssetByPlacement[placement];

  if (!hasImageError) {
    return (
      <picture className={cn('block shrink-0', sizingClassName, className)}>
        <source srcSet={logoAsset.webp} type="image/webp" />
        <img
          src={logoAsset.png}
          alt={`${settings.name} logo`}
          className="block h-auto w-full select-none object-contain"
          decoding="async"
          onError={() => setHasImageError(true)}
        />
      </picture>
    );
  }

  return <Logo variant={variant} color={color} className={cn(sizingClassName, className)} />;
};
