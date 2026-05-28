import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Button, buttonClassNames } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { ProductImage } from '../components/ui/Media';
import { fieldGroupClassName, inputClassName, labelClassName } from '../components/ui/formStyles';

export const Checkout = () => {
  const { items, cartTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  const seo = (
    <SEO
      title="Checkout"
      description="Complete your goonjaa terracotta jewellery order."
    />
  );

  if (isSuccess) {
    return (
      <>
        {seo}
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-terracotta/25 bg-surface text-3xl text-terracotta-dark">✓</div>
          <h1 className="mb-4 text-gray-900 type-h1">Order Confirmed</h1>
          <p className="mx-auto mb-8 text-gray-600 type-body-large">
            Thank you for supporting our handmade business. We will start working on your beautiful terracotta pieces right away.
          </p>
          <Link to="/shop" className={buttonClassNames()}>
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        {seo}
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="mb-4 text-gray-900 type-h2">Your cart is empty</h1>
          <Link to="/shop" className={buttonClassNames()}>
            Go to Shop
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      {seo}
      <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-22 lg:px-8 lg:py-24">
        <h1 className="mb-10 text-gray-900 type-display">Checkout</h1>
      
      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Form */}
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="rounded-[2px] border border-border-soft bg-surface p-6 md:p-8">
              <h2 className="mb-6 text-gray-900 type-h2">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={fieldGroupClassName}>
                  <label htmlFor="checkout-name" className={labelClassName}>Full Name</label>
                  <input id="checkout-name" required type="text" className={inputClassName()} />
                </div>
                <div className={fieldGroupClassName}>
                  <label htmlFor="checkout-phone" className={labelClassName}>Phone</label>
                  <input id="checkout-phone" required type="tel" className={inputClassName()} />
                </div>
                <div className={`${fieldGroupClassName} md:col-span-2`}>
                  <label htmlFor="checkout-email" className={labelClassName}>Email Address</label>
                  <input id="checkout-email" required type="email" className={inputClassName()} />
                </div>
              </div>
            </div>

            <div className="rounded-[2px] border border-border-soft bg-surface p-6 md:p-8">
              <h2 className="mb-6 text-gray-900 type-h2">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${fieldGroupClassName} md:col-span-2`}>
                  <label htmlFor="checkout-address" className={labelClassName}>Street Address</label>
                  <input id="checkout-address" required type="text" className={inputClassName()} />
                </div>
                <div className={fieldGroupClassName}>
                  <label htmlFor="checkout-city" className={labelClassName}>City</label>
                  <input id="checkout-city" required type="text" className={inputClassName()} />
                </div>
                <div className={fieldGroupClassName}>
                  <label htmlFor="checkout-state" className={labelClassName}>State</label>
                  <input id="checkout-state" required type="text" className={inputClassName()} />
                </div>
                <div className={fieldGroupClassName}>
                  <label htmlFor="checkout-pin" className={labelClassName}>PIN Code</label>
                  <input id="checkout-pin" required type="text" className={inputClassName()} />
                </div>
              </div>
            </div>

            {/* TODO: Supabase integration for order saving */}
            {/* TODO: Razorpay integration for payments */}
            <div className="rounded-[2px] border border-antique-gold/35 bg-antique-gold/10 p-6">
              <p className="text-sm text-gray-800">
                <strong>Preview checkout:</strong> No real payment is collected here. The studio will confirm price, stock, and delivery before live checkout is enabled.
              </p>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="sticky top-24 rounded-[2px] border border-border-soft bg-surface p-6 clay-shadow-soft md:p-8">
            <h2 className="mb-6 text-gray-900 type-h2">Order Summary</h2>
            <ul className="space-y-4 mb-6">
              {items.map(item => (
                <li key={item.cartItemId} className="flex gap-4">
                  <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-[2px] border border-border-soft bg-studio-paper">
                    <ProductImage
                      src={item.images?.[0]}
                      alt={`${item.name}, handmade terracotta jewellery`}
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-gray-900 leading-tight">{item.name}</p>
                    {item.selectedColour && (
                      <p className="text-gray-500">Colour: {item.selectedColour.name}</p>
                    )}
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                    <p className="numeric-tabular font-medium text-gray-900 mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mb-6 space-y-3 border-t border-border-soft pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="numeric-tabular font-medium text-gray-900">{formatPrice(cartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-gray-900">Free</span>
              </div>
              <div className="flex justify-between border-t border-border-soft pt-3 font-serif text-lg">
                <span className="text-gray-900">Total</span>
                <span className="numeric-tabular text-terracotta">{formatPrice(cartTotal())}</span>
              </div>
            </div>

            <Button form="checkout-form" type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : `Place Prototype Order (${formatPrice(cartTotal())})`}
            </Button>
            <p className="mt-3 type-caption text-gray-500">No real payment is collected in this version.</p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
