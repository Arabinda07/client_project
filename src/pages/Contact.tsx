import React from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Instagram, MapPin } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-gray-600">Have a question about an order or just want to say hi?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="font-serif text-2xl">Studio Details</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="text-terracotta mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600 font-serif">hello@mittyandco.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Instagram className="text-terracotta mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Instagram</h3>
                <p className="text-gray-600">@mittyandco</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"></textarea>
            </div>
            <Button type="submit" fullWidth>Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
