import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ImagePlus, Save, Star, Trash2 } from 'lucide-react';
import { Button, buttonClassNames } from '../../components/ui/Button';
import {
  errorTextClassName,
  fieldGroupClassName,
  helperTextClassName,
  inputClassName,
  labelClassName,
  selectClassName,
  textareaClassName,
} from '../../components/ui/formStyles';
import {
  deleteAdminProductImage,
  fetchAdminProductEditorData,
  getPublicImageUrl,
  saveAdminProduct,
  setAdminPrimaryImage,
  uploadAdminProductImages,
  type AdminCategory,
  type AdminCollection,
  type AdminProductColour,
  type AdminProductImage,
  type ProductColourDraft,
  type ProductSaveInput,
} from '../../lib/adminData';
import type { Database } from '../../types/database';

type FormState = {
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  compareAtPrice: string;
  categoryId: string;
  subcategory: string;
  materials: string;
  dimensions: string;
  weight: string;
  careInstructions: string;
  stockStatus: Database['public']['Enums']['stock_status'];
  stockQuantity: string;
  lowStockThreshold: string;
  isActive: boolean;
  isNew: boolean;
  isBestseller: boolean;
  isSale: boolean;
  isFeatured: boolean;
  tags: string;
  occasion: string;
  colorFamily: string;
  allowPrepaid: boolean;
  allowCod: boolean;
  allowAdvanceBooking: boolean;
  allowPickup: boolean;
  sortOrder: string;
  collectionIds: string[];
  coloursText: string;
};

const emptyForm: FormState = {
  sku: '',
  slug: '',
  name: '',
  shortDescription: '',
  longDescription: '',
  price: '',
  compareAtPrice: '',
  categoryId: '',
  subcategory: '',
  materials: '',
  dimensions: '',
  weight: '',
  careInstructions: '',
  stockStatus: 'in_stock',
  stockQuantity: '0',
  lowStockThreshold: '2',
  isActive: true,
  isNew: false,
  isBestseller: false,
  isSale: false,
  isFeatured: false,
  tags: '',
  occasion: '',
  colorFamily: '',
  allowPrepaid: true,
  allowCod: true,
  allowAdvanceBooking: false,
  allowPickup: true,
  sortOrder: '0',
  collectionIds: [],
  coloursText: '',
};

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const splitList = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const toPaise = (value: string) => Math.round(Number(value || 0) * 100);
const fromPaise = (value?: number | null) => (typeof value === 'number' ? String(value / 100) : '');

const coloursToText = (colours: AdminProductColour[]) =>
  colours.map((colour) => `${colour.name}|${colour.swatch ?? ''}|${colour.is_available ? 'true' : 'false'}`).join('\n');

const parseColours = (value: string): ProductColourDraft[] =>
  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const [name = '', swatch = '', available = 'true'] = line.split('|').map((part) => part.trim());

      return {
        slug: slugify(name),
        name,
        swatch: swatch || null,
        isAvailable: available.toLowerCase() !== 'false',
        sortOrder: index,
      };
    })
    .filter((colour) => colour.name && colour.slug);

const checkboxClassName =
  'h-4 w-4 rounded-[2px] border-gray-300 text-terracotta focus:ring-terracotta focus:ring-offset-warm-ivory';

const ToggleField: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({
  label,
  checked,
  onChange,
}) => (
  <label className="flex min-h-11 items-center gap-3 rounded-[2px] border border-border-soft bg-warm-ivory px-3 py-2 text-sm font-semibold text-gray-700">
    <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className={checkboxClassName} />
    {label}
  </label>
);

export const AdminProductEditor = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const isNew = productId === 'new' || !productId;
  const [form, setForm] = useState<FormState>(emptyForm);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [collections, setCollections] = useState<AdminCollection[]>([]);
  const [images, setImages] = useState<AdminProductImage[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [savedProductId, setSavedProductId] = useState<string | null>(isNew ? null : productId ?? null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const pageTitle = isNew ? 'New product' : 'Edit product';

  useEffect(() => {
    let isMounted = true;

    fetchAdminProductEditorData(isNew ? undefined : productId)
      .then((data) => {
        if (!isMounted) return;

        setCategories(data.categories);
        setCollections(data.collections);
        setImages(data.images);
        setSavedProductId(data.product?.id ?? null);

        if (data.product) {
          setForm({
            sku: data.product.sku,
            slug: data.product.slug,
            name: data.product.name,
            shortDescription: data.product.short_description,
            longDescription: data.product.long_description ?? '',
            price: fromPaise(data.product.price_inr_paise),
            compareAtPrice: fromPaise(data.product.compare_at_price_inr_paise),
            categoryId: data.product.category_id ?? '',
            subcategory: data.product.subcategory ?? '',
            materials: data.product.materials.join(', '),
            dimensions: data.product.dimensions ?? '',
            weight: data.product.weight ?? '',
            careInstructions: data.product.care_instructions ?? '',
            stockStatus: data.product.stock_status,
            stockQuantity: String(data.product.stock_quantity),
            lowStockThreshold: String(data.product.low_stock_threshold),
            isActive: data.product.is_active,
            isNew: data.product.is_new,
            isBestseller: data.product.is_bestseller,
            isSale: data.product.is_sale,
            isFeatured: data.product.is_featured,
            tags: data.product.tags.join(', '),
            occasion: data.product.occasion.join(', '),
            colorFamily: data.product.color_family.join(', '),
            allowPrepaid: data.product.allow_prepaid,
            allowCod: data.product.allow_cod,
            allowAdvanceBooking: data.product.allow_advance_booking,
            allowPickup: data.product.allow_pickup,
            sortOrder: String(data.product.sort_order),
            collectionIds: data.collectionIds,
            coloursText: coloursToText(data.colours),
          });
        } else {
          setForm(emptyForm);
        }
      })
      .catch((caughtError) => setError(caughtError instanceof Error ? caughtError.message : 'Unable to load product.'))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isNew, productId]);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === form.categoryId),
    [categories, form.categoryId]
  );

  const updateField = <Key extends keyof FormState>(field: Key, value: FormState[Key]) => {
    setStatus('');
    setError('');
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleNameChange = (value: string) => {
    setForm((current) => ({
      ...current,
      name: value,
      slug: current.slug ? current.slug : slugify(value),
    }));
  };

  const buildSaveInput = (): ProductSaveInput => ({
    id: savedProductId ?? undefined,
    sku: form.sku.trim(),
    slug: form.slug.trim(),
    name: form.name.trim(),
    shortDescription: form.shortDescription.trim(),
    longDescription: form.longDescription.trim() || null,
    priceInrPaise: toPaise(form.price),
    compareAtPriceInrPaise: form.compareAtPrice ? toPaise(form.compareAtPrice) : null,
    categoryId: form.categoryId || null,
    subcategory: form.subcategory.trim() || null,
    materials: splitList(form.materials),
    dimensions: form.dimensions.trim() || null,
    weight: form.weight.trim() || null,
    careInstructions: form.careInstructions.trim() || null,
    stockStatus: form.stockStatus,
    stockQuantity: Number(form.stockQuantity || 0),
    lowStockThreshold: Number(form.lowStockThreshold || 0),
    isActive: form.isActive,
    isNew: form.isNew,
    isBestseller: form.isBestseller,
    isSale: form.isSale,
    isFeatured: form.isFeatured,
    tags: splitList(form.tags),
    occasion: splitList(form.occasion),
    colorFamily: splitList(form.colorFamily),
    allowPrepaid: form.allowPrepaid,
    allowCod: form.allowCod,
    allowAdvanceBooking: form.allowAdvanceBooking,
    allowPickup: form.allowPickup,
    sortOrder: Number(form.sortOrder || 0),
    collectionIds: form.collectionIds,
    colours: parseColours(form.coloursText),
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setStatus('');

    try {
      const productIdToUse = await saveAdminProduct(buildSaveInput());
      setSavedProductId(productIdToUse);

      if (files.length > 0) {
        await uploadAdminProductImages(productIdToUse, files);
        setFiles([]);
      }

      setStatus('Product saved.');

      if (isNew) {
        navigate(`/admin/products/${productIdToUse}`, { replace: true });
      } else {
        const fresh = await fetchAdminProductEditorData(productIdToUse);
        setImages(fresh.images);
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteImage = async (image: AdminProductImage) => {
    if (!savedProductId) return;

    setError('');
    try {
      await deleteAdminProductImage(image);
      setImages((current) => current.filter((item) => item.id !== image.id));
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to delete image.');
    }
  };

  const handlePrimaryImage = async (image: AdminProductImage) => {
    if (!savedProductId) return;

    setError('');
    try {
      await setAdminPrimaryImage(savedProductId, image.id);
      setImages((current) => current.map((item) => ({ ...item, is_primary: item.id === image.id })));
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to set primary image.');
    }
  };

  if (isLoading) {
    return <div className="text-terracotta-dark type-overline">Loading product</div>;
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/admin/products" className="mb-4 inline-flex min-h-11 items-center gap-2 text-gray-500 transition-colors hover:text-terracotta type-caption">
            <ArrowLeft size={15} />
            Products
          </Link>
          <p className="mb-2 text-terracotta-dark type-overline">{selectedCategory?.name || 'Catalog'}</p>
          <h1 className="type-h1 text-gray-900">{pageTitle}</h1>
        </div>
        <Button type="submit" disabled={isSaving} className="gap-2">
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save product'}
        </Button>
      </div>

      {error && <p className={errorTextClassName} role="alert">{error}</p>}
      {status && <p className="rounded-[2px] border border-terracotta/30 bg-warm-ivory p-4 text-sm font-semibold text-terracotta-dark" role="status">{status}</p>}

      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section className="rounded-[2px] border border-border-soft bg-surface p-6">
            <h2 className="mb-6 type-h2 text-gray-900">Core details</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className={fieldGroupClassName}>
                <label htmlFor="product-sku" className={labelClassName}>SKU</label>
                <input id="product-sku" required value={form.sku} onChange={(event) => updateField('sku', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-slug" className={labelClassName}>Slug</label>
                <input id="product-slug" required value={form.slug} onChange={(event) => updateField('slug', slugify(event.target.value))} className={inputClassName()} />
              </div>
              <div className={`${fieldGroupClassName} md:col-span-2`}>
                <label htmlFor="product-name" className={labelClassName}>Name</label>
                <input id="product-name" required value={form.name} onChange={(event) => handleNameChange(event.target.value)} className={inputClassName()} />
              </div>
              <div className={`${fieldGroupClassName} md:col-span-2`}>
                <label htmlFor="product-short-description" className={labelClassName}>Short description</label>
                <textarea id="product-short-description" required value={form.shortDescription} onChange={(event) => updateField('shortDescription', event.target.value)} className={textareaClassName()} />
              </div>
              <div className={`${fieldGroupClassName} md:col-span-2`}>
                <label htmlFor="product-long-description" className={labelClassName}>Long description</label>
                <textarea id="product-long-description" value={form.longDescription} onChange={(event) => updateField('longDescription', event.target.value)} className={textareaClassName()} />
              </div>
            </div>
          </section>

          <section className="rounded-[2px] border border-border-soft bg-surface p-6">
            <h2 className="mb-6 type-h2 text-gray-900">Pricing and catalog placement</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className={fieldGroupClassName}>
                <label htmlFor="product-price" className={labelClassName}>Price INR</label>
                <input id="product-price" required type="number" min="0" step="1" value={form.price} onChange={(event) => updateField('price', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-compare-price" className={labelClassName}>Compare-at price INR</label>
                <input id="product-compare-price" type="number" min="0" step="1" value={form.compareAtPrice} onChange={(event) => updateField('compareAtPrice', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-category" className={labelClassName}>Category</label>
                <select id="product-category" value={form.categoryId} onChange={(event) => updateField('categoryId', event.target.value)} className={selectClassName()}>
                  <option value="">Unassigned</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-subcategory" className={labelClassName}>Style / subcategory</label>
                <input id="product-subcategory" value={form.subcategory} onChange={(event) => updateField('subcategory', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-sort-order" className={labelClassName}>Sort order</label>
                <input id="product-sort-order" type="number" value={form.sortOrder} onChange={(event) => updateField('sortOrder', event.target.value)} className={inputClassName()} />
              </div>
            </div>
            <div className="mt-6">
              <p className={labelClassName}>Collections</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {collections.map((collection) => (
                  <ToggleField
                    key={collection.id}
                    label={collection.name}
                    checked={form.collectionIds.includes(collection.id)}
                    onChange={(checked) =>
                      updateField(
                        'collectionIds',
                        checked
                          ? [...form.collectionIds, collection.id]
                          : form.collectionIds.filter((collectionId) => collectionId !== collection.id)
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[2px] border border-border-soft bg-surface p-6">
            <h2 className="mb-6 type-h2 text-gray-900">Materials and search metadata</h2>
            <div className="grid gap-5 md:grid-cols-2">
              <div className={fieldGroupClassName}>
                <label htmlFor="product-materials" className={labelClassName}>Materials</label>
                <input id="product-materials" value={form.materials} onChange={(event) => updateField('materials', event.target.value)} className={inputClassName()} />
                <p className={helperTextClassName}>Comma separated.</p>
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-tags" className={labelClassName}>Tags</label>
                <input id="product-tags" value={form.tags} onChange={(event) => updateField('tags', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-occasion" className={labelClassName}>Occasions</label>
                <input id="product-occasion" value={form.occasion} onChange={(event) => updateField('occasion', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-color-family" className={labelClassName}>Color family</label>
                <input id="product-color-family" value={form.colorFamily} onChange={(event) => updateField('colorFamily', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-dimensions" className={labelClassName}>Dimensions</label>
                <input id="product-dimensions" value={form.dimensions} onChange={(event) => updateField('dimensions', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-weight" className={labelClassName}>Weight</label>
                <input id="product-weight" value={form.weight} onChange={(event) => updateField('weight', event.target.value)} className={inputClassName()} />
              </div>
              <div className={`${fieldGroupClassName} md:col-span-2`}>
                <label htmlFor="product-care" className={labelClassName}>Care instructions</label>
                <textarea id="product-care" value={form.careInstructions} onChange={(event) => updateField('careInstructions', event.target.value)} className={textareaClassName()} />
              </div>
            </div>
          </section>

          <section className="rounded-[2px] border border-border-soft bg-surface p-6">
            <h2 className="mb-6 type-h2 text-gray-900">Colours</h2>
            <label htmlFor="product-colours" className={labelClassName}>Colour rows</label>
            <textarea
              id="product-colours"
              value={form.coloursText}
              onChange={(event) => updateField('coloursText', event.target.value)}
              placeholder="Maroon|#7D2E24|true"
              className={textareaClassName('font-mono text-sm')}
            />
            <p className={helperTextClassName}>One per line: name|swatch|available. Use false to mark unavailable.</p>
          </section>
        </div>

        <aside className="space-y-8">
          <section className="rounded-[2px] border border-border-soft bg-surface p-6">
            <h2 className="mb-5 type-h2 text-gray-900">Publishing</h2>
            <div className="grid gap-2">
              <ToggleField label="Visible on site" checked={form.isActive} onChange={(checked) => updateField('isActive', checked)} />
              <ToggleField label="New" checked={form.isNew} onChange={(checked) => updateField('isNew', checked)} />
              <ToggleField label="Bestseller" checked={form.isBestseller} onChange={(checked) => updateField('isBestseller', checked)} />
              <ToggleField label="Sale" checked={form.isSale} onChange={(checked) => updateField('isSale', checked)} />
              <ToggleField label="Featured" checked={form.isFeatured} onChange={(checked) => updateField('isFeatured', checked)} />
            </div>
          </section>

          <section className="rounded-[2px] border border-border-soft bg-surface p-6">
            <h2 className="mb-5 type-h2 text-gray-900">Inventory</h2>
            <div className="space-y-5">
              <div className={fieldGroupClassName}>
                <label htmlFor="product-stock-status" className={labelClassName}>Stock status</label>
                <select id="product-stock-status" value={form.stockStatus} onChange={(event) => updateField('stockStatus', event.target.value as FormState['stockStatus'])} className={selectClassName()}>
                  <option value="in_stock">In stock</option>
                  <option value="out_of_stock">Out of stock</option>
                  <option value="made_to_order">Made to order</option>
                </select>
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-stock-quantity" className={labelClassName}>Stock quantity</label>
                <input id="product-stock-quantity" type="number" min="0" value={form.stockQuantity} onChange={(event) => updateField('stockQuantity', event.target.value)} className={inputClassName()} />
              </div>
              <div className={fieldGroupClassName}>
                <label htmlFor="product-low-stock" className={labelClassName}>Low-stock threshold</label>
                <input id="product-low-stock" type="number" min="0" value={form.lowStockThreshold} onChange={(event) => updateField('lowStockThreshold', event.target.value)} className={inputClassName()} />
              </div>
            </div>
          </section>

          <section className="rounded-[2px] border border-border-soft bg-surface p-6">
            <h2 className="mb-5 type-h2 text-gray-900">Checkout methods</h2>
            <div className="grid gap-2">
              <ToggleField label="Prepaid" checked={form.allowPrepaid} onChange={(checked) => updateField('allowPrepaid', checked)} />
              <ToggleField label="COD" checked={form.allowCod} onChange={(checked) => updateField('allowCod', checked)} />
              <ToggleField label="Advance booking" checked={form.allowAdvanceBooking} onChange={(checked) => updateField('allowAdvanceBooking', checked)} />
              <ToggleField label="Pickup" checked={form.allowPickup} onChange={(checked) => updateField('allowPickup', checked)} />
            </div>
          </section>

          <section className="rounded-[2px] border border-border-soft bg-surface p-6">
            <h2 className="mb-5 type-h2 text-gray-900">Images</h2>
            <div className="space-y-4">
              {images.map((image) => (
                <div key={image.id} className="flex gap-3 rounded-[2px] border border-border-soft bg-warm-ivory p-3">
                  <div className="h-20 w-16 overflow-hidden rounded-[2px] bg-studio-wash">
                    <img src={getPublicImageUrl(image)} alt={image.alt_text ?? ''} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-700">{image.alt_text || image.storage_path}</p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handlePrimaryImage(image)}
                        className="flex min-h-9 min-w-9 items-center justify-center rounded-[2px] border border-border-soft text-gray-600 transition-colors hover:text-terracotta"
                        aria-label="Set primary image"
                      >
                        <Star size={14} fill={image.is_primary ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image)}
                        className="flex min-h-9 min-w-9 items-center justify-center rounded-[2px] border border-border-soft text-gray-600 transition-colors hover:text-terracotta-dark"
                        aria-label="Delete image"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-[2px] border border-dashed border-terracotta/50 bg-warm-ivory p-4 text-center text-terracotta-dark transition-colors hover:border-terracotta">
                <ImagePlus size={20} />
                <span className="mt-2 text-sm font-semibold">Upload images</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="sr-only"
                  onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
                />
              </label>
              {files.length > 0 && <p className={helperTextClassName}>{files.length} file{files.length === 1 ? '' : 's'} ready to upload on save.</p>}
            </div>
          </section>
        </aside>
      </div>
    </form>
  );
};
