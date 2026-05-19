import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';

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
          <Link to="/shop">
            <Button>Continue Shopping</Button>
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
          <Link to="/shop">
            <Button>Go to Shop</Button>
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
                <div className="space-y-2">
                  <label htmlFor="checkout-name" className="text-gray-700 type-overline">Full Name</label>
                  <input id="checkout-name" required type="text" className="min-h-12 w-full rounded-[2px] border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-phone" className="text-gray-700 type-overline">Phone</label>
                  <input id="checkout-phone" required type="tel" className="min-h-12 w-full rounded-[2px] border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="checkout-email" className="text-gray-700 type-overline">Email Address</label>
                  <input id="checkout-email" required type="email" className="min-h-12 w-full rounded-[2px] border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
              </div>
            </div>

            <div className="rounded-[2px] border border-border-soft bg-surface p-6 md:p-8">
              <h2 className="mb-6 text-gray-900 type-h2">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="checkout-address" className="text-gray-700 type-overline">Street Address</label>
                  <input id="checkout-address" required type="text" className="min-h-12 w-full rounded-[2px] border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-city" className="text-gray-700 type-overline">City</label>
                  <input id="checkout-city" required type="text" className="min-h-12 w-full rounded-[2px] border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-state" className="text-gray-700 type-overline">State</label>
                  <input id="checkout-state" required type="text" className="min-h-12 w-full rounded-[2px] border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-pin" className="text-gray-700 type-overline">PIN Code</label>
                  <input id="checkout-pin" required type="text" className="min-h-12 w-full rounded-[2px] border border-gray-300 bg-studio-paper px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta" />
                </div>
              </div>
            </div>

            {/* TODO: Supabase integration for order saving */}
            {/* TODO: Razorpay integration for payments */}
            <div className="rounded-[2px] border border-antique-gold/35 bg-antique-gold/10 p-6">
              <p className="text-sm text-gray-800">
                <strong>Note:</strong> Payment gateway integration (Razorpay) will be implemented here. For this prototype, clicking "Place Order" will simulate a successful transaction.
              </p>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="sticky top-24 rounded-[2px] border border-border-soft bg-surface p-6 shadow-[0_18px_48px_rgba(49,39,31,0.06)] md:p-8">
            <h2 className="mb-6 text-gray-900 type-h2">Order Summary</h2>
            <ul className="space-y-4 mb-6">
              {items.map(item => (
                <li key={item.cartItemId} className="flex gap-4">
                  <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-[2px] border border-border-soft bg-studio-paper">
                    {item.images[0].includes('placehold.co') ? (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_34%,rgba(179,92,56,0.13),transparent_34%),linear-gradient(135deg,#F8F1E8,#E9DED2)] p-1 text-center">
                        <span className="text-[6px] font-semibold uppercase leading-tight tracking-[0.12em] text-terracotta">{decodeURIComponent(item.images[0].split('text=')[1] || '').replace(/\+/g, ' ')}</span>
                      </div>
                    ) : (
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    )}
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
              {isSubmitting ? 'Processing...' : `Pay ${formatPrice(cartTotal())}`}
            </Button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
