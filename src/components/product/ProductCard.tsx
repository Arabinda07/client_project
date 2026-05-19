import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, cn } from '../../lib/utils';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductBadges: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
      {product.stockStatus === 'out_of_stock' && (
        <span className="bg-gray-800 text-white type-overline px-2 py-1 rounded">Sold Out</span>
      )}
      {product.isSale && product.stockStatus !== 'out_of_stock' && (
        <span className="bg-terracotta text-white type-overline px-2 py-1 rounded">Sale</span>
      )}
      {product.isNew && (
        <span className="bg-terracotta-dark text-white type-overline px-2 py-1 rounded">New</span>
      )}
      {product.isBestseller && (
        <span className="bg-antique-gold text-gray-900 type-overline px-2 py-1 rounded">Bestseller</span>
      )}
    </div>
  );
};

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();
  const availableColours = product.colourOptions?.filter((colour) => colour.available !== false) ?? [];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    e.stopPropagation();

    if (availableColours.length > 1) {
      navigate(`/product/${product.slug}`);
      return;
    }

    addItem(product, 1, availableColours[0]);
  };

  return (
    <div className="group relative flex flex-col h-full bg-transparent">
      <Link to={`/product/${product.slug}`} className="flex-1 flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4 rounded-sm">
          <ProductBadges product={product} />
          {product.images[0].includes('placehold.co') ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-warm-ivory p-6 text-center transition-transform duration-1000 group-hover:scale-105">
               <span className="type-caption text-terracotta">{decodeURIComponent(product.images[0].split('text=')[1] || '').replace(/\+/g, ' ')}</span>
            </div>
          ) : (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover mix-blend-multiply opacity-90"
            />
          )}
          {/* Quick add button overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'out_of_stock'}
              aria-label={availableColours.length > 1 ? `Choose a colour for ${product.name}` : `Add ${product.name} to cart`}
              className={cn(
                "w-full py-3 bg-white/90 backdrop-blur-sm shadow-sm text-gray-900 border border-gray-200 flex items-center justify-center gap-2 type-overline transition-all hover:bg-terracotta hover:text-white hover:border-terracotta",
                product.stockStatus === 'out_of_stock' && "opacity-50 cursor-not-allowed hover:bg-white/90 hover:text-gray-900"
              )}
            >
              <ShoppingBag size={16} />
              {product.stockStatus === 'out_of_stock'
                ? 'Out of Stock'
                : availableColours.length > 1
                  ? 'Choose Colour'
                  : 'Add to Cart'}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center text-center px-2">
          <h3 className="type-h3 text-gray-900 group-hover:text-terracotta transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="type-overline text-gray-500 mb-2">{product.subCategory}</p>
          {availableColours.length > 0 && (
            <div className="mb-3 flex items-center justify-center gap-1.5" aria-label={`Available colours for ${product.name}`}>
              {availableColours.slice(0, 4).map((colour) => (
                <span
                  key={colour.id}
                  title={colour.name}
                  className="h-3 w-3 rounded-full border border-gray-300"
                  style={{ background: colour.swatch }}
                />
              ))}
            </div>
          )}
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-gray-900 font-medium">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
