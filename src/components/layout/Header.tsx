import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { brand } from '../../lib/brand';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const cartCount = useCartStore((state) => state.cartCount());

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
    { name: 'Terracotta Sets', path: '/category/Terracotta Set' },
    { name: 'Earrings', path: '/category/Earring' },
    { name: 'Accessories', path: '/category/Accessories' },
    { name: 'Bulk Orders', path: '/bulk-orders' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-terracotta text-warm-ivory text-center px-3 py-2 text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.12em] sm:type-overline">
        Handmade terracotta jewellery crafted with love
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 w-full border-b transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isScrolled ? 'bg-studio-paper/95 border-border-soft py-3 shadow-[0_16px_40px_rgba(49,39,31,0.06)] backdrop-blur-sm' : 'bg-studio-paper border-border-soft py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="min-h-11 min-w-11 p-2 text-gray-900 hover:text-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-warm-ivory"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'type-overline uppercase transition-colors duration-300',
                  location.pathname === link.path ? 'text-terracotta' : 'text-gray-900 hover:text-terracotta'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link to="/" className="flex-shrink-0 text-center">
            <h1 className="font-serif text-[2.1rem] display-logo display-italic leading-none text-terracotta-dark sm:text-[2.35rem]">
              {brand.name}
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 mr-2">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'type-overline uppercase transition-colors duration-300',
                    location.pathname === link.path ? 'text-terracotta' : 'text-gray-900 hover:text-terracotta'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${brand.name} on Instagram`}
              className="hidden min-h-11 min-w-11 items-center justify-center p-2 text-gray-900 transition-colors hover:text-terracotta sm:flex"
            >
              <Instagram size={20} />
            </a>
            <Link
              to="/cart"
              className="relative flex min-h-11 min-w-11 items-center justify-center p-2 text-gray-900 transition-colors hover:text-terracotta"
              aria-label="View Cart"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="numeric-tabular absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-[0.625rem] font-semibold text-warm-ivory">
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
              className="fixed inset-0 z-50 bg-gray-900/45 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-[86vw] max-w-sm overflow-y-auto border-r border-border-soft bg-studio-paper shadow-[32px_0_80px_rgba(49,39,31,0.18)] lg:hidden"
            >
              <div className="p-7">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-serif text-[2rem] display-logo display-italic text-terracotta-dark">{brand.name}</h2>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-11 min-w-11 p-2 text-gray-600 hover:text-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-warm-ivory"
                    aria-label="Close Menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="py-1 type-overline text-gray-800 transition-colors hover:text-terracotta"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="w-full h-px bg-border-soft my-4" />
                  <a
                    href={brand.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${brand.name} on Instagram`}
                    className="flex min-h-11 items-center gap-3 text-gray-600 transition-colors hover:text-terracotta"
                  >
                    <Instagram size={20} />
                    <span>Follow on Instagram</span>
                  </a>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
