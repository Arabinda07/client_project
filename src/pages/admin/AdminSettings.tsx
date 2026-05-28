import React, { useEffect, useState } from 'react';
import { Save, Trash2, Upload } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  errorTextClassName,
  fieldGroupClassName,
  helperTextClassName,
  inputClassName,
  labelClassName,
} from '../../components/ui/formStyles';
import {
  deleteBrandAsset,
  fetchStoreSettings,
  getPublicBrandAssetUrl,
  saveStoreSettings,
  uploadBrandAsset,
  type StoreSettingsDraft,
} from '../../lib/adminData';
import { fallbackBrandSettings } from '../../lib/brandSettings';

const emptySettings: StoreSettingsDraft = {
  brand: fallbackBrandSettings,
  contact: {
    email: '',
    owner_email: '',
    whatsapp_phone: '',
    instagram_url: '',
    facebook_url: '',
    youtube_url: '',
  },
  checkout: {
    free_shipping_threshold_inr_paise: 0,
    standard_shipping_fee_inr_paise: 0,
    allow_cod: true,
    allow_prepaid: true,
    allow_pickup: true,
    allow_advance_booking: true,
  },
};

const fromPaise = (value: number) => String(value / 100);
const toPaise = (value: string) => Math.round(Number(value || 0) * 100);

const checkboxClassName =
  'h-4 w-4 rounded-[2px] border-gray-300 text-terracotta focus:ring-terracotta focus:ring-offset-warm-ivory';

export const AdminSettings = () => {
  const [settings, setSettings] = useState(emptySettings);
  const [freeShipping, setFreeShipping] = useState('0');
  const [shippingFee, setShippingFee] = useState('0');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [uploadingField, setUploadingField] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchStoreSettings()
      .then((nextSettings) => {
        if (!isMounted) return;
        setSettings(nextSettings);
        setFreeShipping(fromPaise(nextSettings.checkout.free_shipping_threshold_inr_paise));
        setShippingFee(fromPaise(nextSettings.checkout.standard_shipping_fee_inr_paise));
      })
      .catch((caughtError) => setError(caughtError instanceof Error ? caughtError.message : 'Unable to load settings.'))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const updateContact = (field: keyof StoreSettingsDraft['contact'], value: string) => {
    setStatus('');
    setSettings((current) => ({
      ...current,
      contact: {
        ...current.contact,
        [field]: value,
      },
    }));
  };

  const updateBrand = (field: keyof StoreSettingsDraft['brand'], value: string | boolean) => {
    setStatus('');
    setSettings((current) => ({
      ...current,
      brand: {
        ...current.brand,
        [field]: value,
      },
    }));
  };

  const updateCheckout = (field: keyof StoreSettingsDraft['checkout'], value: boolean) => {
    setStatus('');
    setSettings((current) => ({
      ...current,
      checkout: {
        ...current.checkout,
        [field]: value,
      },
    }));
  };

  const handleAssetUpload = async (
    field: 'primaryLogoStoragePath' | 'alternateLogoStoragePath' | 'ownerPhotoStoragePath' | 'studioPhotoStoragePath',
    folder: 'logos' | 'owners',
    file?: File
  ) => {
    if (!file) return;
    setError('');
    setStatus('');
    setUploadingField(field);

    try {
      const storagePath = await uploadBrandAsset(folder, file);
      updateBrand(field, storagePath);
      if (field === 'primaryLogoStoragePath') updateBrand('useUploadedLogo', true);
      setStatus('Asset uploaded. Save settings to publish this change.');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to upload asset.');
    } finally {
      setUploadingField('');
    }
  };

  const handleAssetClear = async (
    field: 'primaryLogoStoragePath' | 'alternateLogoStoragePath' | 'ownerPhotoStoragePath' | 'studioPhotoStoragePath'
  ) => {
    const currentPath = settings.brand[field];
    setError('');
    setStatus('');

    try {
      await deleteBrandAsset(currentPath);
      updateBrand(field, '');
      if (field === 'primaryLogoStoragePath') updateBrand('useUploadedLogo', false);
      setStatus('Asset removed. Save settings to publish this change.');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to remove asset.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setStatus('');

    try {
      await saveStoreSettings({
        ...settings,
        checkout: {
          ...settings.checkout,
          free_shipping_threshold_inr_paise: toPaise(freeShipping),
          standard_shipping_fee_inr_paise: toPaise(shippingFee),
        },
      });
      setStatus('Settings saved.');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unable to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-terracotta-dark type-overline">Loading settings</div>;
  }

  return (
    <form className="max-w-4xl space-y-8" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-terracotta-dark type-overline">Store</p>
          <h1 className="type-h1 text-gray-900">Settings</h1>
        </div>
        <Button type="submit" disabled={isSaving} className="gap-2">
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save settings'}
        </Button>
      </div>

      {error && <p className={errorTextClassName} role="alert">{error}</p>}
      {status && <p className="rounded-[2px] border border-terracotta/30 bg-warm-ivory p-4 text-sm font-semibold text-terracotta-dark" role="status">{status}</p>}

      <section className="rounded-[2px] border border-border-soft bg-surface p-6">
        <h2 className="mb-6 type-h2 text-gray-900">Brand</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-brand-name" className={labelClassName}>Brand name</label>
            <input id="settings-brand-name" value={settings.brand.name} onChange={(event) => updateBrand('name', event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-site-url" className={labelClassName}>Site URL</label>
            <input id="settings-site-url" type="url" value={settings.brand.siteUrl} onChange={(event) => updateBrand('siteUrl', event.target.value)} className={inputClassName()} />
          </div>
          <div className={`${fieldGroupClassName} md:col-span-2`}>
            <label htmlFor="settings-brand-description" className={labelClassName}>Brand description</label>
            <textarea id="settings-brand-description" rows={3} value={settings.brand.description} onChange={(event) => updateBrand('description', event.target.value)} className={inputClassName('min-h-24 py-3')} />
          </div>
          <label className="flex min-h-11 items-center gap-3 rounded-[2px] border border-border-soft bg-warm-ivory px-3 py-2 text-sm font-semibold text-gray-700 md:col-span-2">
            <input
              type="checkbox"
              checked={settings.brand.useUploadedLogo}
              onChange={(event) => updateBrand('useUploadedLogo', event.target.checked)}
              className={checkboxClassName}
            />
            Use uploaded logo as the primary site logo
          </label>
        </div>
      </section>

      <section className="rounded-[2px] border border-border-soft bg-surface p-6">
        <h2 className="mb-6 type-h2 text-gray-900">Logo and owner photos</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <AssetUploadField
            id="settings-primary-logo"
            label="Primary logo"
            storagePath={settings.brand.primaryLogoStoragePath}
            isUploading={uploadingField === 'primaryLogoStoragePath'}
            onUpload={(file) => handleAssetUpload('primaryLogoStoragePath', 'logos', file)}
            onClear={() => handleAssetClear('primaryLogoStoragePath')}
          />
          <AssetUploadField
            id="settings-alternate-logo"
            label="Alternate logo"
            storagePath={settings.brand.alternateLogoStoragePath}
            isUploading={uploadingField === 'alternateLogoStoragePath'}
            onUpload={(file) => handleAssetUpload('alternateLogoStoragePath', 'logos', file)}
            onClear={() => handleAssetClear('alternateLogoStoragePath')}
          />
          <AssetUploadField
            id="settings-owner-photo"
            label="Owner photo"
            storagePath={settings.brand.ownerPhotoStoragePath}
            isUploading={uploadingField === 'ownerPhotoStoragePath'}
            onUpload={(file) => handleAssetUpload('ownerPhotoStoragePath', 'owners', file)}
            onClear={() => handleAssetClear('ownerPhotoStoragePath')}
          />
          <AssetUploadField
            id="settings-studio-photo"
            label="Studio/about photo"
            storagePath={settings.brand.studioPhotoStoragePath}
            isUploading={uploadingField === 'studioPhotoStoragePath'}
            onUpload={(file) => handleAssetUpload('studioPhotoStoragePath', 'owners', file)}
            onClear={() => handleAssetClear('studioPhotoStoragePath')}
          />
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-owner-photo-alt" className={labelClassName}>Owner photo alt text</label>
            <input id="settings-owner-photo-alt" value={settings.brand.ownerPhotoAlt} onChange={(event) => updateBrand('ownerPhotoAlt', event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-studio-photo-alt" className={labelClassName}>Studio photo alt text</label>
            <input id="settings-studio-photo-alt" value={settings.brand.studioPhotoAlt} onChange={(event) => updateBrand('studioPhotoAlt', event.target.value)} className={inputClassName()} />
          </div>
        </div>
      </section>

      <section className="rounded-[2px] border border-border-soft bg-surface p-6">
        <h2 className="mb-6 type-h2 text-gray-900">Contact and social links</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-email" className={labelClassName}>Public email</label>
            <input id="settings-email" type="email" value={settings.contact.email} onChange={(event) => updateContact('email', event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-owner-email" className={labelClassName}>Owner email</label>
            <input id="settings-owner-email" type="email" value={settings.contact.owner_email} onChange={(event) => updateContact('owner_email', event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-whatsapp" className={labelClassName}>WhatsApp phone</label>
            <input id="settings-whatsapp" value={settings.contact.whatsapp_phone} onChange={(event) => updateContact('whatsapp_phone', event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-instagram" className={labelClassName}>Instagram URL</label>
            <input id="settings-instagram" type="url" value={settings.contact.instagram_url} onChange={(event) => updateContact('instagram_url', event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-facebook" className={labelClassName}>Facebook URL</label>
            <input id="settings-facebook" type="url" value={settings.contact.facebook_url} onChange={(event) => updateContact('facebook_url', event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-youtube" className={labelClassName}>YouTube URL</label>
            <input id="settings-youtube" type="url" value={settings.contact.youtube_url} onChange={(event) => updateContact('youtube_url', event.target.value)} className={inputClassName()} />
          </div>
        </div>
      </section>

      <section className="rounded-[2px] border border-border-soft bg-surface p-6">
        <h2 className="mb-6 type-h2 text-gray-900">Checkout</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-free-shipping" className={labelClassName}>Free shipping threshold INR</label>
            <input id="settings-free-shipping" type="number" min="0" value={freeShipping} onChange={(event) => setFreeShipping(event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-shipping-fee" className={labelClassName}>Standard shipping fee INR</label>
            <input id="settings-shipping-fee" type="number" min="0" value={shippingFee} onChange={(event) => setShippingFee(event.target.value)} className={inputClassName()} />
          </div>
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {[
            ['allow_prepaid', 'Allow prepaid'],
            ['allow_cod', 'Allow COD'],
            ['allow_advance_booking', 'Allow advance booking'],
            ['allow_pickup', 'Allow pickup'],
          ].map(([field, label]) => (
            <label key={field} className="flex min-h-11 items-center gap-3 rounded-[2px] border border-border-soft bg-warm-ivory px-3 py-2 text-sm font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={Boolean(settings.checkout[field as keyof StoreSettingsDraft['checkout']])}
                onChange={(event) => updateCheckout(field as keyof StoreSettingsDraft['checkout'], event.target.checked)}
                className={checkboxClassName}
              />
              {label}
            </label>
          ))}
        </div>
      </section>
    </form>
  );
};

type AssetUploadFieldProps = {
  id: string;
  label: string;
  storagePath: string;
  isUploading: boolean;
  onUpload: (file?: File) => void;
  onClear: () => void;
};

const AssetUploadField: React.FC<AssetUploadFieldProps> = ({
  id,
  label,
  storagePath,
  isUploading,
  onUpload,
  onClear,
}) => {
  const publicUrl = getPublicBrandAssetUrl(storagePath);

  return (
    <div className={fieldGroupClassName}>
      <label htmlFor={id} className={labelClassName}>{label}</label>
      <div className="rounded-[2px] border border-border-soft bg-warm-ivory p-3">
        <div className="mb-3 flex min-h-28 items-center justify-center overflow-hidden rounded-[2px] border border-border-soft bg-studio-paper">
          {publicUrl ? (
            <img src={publicUrl} alt={`${label} preview`} className="max-h-32 w-full object-contain" />
          ) : (
            <span className="type-caption text-gray-500">No asset uploaded</span>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[2px] border border-terracotta/40 px-3 py-2 text-sm font-semibold text-terracotta-dark transition-colors hover:bg-terracotta/10">
            <Upload size={15} />
            {isUploading ? 'Uploading...' : 'Upload'}
            <input
              id={id}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
              disabled={isUploading}
              className="sr-only"
              onChange={(event) => onUpload(event.target.files?.[0])}
            />
          </label>
          <button
            type="button"
            onClick={onClear}
            disabled={!storagePath || isUploading}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] border border-border-soft px-3 py-2 text-sm font-semibold text-gray-600 transition-colors hover:border-terracotta/40 hover:text-terracotta-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={15} />
            Remove
          </button>
        </div>
        <p className={helperTextClassName}>Accepted: JPG, PNG, WebP, AVIF, or SVG. Save settings to publish.</p>
      </div>
    </div>
  );
};
