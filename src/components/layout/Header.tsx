import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { getWhatsappUrl, useBrandSettings } from '../../lib/brandSettings';
import { BrandLogo } from '../ui/BrandLogo';
import { getCategoryPath, primaryCategoryLinks } from '../../lib/catalog';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore((state) => state.cartCount());
  const prefersReducedMotion = useReducedMotion();
  const mobileMenuId = 'goonjaa-mobile-menu';
  const brandSettings = useBrandSettings();
  const whatsappUrl = getWhatsappUrl(brandSettings);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    ...primaryCategoryLinks.map((category) => ({ name: category.label, path: getCategoryPath(category.slug) })),
    { name: 'Bulk Orders', path: '/bulk-orders' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-terracotta text-warm-ivory text-center px-3 py-2.5 text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.14em] sm:type-overline border-b border-terracotta-dark/10">
        Handmade terracotta jewellery crafted with love
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-b',
          isScrolled 
            ? 'bg-studio-paper/92 border-border-soft py-3.5 clay-shadow-soft backdrop-blur-md'
            : 'bg-studio-paper/70 border-border-soft/30 py-5.5 backdrop-blur-xs'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 p-2 text-gray-900 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              aria-controls={isMobileMenuOpen ? mobileMenuId : undefined}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={cn("h-[1.5px] w-5 bg-current transition-all duration-300", isMobileMenuOpen && "rotate-45 translate-y-[7.5px]")} />
              <span className={cn("h-[1.5px] w-5 bg-current transition-all duration-300", isMobileMenuOpen && "opacity-0")} />
              <span className={cn("h-[1.5px] w-5 bg-current transition-all duration-300", isMobileMenuOpen && "-rotate-45 -translate-y-[7.5px]")} />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'type-nav group relative inline-flex min-h-11 items-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory',
                  location.pathname === link.path ? 'text-terracotta' : 'text-gray-900 hover:text-terracotta'
                )}
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-terracotta transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                  location.pathname === link.path && "scale-x-100"
                )} />
              </Link>
            ))}
          </div>

          <Link to="/" className="flex min-h-11 shrink-0 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory" aria-label={`${brandSettings.name} home`}>
            <BrandLogo settings={brandSettings} variant="wordmark" placement="header" />
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 mr-2">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'type-nav group relative inline-flex min-h-11 items-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory',
                    location.pathname === link.path ? 'text-terracotta' : 'text-gray-900 hover:text-terracotta'
                  )}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[1px] bg-terracotta transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                    location.pathname === link.path && "scale-x-100"
                  )} />
                </Link>
              ))}
            </div>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${brandSettings.name} on WhatsApp`}
                className="hidden min-h-11 min-w-11 items-center justify-center p-2 text-gray-900 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory sm:flex"
              >
                <MessageCircle size={19} strokeWidth={2.2} />
              </a>
            )}
            <Link
              to="/cart"
              className="relative flex min-h-11 min-w-11 items-center justify-center p-2 text-gray-900 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
              aria-label="View Cart"
            >
              <ShoppingBag size={20} strokeWidth={2.2} />
              {cartCount > 0 && (
                <span className="numeric-tabular absolute right-0.5 top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-terracotta text-[0.6rem] font-bold text-warm-ivory">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="fixed inset-0 z-50 bg-gray-900/35 backdrop-blur-xs lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              id={mobileMenuId}
              initial={{ x: prefersReducedMotion ? 0 : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: prefersReducedMotion ? 0 : '-100%' }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[84vw] max-w-sm overflow-y-auto border-r border-border-soft bg-studio-paper clay-shadow-lift lg:hidden"
            >
              <div className="p-7">
                <div className="flex justify-between items-center mb-10">
                  <Link to="/" className="flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper" onClick={() => setIsMobileMenuOpen(false)} aria-label={`${brandSettings.name} home`}>
                    <BrandLogo settings={brandSettings} variant="wordmark" placement="mobileMenu" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex min-h-11 min-w-11 items-center justify-center p-2 text-gray-600 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper"
                    aria-label="Close Menu"
                  >
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex flex-col gap-5">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        className={cn(
                          'flex min-h-11 items-center py-1 type-nav text-gray-800 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper',
                          location.pathname === link.path && 'text-terracotta'
                        )}
                        aria-current={location.pathname === link.path ? 'page' : undefined}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="w-full h-px bg-border-soft my-5" />
                  {whatsappUrl && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }}
                    >
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 items-center gap-3 text-gray-600 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper type-nav"
                      >
                        <MessageCircle size={18} />
                        <span>Message on WhatsApp</span>
                      </a>
                    </motion.div>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
