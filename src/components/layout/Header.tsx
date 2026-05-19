import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

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
      <div className="bg-terracotta text-white type-overline tracking-wider text-center py-2 px-4 uppercase">
        Handmade terracotta jewellery crafted with love
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300 border-b',
          isScrolled ? 'bg-warm-ivory border-gray-200 py-3 mt-0 shadow-sm' : 'bg-warm-ivory border-gray-200 py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-gray-900 hover:text-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-warm-ivory"
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
                  'type-overline transition-colors uppercase',
                  location.pathname === link.path ? 'text-terracotta' : 'text-gray-900 hover:text-terracotta'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link to="/" className="flex-shrink-0 text-center">
            <h1 className="type-h1 text-4xl italic tracking-tighter text-terracotta-dark">
              Goonjaa
            </h1>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 mr-2">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'type-overline transition-colors uppercase',
                    location.pathname === link.path ? 'text-terracotta' : 'text-gray-900 hover:text-terracotta'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <a
              href="https://instagram.com/goonjaa.srijita"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block p-1 text-gray-900 hover:text-terracotta transition-colors"
            >
              <Instagram size={20} />
            </a>
            <Link
              to="/cart"
              className="relative p-1 text-gray-900 hover:text-terracotta transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
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
              className="fixed inset-0 bg-gray-950/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-[80vw] max-w-sm bg-warm-ivory shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="type-h3 text-gray-900">Goonjaa</h2>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-warm-ivory"
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
                      className="type-overline text-gray-800 hover:text-terracotta"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="w-full h-px bg-gray-200 my-4" />
                  <a
                    href="https://instagram.com/goonjaa.srijita"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 hover:text-terracotta"
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
