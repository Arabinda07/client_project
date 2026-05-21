import { brand } from './brand';
import { accessoryCategory, getCategoryLabel, getCategoryPath, primaryCategoryLinks, resolveCategoryParam } from './catalog';
import { categories, mockProducts } from './data/mockProducts';
import type { Product } from '../types';

export type JsonLd = Record<string, unknown>;

export type SeoEntry = {
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'product';
  image?: string;
  noIndex?: boolean;
  includeInSitemap?: boolean;
  schema?: JsonLd[];
};

export const defaultOgImagePath = '/images/goonjaa-og.svg';

const categoryDescriptions: Record<string, string> = {
  'Terracotta Set': 'Shop handmade terracotta necklace sets shaped, fired, and painted by hand for festive and everyday wear.',
  Earring: 'Browse lightweight handmade terracotta earrings, from painted jhumkas to small sculptural clay pieces.',
  Accessories: 'Find handmade terracotta rings, bangles, clips, brooches, hair pins, and small clay details.',
};

export const studioFaqs = [
  {
    question: 'How long do made-to-order terracotta pieces take?',
    answer: 'Made-to-order goonjaa pieces usually need 7 to 10 days before dispatch because each design is shaped, dried, fired, and painted by hand.',
  },
  {
    question: 'Can I request bulk orders for an event?',
    answer: 'Bulk orders can be requested for existing catalogue designs with at least two months of studio time. The studio confirms the piece, quantity, colours, and delivery date before accepting the order.',
  },
  {
    question: 'How should terracotta jewellery be cared for?',
    answer: 'Keep terracotta jewellery away from water, perfume, and harsh chemicals. Store each piece separately and handle it gently, since fired clay can break if dropped.',
  },
  {
    question: 'Are small variations normal in handmade jewellery?',
    answer: 'Yes. Small differences in shape, colour, brushwork, and finish are part of goonjaa pieces because they are made by hand without molds.',
  },
];

const siteUrl = brand.siteUrl.replace(/\/$/, '');

export const normalizePath = (path = '/') => {
  const cleanPath = path.split('#')[0].split('?')[0] || '/';
  const withSlash = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  return withSlash === '/' ? '/' : withSlash.replace(/\/$/, '');
};

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = normalizePath(path);
  return `${siteUrl}${normalized === '/' ? '/' : normalized}`;
};

export const fullSeoTitle = (title: string) => `${brand.name} | ${title}`;

const isPlaceholderImage = (image?: string) => !image || image.includes('placehold.co') || image.startsWith('data:');

export const getSocialImage = (image?: string) =>
  absoluteUrl(isPlaceholderImage(image) ? defaultOgImagePath : image);

const productImageUrls = (product: Product) =>
  product.images.filter((image) => !isPlaceholderImage(image)).map((image) => absoluteUrl(image));

const stockAvailability = (product: Product) => {
  if (product.stockStatus === 'out_of_stock') return 'https://schema.org/OutOfStock';
  if (product.stockStatus === 'made_to_order') return 'https://schema.org/PreOrder';
  return 'https://schema.org/InStock';
};

export const organizationSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: brand.name,
  url: absoluteUrl('/'),
  description: brand.description,
  email: brand.email,
  telephone: brand.phone,
  sameAs: [brand.instagramUrl],
});

export const websiteSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: brand.name,
  url: absoluteUrl('/'),
  description: brand.description,
});

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const faqSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: studioFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const productSchema = (product: Product): JsonLd => {
  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.id,
    description: product.longDescription || product.shortDescription,
    category: product.mainCategory,
    material: product.materials,
    brand: {
      '@type': 'Brand',
      name: brand.name,
    },
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/product/${product.slug}`),
      priceCurrency: 'INR',
      price: product.price,
      availability: stockAvailability(product),
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  const images = productImageUrls(product);
  if (images.length > 0) {
    schema.image = images;
  }

  return schema;
};

const pageSeo: Record<string, SeoEntry> = {
  '/': {
    path: '/',
    title: 'Handcrafted Terracotta Jewellery',
    description: 'Discover lightweight terracotta jewellery that brings traditional Indian motifs into modern wardrobes.',
    schema: [
      breadcrumbSchema([{ name: 'Home', path: '/' }]),
    ],
  },
  '/shop': {
    path: '/shop',
    title: 'Shop Handcrafted Terracotta',
    description: 'Explore handmade terracotta jewellery, including necklace sets, earrings, rings, bangles, and small clay accessories.',
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
      ]),
    ],
  },
  '/about': {
    path: '/about',
    title: 'Our Story',
    description: 'Meet the artist behind goonjaa and the handmade terracotta jewellery shaped in her studio.',
  },
  '/bulk-orders': {
    path: '/bulk-orders',
    title: 'Bulk Orders',
    description: `Plan bulk orders for existing ${brand.name} terracotta jewellery designs with a two-month advance booking window.`,
  },
  '/testimonials': {
    path: '/testimonials',
    title: 'Happy Customers',
    description: 'Notes from customers who have worn goonjaa handmade terracotta jewellery.',
  },
  '/contact': {
    path: '/contact',
    title: 'Contact',
    description: `Write to the ${brand.name} studio for jewellery care, product questions, or order support.`,
    schema: [
      faqSchema(),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  },
  '/cart': {
    path: '/cart',
    title: 'Cart',
    description: 'Review your selected goonjaa terracotta jewellery pieces.',
    noIndex: true,
    includeInSitemap: false,
  },
  '/checkout': {
    path: '/checkout',
    title: 'Checkout',
    description: 'Complete your goonjaa terracotta jewellery order.',
    noIndex: true,
    includeInSitemap: false,
  },
  '/policies/shipping': {
    path: '/policies/shipping',
    title: 'Shipping & Returns',
    description: `${brand.name} shipping, returns, handmade variation, and delivery timing for terracotta jewellery orders.`,
  },
  '/policies/privacy': {
    path: '/policies/privacy',
    title: 'Privacy Policy',
    description: `${brand.name} privacy policy for handmade terracotta jewellery orders and studio communication.`,
  },
  '/policies/terms': {
    path: '/policies/terms',
    title: 'Terms & Conditions',
    description: `${brand.name} terms for purchasing handmade terracotta jewellery.`,
  },
};

const categorySeo = (path: string): SeoEntry | null => {
  const slug = path.replace('/category/', '');
  const category = resolveCategoryParam(slug);
  if (!category) return null;

  return {
    path: getCategoryPath(category.slug),
    title: category.label,
    description: categoryDescriptions[category.name] || `Shop handmade ${category.label.toLowerCase()} from ${brand.name}.`,
    schema: [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: category.label, path: getCategoryPath(category.slug) },
      ]),
    ],
  };
};

const productSeo = (path: string): SeoEntry | null => {
  const slug = path.replace('/product/', '');
  const product = mockProducts.find((item) => item.slug === slug);
  if (!product) return null;

  const primaryCategory = primaryCategoryLinks.find((category) => category.name === product.mainCategory);
  const categoryPath = getCategoryPath(primaryCategory?.slug ?? accessoryCategory.slug);
  const categoryLabel = primaryCategory?.label ?? accessoryCategory.label;

  return {
    path: `/product/${product.slug}`,
    title: product.name,
    description: product.shortDescription,
    type: 'product',
    image: product.images[0],
    schema: [
      productSchema(product),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: categoryLabel, path: categoryPath },
        { name: product.name, path: `/product/${product.slug}` },
      ]),
    ],
  };
};

export const getRouteSeo = (path: string): SeoEntry => {
  const normalized = normalizePath(path);
  if (pageSeo[normalized]) return pageSeo[normalized];
  if (normalized.startsWith('/category/')) return categorySeo(normalized) ?? notFoundSeo(normalized);
  if (normalized.startsWith('/product/')) return productSeo(normalized) ?? notFoundSeo(normalized);
  return notFoundSeo(normalized);
};

export const getSchemasForSeo = (entry: SeoEntry, extraSchema?: JsonLd | JsonLd[]) => {
  const extras = extraSchema ? (Array.isArray(extraSchema) ? extraSchema : [extraSchema]) : entry.schema ?? [];
  return [organizationSchema(), websiteSchema(), ...extras];
};

export const getAllStaticSeoRoutes = () => {
  const categoryRoutes = primaryCategoryLinks.map((category) => getRouteSeo(getCategoryPath(category.slug)));
  const productRoutes = mockProducts.map((product) => getRouteSeo(`/product/${product.slug}`));

  return [
    ...Object.values(pageSeo),
    ...categoryRoutes,
    ...productRoutes,
  ];
};

export const getSitemapRoutes = () =>
  getAllStaticSeoRoutes().filter((entry) => entry.noIndex !== true && entry.includeInSitemap !== false);

const notFoundSeo = (path: string): SeoEntry => ({
  path,
  title: 'Page Not Found',
  description: 'This goonjaa page could not be found.',
  noIndex: true,
  includeInSitemap: false,
});

export const visibleProductCategories = categories.filter((category) =>
  primaryCategoryLinks.some((primary) => primary.name === category.name)
);
