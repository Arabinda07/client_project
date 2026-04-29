import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { SEO } from '../components/layout/SEO';

export const Cart = () => {
  const { items, updateQuantity, removeItem, cartTotal } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <SEO title="Shopping Cart" description="Review your selected handmade terracotta jewellery pieces before checkout." />
      
      <h1 className="type-display text-gray-900 mb-2 italic">Shopping Cart</h1>
      <p className="type-overline text-gray-500 mb-12">Review your selections</p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 border border-gray-100 mt-8">
          <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 mb-6 bg-white">
            <ShoppingBag size={32} strokeWidth={1} />
          </div>
          <h2 className="type-h2 text-gray-900 mb-4">Your cart is empty</h2>
          <p className="type-body text-gray-500 mb-8 max-w-sm">Looks like you haven't added any terracotta art pieces to your cart yet.</p>
          <Link to="/shop">
            <Button className="px-8 py-3 h-auto">Explore Shop</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start mt-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 type-overline text-gray-400">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>
            
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.cartItemId} className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center">
                  <div className="col-span-12 md:col-span-6 flex gap-4">
                    <Link to={`/product/${item.slug}`} className="block w-20 h-24 sm:w-24 sm:h-32 bg-gray-100 shrink-0 border border-gray-100">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${item.slug}`} className="type-h3 text-gray-900 hover:text-terracotta transition-colors">{item.name}</Link>
                      <p className="text-terracotta font-medium type-body mt-1">₹{item.price}</p>
                      
                      {/* Mobile quantity & remove (visible only on small screens) */}
                      <div className="flex items-center gap-4 mt-4 md:hidden">
                        <div className="flex items-center border border-gray-200 rounded-full h-8">
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-terracotta transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-terracotta transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop quantity (hidden on small screens) */}
                  <div className="hidden md:flex col-span-3 justify-center">
                    <div className="flex items-center border border-gray-200 rounded-full h-10 w-28">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-terracotta transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        className="flex-1 h-full flex items-center justify-center text-gray-500 hover:text-terracotta transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Desktop total & remove (hidden on small screens) */}
                  <div className="hidden md:flex col-span-3 items-center justify-between pl-4">
                    <span className="font-medium text-gray-900 mx-auto">₹{item.price * item.quantity}</span>
                    <button 
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-gray-400 hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center"
                      title="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1 border border-gray-200 bg-gray-50/50 p-6 sm:p-8 shrink-0 lg:sticky lg:top-32">
            <h2 className="type-h2 text-gray-900 mb-6">Order Summary</h2>
            <div className="space-y-4 type-body text-gray-600 border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{cartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-terracotta type-caption font-bold uppercase tracking-wide pt-1">Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-8">
              <span className="type-h3 text-gray-900">Total</span>
              <span className="type-h2 text-terracotta">₹{cartTotal()}</span>
            </div>
            
            <Link to="/checkout" className="block">
              <Button fullWidth className="h-14 bg-gray-900 flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight size={16} />
              </Button>
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-200 pt-6 text-gray-400">
               {/* placeholder for payment icons or secure checkout badge */}
               <span className="type-overline">Secure Checkout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
