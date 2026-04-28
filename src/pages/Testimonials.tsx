import React from 'react';

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
      text: "I commissioned a custom piece to match my Kanjeevaram saree, and the artist delivered beyond my expectations. The colors were matched perfectly.",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">Happy Customers</h1>
        <p className="text-gray-600">Notes of love from our wonderful community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="flex gap-1 mb-4 text-antique-gold">
              {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
            </div>
            <p className="text-gray-700 italic mb-6">"{t.text}"</p>
            <div>
              <h4 className="font-medium text-gray-900">{t.name}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-widest">{t.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
