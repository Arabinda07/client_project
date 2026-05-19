import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Instagram } from 'lucide-react';
import { brand } from '../lib/brand';
import { SEO } from '../components/layout/SEO';

export const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  return (
    <>
      <SEO title="Contact" description={`Write to the ${brand.name} studio for jewellery care, product questions, or order support.`} />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-14 md:flex-row lg:gap-24">
        <div className="w-full md:w-5/12 space-y-12">
          <div>
            <span className="mb-4 block text-terracotta-dark type-overline">Get in Touch</span>
            <h1 className="type-display text-gray-900 mb-6">Write to the Studio</h1>
            <p className="text-gray-600 type-body-large">
              Whether you have a question about a piece, need help with caring for your terracotta, or just want to say hello, we are always happy to hear from you.
            </p>
          </div>
          
          <div className="space-y-8 border-t border-border-soft pt-8">
            <div className="flex items-start gap-4">
              <Mail className="text-terracotta mt-1 h-5 w-5" />
              <div>
                <h3 className="type-overline text-gray-900 mb-1 block">Email</h3>
                <a href={`mailto:${brand.email}`} className="type-body text-gray-600 transition-colors hover:text-terracotta">{brand.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Instagram className="text-terracotta mt-1 h-5 w-5" />
              <div>
                <h3 className="type-overline text-gray-900 mb-1 block">Instagram</h3>
                <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="type-body text-gray-600 transition-colors hover:text-terracotta">{brand.instagramHandle}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-[2px] border border-border-soft bg-surface p-8 shadow-[0_18px_48px_rgba(49,39,31,0.05)] md:w-7/12 md:p-12">
          {isSent && (
            <div className="mb-8 border border-terracotta/30 bg-warm-ivory p-4 text-terracotta-dark" role="status">
              <p className="type-overline mb-1">Message received</p>
              <p className="type-body">The studio will reply as soon as possible.</p>
            </div>
          )}
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsSent(true); }}>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="space-y-2 flex-1">
                <label htmlFor="contact-name" className="type-overline text-gray-700">Your Name</label>
                <input id="contact-name" required type="text" className="min-h-12 w-full rounded-none border-b border-gray-300 bg-transparent px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-0" />
              </div>
              <div className="space-y-2 flex-1">
                <label htmlFor="contact-email" className="type-overline text-gray-700">Email Address</label>
                <input id="contact-email" required type="email" className="min-h-12 w-full rounded-none border-b border-gray-300 bg-transparent px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-0" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="type-overline text-gray-700">Message</label>
              <textarea id="contact-message" required rows={5} className="mt-2 w-full rounded-[2px] border border-gray-300 bg-transparent px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta"></textarea>
            </div>
            <div className="pt-4">
              <Button type="submit" className="px-12 py-4">Send Message</Button>
            </div>
          </form>
        </div>
        </div>
      </div>
    </>
  );
};
