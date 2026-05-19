import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../lib/data/mockProducts';
import { useCartStore } from '../store/cartStore';
import { formatPrice } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { ProductBadges } from '../components/product/ProductCard';
import { Minus, Plus, Truck, RotateCcw, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { SEO } from '../components/layout/SEO';
import { ProductColourOption } from '../types';

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // TODO: Replace with Supabase fetch using `slug`
  // const { data: product, error } = await supabase.from('products').select('*').eq('slug', slug).single();
  const product = mockProducts.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColour, setSelectedColour] = useState<ProductColourOption | null>(null);
  const [colourError, setColourError] = useState('');

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-serif mb-4">Product not found</h2>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const hasColourOptions = (product.colourOptions?.length ?? 0) > 0;

    if (hasColourOptions && !selectedColour) {
      setColourError('Choose a colour before adding this piece to your cart.');
      return;
    }

    addItem(product, quantity, selectedColour || undefined);
    setIsAdded(true);
    setColourError('');
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const availableColours = product.colourOptions?.filter((colour) => colour.available !== false) ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
      <SEO 
        title={product.name}
        description={product.shortDescription}
        image={product.images?.[0]}
      />
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-24">
        {/* Images */}
        <div className="w-full lg:w-5/12 space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] border border-border-soft bg-surface">
            <ProductBadges product={product} />
            {product.images[activeImage].includes('placehold.co') ? (
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_34%,rgba(179,92,56,0.13),transparent_32%),linear-gradient(135deg,#F8F1E8,#E9DED2)] p-6 text-center text-terracotta"
              >
                <span className="font-serif text-4xl display-logo leading-tight text-terracotta-dark/85">{decodeURIComponent(product.images[activeImage].split('text=')[1] || '').replace(/\+/g, ' ')}</span>
                <span className="mt-5 h-px w-14 bg-terracotta/40" aria-hidden="true" />
              </motion.div>
            ) : (
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  aria-label={`View image ${idx + 1} for ${product.name}`}
                  className={`relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-[2px] border-2 transition-colors ${activeImage === idx ? 'border-terracotta' : 'border-transparent hover:border-border-soft'}`}
                >
                  {img.includes('placehold.co') ? (
                    <div className="flex h-full w-full items-center justify-center border border-border-soft bg-surface p-2 text-center">
                      <span className="text-[8px] font-semibold uppercase leading-tight tracking-[0.12em] text-terracotta">{decodeURIComponent(img.split('text=')[1] || '').replace(/\+/g, ' ')}</span>
                    </div>
                  ) : (
                    <img src={img} alt={`${product.name} thumbnail`} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex w-full flex-col pt-4 lg:w-7/12 lg:pt-12">
          <div className="mb-4 text-terracotta-dark type-overline">{product.subCategory}</div>
          <h1 className="type-display text-gray-900 mb-6">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="numeric-tabular type-h3 text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="numeric-tabular text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="type-body-large text-gray-600 mb-8">
            {product.longDescription || product.shortDescription}
          </p>

          <div className="border-t border-gray-200 py-8 mb-8 space-y-6">
            {availableColours.length > 0 && (
              <fieldset className="space-y-4">
                <legend className="type-overline text-gray-900">Colour</legend>
                <div className="flex flex-wrap gap-3">
                  {availableColours.map((colour) => {
                    const isSelected = selectedColour?.id === colour.id;

                    return (
                      <button
                        key={colour.id}
                        type="button"
                        onClick={() => {
                          setSelectedColour(colour);
                          setColourError('');
                        }}
                        aria-pressed={isSelected}
                        className={`min-h-11 rounded-full border px-4 py-2 font-medium type-caption transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-warm-ivory ${
                          isSelected
                            ? 'border-terracotta bg-terracotta text-warm-ivory'
                            : 'border-gray-300 bg-transparent text-gray-700 hover:border-terracotta'
                        }`}
                      >
                        <span
                          className="mr-2 inline-block h-3 w-3 rounded-full border border-gray-300 align-middle"
                          style={{ background: colour.swatch }}
                        />
                        {colour.name}
                      </button>
                    );
                  })}
                </div>
                {colourError && (
                  <p className="type-caption text-terracotta-dark" role="alert">
                    {colourError}
                  </p>
                )}
              </fieldset>
            )}

            <div className="flex items-center gap-6">
              <span className="type-overline text-gray-900 w-24">Quantity</span>
              <div className="flex items-center rounded-full border border-gray-300 bg-surface">
                <button 
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label={`Decrease quantity for ${product.name}`}
                  className="min-h-11 min-w-11 p-3 text-gray-600 transition-colors hover:text-terracotta"
                >
                  <Minus size={16} />
                </button>
                <span className="numeric-tabular w-12 text-center font-medium">{quantity}</span>
                <button 
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label={`Increase quantity for ${product.name}`}
                  className="min-h-11 min-w-11 p-3 text-gray-600 transition-colors hover:text-terracotta"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <Button 
              size="lg" 
              fullWidth 
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'out_of_stock' || isAdded}
            >
              {product.stockStatus === 'out_of_stock'
                ? 'Sold Out'
                : isAdded
                  ? 'Added to Cart'
                  : availableColours.length > 0 && !selectedColour
                    ? 'Choose Colour'
                    : 'Add to Cart'}
            </Button>
            
            {product.stockStatus === 'made_to_order' && (
             <div className="mt-2 flex items-center gap-2 text-terracotta-dark type-caption">
                <AlertCircle size={16} />
                <span>This item is made to order. Please allow 7-10 days for crafting.</span>
              </div>
            )}
          </div>

          {/* Details Accordion style display (simplified) */}
          <div className="space-y-6 border-t border-gray-200 pt-8">
            <div>
              <h3 className="type-overline text-gray-900 mb-2">Materials</h3>
              <ul className="list-disc list-inside type-body text-gray-600 space-y-1">
                {product.materials.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
            {product.careInstructions && (
              <div>
                <h3 className="type-overline text-gray-900 mb-2">Care Instructions</h3>
                <p className="type-body text-gray-600">{product.careInstructions}</p>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 border-t border-border-soft pt-6 sm:grid-cols-2">
              <div className="flex items-center gap-3 type-caption text-gray-600">
                <Truck className="text-terracotta" size={20} />
                <span>Free shipping over ₹2000</span>
              </div>
              <div className="flex items-center gap-3 type-caption text-gray-600">
                <RotateCcw className="text-terracotta" size={20} />
                <span>7-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
