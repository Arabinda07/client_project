import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { mockProducts } from '../lib/data/mockProducts';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';
import { brand } from '../lib/brand';
import {
  getCategoryPath,
  isAccessoryCategoryName,
  primaryCategoryLinks,
  resolveCategoryParam,
} from '../lib/catalog';

export const Shop = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const navigate = useNavigate();
  const activeCategory = resolveCategoryParam(categoryName);
  const activeCategoryName = activeCategory?.name;
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('latest');

  const mainCategories = primaryCategoryLinks;
  const isAccessoriesCategory = isAccessoryCategoryName(activeCategoryName);
  const matchesCategory = (productMainCategory: string) => {
    if (!activeCategoryName) return !categoryName;
    if (isAccessoriesCategory) return productMainCategory !== 'Terracotta Set' && productMainCategory !== 'Earring';
    return productMainCategory === activeCategoryName;
  };
  
  // Extract all unique subcategories for the current main category, or all if no main category
  const availableSubCategories = useMemo(() => {
    if (categoryName && !activeCategoryName) return [];
    let products = mockProducts;
    if (activeCategoryName) {
      products = products.filter(p => matchesCategory(p.mainCategory));
    }
    return Array.from(new Set(products.map(p => p.subCategory)));
  }, [activeCategoryName, categoryName]);

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];
    
    if (categoryName) {
      result = result.filter(p => matchesCategory(p.mainCategory));
    }
    
    if (selectedSubCategory) {
      result = result.filter(p => p.subCategory === selectedSubCategory);
    }

    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
      default:
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
    }

    return result;
  }, [activeCategoryName, categoryName, selectedSubCategory, sortBy]);

  // Reset subcategory when main category changes
  React.useEffect(() => {
    setSelectedSubCategory(null);
  }, [categoryName]);

  React.useEffect(() => {
    if (activeCategory?.isLegacyPath) {
      navigate(getCategoryPath(activeCategory.slug), { replace: true });
    }
  }, [activeCategory?.isLegacyPath, activeCategory?.slug, navigate]);

  const getIntroText = () => {
    // Some subcategories have slight variations in the product data, matching them here.
    const key = selectedSubCategory || activeCategoryName || 'All';
    switch (key) {
      case 'Terracotta Set':
        return "Complete statements of wearable art. Our necklace sets bring traditional motifs to life, perfect for when you want to carry a piece of heritage with you.";
      case 'Earring':
        return "From traditional jhumkas to modern textured drops. Lightweight, face-framing art pieces for every occasion.";
      case 'Accessories':
        return "Rings, bangles, pins, clips, and small clay details for gifting or everyday wear.";
      case 'Gen-Z Set':
      case 'Gen-Z':
        return "Playful, abstract, and bold. Earthen clay reimagined for the modern wardrobe.";
      case 'Abstract Set':
      case 'Abstract':
        return "Fluid shapes and unconventional forms. For those who wear art as their signature.";
      case 'Hansuli':
        return "A homage to the timeless choker. Solid, striking, and elegantly curved to rest perfectly on the collarbone.";
      case '3D-Art':
      case '3D-Art Earring':
        return "Intricate sculpting that rises from the clay. Every petal and bead shaped with meticulous attention to detail.";
      case 'Painted Set':
      case 'Painted Earring':
        return "Canvas on clay. Delicate brushstrokes and rich colors applied by hand to traditional Indian motifs.";
      default:
        if (activeCategoryName) return `Discover our curated collection of handmade ${activeCategory?.label.toLowerCase()}. Sculpted and painted by hand.`;
        return "Discover our complete range of handmade terracotta creations. Every piece is sculpted and painted by hand.";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-22 lg:px-10 lg:py-24">
      <SEO 
        title={activeCategory ? activeCategory.label : 'Shop Handcrafted Terracotta'}
        description={activeCategory ? `Browse handmade ${activeCategory.label.toLowerCase()} from ${brand.name}.` : 'Explore our complete range of handmade terracotta creations.'}
        canonicalPath={activeCategory ? getCategoryPath(activeCategory.slug) : '/shop'}
        noIndex={Boolean(categoryName && !activeCategory)}
      />
      <div className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-border-soft pb-8 md:flex-row md:items-end">
        <div className="max-w-3xl">
          <span className="mb-3 block text-terracotta-dark type-overline">
            {selectedSubCategory ? activeCategory?.label : (activeCategory ? 'Category' : 'Explore')}
          </span>
          <h1 className="type-display text-gray-900 mb-4">
            {selectedSubCategory || (activeCategory ? activeCategory.label : 'All Creations')}
          </h1>
          <p className="text-gray-600 type-body-large">
            {getIntroText()}
          </p>
        </div>
        
        <div className="w-full md:w-auto">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="min-h-12 w-full cursor-pointer rounded-[2px] border border-border-soft bg-surface px-5 py-3 text-gray-800 transition-colors focus:border-terracotta focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory type-overline md:w-72"
          >
            <option value="latest">Sort by: Latest</option>
            <option value="price_low">Sort by: Price (Low - High)</option>
            <option value="price_high">Sort by: Price (High - Low)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          <div className="sticky top-32 space-y-12">
            {!categoryName && (
              <div>
                <h3 className="mb-6 border-b border-border-soft pb-2 text-gray-900 type-overline">Collections</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/shop" className="inline-flex min-h-11 items-center font-semibold uppercase tracking-[0.12em] text-terracotta transition-colors type-caption focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory">
                      All Pieces
                    </Link>
                  </li>
                  {mainCategories.map(cat => (
                    <li key={cat.slug}>
                      <Link to={getCategoryPath(cat.slug)} className="inline-flex min-h-11 items-center font-medium uppercase tracking-[0.12em] text-gray-500 transition-colors hover:text-gray-900 type-caption focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory">
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {availableSubCategories.length > 0 && (
              <div>
                <h3 className="mb-6 border-b border-border-soft pb-2 text-gray-900 type-overline">Styles</h3>
                <ul className="space-y-4">
                  <li>
                    <button 
                      type="button"
                      onClick={() => setSelectedSubCategory(null)}
                      className={`min-h-11 w-full text-left font-medium uppercase tracking-[0.12em] transition-colors type-caption focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory ${selectedSubCategory === null ? 'text-terracotta font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      All Styles
                    </button>
                  </li>
                  {availableSubCategories.map(sub => (
                    <li key={sub}>
                      <button 
                        type="button"
                        onClick={() => setSelectedSubCategory(sub)}
                        className={`min-h-11 w-full text-left font-medium uppercase tracking-[0.12em] transition-colors type-caption focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory ${selectedSubCategory === sub ? 'text-terracotta font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                      >
                        {sub}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-border-soft bg-surface/70 py-28 text-center">
              <span className="mb-4 block text-terracotta-dark type-overline">No Results</span>
              <h2 className="type-h2 text-gray-900 mb-4">Awaiting creation</h2>
              <p className="text-gray-500 type-body mb-8 max-w-sm">We don't have any pieces matching this criteria right now. Check back soon or clear your filters to explore more.</p>
              <Button variant="outline" onClick={() => setSelectedSubCategory(null)}>View All Styles</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
