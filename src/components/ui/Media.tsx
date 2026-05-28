import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

type MediaTone = 'product' | 'studio' | 'detail';

type ProductImageProps = {
  src?: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number | string;
  height?: number | string;
  tone?: MediaTone;
  sizes?: string;
};

type ClayMediaFallbackProps = Omit<ProductImageProps, 'src'>;

const fallbackSvgByTone: Record<MediaTone, string> = {
  product: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1125" role="img">
      <defs>
        <linearGradient id="paper" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#FDFBF5"/>
          <stop offset="0.56" stop-color="#F7F0E7"/>
          <stop offset="1" stop-color="#EADBCB"/>
        </linearGradient>
        <radialGradient id="clay" cx="48%" cy="42%" r="56%">
          <stop offset="0" stop-color="#C5744F" stop-opacity="0.58"/>
          <stop offset="0.54" stop-color="#B35C38" stop-opacity="0.22"/>
          <stop offset="1" stop-color="#7D2E24" stop-opacity="0"/>
        </radialGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.055"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="900" height="1125" fill="url(#paper)"/>
      <rect width="900" height="1125" fill="url(#clay)"/>
      <path d="M199 781c111-55 264-35 363-111 76-59 89-170 156-231" fill="none" stroke="#B35C38" stroke-width="12" stroke-linecap="round" opacity="0.23"/>
      <path d="M249 742c81-30 140-16 202-64 53-41 68-107 118-151" fill="none" stroke="#7D2E24" stroke-width="3" stroke-linecap="round" opacity="0.28"/>
      <circle cx="610" cy="358" r="96" fill="#B8892E" opacity="0.10"/>
      <circle cx="307" cy="604" r="138" fill="#FDFBF5" opacity="0.38"/>
      <rect x="28" y="28" width="844" height="1069" rx="2" fill="none" stroke="#B35C38" stroke-width="2" opacity="0.12"/>
      <rect width="900" height="1125" filter="url(#grain)" opacity="0.6"/>
    </svg>
  `,
  studio: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1125" role="img">
      <defs>
        <linearGradient id="wash" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#FDFBF5"/>
          <stop offset="0.5" stop-color="#F7F0E7"/>
          <stop offset="1" stop-color="#E8DED4"/>
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.64" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.045"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="900" height="1125" fill="url(#wash)"/>
      <path d="M141 778c163 16 312-62 459-28 64 15 111 44 166 89" fill="none" stroke="#B35C38" stroke-width="18" stroke-linecap="round" opacity="0.12"/>
      <path d="M170 347c77-69 181-95 279-65 104 31 166 115 277 103" fill="none" stroke="#7D2E24" stroke-width="5" stroke-linecap="round" opacity="0.16"/>
      <circle cx="260" cy="666" r="86" fill="#B35C38" opacity="0.11"/>
      <circle cx="624" cy="476" r="158" fill="#B8892E" opacity="0.08"/>
      <path d="M308 544c23-61 68-109 134-143 62 32 99 83 112 153-42 33-84 49-128 48-44-1-83-20-118-58Z" fill="#FDFBF5" opacity="0.34"/>
      <rect x="28" y="28" width="844" height="1069" rx="2" fill="none" stroke="#B35C38" stroke-width="2" opacity="0.10"/>
      <rect width="900" height="1125" filter="url(#grain)" opacity="0.6"/>
    </svg>
  `,
  detail: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1125" role="img">
      <defs>
        <linearGradient id="surface" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#FDFBF5"/>
          <stop offset="0.5" stop-color="#FBF7EF"/>
          <stop offset="1" stop-color="#E5D9CB"/>
        </linearGradient>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.05"/>
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="900" height="1125" fill="url(#surface)"/>
      <circle cx="449" cy="526" r="196" fill="#B35C38" opacity="0.12"/>
      <circle cx="449" cy="526" r="119" fill="#FDFBF5" opacity="0.45"/>
      <path d="M257 640c100-71 280-69 390-2" fill="none" stroke="#7D2E24" stroke-width="8" stroke-linecap="round" opacity="0.18"/>
      <path d="M344 396c40-34 72-51 106-51 34 0 66 17 106 51" fill="none" stroke="#B8892E" stroke-width="7" stroke-linecap="round" opacity="0.22"/>
      <path d="M450 344v369" stroke="#B35C38" stroke-width="3" opacity="0.20"/>
      <rect x="28" y="28" width="844" height="1069" rx="2" fill="none" stroke="#B35C38" stroke-width="2" opacity="0.11"/>
      <rect width="900" height="1125" filter="url(#grain)" opacity="0.6"/>
    </svg>
  `,
};

const fallbackSrcByTone = Object.fromEntries(
  Object.entries(fallbackSvgByTone).map(([tone, svg]) => [
    tone,
    `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}`,
  ])
) as Record<MediaTone, string>;

export const ClayMediaFallback: React.FC<ClayMediaFallbackProps> = ({
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  tone = 'studio',
  sizes,
}) => (
  <img
    src={fallbackSrcByTone[tone]}
    alt={alt}
    loading={loading}
    fetchPriority={fetchPriority}
    decoding="async"
    width={width}
    height={height}
    sizes={sizes}
    draggable={false}
    data-media-fallback="true"
    className={cn('h-full w-full object-cover', className)}
  />
);

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  tone = 'product',
  sizes,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const imageSrc = src && !hasError ? src : fallbackSrcByTone[tone];

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      width={width}
      height={height}
      sizes={sizes}
      draggable={false}
      data-media-fallback={!src || hasError ? 'true' : undefined}
      onError={() => {
        if (!hasError) setHasError(true);
      }}
      className={cn('h-full w-full object-cover', className)}
    />
  );
};
