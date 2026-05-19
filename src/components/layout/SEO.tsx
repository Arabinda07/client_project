import React, { useEffect } from 'react';
import { brand } from '../../lib/brand';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, url }) => {
  useEffect(() => {
    document.title = `${title} | ${brand.name}`;

    const setNamedMeta = (name: string, content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const setPropertyMeta = (property: string, content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setNamedMeta('description', description);

    if (keywords) {
      setNamedMeta('keywords', keywords);
    }

    setPropertyMeta('og:title', `${title} | ${brand.name}`);
    setPropertyMeta('og:description', description);

    if (image) {
      setPropertyMeta('og:image', image);
    }

    if (url) {
      setPropertyMeta('og:url', url);
    }
  }, [title, description, keywords, image, url]);

  return null;
};
