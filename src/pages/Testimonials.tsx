import React from 'react';
import { SEO } from '../components/layout/SEO';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Aditi S.",
      location: "Mumbai",
      text: "The details on the Mridula set are absolutely breathtaking! I wore it to my cousin's haldi and received so many compliments. It's surprisingly lightweight too.",
      rating: 5
    },
    {
      name: "Priya M.",
      location: "Bangalore",
      text: "I ordered a painted set from the catalogue for a family function, and the colours looked even richer in person.",
      rating: 5
    },
    {
      name: "Neha R.",
      location: "Delhi",
      text: "These jhumkas are now my everyday go-to. I love that they are eco-friendly and skin-friendly. Beautiful craftsmanship.",
      rating: 5
    },
    {
      name: "Revathi K.",
      location: "Chennai",
      text: "Packaging was beautiful and secure, the terracotta arrived perfectly intact. The Chandrakala set is truly a statement piece.",
      rating: 5
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <SEO title="Happy Customers" description="Notes from customers who have worn goonjaa handmade terracotta jewellery." />
      <div className="text-center mb-16">
        <span className="mb-5 block text-terracotta-dark type-overline">Community Notes</span>
        <h1 className="mb-4 text-gray-900 type-display">Happy Customers</h1>
        <p className="mx-auto text-gray-600 type-body-large">Notes of love from our wonderful community.</p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <div key={i} className="flex flex-col items-center rounded-[2px] border border-border-soft bg-surface p-8 text-center clay-shadow-soft">
            <div className="flex gap-1 mb-4 text-antique-gold">
              {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
            </div>
            <p className="mb-6 text-gray-700 type-body-large">"{t.text}"</p>
            <div>
              <h4 className="font-medium text-gray-900">{t.name}</h4>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
