import React, { useMemo, useState } from 'react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';
import { mockProducts } from '../lib/data/mockProducts';
import {
  formatDateInputValue,
  getBulkOrderMinimumDate,
  isBulkOrderDateAllowed,
} from '../lib/bulkOrder';
import { brand } from '../lib/brand';

type BulkFormState = {
  name: string;
  email: string;
  phone: string;
  productId: string;
  colourId: string;
  quantityRange: string;
  deliveryDate: string;
  notes: string;
};

const initialFormState: BulkFormState = {
  name: '',
  email: '',
  phone: '',
  productId: '',
  colourId: '',
  quantityRange: '',
  deliveryDate: '',
  notes: '',
};

export const BulkOrders = () => {
  const [formState, setFormState] = useState(initialFormState);
  const [dateError, setDateError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const products = useMemo(
    () => mockProducts.filter((product) => product.stockStatus !== 'out_of_stock'),
    []
  );
  const selectedProduct = products.find((product) => product.id === formState.productId);
  const availableColours = selectedProduct?.colourOptions?.filter((colour) => colour.available !== false) ?? [];
  const minimumDate = getBulkOrderMinimumDate();
  const minimumDateValue = formatDateInputValue(minimumDate);
  const minimumDateLabel = minimumDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const updateField = (field: keyof BulkFormState, value: string) => {
    setIsSubmitted(false);
    setFormState((current) => ({
      ...current,
      [field]: value,
      ...(field === 'productId' ? { colourId: '' } : {}),
    }));
    if (field === 'deliveryDate') setDateError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isBulkOrderDateAllowed(formState.deliveryDate)) {
      setDateError(`Bulk orders need at least two months of studio time. Choose ${minimumDateLabel} or later.`);
      setIsSubmitted(false);
      return;
    }

    setDateError('');
    setIsSubmitted(true);
    setFormState(initialFormState);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      <SEO
        title="Bulk Orders"
        description={`Plan bulk orders for existing ${brand.name} terracotta jewellery designs with a two-month advance booking window.`}
      />

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <span className="mb-5 block text-terracotta-dark type-overline">Bulk Orders</span>
          <h1 className="type-display text-gray-900 mb-8">Plan repeat pieces with the studio.</h1>
          <p className="type-body-large text-gray-600 mb-8">
            For return gifts, group events, or small batches, choose an existing catalogue design and share the quantity you need. Bulk orders require at least two months of advance booking because every piece is sculpted and painted by hand.
          </p>
          <div className="border-y border-border-soft py-6">
            <p className="type-overline text-gray-900 mb-2">Earliest delivery date</p>
            <p className="type-h3 text-terracotta">{minimumDateLabel}</p>
          </div>
        </div>

        <div className="double-bezel-outer">
          <div className="double-bezel-inner p-6 sm:p-8 md:p-10">
            {isSubmitted && (
              <div className="mb-8 border border-terracotta/30 bg-warm-ivory p-4 text-terracotta-dark rounded-lg" role="status">
                <p className="type-overline mb-1 font-semibold">Inquiry received</p>
                <p className="type-body text-sm">The studio will review the catalogue piece, quantity, and timeline before confirming availability.</p>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="bulk-name" className="type-overline text-gray-700 font-bold">Your Name</label>
                  <input
                    id="bulk-name"
                    required
                    value={formState.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="min-h-12 w-full border-b border-gray-300 bg-transparent px-1 py-3 focus:border-terracotta focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="bulk-phone" className="type-overline text-gray-700 font-bold">Phone</label>
                  <input
                    id="bulk-phone"
                    required
                    type="tel"
                    value={formState.phone}
                    onChange={(event) => updateField('phone', event.target.value)}
                    className="min-h-12 w-full border-b border-gray-300 bg-transparent px-1 py-3 focus:border-terracotta focus:outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="bulk-email" className="type-overline text-gray-700 font-bold">Email Address</label>
                  <input
                    id="bulk-email"
                    required
                    type="email"
                    value={formState.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    className="min-h-12 w-full border-b border-gray-300 bg-transparent px-1 py-3 focus:border-terracotta focus:outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="bulk-product" className="type-overline text-gray-700 font-bold">Catalogue Piece</label>
                  <select
                    id="bulk-product"
                    required
                    value={formState.productId}
                    onChange={(event) => updateField('productId', event.target.value)}
                    className="min-h-12 w-full rounded-lg border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none"
                  >
                    <option value="">Choose an existing design</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bulk-colour" className="type-overline text-gray-700 font-bold">Colour Option</label>
                  <select
                    id="bulk-colour"
                    required={availableColours.length > 0}
                    value={formState.colourId}
                    onChange={(event) => updateField('colourId', event.target.value)}
                    disabled={!selectedProduct || availableColours.length === 0}
                    className="min-h-12 w-full rounded-lg border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="">Choose from catalogue colours</option>
                    {availableColours.map((colour) => (
                      <option key={colour.id} value={colour.id}>
                        {colour.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="bulk-quantity" className="type-overline text-gray-700 font-bold">Quantity Range</label>
                  <select
                    id="bulk-quantity"
                    required
                    value={formState.quantityRange}
                    onChange={(event) => updateField('quantityRange', event.target.value)}
                    className="min-h-12 w-full rounded-lg border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none"
                  >
                    <option value="">Select a range</option>
                    <option value="10-24">10-24 pieces</option>
                    <option value="25-49">25-49 pieces</option>
                    <option value="50-99">50-99 pieces</option>
                    <option value="100+">100+ pieces</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="bulk-delivery" className="type-overline text-gray-700 font-bold">Required Delivery Date</label>
                  <input
                    id="bulk-delivery"
                    required
                    type="date"
                    min={minimumDateValue}
                    value={formState.deliveryDate}
                    onChange={(event) => updateField('deliveryDate', event.target.value)}
                    aria-describedby="bulk-delivery-help"
                    className="min-h-12 w-full rounded-lg border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none"
                  />
                  <p id="bulk-delivery-help" className="type-caption text-gray-500">
                    Bulk orders can be requested for {minimumDateLabel} or later.
                  </p>
                  {dateError && (
                    <p className="type-caption text-terracotta-dark font-semibold" role="alert">
                      {dateError}
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="bulk-notes" className="type-overline text-gray-700 font-bold">Notes</label>
                  <textarea
                    id="bulk-notes"
                    rows={4}
                    value={formState.notes}
                    onChange={(event) => updateField('notes', event.target.value)}
                    placeholder="Share event details, packaging needs, or delivery city."
                    className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 focus:border-terracotta focus:outline-none"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full px-10 py-4 sm:w-auto font-semibold">Send Bulk Inquiry</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
