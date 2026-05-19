import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';

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

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Order Confirmed</h1>
        <p className="text-gray-600 mb-8">
          Thank you for supporting our handmade business. We will start working on your beautiful terracotta pieces right away.
        </p>
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-gray-900 mb-4">Your cart is empty</h1>
        <Link to="/shop">
          <Button>Go to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="flex-1">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="checkout-name" className="text-sm font-medium text-gray-700">Full Name</label>
                  <input id="checkout-name" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-phone" className="text-sm font-medium text-gray-700">Phone</label>
                  <input id="checkout-phone" required type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="checkout-email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <input id="checkout-email" required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="checkout-address" className="text-sm font-medium text-gray-700">Street Address</label>
                  <input id="checkout-address" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-city" className="text-sm font-medium text-gray-700">City</label>
                  <input id="checkout-city" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-state" className="text-sm font-medium text-gray-700">State</label>
                  <input id="checkout-state" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="checkout-pin" className="text-sm font-medium text-gray-700">PIN Code</label>
                  <input id="checkout-pin" required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
                </div>
              </div>
            </div>

            {/* TODO: Supabase integration for order saving */}
            {/* TODO: Razorpay integration for payments */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
              <p className="text-amber-800 text-sm">
                <strong>Note:</strong> Payment gateway integration (Razorpay) will be implemented here. For this prototype, clicking "Place Order" will simulate a successful transaction.
              </p>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
            <ul className="space-y-4 mb-6">
              {items.map(item => (
                <li key={item.cartItemId} className="flex gap-4">
                  <div className="w-16 h-20 bg-warm-ivory rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                    {item.images[0].includes('placehold.co') ? (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-1">
                        <span className="text-[6px] uppercase tracking-widest text-terracotta leading-tight">{decodeURIComponent(item.images[0].split('text=')[1] || '').replace(/\+/g, ' ')}</span>
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
                    <p className="font-medium text-gray-900 mt-1">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-900">{formatPrice(cartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-gray-900">Free</span>
              </div>
              <div className="flex justify-between text-lg font-serif pt-3 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-terracotta">{formatPrice(cartTotal())}</span>
              </div>
            </div>

            <Button form="checkout-form" type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : `Pay ${formatPrice(cartTotal())}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
