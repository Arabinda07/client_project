import type { Database, Json } from '../types/database';
import { getProductImageUrl, supabase } from './supabaseClient';

export type AdminProfile = Pick<Database['public']['Tables']['profiles']['Row'], 'id' | 'full_name' | 'role' | 'is_active'>;
export type AdminProduct = Database['public']['Tables']['products']['Row'];
export type AdminCategory = Database['public']['Tables']['categories']['Row'];
export type AdminCollection = Database['public']['Tables']['collections']['Row'];
export type AdminProductImage = Database['public']['Tables']['product_images']['Row'];
export type AdminProductColour = Database['public']['Tables']['product_colour_options']['Row'];

export type AdminProductListItem = AdminProduct & {
  categoryName?: string;
  primaryImageUrl?: string;
};

export type AdminProductEditorData = {
  product: AdminProduct | null;
  images: AdminProductImage[];
  colours: AdminProductColour[];
  collectionIds: string[];
  categories: AdminCategory[];
  collections: AdminCollection[];
};

export type ProductImageDraft = {
  id?: string;
  storagePath?: string;
  publicUrl?: string | null;
  altText?: string | null;
  sortOrder: number;
  isPrimary: boolean;
};

export type ProductColourDraft = {
  id?: string;
  slug: string;
  name: string;
  swatch?: string | null;
  isAvailable: boolean;
  sortOrder: number;
};

export type ProductSaveInput = {
  id?: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string | null;
  priceInrPaise: number;
  compareAtPriceInrPaise?: number | null;
  categoryId?: string | null;
  subcategory?: string | null;
  materials: string[];
  dimensions?: string | null;
  weight?: string | null;
  careInstructions?: string | null;
  stockStatus: Database['public']['Enums']['stock_status'];
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  isNew: boolean;
  isBestseller: boolean;
  isSale: boolean;
  isFeatured: boolean;
  tags: string[];
  occasion: string[];
  colorFamily: string[];
  allowPrepaid: boolean;
  allowCod: boolean;
  allowAdvanceBooking: boolean;
  allowPickup: boolean;
  sortOrder: number;
  collectionIds: string[];
  colours: ProductColourDraft[];
};

export type StoreSettingsDraft = {
  contact: {
    email: string;
    whatsapp_phone: string;
    instagram_url: string;
  };
  checkout: {
    free_shipping_threshold_inr_paise: number;
    standard_shipping_fee_inr_paise: number;
    allow_cod: boolean;
    allow_prepaid: boolean;
    allow_pickup: boolean;
    allow_advance_booking: boolean;
  };
};

const getClient = () => {
  if (!supabase) throw new Error('Supabase is not configured.');
  return supabase as any;
};

const ADMIN_ROLES = new Set<Database['public']['Enums']['profile_role']>(['owner', 'admin', 'staff']);

export const getPublicImageUrl = (image: Pick<AdminProductImage, 'public_url' | 'storage_path'>) =>
  image.public_url ?? getProductImageUrl(image.storage_path) ?? '';

export const getCurrentAdminProfile = async (): Promise<AdminProfile | null> => {
  const client = getClient();
  const { data: sessionData, error: sessionError } = await client.auth.getSession();
  if (sessionError) throw sessionError;

  const userId = sessionData.session?.user.id;
  if (!userId) return null;

  const { data, error } = await client
    .from('profiles')
    .select('id,full_name,role,is_active')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  if (!data?.is_active || !ADMIN_ROLES.has(data.role)) return null;

  return data as AdminProfile;
};

export const fetchAdminCatalogOptions = async () => {
  const client = getClient();
  const [categoriesResult, collectionsResult] = await Promise.all([
    client.from('categories').select('*').order('sort_order', { ascending: true }).order('name', { ascending: true }),
    client.from('collections').select('*').order('sort_order', { ascending: true }).order('name', { ascending: true }),
  ]);

  if (categoriesResult.error) throw categoriesResult.error;
  if (collectionsResult.error) throw collectionsResult.error;

  return {
    categories: (categoriesResult.data ?? []) as AdminCategory[],
    collections: (collectionsResult.data ?? []) as AdminCollection[],
  };
};

export const fetchAdminProducts = async (): Promise<AdminProductListItem[]> => {
  const client = getClient();
  const [productsResult, categoriesResult, imagesResult] = await Promise.all([
    client.from('products').select('*').order('updated_at', { ascending: false }),
    client.from('categories').select('*'),
    client
      .from('product_images')
      .select('*')
      .order('is_primary', { ascending: false })
      .order('sort_order', { ascending: true }),
  ]);

  if (productsResult.error) throw productsResult.error;
  if (categoriesResult.error) throw categoriesResult.error;
  if (imagesResult.error) throw imagesResult.error;

  const categories = new Map(((categoriesResult.data ?? []) as AdminCategory[]).map((category) => [category.id, category.name]));
  const primaryImages = new Map<string, AdminProductImage>();
  for (const image of (imagesResult.data ?? []) as AdminProductImage[]) {
    if (!primaryImages.has(image.product_id)) primaryImages.set(image.product_id, image);
  }

  return ((productsResult.data ?? []) as AdminProduct[]).map((product) => ({
    ...product,
    categoryName: product.category_id ? categories.get(product.category_id) : undefined,
    primaryImageUrl: primaryImages.get(product.id) ? getPublicImageUrl(primaryImages.get(product.id)!) : undefined,
  }));
};

export const fetchAdminProductEditorData = async (productId?: string): Promise<AdminProductEditorData> => {
  const client = getClient();
  const { categories, collections } = await fetchAdminCatalogOptions();

  if (!productId) {
    return {
      product: null,
      images: [],
      colours: [],
      collectionIds: [],
      categories,
      collections,
    };
  }

  const [productResult, imagesResult, coloursResult, collectionsResult] = await Promise.all([
    client.from('products').select('*').eq('id', productId).maybeSingle(),
    client.from('product_images').select('*').eq('product_id', productId).order('sort_order', { ascending: true }),
    client.from('product_colour_options').select('*').eq('product_id', productId).order('sort_order', { ascending: true }),
    client.from('product_collections').select('collection_id').eq('product_id', productId),
  ]);

  if (productResult.error) throw productResult.error;
  if (imagesResult.error) throw imagesResult.error;
  if (coloursResult.error) throw coloursResult.error;
  if (collectionsResult.error) throw collectionsResult.error;

  return {
    product: productResult.data as AdminProduct | null,
    images: (imagesResult.data ?? []) as AdminProductImage[],
    colours: (coloursResult.data ?? []) as AdminProductColour[],
    collectionIds: ((collectionsResult.data ?? []) as Array<{ collection_id: string }>).map((row) => row.collection_id),
    categories,
    collections,
  };
};

export const saveAdminProduct = async (input: ProductSaveInput): Promise<string> => {
  const client = getClient();
  const productPayload = {
    sku: input.sku,
    slug: input.slug,
    name: input.name,
    short_description: input.shortDescription,
    long_description: input.longDescription ?? null,
    price_inr_paise: input.priceInrPaise,
    compare_at_price_inr_paise: input.compareAtPriceInrPaise ?? null,
    category_id: input.categoryId ?? null,
    subcategory: input.subcategory ?? null,
    materials: input.materials,
    dimensions: input.dimensions ?? null,
    weight: input.weight ?? null,
    care_instructions: input.careInstructions ?? null,
    stock_status: input.stockStatus,
    stock_quantity: input.stockQuantity,
    low_stock_threshold: input.lowStockThreshold,
    is_active: input.isActive,
    is_new: input.isNew,
    is_bestseller: input.isBestseller,
    is_sale: input.isSale,
    is_featured: input.isFeatured,
    tags: input.tags,
    occasion: input.occasion,
    color_family: input.colorFamily,
    allow_prepaid: input.allowPrepaid,
    allow_cod: input.allowCod,
    allow_advance_booking: input.allowAdvanceBooking,
    allow_pickup: input.allowPickup,
    sort_order: input.sortOrder,
  };

  const productMutation = input.id
    ? client.from('products').update(productPayload).eq('id', input.id).select('id').single()
    : client.from('products').insert(productPayload).select('id').single();

  const { data, error } = await productMutation;
  if (error) throw error;
  if (!data?.id) throw new Error('Product save did not return an id.');

  const productId = data.id as string;

  const [deleteCollections, deleteColours] = await Promise.all([
    client.from('product_collections').delete().eq('product_id', productId),
    client.from('product_colour_options').delete().eq('product_id', productId),
  ]);

  if (deleteCollections.error) throw deleteCollections.error;
  if (deleteColours.error) throw deleteColours.error;

  if (input.collectionIds.length > 0) {
    const { error } = await client.from('product_collections').insert(
      input.collectionIds.map((collectionId) => ({
        product_id: productId,
        collection_id: collectionId,
      }))
    );
    if (error) throw error;
  }

  if (input.colours.length > 0) {
    const { error } = await client.from('product_colour_options').insert(
      input.colours.map((colour) => ({
        product_id: productId,
        slug: colour.slug,
        name: colour.name,
        swatch: colour.swatch ?? null,
        is_available: colour.isAvailable,
        sort_order: colour.sortOrder,
      }))
    );
    if (error) throw error;
  }

  return productId;
};

export const uploadAdminProductImages = async (productId: string, files: File[]) => {
  const client = getClient();
  const existingImages = await client
    .from('product_images')
    .select('sort_order')
    .eq('product_id', productId)
    .order('sort_order', { ascending: false })
    .limit(1);

  if (existingImages.error) throw existingImages.error;

  let nextSortOrder = existingImages.data?.length ? Number(existingImages.data[0].sort_order ?? 0) + 1 : 0;

  for (const file of files) {
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/(^-|-$)/g, '');
    const storagePath = `products/${productId}/${Date.now()}-${safeName || 'image'}`;
    const upload = await client.storage.from('product-images').upload(storagePath, file, {
      cacheControl: '31536000',
      upsert: false,
    });

    if (upload.error) throw upload.error;

    const imageCount = await client.from('product_images').select('id', { count: 'exact', head: true }).eq('product_id', productId);
    if (imageCount.error) throw imageCount.error;

    const { error } = await client.from('product_images').insert({
      product_id: productId,
      storage_path: storagePath,
      alt_text: file.name,
      sort_order: nextSortOrder,
      is_primary: (imageCount.count ?? 0) === 0,
    });

    if (error) throw error;
    nextSortOrder += 1;
  }
};

export const deleteAdminProductImage = async (image: AdminProductImage) => {
  const client = getClient();
  const deleteRow = await client.from('product_images').delete().eq('id', image.id);
  if (deleteRow.error) throw deleteRow.error;

  if (image.storage_path) {
    const deleteObject = await client.storage.from('product-images').remove([image.storage_path]);
    if (deleteObject.error) throw deleteObject.error;
  }
};

export const setAdminPrimaryImage = async (productId: string, imageId: string) => {
  const client = getClient();
  const clear = await client.from('product_images').update({ is_primary: false }).eq('product_id', productId);
  if (clear.error) throw clear.error;

  const set = await client.from('product_images').update({ is_primary: true }).eq('id', imageId);
  if (set.error) throw set.error;
};

export const updateAdminProductVisibility = async (productId: string, isActive: boolean) => {
  const client = getClient();
  const { error } = await client.from('products').update({ is_active: isActive }).eq('id', productId);
  if (error) throw error;
};

const asRecord = (value: Json | null): Record<string, unknown> => {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>;
  return {};
};

export const fetchStoreSettings = async (): Promise<StoreSettingsDraft> => {
  const client = getClient();
  const { data, error } = await client.from('store_settings').select('key,value').in('key', ['contact', 'checkout']);
  if (error) throw error;

  const rows = new Map(((data ?? []) as Array<{ key: string; value: Json | null }>).map((row) => [row.key, asRecord(row.value)]));
  const contact = rows.get('contact') ?? {};
  const checkout = rows.get('checkout') ?? {};

  return {
    contact: {
      email: String(contact.email ?? ''),
      whatsapp_phone: String(contact.whatsapp_phone ?? ''),
      instagram_url: String(contact.instagram_url ?? ''),
    },
    checkout: {
      free_shipping_threshold_inr_paise: Number(checkout.free_shipping_threshold_inr_paise ?? 0),
      standard_shipping_fee_inr_paise: Number(checkout.standard_shipping_fee_inr_paise ?? 0),
      allow_cod: Boolean(checkout.allow_cod ?? true),
      allow_prepaid: Boolean(checkout.allow_prepaid ?? true),
      allow_pickup: Boolean(checkout.allow_pickup ?? true),
      allow_advance_booking: Boolean(checkout.allow_advance_booking ?? true),
    },
  };
};

export const saveStoreSettings = async (settings: StoreSettingsDraft) => {
  const client = getClient();
  const { error } = await client.from('store_settings').upsert(
    [
      {
        key: 'contact',
        value: settings.contact,
        is_public: true,
        description: 'Public customer contact channels.',
      },
      {
        key: 'checkout',
        value: settings.checkout,
        is_public: true,
        description: 'Public checkout options and thresholds.',
      },
    ],
    { onConflict: 'key' }
  );

  if (error) throw error;
};
