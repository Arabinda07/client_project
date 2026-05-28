import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../lib/data/mockProducts';
import { fetchCatalogProductBySlug } from '../lib/catalogData';
import { useCartStore } from '../store/cartStore';
import { formatPrice, cn } from '../lib/utils';
import { getWhatsappUrl, useBrandSettings } from '../lib/brandSettings';
import { Button } from '../components/ui/Button';
import { ProductBadges } from '../components/product/ProductCard';
import { Minus, Plus, Truck, RotateCcw, AlertCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SEO } from '../components/layout/SEO';
import { ProductColourOption } from '../types';
import type { Product } from '../types';
import { ProductImage } from '../components/ui/Media';

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const initialProduct = mockProducts.find((p) => p.slug === slug) ?? null;
  
  const [product, setProduct] = useState<Product | null>(() => initialProduct);
  const [isLoadingProduct, setIsLoadingProduct] = useState(!initialProduct);
  const addItem = useCartStore((state) => state.addItem);
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const brandSettings = useBrandSettings();
  const [selectedColour, setSelectedColour] = useState<ProductColourOption | null>(null);
  const [colourError, setColourError] = useState('');
  const [openSection, setOpenSection] = useState<string | null>('materials');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.32, 0.72, 0, 1] as const };

  useEffect(() => {
    let isMounted = true;

    setProduct(mockProducts.find((p) => p.slug === slug) ?? null);
    setActiveImage(0);
    setSelectedColour(null);
    setColourError('');
    setIsLoadingProduct(true);

    fetchCatalogProductBySlug(slug).then((nextProduct) => {
      if (isMounted) {
        setProduct(nextProduct);
        setIsLoadingProduct(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

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

  if (!product && isLoadingProduct) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center px-4 py-20 text-terracotta-dark type-overline sm:px-6 lg:px-10">
        Preparing the piece
      </div>
    );
  }

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
  const whatsappUrl = getWhatsappUrl(brandSettings, waMessage);

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
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                className="h-full w-full"
              >
                <ProductImage
                  src={product.images[activeImage]}
                  alt={`${product.name}, handmade terracotta jewellery`}
                  loading="eager"
                  tone="detail"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
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
                  className={`relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-[2px] border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory ${activeImage === idx ? 'border-terracotta ring-1 ring-terracotta/30' : 'border-border-soft hover:border-terracotta/55'}`}
                >
                  <ProductImage
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    tone="detail"
                    sizes="64px"
                  />
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
          <p className="type-body mb-8 rounded-[2px] border border-terracotta/20 bg-studio-wash/70 px-4 py-3 text-xs italic leading-relaxed text-terracotta-dark/90">
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
                        className={`min-h-11 rounded-[2px] border px-4 py-2 font-medium type-caption transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory ${
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
                  <p className="type-caption text-terracotta-dark font-semibold" role="alert">
                    {colourError}
                  </p>
                )}
              </fieldset>
            )}

            <div className="flex items-center gap-6">
              <span className="type-overline text-gray-900 w-24 font-bold">Quantity</span>
              <div className="flex items-center rounded-[2px] border border-gray-300 bg-surface">
                <button 
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label={`Decrease quantity for ${product.name}`}
                  className="min-h-11 min-w-11 p-3 text-gray-600 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
                >
                  <Minus size={16} />
                </button>
                <span className="numeric-tabular w-12 text-center font-semibold">{quantity}</span>
                <button 
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label={`Increase quantity for ${product.name}`}
                  className="min-h-11 min-w-11 p-3 text-gray-600 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
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
                className="flex min-h-14 flex-1 items-center justify-center gap-2.5 rounded-[2px] border border-[#075E54] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#075E54] transition-colors duration-300 hover:bg-[#075E54] hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54] focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
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
                className="flex min-h-11 w-full items-center justify-between py-2 text-left font-serif text-lg font-bold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
                aria-expanded={openSection === 'materials'}
                aria-controls="product-materials-panel"
              >
                <span>Materials & Weight</span>
                {openSection === 'materials' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <div id="product-materials-panel">
              <AnimatePresence initial={false}>
                {openSection === 'materials' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={sectionTransition}
                    className="overflow-hidden mt-3"
                  >
                    <div className="type-body text-gray-600 space-y-3 pl-1">
                      <p><span className="font-semibold text-gray-800">Weight Details:</span> ~15g to 25g. Extremely lightweight clay structure designed for all-day comfort.</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {product.materials.map((m, i) => (
                          <span key={i} className="rounded-[2px] border border-border-soft bg-studio-wash px-2.5 py-1 text-xs text-gray-700">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </div>

            {/* Section 2: Care Instructions */}
            {product.careInstructions && (
              <div className="border-b border-border-soft/60 pb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('care')}
                  className="flex min-h-11 w-full items-center justify-between py-2 text-left font-serif text-lg font-bold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
                  aria-expanded={openSection === 'care'}
                  aria-controls="product-care-panel"
                >
                  <span>Care Instructions</span>
                  {openSection === 'care' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <div id="product-care-panel">
                <AnimatePresence initial={false}>
                  {openSection === 'care' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={sectionTransition}
                      className="overflow-hidden mt-3"
                    >
                      <p className="type-body text-gray-600 pl-1 leading-relaxed">
                        {product.careInstructions}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </div>
            )}

            {/* Section 3: Firing & Shipping */}
            <div className="border-b border-border-soft/60 pb-4">
              <button
                type="button"
                onClick={() => toggleSection('shipping')}
                className="flex min-h-11 w-full items-center justify-between py-2 text-left font-serif text-lg font-bold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
                aria-expanded={openSection === 'shipping'}
                aria-controls="product-shipping-panel"
              >
                <span>Shipping & Firing Cycles</span>
                {openSection === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              <div id="product-shipping-panel">
              <AnimatePresence initial={false}>
                {openSection === 'shipping' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={sectionTransition}
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
      </div>

      {/* Sticky Mobile WhatsApp CTA Bar */}
      <div className={cn(
        "fixed bottom-0 inset-x-0 z-40 bg-studio-paper/95 backdrop-blur-md border-t border-border-soft p-4 flex gap-4 md:hidden transition-all duration-300 transform clay-shadow-soft",
        showStickyBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      )}>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[2px] bg-[#075E54] py-3 text-sm font-semibold text-warm-ivory transition-colors hover:bg-[#064E46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54] focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
        >
          <MessageSquare size={16} />
          Order via WhatsApp
        </a>
      </div>
    </div>
  );
};
