import { useEffect, useState } from 'react';
import { brand } from './brand';
import { getStoragePublicUrl, supabase } from './supabaseClient';
import type { Json } from '../types/database';

export type BrandSettings = {
  name: string;
  siteUrl: string;
  description: string;
  currency: string;
  country: string;
  email: string;
  ownerEmail: string;
  whatsappPhone: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  primaryLogoStoragePath: string;
  alternateLogoStoragePath: string;
  useUploadedLogo: boolean;
  ownerPhotoStoragePath: string;
  ownerPhotoAlt: string;
  studioPhotoStoragePath: string;
  studioPhotoAlt: string;
};

export const fallbackBrandSettings: BrandSettings = {
  name: brand.name,
  siteUrl: brand.siteUrl,
  description: brand.description,
  currency: 'INR',
  country: 'India',
  email: brand.email,
  ownerEmail: brand.ownerEmail,
  whatsappPhone: brand.whatsappPhone,
  instagramUrl: brand.instagramUrl,
  facebookUrl: brand.facebookUrl,
  youtubeUrl: brand.youtubeUrl,
  primaryLogoStoragePath: '',
  alternateLogoStoragePath: '',
  useUploadedLogo: false,
  ownerPhotoStoragePath: '',
  ownerPhotoAlt: brand.ownerPhotoAlt,
  studioPhotoStoragePath: '',
  studioPhotoAlt: brand.studioPhotoAlt,
};

const asRecord = (value: Json | null): Record<string, unknown> => {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>;
  return {};
};

const asString = (value: unknown, fallback = '') => (typeof value === 'string' ? value : fallback);
const asBoolean = (value: unknown, fallback = false) => (typeof value === 'boolean' ? value : fallback);

const normalizePhone = (value: string) => value.replace(/[^\d]/g, '');

export const getBrandAssetUrl = (storagePath?: string | null) =>
  getStoragePublicUrl('brand-assets', storagePath);

export const getOwnerPhotoUrl = (settings: BrandSettings) =>
  getBrandAssetUrl(settings.ownerPhotoStoragePath) ?? brand.ownerPhoto;

export const getStudioPhotoUrl = (settings: BrandSettings) =>
  getBrandAssetUrl(settings.studioPhotoStoragePath) ?? getOwnerPhotoUrl(settings);

export const getPrimaryLogoUrl = (settings: BrandSettings) =>
  settings.useUploadedLogo ? getBrandAssetUrl(settings.primaryLogoStoragePath) : null;

export const getAlternateLogoUrl = (settings: BrandSettings) =>
  getBrandAssetUrl(settings.alternateLogoStoragePath);

export const getWhatsappUrl = (settings: Pick<BrandSettings, 'whatsappPhone'>, message?: string) => {
  const phone = normalizePhone(settings.whatsappPhone);
  if (!phone) return '';
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${phone}${query}`;
};

export const socialLinksFor = (settings: BrandSettings) =>
  [
    { kind: 'whatsapp' as const, label: 'WhatsApp', url: getWhatsappUrl(settings) },
    { kind: 'instagram' as const, label: 'Instagram', url: settings.instagramUrl },
    { kind: 'facebook' as const, label: 'Facebook', url: settings.facebookUrl },
    { kind: 'youtube' as const, label: 'YouTube', url: settings.youtubeUrl },
    { kind: 'email' as const, label: 'Email', url: settings.email ? `mailto:${settings.email}` : '' },
  ].filter((link) => Boolean(link.url));

let brandSettingsPromise: Promise<BrandSettings> | null = null;

export const fetchBrandSettings = async (): Promise<BrandSettings> => {
  if (brandSettingsPromise) return brandSettingsPromise;
  if (!supabase) return fallbackBrandSettings;

  brandSettingsPromise = (async () => {
    try {
      const { data, error } = await supabase
        .from('store_settings')
        .select('key,value')
        .in('key', ['brand', 'contact']);

      if (error) return fallbackBrandSettings;

      const rows = new Map(((data ?? []) as Array<{ key: string; value: Json | null }>).map((row) => [row.key, asRecord(row.value)]));
      const brandRow = rows.get('brand') ?? {};
      const contact = rows.get('contact') ?? {};

      return {
        name: asString(brandRow.name, fallbackBrandSettings.name),
        siteUrl: asString(brandRow.site_url, fallbackBrandSettings.siteUrl),
        description: asString(brandRow.description, fallbackBrandSettings.description),
        currency: asString(brandRow.currency, fallbackBrandSettings.currency),
        country: asString(brandRow.country, fallbackBrandSettings.country),
        email: asString(contact.email, fallbackBrandSettings.email),
        ownerEmail: asString(contact.owner_email, asString(contact.email, fallbackBrandSettings.ownerEmail)),
        whatsappPhone: asString(contact.whatsapp_phone, fallbackBrandSettings.whatsappPhone),
        instagramUrl: asString(contact.instagram_url, fallbackBrandSettings.instagramUrl),
        facebookUrl: asString(contact.facebook_url, fallbackBrandSettings.facebookUrl),
        youtubeUrl: asString(contact.youtube_url, fallbackBrandSettings.youtubeUrl),
        primaryLogoStoragePath: asString(brandRow.primary_logo_storage_path),
        alternateLogoStoragePath: asString(brandRow.alternate_logo_storage_path),
        useUploadedLogo: asBoolean(brandRow.use_uploaded_logo),
        ownerPhotoStoragePath: asString(brandRow.owner_photo_storage_path),
        ownerPhotoAlt: asString(brandRow.owner_photo_alt, fallbackBrandSettings.ownerPhotoAlt),
        studioPhotoStoragePath: asString(brandRow.studio_photo_storage_path),
        studioPhotoAlt: asString(brandRow.studio_photo_alt, fallbackBrandSettings.studioPhotoAlt),
      };
    } catch {
      return fallbackBrandSettings;
    }
  })();

  return brandSettingsPromise;
};

export const useBrandSettings = () => {
  const [settings, setSettings] = useState(fallbackBrandSettings);

  useEffect(() => {
    let isMounted = true;

    fetchBrandSettings().then((nextSettings) => {
      if (isMounted) setSettings(nextSettings);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return settings;
};
