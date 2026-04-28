import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, cn } from '../../lib/utils';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductBadges: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
      {product.stockStatus === 'out_of_stock' && (
        <span className="bg-gray-800 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">Sold Out</span>
      )}
      {product.isSale && product.stockStatus !== 'out_of_stock' && (
        <span className="bg-terracotta text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">Sale</span>
      )}
      {product.isNew && (
        <span className="bg-terracotta-dark text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">New</span>
      )}
      {product.isBestseller && (
        <span className="bg-antique-gold text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">Bestseller</span>
      )}
      {product.isCustomisable && (
        <span className="bg-warm-ivory text-terracotta border border-terracotta text-[10px] uppercase tracking-widest px-2 py-1 rounded">Customisable</span>
      )}
    </div>
  );
};

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="group relative flex flex-col h-full bg-transparent">
      <Link to={`/product/${product.slug}`} className="flex-1 flex flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4 rounded-sm">
          <ProductBadges product={product} />
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply opacity-90"
          />
          {/* Quick add button overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
            <button
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'out_of_stock'}
              className={cn(
                "w-full py-3 bg-white/90 backdrop-blur-sm shadow-sm text-gray-900 border border-gray-200 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all hover:bg-terracotta hover:text-white hover:border-terracotta",
                product.stockStatus === 'out_of_stock' && "opacity-50 cursor-not-allowed hover:bg-white/90 hover:text-gray-900"
              )}
            >
              <ShoppingBag size={16} />
              {product.stockStatus === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center text-center px-2">
          <h3 className="font-serif text-lg lg:text-xl text-gray-900 group-hover:text-terracotta transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2">{product.subCategory}</p>
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
