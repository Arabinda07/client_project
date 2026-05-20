import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { brand } from '../../lib/brand';
import { Logo } from '../ui/Logo';

export const Footer = () => {
  return (
    <footer className="bg-deep-maroon pt-18 pb-8 text-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1 flex flex-col items-start">
            <div className="mb-6 w-full max-w-[200px]">
              <Logo variant="full" color="text-warm-ivory" className="!items-start" />
            </div>
            <p className="mb-6 max-w-sm text-warm-ivory/78 type-body">
              Handcrafted terracotta jewellery from the heart of India. Every piece is sculpted with love and painted by hand, making it uniquely yours.
            </p>
            <div className="flex space-x-4">
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow ${brand.name} on Instagram`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-warm-ivory/10 transition-colors hover:bg-terracotta focus:outline-none focus:ring-2 focus:ring-warm-ivory"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-antique-gold type-overline">Shop</h3>
            <ul className="space-y-4 text-warm-ivory/78 type-body">
              <li><Link to="/category/Terracotta Set" className="transition-colors hover:text-warm-ivory">Terracotta Sets</Link></li>
              <li><Link to="/category/Earring" className="transition-colors hover:text-warm-ivory">Earrings</Link></li>
              <li><Link to="/category/Accessories" className="transition-colors hover:text-warm-ivory">Accessories</Link></li>
              <li><Link to="/shop" className="transition-colors hover:text-warm-ivory">All Pieces</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-antique-gold type-overline">Brand</h3>
            <ul className="space-y-4 text-warm-ivory/78 type-body">
              <li><Link to="/about" className="transition-colors hover:text-warm-ivory">Our Story</Link></li>
              <li><Link to="/bulk-orders" className="transition-colors hover:text-warm-ivory">Bulk Orders</Link></li>
              <li><Link to="/testimonials" className="transition-colors hover:text-warm-ivory">Happy Customers</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-warm-ivory">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-antique-gold type-overline">Policies</h3>
            <ul className="space-y-4 text-warm-ivory/78 type-body">
              <li><Link to="/policies/shipping" className="transition-colors hover:text-warm-ivory">Shipping & Returns</Link></li>
              <li><Link to="/policies/privacy" className="transition-colors hover:text-warm-ivory">Privacy Policy</Link></li>
              <li><Link to="/policies/terms" className="transition-colors hover:text-warm-ivory">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-warm-ivory/12 pt-8 text-warm-ivory/62 type-caption md:flex-row">
          <p>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with love in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
