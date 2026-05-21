import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  absoluteUrl,
  fullSeoTitle,
  getRouteSeo,
  getSchemasForSeo,
  getSocialImage,
  normalizePath,
  type JsonLd,
} from '../../lib/seo';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  schema?: JsonLd | JsonLd[];
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  canonicalPath,
  noIndex,
  schema,
}) => {
  const location = useLocation();

  useEffect(() => {
    const routeSeo = getRouteSeo(location.pathname);
    const canonicalUrl = absoluteUrl(canonicalPath || url || routeSeo.path || normalizePath(location.pathname));
    const socialImage = getSocialImage(image || routeSeo.image);
    const resolvedNoIndex = noIndex ?? routeSeo.noIndex ?? false;
    const resolvedTitle = fullSeoTitle(title);

    document.title = resolvedTitle;

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

    const setLink = (rel: string, href: string) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    setNamedMeta('description', description);
    setNamedMeta('robots', resolvedNoIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large');
    setNamedMeta('twitter:card', 'summary_large_image');
    setNamedMeta('twitter:title', resolvedTitle);
    setNamedMeta('twitter:description', description);
    setNamedMeta('twitter:image', socialImage);

    if (keywords) {
      setNamedMeta('keywords', keywords);
    }

    setPropertyMeta('og:title', resolvedTitle);
    setPropertyMeta('og:description', description);
    setPropertyMeta('og:type', routeSeo.type === 'product' ? 'product' : 'website');
    setPropertyMeta('og:site_name', 'goonjaa');
    setPropertyMeta('og:url', canonicalUrl);
    setPropertyMeta('og:image', socialImage);

    setLink('canonical', canonicalUrl);

    document
      .querySelectorAll<HTMLScriptElement>('script[data-goonjaa-jsonld="true"]')
      .forEach((script) => script.remove());

    getSchemasForSeo(routeSeo, schema).forEach((item, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.goonjaaJsonld = 'true';
      script.id = `goonjaa-jsonld-${index + 1}`;
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }, [canonicalPath, description, image, keywords, location.pathname, noIndex, schema, title, url]);

  return null;
};
