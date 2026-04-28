import React from 'react';
import { Button } from '../components/ui/Button';

export const CustomOrders = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <span className="text-terracotta uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">Bespoke By Mitty</span>
        <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6 italic">Commission Wearable Art</h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">Want a piece customized to match your saree? Or a unique bridal set? We'd love to bring your vision to life in clay.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent!'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Option</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Tell us about your idea</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"></textarea>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Occasion / Timeline (Optional)</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta" />
            </div>
          </div>
          <Button type="submit" fullWidth>Send Inquiry</Button>
        </form>
      </div>

      <div className="text-center">
        <p className="text-gray-500 mb-4">Or discuss directly with the artist on WhatsApp</p>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">WhatsApp Us</Button>
        </a>
      </div>
    </div>
  );
};
