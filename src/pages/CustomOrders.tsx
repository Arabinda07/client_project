import React from 'react';
import { Button } from '../components/ui/Button';

export const CustomOrders = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <div className="text-center mb-16">
        <span className="text-terracotta type-overline mb-4 block">Bespoke By Goonjaa</span>
        <h1 className="type-display text-gray-900 mb-6 italic">Commission Wearable Art</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Have a specific saree you'd like to match? A distinctive modern dress that needs a bold, earthly statement? We'd love to collaborate and bring your vision to life in clay. Every bespoke journey is personal and unhurried.
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 mb-12">
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent!'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 text-left">
              <label className="type-overline text-gray-700">Your Name</label>
              <input type="text" placeholder="How should we address you?" className="w-full px-4 py-3 rounded-none border-b border-gray-300 focus:outline-none focus:border-terracotta focus:ring-0 bg-transparent" />
            </div>
            <div className="space-y-2 text-left">
              <label className="type-overline text-gray-700">Email Address</label>
              <input type="email" placeholder="Where can we reply?" className="w-full px-4 py-3 rounded-none border-b border-gray-300 focus:outline-none focus:border-terracotta focus:ring-0 bg-transparent" />
            </div>
            <div className="space-y-2 md:col-span-2 text-left">
              <label className="type-overline text-gray-700">Tell us about your idea</label>
              <textarea rows={4} placeholder="Describe the colors, motifs, or mood you are looking for..." className="w-full px-4 py-3 rounded-none border border-gray-300 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta bg-transparent mt-2"></textarea>
            </div>
            <div className="space-y-2 md:col-span-2 text-left">
              <label className="type-overline text-gray-700">Occasion / Timeline (Optional)</label>
              <input type="text" placeholder="When do you need this wearable art?" className="w-full px-4 py-3 rounded-none border-b border-gray-300 focus:outline-none focus:border-terracotta focus:ring-0 bg-transparent" />
            </div>
          </div>
          <div className="pt-4 text-center">
            <Button type="submit" className="type-overline px-12 py-4 h-auto">Start the Conversation</Button>
          </div>
        </form>
      </div>

      <div className="text-center pt-8 border-t border-gray-100">
        <p className="text-gray-500 mb-6">Or if you prefer a direct chat with the artist:</p>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="type-overline px-8">WhatsApp the Studio</Button>
        </a>
      </div>
    </div>
  );
};
