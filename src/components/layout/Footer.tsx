import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Facebook, Instagram, Mail, MessageCircle, Youtube } from 'lucide-react';
import { getWhatsappUrl, socialLinksFor, useBrandSettings } from '../../lib/brandSettings';
import { BrandLogo } from '../ui/BrandLogo';
import { getCategoryPath, primaryCategoryLinks } from '../../lib/catalog';

type FooterLink = {
  label: string;
  to?: string;
  href?: string;
};

type FooterGroup = {
  title: string;
  links: readonly FooterLink[];
};

type FollowSocial = Extract<ReturnType<typeof socialLinksFor>[number], { kind: 'whatsapp' | 'instagram' | 'facebook' | 'youtube' | 'email' }>;

const isFollowSocial = (social: ReturnType<typeof socialLinksFor>[number]): social is FollowSocial =>
  social.kind === 'whatsapp' ||
  social.kind === 'instagram' ||
  social.kind === 'facebook' ||
  social.kind === 'youtube' ||
  social.kind === 'email';

export const Footer = () => {
  const brandSettings = useBrandSettings();
  const socials = socialLinksFor(brandSettings).filter(isFollowSocial);
  const whatsappUrl = getWhatsappUrl(brandSettings);

  const footerGroups: FooterGroup[] = [
    {
      title: 'Customer Care',
      links: [
        ...(brandSettings.email ? [{ label: 'Email Us', href: `mailto:${brandSettings.email}` }] : []),
        ...(whatsappUrl ? [{ label: 'WhatsApp', href: whatsappUrl }] : []),
        { label: 'Shipping & Returns', to: '/policies/shipping' },
        { label: 'Contact Us', to: '/contact' },
      ],
    },
    {
      title: 'Shop',
      links: [
        { label: 'All Pieces', to: '/shop' },
        ...primaryCategoryLinks.map((category) => ({
          label: category.label,
          to: getCategoryPath(category.slug),
        })),
      ],
    },
    {
      title: 'Studio',
      links: [
        { label: 'Our Story', to: '/about' },
        { label: 'Bulk Orders', to: '/bulk-orders' },
        { label: 'Happy Customers', to: '/testimonials' },
      ],
    },
    {
      title: 'Policies',
      links: [
        { label: 'Privacy Policy', to: '/policies/privacy' },
        { label: 'Terms & Conditions', to: '/policies/terms' },
      ],
    },
  ];

  return (
    <footer className="border-t border-deep-maroon/20 bg-deep-maroon text-warm-ivory">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-18">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          <section className="lg:col-span-4">
            <BrandLogo settings={brandSettings} variant="full" placement="footer" color="text-warm-ivory" />
            <p className="mt-6 max-w-md text-sm leading-7 text-warm-ivory/78">
              {brandSettings.description || 'Handcrafted terracotta jewellery from the heart of India. Every piece is sculpted with love and painted by hand, making it uniquely yours.'}
            </p>

            {socials.length > 0 && (
              <div className="mt-8">
                <p className="mb-4 text-antique-gold-light type-overline">Follow the studio</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.kind}
                      href={social.url}
                      target={social.kind === 'email' ? undefined : '_blank'}
                      rel={social.kind === 'email' ? undefined : 'noopener noreferrer'}
                      aria-label={`${social.label} for ${brandSettings.name}`}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center border border-warm-ivory/16 text-warm-ivory/82 transition-colors hover:border-warm-ivory/45 hover:text-warm-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory"
                    >
                      <SocialIcon kind={social.kind} />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>

          <nav className="hidden lg:col-span-8 lg:grid lg:grid-cols-4 lg:gap-9" aria-label="Footer navigation">
            {footerGroups.map((group) => (
              <FooterLinkGroup key={group.title} title={group.title} links={group.links} />
            ))}
          </nav>

          <nav className="divide-y divide-warm-ivory/12 border-y border-warm-ivory/12 lg:hidden" aria-label="Footer navigation">
            {footerGroups.map((group) => (
              <FooterDisclosureGroup key={group.title} title={group.title} links={group.links} />
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-warm-ivory/12 pt-7 text-xs leading-6 text-warm-ivory/68 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {brandSettings.name}. All rights reserved.</p>
          <p>Handmade in India.</p>
        </div>
      </div>
    </footer>
  );
};

const footerLinkClassName =
  'inline-flex min-h-10 items-center text-sm leading-6 text-warm-ivory/76 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-deep-maroon';

const FooterLinkItem = ({ link }: { link: FooterLink }) => {
  if (link.href) {
    const isExternal = !link.href.startsWith('mailto:');

    return (
      <a href={link.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} className={footerLinkClassName}>
        {link.label}
      </a>
    );
  }

  return (
    <Link to={link.to ?? '/'} className={footerLinkClassName}>
      {link.label}
    </Link>
  );
};

const FooterLinkGroup = ({ title, links }: FooterGroup) => (
  <div>
    <h3 className="mb-5 text-antique-gold-light type-overline">{title}</h3>
    <ul className="space-y-1">
      {links.map((link) => (
        <li key={`${link.label}-${link.to ?? link.href}`}>
          <FooterLinkItem link={link} />
        </li>
      ))}
    </ul>
  </div>
);

const FooterDisclosureGroup = ({ title, links }: FooterGroup) => (
  <details className="group">
    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-antique-gold-light type-overline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-deep-maroon">
      {title}
      <ChevronDown size={16} aria-hidden="true" className="transition-transform group-open:rotate-180" />
    </summary>
    <ul className="pb-4">
      {links.map((link) => (
        <li key={`${link.label}-${link.to ?? link.href}`}>
          <FooterLinkItem link={link} />
        </li>
      ))}
    </ul>
  </details>
);

const SocialIcon = ({ kind }: { kind: FollowSocial['kind'] }) => {
  if (kind === 'whatsapp') return <MessageCircle size={18} />;
  if (kind === 'facebook') return <Facebook size={18} />;
  if (kind === 'youtube') return <Youtube size={18} />;
  if (kind === 'email') return <Mail size={18} />;
  return <Instagram size={18} />;
};
