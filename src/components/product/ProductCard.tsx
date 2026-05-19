import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, cn } from '../../lib/utils';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductBadges: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
      {product.stockStatus === 'out_of_stock' && (
        <span className="rounded-[2px] bg-gray-800 px-2.5 py-1 text-warm-ivory type-overline">Sold Out</span>
      )}
      {product.isSale && product.stockStatus !== 'out_of_stock' && (
        <span className="rounded-[2px] bg-terracotta px-2.5 py-1 text-warm-ivory type-overline">Sale</span>
      )}
      {product.isNew && (
        <span className="rounded-[2px] bg-terracotta-dark px-2.5 py-1 text-warm-ivory type-overline">New</span>
      )}
      {product.isBestseller && (
        <span className="rounded-[2px] bg-antique-gold px-2.5 py-1 text-gray-900 type-overline">Bestseller</span>
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
    <div className="group relative flex h-full flex-col bg-transparent">
      <Link to={`/product/${product.slug}`} className="flex-1 flex flex-col">
        <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[2px] border border-border-soft bg-surface">
          <ProductBadges product={product} />
          {product.images[0].includes('placehold.co') ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_34%,rgba(179,92,56,0.13),transparent_32%),linear-gradient(135deg,#F8F1E8,#E9DED2)] p-6 text-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
               <span className="font-serif text-2xl display-logo leading-tight text-terracotta-dark/85">{decodeURIComponent(product.images[0].split('text=')[1] || '').replace(/\+/g, ' ')}</span>
               <span className="mt-4 h-px w-12 bg-terracotta/40" aria-hidden="true" />
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
          <div className="absolute inset-x-0 bottom-0 translate-y-0 p-3 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-4 md:p-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'out_of_stock'}
              aria-label={availableColours.length > 1 ? `Choose a colour for ${product.name}` : `Add ${product.name} to cart`}
              className={cn(
                "flex min-h-11 w-full items-center justify-center gap-2 rounded-[2px] border border-border-soft bg-studio-paper/95 px-4 py-3 text-gray-900 shadow-[0_12px_30px_rgba(49,39,31,0.08)] type-overline transition-all hover:border-terracotta hover:bg-terracotta hover:text-warm-ivory",
                product.stockStatus === 'out_of_stock' && "cursor-not-allowed opacity-60 hover:border-border-soft hover:bg-studio-paper/95 hover:text-gray-900"
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
        <div className="flex flex-col items-start px-1 text-left">
          <h3 className="mb-1 line-clamp-2 min-h-[3.05rem] font-sans text-[1.08rem] font-semibold leading-[1.38] text-gray-900 transition-colors group-hover:text-terracotta">
            {product.name}
          </h3>
          <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-gray-500">{product.subCategory}</p>
          {availableColours.length > 0 && (
            <div className="mb-3 flex items-center gap-1.5" aria-label={`Available colours for ${product.name}`}>
              {availableColours.slice(0, 4).map((colour) => (
                <span
                  key={colour.id}
                  title={colour.name}
                  className="h-3.5 w-3.5 rounded-full border border-gray-300"
                  style={{ background: colour.swatch }}
                />
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="numeric-tabular text-sm font-semibold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="numeric-tabular text-[11px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
