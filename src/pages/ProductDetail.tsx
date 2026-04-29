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

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-serif mb-4">Product not found</h2>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24 sm:py-32">
      <SEO 
        title={product.name}
        description={product.shortDescription}
        image={product.images?.[0]}
      />
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Images */}
        <div className="w-full lg:w-5/12 space-y-6">
          <div className="relative aspect-[3/4] bg-warm-ivory rounded-none overflow-hidden">
            <ProductBadges product={product} />
            {product.images[activeImage].includes('placehold.co') ? (
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-terracotta border border-gray-200"
              >
                <span className="type-caption uppercase tracking-widest">{decodeURIComponent(product.images[activeImage].split('text=')[1] || '').replace(/\+/g, ' ')}</span>
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
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 ${activeImage === idx ? 'border-terracotta' : 'border-transparent'}`}
                >
                  {img.includes('placehold.co') ? (
                    <div className="w-full h-full bg-warm-ivory flex items-center justify-center p-2 text-center border-r border-b border-gray-200">
                      <span className="text-[8px] uppercase tracking-widest text-terracotta leading-tight">{decodeURIComponent(img.split('text=')[1] || '').replace(/\+/g, ' ')}</span>
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
        <div className="w-full lg:w-7/12 flex flex-col pt-8 lg:pt-16">
          <div className="mb-4 type-overline text-gray-500">{product.subCategory}</div>
          <h1 className="type-display text-gray-900 mb-6">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="type-h3 text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="type-body-large text-gray-600 mb-8">
            {product.longDescription || product.shortDescription}
          </p>

          <div className="border-t border-gray-200 py-8 mb-8 space-y-6">
            <div className="flex items-center gap-6">
              <span className="type-overline text-gray-900 w-24">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-full bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 text-gray-600 hover:text-terracotta transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 text-gray-600 hover:text-terracotta transition-colors"
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
              {product.stockStatus === 'out_of_stock' ? 'Sold Out' : isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
            </Button>
            
            {product.stockStatus === 'made_to_order' && (
             <div className="flex items-center gap-2 text-amber-600 type-caption mt-2">
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
            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
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
