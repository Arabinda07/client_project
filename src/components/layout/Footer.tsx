import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-deep-maroon text-warm-ivory pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <h2 className="font-serif text-3xl mb-6">Mitty <span className="italic font-light opacity-80">&</span> Co</h2>
            <p className="text-warm-ivory/80 text-sm leading-relaxed mb-6 max-w-sm">
              Handcrafted terracotta jewellery from the heart of India. Every piece is sculpted with love and painted by hand, making it uniquely yours.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terracotta transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-6 uppercase tracking-wider text-antique-gold">Shop</h3>
            <ul className="space-y-4 text-sm text-warm-ivory/80">
              <li><Link to="/category/Terracotta Set" className="hover:text-white transition-colors">Terracotta Sets</Link></li>
              <li><Link to="/category/Earring" className="hover:text-white transition-colors">Earrings</Link></li>
              <li><Link to="/category/Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-6 uppercase tracking-wider text-antique-gold">Brand</h3>
            <ul className="space-y-4 text-sm text-warm-ivory/80">
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/custom-orders" className="hover:text-white transition-colors">Custom Orders</Link></li>
              <li><Link to="/testimonials" className="hover:text-white transition-colors">Happy Customers</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-6 uppercase tracking-wider text-antique-gold">Policies</h3>
            <ul className="space-y-4 text-sm text-warm-ivory/80">
              <li><Link to="/policies/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/policies/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/policies/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-warm-ivory/60">
          <p>&copy; {new Date().getFullYear()} Mitty & Co. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with love in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
