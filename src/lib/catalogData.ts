import type { Product } from '../types';
import { mockProducts } from './data/mockProducts';
import { getProductImageUrl, supabase } from './supabaseClient';

type CatalogProductRow = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  short_description: string;
  long_description: string | null;
  price_inr_paise: number;
  compare_at_price_inr_paise: number | null;
  category_id: string | null;
  subcategory: string | null;
  materials: string[];
  dimensions: string | null;
  weight: string | null;
  care_instructions: string | null;
  stock_status: Product['stockStatus'];
  is_new: boolean;
  is_bestseller: boolean;
  is_sale: boolean;
  is_featured: boolean;
  tags: string[];
  occasion: string[];
  color_family: string[];
  created_at: string;
};

type CategoryRow = {
  id: string;
  name: string;
};

type CollectionRow = {
  id: string;
  name: string;
};

type ProductImageRow = {
  product_id: string;
  storage_path: string;
  public_url: string | null;
  sort_order: number;
};

type ProductColourRow = {
  id: string;
  product_id: string;
  slug: string;
  name: string;
  swatch: string | null;
  is_available: boolean;
  sort_order: number;
};

type ProductCollectionRow = {
  product_id: string;
  collection_id: string;
};

const fromPaise = (value?: number | null) => (value ? value / 100 : undefined);

const displayStockQuantity = (stockStatus: Product['stockStatus']) =>
  stockStatus === 'in_stock' ? 1 : 0;

const byProductId = <T extends { product_id: string }>(rows: T[]) =>
  rows.reduce<Record<string, T[]>>((groups, row) => {
    groups[row.product_id] = [...(groups[row.product_id] ?? []), row];
    return groups;
  }, {});

const mapCatalogProducts = ({
  products,
  categories,
  collections,
  images,
  colours,
  productCollections,
}: {
  products: CatalogProductRow[];
  categories: CategoryRow[];
  collections: CollectionRow[];
  images: ProductImageRow[];
  colours: ProductColourRow[];
  productCollections: ProductCollectionRow[];
}): Product[] => {
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const collectionById = new Map(collections.map((collection) => [collection.id, collection]));
  const imagesByProduct = byProductId(images);
  const coloursByProduct = byProductId(colours);
  const collectionLinksByProduct = byProductId(productCollections);

  return products.map((product) => {
    const productImages = (imagesByProduct[product.id] ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => image.public_url ?? getProductImageUrl(image.storage_path))
      .filter((image): image is string => Boolean(image));

    const productCollectionsForItem = (collectionLinksByProduct[product.id] ?? [])
      .map((link) => collectionById.get(link.collection_id)?.name)
      .filter((name): name is string => Boolean(name));

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: fromPaise(product.price_inr_paise) ?? 0,
      originalPrice: fromPaise(product.compare_at_price_inr_paise),
      mainCategory: categoryById.get(product.category_id ?? '')?.name ?? '',
      subCategory: product.subcategory ?? '',
      collection: productCollectionsForItem,
      shortDescription: product.short_description,
      longDescription: product.long_description ?? undefined,
      images: productImages,
      materials: product.materials ?? [],
      dimensions: product.dimensions ?? undefined,
      weight: product.weight ?? undefined,
      careInstructions: product.care_instructions ?? undefined,
      stockStatus: product.stock_status,
      stockQuantity: displayStockQuantity(product.stock_status),
      isNew: product.is_new,
      isBestseller: product.is_bestseller,
      isSale: product.is_sale,
      tags: product.tags ?? [],
      occasion: product.occasion ?? [],
      colorFamily: product.color_family ?? [],
      colourOptions: (coloursByProduct[product.id] ?? [])
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((colour) => ({
          id: colour.id,
          name: colour.name,
          swatch: colour.swatch ?? '#B35C38',
          available: colour.is_available,
        })),
      createdAt: product.created_at,
    };
  });
};

export const fetchCatalogProducts = async (): Promise<Product[]> => {
  if (!supabase) return mockProducts;

  try {
    const [
      productsResult,
      categoriesResult,
      collectionsResult,
      imagesResult,
      coloursResult,
      productCollectionsResult,
    ] = await Promise.all([
      supabase
        .from('products')
        .select(
          [
            'id',
            'sku',
            'slug',
            'name',
            'short_description',
            'long_description',
            'price_inr_paise',
            'compare_at_price_inr_paise',
            'category_id',
            'subcategory',
            'materials',
            'dimensions',
            'weight',
            'care_instructions',
            'stock_status',
            'is_new',
            'is_bestseller',
            'is_sale',
            'is_featured',
            'tags',
            'occasion',
            'color_family',
            'created_at',
          ].join(',')
        )
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false }),
      supabase.from('categories').select('id,name'),
      supabase.from('collections').select('id,name'),
      supabase.from('product_images').select('product_id,storage_path,public_url,sort_order'),
      supabase.from('product_colour_options').select('id,product_id,slug,name,swatch,is_available,sort_order'),
      supabase.from('product_collections').select('product_id,collection_id'),
    ]);

    const firstError =
      productsResult.error ??
      categoriesResult.error ??
      collectionsResult.error ??
      imagesResult.error ??
      coloursResult.error ??
      productCollectionsResult.error;

    if (firstError) {
      console.warn('Falling back to mock products after Supabase catalog error:', firstError.message);
      return mockProducts;
    }

    const products = (productsResult.data ?? []) as CatalogProductRow[];
    if (products.length === 0) return mockProducts;

    return mapCatalogProducts({
      products,
      categories: (categoriesResult.data ?? []) as CategoryRow[],
      collections: (collectionsResult.data ?? []) as CollectionRow[],
      images: (imagesResult.data ?? []) as ProductImageRow[],
      colours: (coloursResult.data ?? []) as ProductColourRow[],
      productCollections: (productCollectionsResult.data ?? []) as ProductCollectionRow[],
    });
  } catch (error) {
    console.warn('Falling back to mock products after Supabase catalog exception:', error);
    return mockProducts;
  }
};

export const fetchCatalogProductBySlug = async (slug?: string): Promise<Product | null> => {
  if (!slug) return null;

  const products = await fetchCatalogProducts();
  return products.find((product) => product.slug === slug) ?? null;
};
