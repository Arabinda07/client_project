import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { SEO } from '../components/layout/SEO';
import { formatPrice } from '../lib/utils';

export const Cart = () => {
  const { items, updateQuantity, removeItem, cartTotal } = useCartStore();

  return (
    <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-22 lg:px-8 lg:py-24">
      <SEO title="Shopping Cart" description="Review your selected handmade terracotta jewellery pieces before checkout." />
      
      <h1 className="type-display text-gray-900 mb-2">Shopping Cart</h1>
      <p className="type-overline text-gray-500 mb-12">Review your selections</p>

      {items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center border border-border-soft bg-surface py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border-soft bg-studio-paper text-gray-400">
            <ShoppingBag size={32} strokeWidth={1} />
          </div>
          <h2 className="type-h2 text-gray-900 mb-4">Your cart is empty</h2>
          <p className="type-body text-gray-500 mb-8 max-w-sm">Looks like you haven't added any terracotta art pieces to your cart yet.</p>
          <Link to="/shop">
            <Button className="px-8 py-3 h-auto">Explore Shop</Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="hidden grid-cols-12 gap-4 border-b border-border-soft pb-4 text-gray-500 type-overline md:grid">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.cartItemId} className="grid grid-cols-12 items-center gap-4 border-b border-border-soft py-4">
                  <div className="col-span-12 md:col-span-6 flex gap-4">
                    <Link to={`/product/${item.slug}`} className="block h-24 w-20 shrink-0 overflow-hidden rounded-[2px] border border-border-soft bg-surface sm:h-32 sm:w-24">
                      <div className="flex h-full w-full items-center justify-center bg-studio-wash/40 border border-dashed border-border-soft/60">
                        {/* Image kept empty */}
                      </div>
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${item.slug}`} className="font-sans text-lg font-semibold leading-snug text-gray-900 transition-colors hover:text-terracotta">{item.name}</Link>
                      {item.selectedColour && (
                        <p className="type-caption text-gray-500 mt-1">Colour: {item.selectedColour.name}</p>
                      )}
                      <p className="numeric-tabular text-terracotta font-medium type-body mt-1">{formatPrice(item.price)}</p>
                      
                      {/* Mobile quantity & remove (visible only on small screens) */}
                      <div className="mt-4 flex items-center gap-4 md:hidden">
                        <div className="flex h-10 items-center rounded-full border border-border-soft bg-surface">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            aria-label={`Decrease quantity for ${item.name}`}
                            className="flex h-full w-10 items-center justify-center text-gray-500 transition-colors hover:text-terracotta"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="numeric-tabular w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            aria-label={`Increase quantity for ${item.name}`}
                            className="flex h-full w-10 items-center justify-center text-gray-500 transition-colors hover:text-terracotta"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeItem(item.cartItemId)}
                          className="flex min-h-10 min-w-10 items-center justify-center text-gray-400 transition-colors hover:text-terracotta-dark"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop quantity (hidden on small screens) */}
                  <div className="hidden md:flex col-span-3 justify-center">
                    <div className="flex h-11 w-32 items-center rounded-full border border-border-soft bg-surface">
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            aria-label={`Decrease quantity for ${item.name}`}
                            className="flex h-full flex-1 items-center justify-center text-gray-500 transition-colors hover:text-terracotta"
                          >
                        <Minus size={14} />
                      </button>
                      <span className="numeric-tabular w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            aria-label={`Increase quantity for ${item.name}`}
                            className="flex h-full flex-1 items-center justify-center text-gray-500 transition-colors hover:text-terracotta"
                          >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Desktop total & remove (hidden on small screens) */}
                  <div className="hidden md:flex col-span-3 items-center justify-between pl-4">
                    <span className="numeric-tabular font-medium text-gray-900 mx-auto">{formatPrice(item.price * item.quantity)}</span>
                    <button 
                      type="button"
                      onClick={() => removeItem(item.cartItemId)}
                      className="flex h-10 w-10 items-center justify-center text-gray-400 transition-colors hover:text-terracotta-dark"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="shrink-0 border border-border-soft bg-surface p-6 shadow-[0_18px_48px_rgba(49,39,31,0.06)] sm:p-8 lg:sticky lg:top-32 lg:col-span-1">
            <h2 className="type-h2 text-gray-900 mb-6">Order Summary</h2>
            <div className="mb-6 space-y-4 border-b border-border-soft pb-6 text-gray-600 type-body">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="numeric-tabular font-medium text-gray-900">{formatPrice(cartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-terracotta type-caption font-semibold uppercase tracking-[0.12em] pt-1">Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="type-h3 text-gray-900">Total</span>
              <span className="numeric-tabular type-h2 text-terracotta">{formatPrice(cartTotal())}</span>
            </div>
            
            <Link to="/checkout" className="block">
              <Button fullWidth variant="secondary" className="flex h-14 items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={16} />
              </Button>
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-4 border-t border-border-soft pt-6 text-gray-500">
               {/* placeholder for payment icons or secure checkout badge */}
               <span className="type-overline">Secure Checkout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
