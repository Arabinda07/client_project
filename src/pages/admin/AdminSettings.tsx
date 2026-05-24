import React, { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  errorTextClassName,
  fieldGroupClassName,
  inputClassName,
  labelClassName,
} from '../../components/ui/formStyles';
import { fetchStoreSettings, saveStoreSettings, type StoreSettingsDraft } from '../../lib/adminData';

const emptySettings: StoreSettingsDraft = {
  contact: {
    email: '',
    whatsapp_phone: '',
    instagram_url: '',
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
        <h2 className="mb-6 type-h2 text-gray-900">Contact</h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-email" className={labelClassName}>Email</label>
            <input id="settings-email" type="email" value={settings.contact.email} onChange={(event) => updateContact('email', event.target.value)} className={inputClassName()} />
          </div>
          <div className={fieldGroupClassName}>
            <label htmlFor="settings-whatsapp" className={labelClassName}>WhatsApp phone</label>
            <input id="settings-whatsapp" value={settings.contact.whatsapp_phone} onChange={(event) => updateContact('whatsapp_phone', event.target.value)} className={inputClassName()} />
          </div>
          <div className={`${fieldGroupClassName} md:col-span-2`}>
            <label htmlFor="settings-instagram" className={labelClassName}>Instagram URL</label>
            <input id="settings-instagram" type="url" value={settings.contact.instagram_url} onChange={(event) => updateContact('instagram_url', event.target.value)} className={inputClassName()} />
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
