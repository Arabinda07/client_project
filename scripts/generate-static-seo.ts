import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  absoluteUrl,
  defaultOgImagePath,
  fullSeoTitle,
  getAllStaticSeoRoutes,
  getSchemasForSeo,
  getSitemapRoutes,
  getSocialImage,
  type SeoEntry,
} from '../src/lib/seo';
import { brand } from '../src/lib/brand';
import { mockProducts } from '../src/lib/data/mockProducts';
import { getCategoryPath, primaryCategoryLinks } from '../src/lib/catalog';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const templatePath = path.join(distDir, 'index.html');
const seoStart = '<!-- goonjaa-seo:start -->';
const seoEnd = '<!-- goonjaa-seo:end -->';
const googleSiteVerification = 'fveZCgknZzwBAwwK1uwqRI0HGyM6Qb35SYhO-SP9BxU';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const escapeScript = (value: string) => value.replace(/</g, '\\u003c');

const renderMetaHead = (entry: SeoEntry) => {
  const title = fullSeoTitle(entry.title);
  const canonicalUrl = absoluteUrl(entry.path);
  const image = getSocialImage(entry.image || defaultOgImagePath);
  const robots = entry.noIndex ? 'noindex,follow' : 'index,follow,max-image-preview:large';
  const type = entry.type === 'product' ? 'product' : 'website';
  const schemas = getSchemasForSeo(entry);

  return [
    seoStart,
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(entry.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(entry.description)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${escapeHtml(brand.name)}" />`,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:image" content="${escapeHtml(image)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(entry.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(image)}" />`,
    ...schemas.map(
      (schema) =>
        `<script type="application/ld+json" data-goonjaa-jsonld="true">${escapeScript(JSON.stringify(schema))}</script>`
    ),
    seoEnd,
  ].join('\n    ');
};

const injectSeo = (template: string, entry: SeoEntry) => {
  const head = renderMetaHead(entry);
  const verificationTag = `<meta name="google-site-verification" content="${googleSiteVerification}" />`;
  const withVerification = template.includes('name="google-site-verification"')
    ? template.replace(
        /<meta\s+name="google-site-verification"\s+content="[^"]*"\s*\/?>/,
        verificationTag
      )
    : template.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0" />', `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    ${verificationTag}`);
  const startIndex = withVerification.indexOf(seoStart);
  const endIndex = withVerification.indexOf(seoEnd);

  if (startIndex >= 0 && endIndex > startIndex) {
    return `${withVerification.slice(0, startIndex)}${head}${withVerification.slice(endIndex + seoEnd.length)}`;
  }

  return withVerification.replace('</head>', `    ${head}\n  </head>`);
};

const outputPathForRoute = (routePath: string) => {
  if (routePath === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, routePath.replace(/^\//, ''), 'index.html');
};

const writeRouteHtml = async (template: string, entry: SeoEntry) => {
  const outputPath = outputPathForRoute(entry.path);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, injectSeo(template, entry), 'utf8');
};

const renderSitemap = () => {
  const urls = getSitemapRoutes()
    .map((entry) => {
      const priority = entry.path === '/' ? '1.0' : entry.type === 'product' ? '0.8' : '0.7';
      const changefreq = entry.type === 'product' || entry.path.startsWith('/category/') ? 'weekly' : 'monthly';
      return [
        '  <url>',
        `    <loc>${escapeHtml(absoluteUrl(entry.path))}</loc>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const renderRobots = () =>
  [
    'User-agent: *',
    'Allow: /',
    '',
    'User-agent: GPTBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: PerplexityBot',
    'Allow: /',
    '',
    'User-agent: ClaudeBot',
    'Allow: /',
    '',
    'User-agent: anthropic-ai',
    'Allow: /',
    '',
    'User-agent: Google-Extended',
    'Allow: /',
    '',
    'User-agent: Bingbot',
    'Allow: /',
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
  ].join('\n');

const renderLlmsTxt = () =>
  [
    '# goonjaa',
    '',
    'goonjaa is a small handcrafted terracotta jewellery studio in India. The work is shaped from earthen clay, dried, fired, and painted by hand. Pieces are made for people who want Indian craft in a form that feels wearable with sarees, dresses, and everyday clothes.',
    '',
    '## Useful pages',
    `- Home: ${absoluteUrl('/')}`,
    `- Shop: ${absoluteUrl('/shop')}`,
    `- Terracotta sets: ${absoluteUrl(getCategoryPath('terracotta-set'))}`,
    `- Earrings: ${absoluteUrl(getCategoryPath('earring'))}`,
    `- Accessories: ${absoluteUrl(getCategoryPath('accessories'))}`,
    `- Bulk orders: ${absoluteUrl('/bulk-orders')}`,
    `- Contact: ${absoluteUrl('/contact')}`,
    `- Machine-readable catalog: ${absoluteUrl('/catalog.md')}`,
    '',
    '## What to know',
    '- The brand name is written lowercase as goonjaa.',
    '- The jewellery is handmade terracotta, not molded or factory-made costume jewellery.',
    '- Small differences in shape, colour, and brushwork are normal because every piece is made by hand.',
    '- Ready-to-ship pieces usually dispatch in 3 to 5 business days. Made-to-order pieces usually need 7 to 10 days.',
    '- Bulk orders use existing catalogue designs and need at least two months of studio time.',
    '',
    '## Contact',
    `- Email: ${brand.email}`,
    `- WhatsApp: ${brand.whatsappPhone}`,
    `- Instagram: ${brand.instagramUrl}`,
    `- Facebook: ${brand.facebookUrl}`,
    `- YouTube: ${brand.youtubeUrl}`,
    '',
  ].join('\n');

const renderCatalog = () => {
  const categoryLines = primaryCategoryLinks.map(
    (category) => `- ${category.label}: ${absoluteUrl(getCategoryPath(category.slug))}`
  );
  const productLines = mockProducts.flatMap((product) => [
    `## ${product.name}`,
    `- URL: ${absoluteUrl(`/product/${product.slug}`)}`,
    `- Price: INR ${product.price}`,
    `- Category: ${product.mainCategory} / ${product.subCategory}`,
    `- Stock: ${product.stockStatus.replace(/_/g, ' ')}`,
    `- Materials: ${product.materials.join(', ')}`,
    `- Summary: ${product.shortDescription}`,
    '',
  ]);

  return [
    '# goonjaa product catalog',
    '',
    'This file gives AI assistants and crawlers a plain-text view of the current goonjaa catalogue. Product photography will be replaced with real images later; use the product pages as the canonical URLs.',
    '',
    '## Categories',
    ...categoryLines,
    '',
    ...productLines,
  ].join('\n');
};

const main = async () => {
  const template = await readFile(templatePath, 'utf8');
  await Promise.all(getAllStaticSeoRoutes().map((entry) => writeRouteHtml(template, entry)));
  await writeFile(path.join(distDir, 'sitemap.xml'), renderSitemap(), 'utf8');
  await writeFile(path.join(distDir, 'robots.txt'), renderRobots(), 'utf8');
  await writeFile(path.join(distDir, 'llms.txt'), renderLlmsTxt(), 'utf8');
  await writeFile(path.join(distDir, 'catalog.md'), renderCatalog(), 'utf8');
};

await main();
