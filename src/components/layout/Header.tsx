import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { brand } from '../../lib/brand';
import { Logo } from '../ui/Logo';

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
      <div className="bg-terracotta text-warm-ivory text-center px-3 py-2.5 text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.14em] sm:type-overline border-b border-terracotta-dark/10">
        Handmade terracotta jewellery crafted with love
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] border-b',
          isScrolled 
            ? 'bg-studio-paper/92 border-border-soft py-3.5 shadow-[0_16px_40px_rgba(49,39,31,0.06)] backdrop-blur-md' 
            : 'bg-studio-paper/70 border-border-soft/30 py-5.5 backdrop-blur-xs'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-h-11 min-w-11 flex flex-col justify-center items-center gap-1.5 p-2 text-gray-900 hover:text-terracotta focus:outline-none transition-colors"
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
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
                  'type-nav transition-all duration-300 relative py-1 group',
                  location.pathname === link.path ? 'text-terracotta' : 'text-gray-900 hover:text-terracotta'
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1px] bg-terracotta transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                  location.pathname === link.path && "scale-x-100"
                )} />
              </Link>
            ))}
          </div>

          <Link to="/" className="flex-shrink-0 flex items-center justify-center transition-transform hover:scale-[1.01] active:scale-[0.99] duration-300" aria-label="Goonjaa Home">
            <Logo variant="wordmark" className="h-10 w-auto sm:h-12" />
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 mr-2">
              {navLinks.slice(4).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'type-nav transition-all duration-300 relative py-1 group',
                    location.pathname === link.path ? 'text-terracotta' : 'text-gray-900 hover:text-terracotta'
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[1px] bg-terracotta transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100",
                    location.pathname === link.path && "scale-x-100"
                  )} />
                </Link>
              ))}
            </div>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${brand.name} on Instagram`}
              className="hidden min-h-11 min-w-11 items-center justify-center p-2 text-gray-900 transition-colors hover:text-terracotta sm:flex hover:scale-105 active:scale-95 duration-200"
            >
              <Instagram size={18} strokeWidth={2.2} />
            </a>
            <Link
              to="/cart"
              className="relative flex min-h-11 min-w-11 items-center justify-center p-2 text-gray-900 transition-colors hover:text-terracotta hover:scale-105 active:scale-95 duration-200"
              aria-label="View Cart"
            >
              <ShoppingBag size={20} strokeWidth={2.2} />
              {cartCount > 0 && (
                <span className="numeric-tabular absolute right-0.5 top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-terracotta text-[0.6rem] font-bold text-warm-ivory animate-pulse">
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-gray-900/35 backdrop-blur-xs lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-[84vw] max-w-sm overflow-y-auto border-r border-border-soft bg-studio-paper shadow-[32px_0_80px_rgba(49,39,31,0.14)] lg:hidden"
            >
              <div className="p-7">
                <div className="flex justify-between items-center mb-10">
                  <Link to="/" className="block" onClick={() => setIsMobileMenuOpen(false)} aria-label="Goonjaa Home">
                    <Logo variant="wordmark" className="h-10 w-auto" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="min-h-11 min-w-11 flex items-center justify-center p-2 text-gray-600 hover:text-terracotta focus:outline-none transition-colors"
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
                          'block py-1 type-nav text-gray-800 transition-colors hover:text-terracotta',
                          location.pathname === link.path && 'text-terracotta'
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <div className="w-full h-px bg-border-soft my-5" />
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }}
                  >
                    <a
                      href={brand.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-3 text-gray-600 transition-colors hover:text-terracotta type-nav"
                    >
                      <Instagram size={18} />
                      <span>Follow on Instagram</span>
                    </a>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
