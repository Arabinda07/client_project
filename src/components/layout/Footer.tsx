import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MessageCircle, Youtube } from 'lucide-react';
import { socialLinksFor, useBrandSettings } from '../../lib/brandSettings';
import { BrandLogo } from '../ui/BrandLogo';
import { getCategoryPath, primaryCategoryLinks } from '../../lib/catalog';

export const Footer = () => {
  const brandSettings = useBrandSettings();
  const socials = socialLinksFor(brandSettings);

  return (
    <footer className="bg-deep-maroon pt-18 pb-8 text-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1 flex flex-col items-start">
            <div className="mb-6 w-full max-w-[200px]">
              <BrandLogo settings={brandSettings} variant="full" color="text-warm-ivory" className="!items-start" />
            </div>
            <p className="mb-6 max-w-sm text-warm-ivory/78 type-body">
              {brandSettings.description || 'Handcrafted terracotta jewellery from the heart of India. Every piece is sculpted with love and painted by hand, making it uniquely yours.'}
            </p>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <a
                  key={social.kind}
                  href={social.url}
                  target={social.kind === 'email' ? undefined : '_blank'}
                  rel={social.kind === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={`${social.label} for ${brandSettings.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-warm-ivory/10 transition-colors hover:bg-terracotta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory"
                >
                  <SocialIcon kind={social.kind} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-antique-gold-light type-overline">Shop</h3>
            <ul className="space-y-4 text-warm-ivory/78 type-body">
              {primaryCategoryLinks.map((category) => (
                <li key={category.slug}>
                  <Link to={getCategoryPath(category.slug)} className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">
                    {category.label}
                  </Link>
                </li>
              ))}
              <li><Link to="/shop" className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">All Pieces</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-antique-gold-light type-overline">Brand</h3>
            <ul className="space-y-4 text-warm-ivory/78 type-body">
              <li><Link to="/about" className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">Our Story</Link></li>
              <li><Link to="/bulk-orders" className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">Bulk Orders</Link></li>
              <li><Link to="/testimonials" className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">Happy Customers</Link></li>
              <li><Link to="/contact" className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-antique-gold-light type-overline">Policies</h3>
            <ul className="space-y-4 text-warm-ivory/78 type-body">
              <li><Link to="/policies/shipping" className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">Shipping & Returns</Link></li>
              <li><Link to="/policies/privacy" className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">Privacy Policy</Link></li>
              <li><Link to="/policies/terms" className="inline-flex min-h-11 items-center transition-colors hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-warm-ivory/12 pt-8 text-warm-ivory/72 type-caption md:flex-row">
          <p>&copy; {new Date().getFullYear()} {brandSettings.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Made with love in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ kind }: { kind: ReturnType<typeof socialLinksFor>[number]['kind'] }) => {
  if (kind === 'whatsapp') return <MessageCircle size={18} />;
  if (kind === 'facebook') return <Facebook size={18} />;
  if (kind === 'youtube') return <Youtube size={18} />;
  if (kind === 'email') return <Mail size={18} />;
  return <Instagram size={18} />;
};
