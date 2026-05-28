import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatPrice, cn } from '../../lib/utils';
import { ShoppingBag } from 'lucide-react';
import { ProductImage } from '../ui/Media';

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
    <article className="group relative flex h-full flex-col">
      <div className="flex h-full flex-col border border-border-soft bg-surface p-3 transition-colors duration-300 hover:border-terracotta/45">
        <div className="relative mb-4.5 aspect-[4/5] overflow-hidden rounded-[2px] bg-studio-wash">
          <Link
            to={`/product/${product.slug}`}
            className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            aria-label={`View ${product.name}`}
          >
            <ProductBadges product={product} />
            <ProductImage
              src={product.images?.[0]}
              alt={`${product.name}, handmade terracotta jewellery`}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
            />
          </Link>
          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-0 p-3 opacity-100 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stockStatus === 'out_of_stock'}
              aria-label={availableColours.length > 1 ? `Choose a colour for ${product.name}` : `Add ${product.name} to cart`}
              className={cn(
                "flex min-h-11 w-full items-center justify-center gap-2 rounded-[2px] border border-border-soft bg-studio-paper/95 px-3 py-2.5 text-gray-900 type-overline transition-colors duration-300 hover:border-terracotta hover:bg-terracotta hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                product.stockStatus === 'out_of_stock' && "cursor-not-allowed opacity-60 hover:border-border-soft hover:bg-studio-paper/95 hover:text-gray-900"
              )}
            >
              <ShoppingBag size={14} />
              {product.stockStatus === 'out_of_stock'
                ? 'Out of Stock'
                : availableColours.length > 1
                  ? 'Choose Colour'
                  : 'Add to Cart'}
            </button>
          </div>
        </div>
        <div className="flex flex-grow flex-col items-start justify-between px-0.5 text-left">
          <div>
            <h3 className="mb-1 line-clamp-2 min-h-[2.8rem] font-sans text-[0.98rem] font-semibold leading-[1.38]">
              <Link
                to={`/product/${product.slug}`}
                className="text-gray-900 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mb-2.5 text-[0.625rem] font-bold uppercase tracking-[0.15em] text-terracotta-dark">{product.subCategory}</p>
          </div>
          <div className="w-full">
            {availableColours.length > 0 && (
              <div className="mb-3.5 flex items-center gap-1.5" aria-label={`Available colours for ${product.name}`}>
                {availableColours.slice(0, 4).map((colour) => (
                  <span
                    key={colour.id}
                    title={colour.name}
                    className="h-3 w-3 rounded-full border border-gray-300/60"
                    style={{ background: colour.swatch }}
                  />
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 border-t border-border-soft/30 pt-1">
              <span className="numeric-tabular text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="numeric-tabular text-[10px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
