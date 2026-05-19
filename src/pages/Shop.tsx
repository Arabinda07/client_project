import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/product/ProductCard';
import { mockProducts, categories } from '../lib/data/mockProducts';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';

export const Shop = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('latest');

  const mainCategories = categories.map(cat => cat.name);
  const isAccessoriesCategory = categoryName === 'Accessories';
  const matchesCategory = (productMainCategory: string) => {
    if (!categoryName) return true;
    if (isAccessoriesCategory) return productMainCategory !== 'Terracotta Set' && productMainCategory !== 'Earring';
    return productMainCategory === categoryName;
  };
  
  // Extract all unique subcategories for the current main category, or all if no main category
  const availableSubCategories = useMemo(() => {
    let products = mockProducts;
    if (categoryName) {
      products = products.filter(p => matchesCategory(p.mainCategory));
    }
    return Array.from(new Set(products.map(p => p.subCategory)));
  }, [categoryName]);

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
  }, [categoryName, selectedSubCategory, sortBy]);

  // Reset subcategory when main category changes
  React.useEffect(() => {
    setSelectedSubCategory(null);
  }, [categoryName]);

  const getIntroText = () => {
    // Some subcategories have slight variations in the product data, matching them here.
    const key = selectedSubCategory || categoryName || 'All';
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
        if (categoryName) return `Discover our curated collection of handmade ${categoryName}s. sculpted and painted by hand.`;
        return "Discover our complete range of handmade terracotta creations. Every piece is sculpted and painted by hand.";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
      <SEO 
        title={categoryName ? `${categoryName}s` : 'Shop Handcrafted Terracotta'}
        description={categoryName ? `Browse our curated collection of handmade ${categoryName}s.` : 'Explore our complete range of handmade terracotta creations.'}
      />
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-8">
        <div>
          <span className="text-terracotta type-overline mb-2 block">
            {selectedSubCategory ? categoryName : (categoryName ? 'Category' : 'Explore')}
          </span>
          <h1 className="type-display text-gray-900 mb-4 italic">
            {selectedSubCategory || (categoryName ? `${categoryName}s` : 'All Creations')}
          </h1>
          <p className="text-gray-500 type-body-large">
            {getIntroText()}
          </p>
        </div>
        
        <div className="mt-6 md:mt-0">
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-6 py-3 border border-gray-200 type-overline text-gray-700 bg-white focus:outline-none focus:border-terracotta transition-colors shadow-sm cursor-pointer"
          >
            <option value="latest">Sort by: Latest</option>
            <option value="price_low">Sort by: Price (Low - High)</option>
            <option value="price_high">Sort by: Price (High - Low)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-56 flex-shrink-0">
          <div className="sticky top-32 space-y-12">
            {!categoryName && (
              <div>
                <h3 className="type-overline text-gray-900 mb-6 border-b border-gray-100 pb-2">Collections</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/shop" className="type-caption uppercase tracking-widest font-semibold text-terracotta transition-colors">
                      All Products
                    </Link>
                  </li>
                  {mainCategories.map(cat => (
                    <li key={cat}>
                      <Link to={`/category/${cat}`} className="type-caption uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {availableSubCategories.length > 0 && (
              <div>
                <h3 className="type-overline text-gray-900 mb-6 border-b border-gray-100 pb-2">Styles</h3>
                <ul className="space-y-4">
                  <li>
                    <button 
                      type="button"
                      onClick={() => setSelectedSubCategory(null)}
                      className={`text-left w-full type-caption uppercase tracking-widest transition-colors ${selectedSubCategory === null ? 'text-terracotta font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      All Styles
                    </button>
                  </li>
                  {availableSubCategories.map(sub => (
                    <li key={sub}>
                      <button 
                        type="button"
                        onClick={() => setSelectedSubCategory(sub)}
                        className={`text-left w-full type-caption uppercase tracking-widest transition-colors ${selectedSubCategory === sub ? 'text-terracotta font-semibold' : 'text-gray-500 hover:text-gray-900'}`}
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
            <div className="flex flex-col items-center justify-center py-32 text-center bg-gray-50/50 border border-t-0 lg:border-t border-gray-100">
              <span className="text-terracotta type-overline mb-4 block">No Results</span>
              <h2 className="type-h2 italic text-gray-900 mb-4">Awaiting creation</h2>
              <p className="text-gray-500 type-body mb-8 max-w-sm">We don't have any pieces matching this criteria right now. Check back soon or clear your filters to explore more.</p>
              <Button variant="outline" onClick={() => setSelectedSubCategory(null)}>View All Styles</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
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
