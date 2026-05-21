import { categories } from './data/mockProducts';

export const accessoryCategory = {
  name: 'Accessories',
  slug: 'accessories',
  label: 'Accessories',
} as const;

export const primaryCategoryLinks = [
  { name: 'Terracotta Set', slug: 'terracotta-set', label: 'Terracotta Sets' },
  { name: 'Earring', slug: 'earring', label: 'Earrings' },
  accessoryCategory,
] as const;

export type ResolvedCategory = {
  name: string;
  slug: string;
  label: string;
  isLegacyPath: boolean;
};

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const decodeRouteParam = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const getCategoryPath = (slug: string) => `/category/${slug}`;

export const getCategoryLabel = (name: string) =>
  primaryCategoryLinks.find((category) => category.name === name)?.label ?? `${name}s`;

export const resolveCategoryParam = (param?: string): ResolvedCategory | null => {
  if (!param) return null;

  const decoded = decodeRouteParam(param);
  const normalized = slugify(decoded);
  const matched =
    primaryCategoryLinks.find((category) => category.slug === normalized || slugify(category.name) === normalized) ??
    categories.find((category) => category.slug === normalized || slugify(category.name) === normalized);

  if (!matched) return null;

  const label = 'label' in matched ? matched.label : getCategoryLabel(matched.name);

  return {
    name: matched.name,
    slug: matched.slug,
    label,
    isLegacyPath: param !== matched.slug,
  };
};

export const isAccessoryCategoryName = (name?: string) => name === accessoryCategory.name;
