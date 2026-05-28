import React, { useState } from 'react';
import { getPrimaryLogoUrl, type BrandSettings } from '../../lib/brandSettings';
import { cn } from '../../lib/utils';
import { Logo } from './Logo';

type BrandLogoProps = {
  settings: BrandSettings;
  variant?: 'wordmark' | 'monogram' | 'full';
  className?: string;
  color?: string;
};

export const BrandLogo: React.FC<BrandLogoProps> = ({ settings, variant = 'wordmark', className, color }) => {
  const [hasError, setHasError] = useState(false);
  const uploadedLogoUrl = !hasError ? getPrimaryLogoUrl(settings) : null;

  if (uploadedLogoUrl) {
    return (
      <img
        src={uploadedLogoUrl}
        alt={`${settings.name} logo`}
        className={cn('h-auto max-h-full w-auto object-contain', className)}
        decoding="async"
        onError={() => setHasError(true)}
      />
    );
  }

  return <Logo variant={variant} color={color} className={className} />;
};
