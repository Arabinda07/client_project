import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Instagram } from 'lucide-react';

export const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24 sm:py-32">
      <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
        <div className="w-full md:w-5/12 space-y-12">
          <div>
            <span className="text-terracotta type-overline mb-4 block">Get in Touch</span>
            <h1 className="type-display text-gray-900 mb-6 italic">Write to the Studio</h1>
            <p className="text-gray-600 type-body-large">
              Whether you have a question about a piece, need help with caring for your terracotta, or just want to say hello, we are always happy to hear from you.
            </p>
          </div>
          
          <div className="space-y-8 pt-8 border-t border-gray-100">
            <div className="flex items-start gap-4">
              <Mail className="text-terracotta mt-1 h-5 w-5" />
              <div>
                <h3 className="type-overline text-gray-900 mb-1 block">Email</h3>
                <a href="mailto:hello@goonjaa.in" className="type-body text-gray-600 hover:text-terracotta transition-colors">hello@goonjaa.in</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Instagram className="text-terracotta mt-1 h-5 w-5" />
              <div>
                <h3 className="type-overline text-gray-900 mb-1 block">Instagram</h3>
                <a href="https://instagram.com/goonjaa.srijita" target="_blank" rel="noopener noreferrer" className="type-body text-gray-600 hover:text-terracotta transition-colors">@goonjaa.srijita</a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
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
                <input id="contact-name" required type="text" className="w-full px-4 py-3 rounded-none border-b border-gray-300 focus:outline-none focus:border-terracotta focus:ring-0 bg-transparent" />
              </div>
              <div className="space-y-2 flex-1">
                <label htmlFor="contact-email" className="type-overline text-gray-700">Email Address</label>
                <input id="contact-email" required type="email" className="w-full px-4 py-3 rounded-none border-b border-gray-300 focus:outline-none focus:border-terracotta focus:ring-0 bg-transparent" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="type-overline text-gray-700">Message</label>
              <textarea id="contact-message" required rows={5} className="w-full px-4 py-3 rounded-none border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-transparent mt-2"></textarea>
            </div>
            <div className="pt-4">
              <Button type="submit" className="type-overline px-12 py-4 h-auto">Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
