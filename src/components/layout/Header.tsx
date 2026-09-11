import React, { useState, useEffect, useRef } from 'react';
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
  const [headerOffset, setHeaderOffset] = useState(0);
  const announcementRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const cartCount = useCartStore((state) => state.cartCount());
  const prefersReducedMotion = useReducedMotion();
  const mobileMenuId = 'goonjaa-mobile-menu';
  const brandSettings = useBrandSettings();
  const whatsappUrl = getWhatsappUrl(brandSettings);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setHeaderOffset(Math.max(0, (announcementRef.current?.offsetHeight ?? 0) - window.scrollY));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    ...primaryCategoryLinks.map((category) => ({ name: category.label, path: getCategoryPath(category.slug) })),
    { name: 'Bulk Orders', path: '/bulk-orders' },
    { name: 'About', path: '/about' },
  ];

  const renderDesktopLink = (link: (typeof navLinks)[number]) => (
    <Link
      key={link.name}
      to={link.path}
      className={cn(
        'type-nav group relative inline-flex min-h-11 items-center text-gray-900 transition-opacity duration-300 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory',
        location.pathname === link.path && 'text-terracotta'
      )}
      aria-current={location.pathname === link.path ? 'page' : undefined}
    >
      {link.name}
      <span
        className={cn(
          'absolute bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100',
          location.pathname === link.path && 'scale-x-100'
        )}
      />
    </Link>
  );

  return (
    <>
      <div ref={announcementRef} className="border-b border-terracotta-dark/10 bg-terracotta px-3 py-2.5 text-center text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.14em] text-warm-ivory sm:type-overline">
        Handmade terracotta jewellery crafted with love
      </div>

      <header
        style={{ top: headerOffset }}
        className={cn(
          'fixed inset-x-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
          isScrolled
            ? 'border-border-soft bg-studio-paper/96 clay-shadow-soft backdrop-blur-md'
            : 'border-border-soft/55 bg-studio-paper/88 backdrop-blur-sm'
        )}
      >
        <div className="mx-auto flex min-h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:min-h-20 sm:px-6 lg:px-10">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 p-2 text-gray-900 transition-colors hover:text-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-controls={isMobileMenuOpen ? mobileMenuId : undefined}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={cn('h-[1.5px] w-5 bg-current transition-all duration-300', isMobileMenuOpen && 'translate-y-[7.5px] rotate-45')} />
              <span className={cn('h-[1.5px] w-5 bg-current transition-all duration-300', isMobileMenuOpen && 'opacity-0')} />
              <span className={cn('h-[1.5px] w-5 bg-current transition-all duration-300', isMobileMenuOpen && '-translate-y-[7.5px] -rotate-45')} />
            </button>
          </div>

          <div className="hidden items-center gap-7 lg:flex xl:gap-9">
            {navLinks.slice(0, 4).map(renderDesktopLink)}
          </div>

          <Link
            to="/"
            className="flex min-h-11 shrink-0 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
            aria-label={`${brandSettings.name} home`}
          >
            <BrandLogo settings={brandSettings} variant="wordmark" placement="header" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">
            <div className="mr-2 hidden items-center gap-7 lg:flex xl:gap-9">
              {navLinks.slice(4).map(renderDesktopLink)}
            </div>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${brandSettings.name} on WhatsApp`}
                className="hidden min-h-11 min-w-11 items-center justify-center p-2 text-gray-900 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory sm:flex"
              >
                <MessageCircle size={19} strokeWidth={2.2} />
              </a>
            )}
            <Link
              to="/cart"
              className="relative flex min-h-11 min-w-11 items-center justify-center p-2 text-gray-900 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-warm-ivory"
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
      <div className="h-[4.5rem] shrink-0 sm:h-20" aria-hidden="true" />

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
                <div className="mb-10 flex items-center justify-between">
                  <Link
                    to="/"
                    className="flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-studio-paper"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label={`${brandSettings.name} home`}
                  >
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

                <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
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
                  <div className="my-5 h-px w-full bg-border-soft" />
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
