import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { mockProducts } from '../src/lib/data/mockProducts';
import type { Product } from '../src/types';

config({ path: '.env.local' });
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL. Add it to .env.local before seeding.');
}

if (!supabaseSecretKey) {
  throw new Error(
    'Missing SUPABASE_SECRET_KEY. Add your sb_secret_ value locally for this server-side seed script only.'
  );
}

const supabase = createClient(supabaseUrl, supabaseSecretKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const toPaise = (value?: number) => (typeof value === 'number' ? Math.round(value * 100) : null);

const safeImagePath = (productId: string, image: string, index: number) => {
  const extension = image.match(/\.(png|jpe?g|webp|avif)(?:\?|$)/i)?.[1]?.toLowerCase() ?? 'webp';
  return `products/${productId}/seed-${String(index + 1).padStart(2, '0')}.${extension === 'jpg' ? 'jpeg' : extension}`;
};

const seedProduct = async (
  product: Product,
  categoryByName: Map<string, string>,
  collectionByName: Map<string, string>,
  sortOrder: number
) => {
  const categoryId = categoryByName.get(product.mainCategory) ?? null;
  const { data, error } = await supabase
    .from('products')
    .upsert(
      {
        sku: product.id,
        slug: product.slug,
        name: product.name,
        short_description: product.shortDescription,
        long_description: product.longDescription ?? null,
        price_inr_paise: toPaise(product.price) ?? 0,
        compare_at_price_inr_paise: toPaise(product.originalPrice),
        category_id: categoryId,
        subcategory: product.subCategory,
        materials: product.materials,
        dimensions: product.dimensions ?? null,
        weight: product.weight ?? null,
        care_instructions: product.careInstructions ?? null,
        stock_status: product.stockStatus,
        stock_quantity: product.stockQuantity,
        is_active: true,
        is_new: product.isNew,
        is_bestseller: product.isBestseller,
        is_sale: product.isSale,
        is_featured: product.isBestseller || product.isNew,
        tags: product.tags,
        occasion: product.occasion,
        color_family: product.colorFamily,
        allow_prepaid: true,
        allow_cod: product.stockStatus !== 'out_of_stock',
        allow_advance_booking: product.stockStatus === 'made_to_order',
        allow_pickup: true,
        sort_order: sortOrder,
      },
      { onConflict: 'sku' }
    )
    .select('id')
    .single();

  if (error) throw new Error(`Failed to upsert ${product.name}: ${error.message}`);

  if (!data?.id) throw new Error(`Supabase did not return an id for ${product.name}.`);

  const productId = data.id as string;
  const selectedCollectionIds = (product.collection ?? [])
    .map((collectionName) => collectionByName.get(collectionName))
    .filter((id): id is string => Boolean(id));

  await Promise.all([
    supabase.from('product_collections').delete().eq('product_id', productId),
    supabase.from('product_colour_options').delete().eq('product_id', productId),
    supabase.from('product_images').delete().eq('product_id', productId),
  ]);

  if (selectedCollectionIds.length > 0) {
    const { error: collectionError } = await supabase.from('product_collections').insert(
      selectedCollectionIds.map((collectionId) => ({
        product_id: productId,
        collection_id: collectionId,
      }))
    );

    if (collectionError) throw new Error(`Failed to link collections for ${product.name}: ${collectionError.message}`);
  }

  if ((product.colourOptions?.length ?? 0) > 0) {
    const { error: colourError } = await supabase.from('product_colour_options').insert(
      product.colourOptions!.map((colour, index) => ({
        product_id: productId,
        slug: colour.id || slugify(colour.name),
        name: colour.name,
        swatch: colour.swatch,
        is_available: colour.available !== false,
        sort_order: index,
      }))
    );

    if (colourError) throw new Error(`Failed to seed colours for ${product.name}: ${colourError.message}`);
  }

  if (product.images.length > 0) {
    const { error: imageError } = await supabase.from('product_images').insert(
      product.images.map((image, index) => ({
        product_id: productId,
        storage_path: safeImagePath(productId, image, index),
        public_url: image.startsWith('http') ? image : null,
        alt_text: `${product.name}, handmade terracotta jewellery`,
        sort_order: index,
        is_primary: index === 0,
      }))
    );

    if (imageError) throw new Error(`Failed to seed images for ${product.name}: ${imageError.message}`);
  }

  return productId;
};

const main = async () => {
  const [{ data: categories, error: categoriesError }, { data: collections, error: collectionsError }] =
    await Promise.all([
      supabase.from('categories').select('id,name'),
      supabase.from('collections').select('id,name'),
    ]);

  if (categoriesError) throw new Error(`Failed to load categories: ${categoriesError.message}`);
  if (collectionsError) throw new Error(`Failed to load collections: ${collectionsError.message}`);

  const categoryByName = new Map((categories ?? []).map((category) => [category.name, category.id]));
  const collectionByName = new Map((collections ?? []).map((collection) => [collection.name, collection.id]));

  for (const [index, product] of mockProducts.entries()) {
    await seedProduct(product, categoryByName, collectionByName, index);
    console.log(`Seeded ${product.id} ${product.name}`);
  }

  console.log(`Seeded ${mockProducts.length} catalog products.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
