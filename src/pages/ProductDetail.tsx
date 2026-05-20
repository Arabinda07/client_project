import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../lib/data/mockProducts';
import { useCartStore } from '../store/cartStore';
import { formatPrice, cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { ProductBadges } from '../components/product/ProductCard';
import { Minus, Plus, Truck, RotateCcw, AlertCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/layout/SEO';
import { ProductColourOption } from '../types';

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // TODO: Replace with Supabase fetch using `slug`
  const product = mockProducts.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColour, setSelectedColour] = useState<ProductColourOption | null>(null);
  const [colourError, setColourError] = useState('');
  const [openSection, setOpenSection] = useState<string | null>('materials');
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Build conversational WhatsApp link
  const colourText = selectedColour ? ` in ${selectedColour.name}` : '';
  const waMessage = `Hi Goonjaa, I am interested in purchasing ${product.name}${colourText} (Quantity: ${quantity}). Could you help me with checking out?`;
  const whatsappUrl = `https://wa.me/918910214167?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28 relative">
      <SEO 
        title={product.name}
        description={product.shortDescription}
        image={product.images?.[0]}
      />
      <div className="flex flex-col gap-14 lg:flex-row lg:gap-24">
        {/* Images with double bezel */}
        <div className="w-full lg:w-5/12 space-y-6">
          <div className="relative aspect-[3/4] overflow-hidden double-bezel-outer bg-studio-wash">
            <div className="double-bezel-inner h-full w-full relative">
              <ProductBadges product={product} />
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex h-full w-full items-center justify-center bg-studio-wash/30 border border-dashed border-border-soft"
              >
                {/* Image container kept empty for actual product image */}
              </motion.div>
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  aria-label={`View image ${idx + 1} for ${product.name}`}
                  className={`relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all ${activeImage === idx ? 'border-terracotta ring-1 ring-terracotta/30' : 'border-border-soft hover:border-terracotta/55'}`}
                >
                  <div className="flex h-full w-full items-center justify-center bg-studio-wash/40 border border-dashed border-border-soft/60">
                    {/* Thumbnail container kept empty */}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex w-full flex-col pt-4 lg:w-7/12 lg:pt-12">
          <div className="mb-4 text-terracotta-dark type-overline font-semibold tracking-widest">{product.subCategory}</div>
          <h1 className="type-display text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="numeric-tabular type-h3 text-gray-900 font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="numeric-tabular text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Weight Details */}
          <div className="mb-5 text-sm font-semibold text-terracotta-dark">
            Weight: ~15g to 25g. Extremely lightweight clay structure designed for all-day comfort.
          </div>

          {/* Handmade Variation Disclaimer Note */}
          <p className="type-body text-xs italic text-terracotta-dark/90 bg-studio-wash/60 border-l-2 border-terracotta px-4 py-3 rounded-r-md mb-8 leading-relaxed">
            "Sculpted entirely by hand without molds. Slight variations in shape, size, and paint are the signatures of the human hand."
          </p>

          <p className="type-body-large text-gray-600 mb-8 leading-relaxed">
            {product.longDescription || product.shortDescription}
          </p>

          <div className="border-t border-gray-200 py-8 mb-8 space-y-6">
            {availableColours.length > 0 && (
              <fieldset className="space-y-4">
                <legend className="type-overline text-gray-900 font-bold">Colour</legend>
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
                        className={`min-h-10 rounded-full border px-4 py-2 font-medium type-caption transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-warm-ivory ${
                          isSelected
                            ? 'border-terracotta bg-terracotta text-warm-ivory'
                            : 'border-gray-300 bg-transparent text-gray-700 hover:border-terracotta'
                        }`}
                      >
                        <span
                          className="mr-2 inline-block h-3 w-3 rounded-full border border-gray-300 align-middle shadow-xs"
                          style={{ background: colour.swatch }}
                        />
                        {colour.name}
                      </button>
                    );
                  })}
                </div>
                {colourError && (
                  <p className="type-caption text-terracotta-dark font-semibold" role="alert">
                    {colourError}
                  </p>
                )}
              </fieldset>
            )}

            <div className="flex items-center gap-6">
              <span className="type-overline text-gray-900 w-24 font-bold">Quantity</span>
              <div className="flex items-center rounded-full border border-gray-300 bg-surface">
                <button 
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label={`Decrease quantity for ${product.name}`}
                  className="min-h-11 min-w-11 p-3 text-gray-600 transition-colors hover:text-terracotta"
                >
                  <Minus size={16} />
                </button>
                <span className="numeric-tabular w-12 text-center font-semibold">{quantity}</span>
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

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button 
                size="lg" 
                className="flex-1"
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
              
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 rounded-lg border-2 border-[#25D366]/40 hover:border-[#25D366] bg-transparent hover:bg-[#25D366]/5 px-6 py-3.5 text-[#25D366] font-semibold text-sm transition-all duration-300 focus:outline-none"
              >
                <MessageSquare size={16} />
                Order via WhatsApp
              </a>
            </div>
            
            {product.stockStatus === 'made_to_order' && (
             <div className="mt-2 flex items-center gap-2 text-terracotta-dark type-caption font-semibold">
                <AlertCircle size={16} />
                <span>This item is made to order. Please allow 7-10 days for crafting.</span>
              </div>
            )}
          </div>

          {/* Details Accordion style display */}
          <div className="space-y-4 border-t border-gray-200 pt-8 mt-8">
            {/* Section 1: Materials & Weight */}
            <div className="border-b border-border-soft/60 pb-4">
              <button
                type="button"
                onClick={() => toggleSection('materials')}
                className="w-full flex items-center justify-between py-2 text-left font-serif text-lg font-bold text-gray-900 focus:outline-none"
              >
                <span>Materials & Weight</span>
                {openSection === 'materials' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence initial={false}>
                {openSection === 'materials' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="type-body text-gray-600 space-y-3 pl-1">
                      <p><span className="font-semibold text-gray-800">Weight Details:</span> ~15g to 25g. Extremely lightweight clay structure designed for all-day comfort.</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {product.materials.map((m, i) => (
                          <span key={i} className="px-2.5 py-1 bg-studio-wash text-xs rounded-full border border-border-soft text-gray-700">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 2: Care Instructions */}
            {product.careInstructions && (
              <div className="border-b border-border-soft/60 pb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('care')}
                  className="w-full flex items-center justify-between py-2 text-left font-serif text-lg font-bold text-gray-900 focus:outline-none"
                >
                  <span>Care Instructions</span>
                  {openSection === 'care' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <AnimatePresence initial={false}>
                  {openSection === 'care' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden mt-3"
                    >
                      <p className="type-body text-gray-600 pl-1 leading-relaxed">
                        {product.careInstructions}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Section 3: Firing & Shipping */}
            <div className="border-b border-border-soft/60 pb-4">
              <button
                type="button"
                onClick={() => toggleSection('shipping')}
                className="w-full flex items-center justify-between py-2 text-left font-serif text-lg font-bold text-gray-900 focus:outline-none"
              >
                <span>Shipping & Firing Cycles</span>
                {openSection === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <AnimatePresence initial={false}>
                {openSection === 'shipping' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    className="overflow-hidden mt-3"
                  >
                    <div className="type-body text-gray-600 pl-1 space-y-4">
                      <p className="leading-relaxed">
                        Every piece is fired twice in our studio kiln. Because we dry our terracotta jewellery naturally under the sun, wet weather might add 2–3 days to the crafting cycle.
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <Truck className="text-terracotta" size={16} />
                          <span>Free shipping over ₹2000</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <RotateCcw className="text-terracotta" size={16} />
                          <span>7-day easy returns</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile WhatsApp CTA Bar */}
      <div className={cn(
        "fixed bottom-0 inset-x-0 z-40 bg-studio-paper/95 backdrop-blur-md border-t border-border-soft p-4 flex gap-4 md:hidden transition-all duration-300 transform shadow-[0_-8px_30px_rgba(49,39,31,0.06)]",
        showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-white py-3 font-semibold text-sm hover:bg-[#20ba59] transition-colors shadow-xs"
        >
          <MessageSquare size={16} />
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
};
